"""Endpoints para gerenciamento de ações de meta."""

from typing import List
from fastapi import APIRouter, Depends, status
from fastapi_pagination import Page, Params

from schemas.acao_meta import AcaoMetaCreate, AcaoMetaUpdate, AcaoMetaRead
from services.acao_meta_service import AcaoMetaService
from filters.acao_meta_filter import AcaoMetaFilter

router = APIRouter(prefix="/acoes-meta", tags=["Ações de Meta"])


@router.post(
    "",
    response_model=AcaoMetaRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar ação de meta",
)
async def criar_acao(
    acao: AcaoMetaCreate,
    service: AcaoMetaService = Depends(AcaoMetaService),
):
    """Cria uma nova ação de meta."""
    return await service.add(acao.model_dump())


@router.get(
    "",
    response_model=Page[AcaoMetaRead],
    summary="Listar ações de meta",
)
async def listar_acoes(
    filtros: AcaoMetaFilter = Depends(),
    params: Params = Depends(),
    service: AcaoMetaService = Depends(AcaoMetaService),
):
    """Lista ações de meta com filtros e paginação."""
    return await service.filter(filtros.to_dict())


@router.get(
    "/{acao_id}",
    response_model=AcaoMetaRead,
    summary="Obter ação por ID",
)
async def obter_acao(
    acao_id: str,
    service: AcaoMetaService = Depends(AcaoMetaService),
):
    """Obtém uma ação de meta específica por ID."""
    return await service.get_by_id(acao_id)


@router.put(
    "/{acao_id}",
    response_model=AcaoMetaRead,
    summary="Atualizar ação de meta",
)
async def atualizar_acao(
    acao_id: str,
    acao: AcaoMetaUpdate,
    service: AcaoMetaService = Depends(AcaoMetaService),
):
    """Atualiza uma ação de meta existente."""
    return await service.edit(acao_id, acao.model_dump(exclude_unset=True))


@router.delete(
    "/{acao_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover ação de meta",
)
async def remover_acao(
    acao_id: str,
    service: AcaoMetaService = Depends(AcaoMetaService),
):
    """Remove uma ação de meta."""
    await service.remove(acao_id)
