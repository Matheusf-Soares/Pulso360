"""Endpoints para gerenciamento de avaliações."""

from typing import List
from fastapi import APIRouter, Depends, status
from fastapi_pagination import Page, Params

from schemas.avaliacao import AvaliacaoCreate, AvaliacaoUpdate, AvaliacaoRead
from services.avaliacao_service import AvaliacaoService
from filters.avaliacao_filter import AvaliacaoFilter

router = APIRouter(prefix="/avaliacoes", tags=["Avaliações"])


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
    response_model=Page[AvaliacaoRead],
    summary="Listar avaliações",
)
async def listar_avaliacoes(
    filtros: AvaliacaoFilter = Depends(),
    params: Params = Depends(),
    service: AvaliacaoService = Depends(AvaliacaoService),
):
    """Lista avaliações com filtros e paginação."""
    return await service.filter(filtros.to_dict())


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
