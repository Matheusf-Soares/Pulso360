"""Endpoints para gerenciamento de avaliações."""

from fastapi import APIRouter, Depends, status
from fastapi.responses import StreamingResponse
from typing import List
import csv
import io

from backend.schemas.avaliacao import AvaliacaoCreate, AvaliacaoUpdate, AvaliacaoRead
from backend.services.avaliacao_service import AvaliacaoService
from backend.filters.avaliacao_filter import AvaliacaoFilter

router = APIRouter(prefix="/avaliacoes", tags=["Avaliações"])


@router.get(
    "/stats",
    summary="Estatísticas das avaliações",
)
async def stats(service: AvaliacaoService = Depends(AvaliacaoService)):
    """Retorna estatísticas agregadas das avaliações."""
    avaliacoes = await service.filter({})
    total = len(avaliacoes)
    pending = len(
        [
            a
            for a in avaliacoes
            if getattr(a, "status", None) in ["em_andamento", "rascunho", "aguardando"]
        ]
    )
    completed = len(
        [a for a in avaliacoes if getattr(a, "status", None) == "concluida"]
    )
    scores = [
        float(getattr(a, "nota_global", 0))
        for a in avaliacoes
        if getattr(a, "nota_global", None) is not None
    ]
    avgScore = round(sum(scores) / len(scores), 2) if scores else 0
    return {
        "total": total,
        "pending": pending,
        "completed": completed,
        "avgScore": avgScore,
    }


@router.get(
    "/export",
    summary="Exportar avaliações",
)
async def exportar_avaliacoes(
    filtros: AvaliacaoFilter = Depends(),
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Exporta avaliações em formato CSV."""
    avaliacoes = await service.filter(filtros.model_dump(exclude_none=True))

    # Criar CSV em memória
    output = io.StringIO()
    writer = csv.writer(output)

    # Cabeçalhos
    writer.writerow(
        [
            "ID",
            "Avaliado",
            "Avaliador",
            "Ciclo",
            "Tipo",
            "Status",
            "Nota Global",
            "Data Criação",
            "Data Conclusão",
            "Progresso (%)",
        ]
    )

    # Dados
    for avaliacao in avaliacoes:
        writer.writerow(
            [
                str(avaliacao.id),
                avaliacao.avaliado.nome if avaliacao.avaliado else "",
                avaliacao.avaliador.nome if avaliacao.avaliador else "",
                avaliacao.ciclo.nome if avaliacao.ciclo else "",
                avaliacao.tipo,
                avaliacao.status,
                avaliacao.nota_global or "",
                (
                    avaliacao.data_criacao.strftime("%d/%m/%Y %H:%M")
                    if avaliacao.data_criacao
                    else ""
                ),
                (
                    avaliacao.data_conclusao.strftime("%d/%m/%Y %H:%M")
                    if avaliacao.data_conclusao
                    else ""
                ),
                getattr(avaliacao, "progresso", 0),
            ]
        )

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=avaliacoes.csv"},
    )


@router.post(
    "",
    response_model=AvaliacaoRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar avaliação",
)
async def criar_avaliacao(
    avaliacao: AvaliacaoCreate,
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Cria uma nova avaliação."""
    return await service.add(avaliacao.model_dump())


@router.get(
    "",
    response_model=List[AvaliacaoRead],
    summary="Listar avaliações",
)
async def listar_avaliacoes(
    filtros: AvaliacaoFilter = Depends(),
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Lista avaliações com filtros."""
    return await service.filter(filtros.model_dump(exclude_none=True))


@router.get(
    "/{avaliacao_id}",
    response_model=AvaliacaoRead,
    summary="Obter avaliação por ID",
)
async def obter_avaliacao(
    avaliacao_id: str,
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Obtém uma avaliação específica por ID."""
    return await service.get_by_id(avaliacao_id)


@router.put(
    "/{avaliacao_id}",
    response_model=AvaliacaoRead,
    summary="Atualizar avaliação",
)
async def atualizar_avaliacao(
    avaliacao_id: str,
    avaliacao: AvaliacaoUpdate,
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Atualiza uma avaliação existente."""
    return await service.edit(avaliacao_id, avaliacao.model_dump(exclude_unset=True))


@router.post(
    "/{avaliacao_id}/concluir",
    response_model=AvaliacaoRead,
    summary="Concluir avaliação",
)
async def concluir_avaliacao(
    avaliacao_id: str,
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Conclui uma avaliação e calcula a nota global."""
    return await service.concluir(avaliacao_id)


@router.delete(
    "/{avaliacao_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover avaliação",
)
async def remover_avaliacao(
    avaliacao_id: str,
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Remove uma avaliação."""
    await service.remove(avaliacao_id)
