from __future__ import annotations

from fastapi import APIRouter, Depends, status
from fastapi_pagination import Page, paginate

from services.ciclo_avaliacao_service import CicloAvaliacaoService
from schemas.ciclo_avaliacao import (
    CicloAvaliacaoCreate,
    CicloAvaliacaoRead,
    CicloAvaliacaoUpdate,
)
from filters.ciclo_avaliacao_filter import CicloAvaliacaoFilter
from schemas.error import ErrorResponse

router = APIRouter(prefix="/ciclos-avaliacao", tags=["ciclos-avaliacao"])


@router.post(
    "",
    response_model=CicloAvaliacaoRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar ciclo de avaliação",
    description="Cria um novo ciclo de avaliação validando período (início <= fim) e sobreposição de nome/período.",
    responses={
        400: {
            "model": ErrorResponse,
            "description": "Dados inválidos ou ciclo conflitante",
        },
    },
)
async def criar_ciclo(
    payload: CicloAvaliacaoCreate,
    service: CicloAvaliacaoService = Depends(CicloAvaliacaoService),
):
    ciclo = await service.add(payload.model_dump())
    return ciclo


@router.get(
    "",
    response_model=Page[CicloAvaliacaoRead],
    summary="Listar ciclos de avaliação",
    description="Lista ciclos com filtros por nome, status e intervalos de período.",
)
async def listar_ciclos(
    filtro: CicloAvaliacaoFilter = Depends(),
    service: CicloAvaliacaoService = Depends(CicloAvaliacaoService),
):
    ciclos = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(ciclos)


@router.get(
    "/{ciclo_id}",
    response_model=CicloAvaliacaoRead,
    summary="Obter ciclo de avaliação",
    description="Recupera detalhes de um ciclo pelo ID.",
    responses={404: {"model": ErrorResponse, "description": "Ciclo não encontrado"}},
)
async def obter_ciclo(
    ciclo_id: str, service: CicloAvaliacaoService = Depends(CicloAvaliacaoService)
):
    ciclo = await service.get_by_id(ciclo_id)
    return ciclo


@router.put(
    "/{ciclo_id}",
    response_model=CicloAvaliacaoRead,
    summary="Atualizar ciclo de avaliação",
    description="Atualiza campos do ciclo validando novamente período e conflitos.",
    responses={
        400: {"model": ErrorResponse, "description": "Período inválido ou conflito"},
        404: {"model": ErrorResponse, "description": "Ciclo não encontrado"},
    },
)
async def atualizar_ciclo(
    ciclo_id: str,
    payload: CicloAvaliacaoUpdate,
    service: CicloAvaliacaoService = Depends(CicloAvaliacaoService),
):
    ciclo = await service.edit(ciclo_id, payload.model_dump(exclude_none=True))
    return ciclo


@router.delete(
    "/{ciclo_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover ciclo de avaliação",
    description="Remove ciclo de avaliação pelo ID (cascade removerá entidades dependentes).",
    responses={404: {"model": ErrorResponse, "description": "Ciclo não encontrado"}},
)
async def remover_ciclo(
    ciclo_id: str, service: CicloAvaliacaoService = Depends(CicloAvaliacaoService)
):
    await service.remove(ciclo_id)
    return None
