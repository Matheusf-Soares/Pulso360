"""Endpoints para gerenciamento de metas."""

from typing import List
from fastapi import APIRouter, Depends, status
from fastapi_pagination import Page, Params

from backend.schemas.meta import MetaCreate, MetaUpdate, MetaRead
from backend.services.meta_service import MetaService
from backend.filters.meta_filter import MetaFilter

router = APIRouter(prefix="/metas", tags=["Metas"])


@router.post(
    "",
    response_model=MetaRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar meta",
)
async def criar_meta(
    meta: MetaCreate,
    service: MetaService = Depends(MetaService),
):
    """Cria uma nova meta."""
    return await service.add(meta.model_dump())


@router.get(
    "",
    response_model=Page[MetaRead],
    summary="Listar metas",
)
async def listar_metas(
    filtros: MetaFilter = Depends(),
    params: Params = Depends(),
    service: MetaService = Depends(MetaService),
):
    """Lista metas com filtros e paginação."""
    return await service.filter(filtros.to_dict())


@router.get(
    "/{meta_id}",
    response_model=MetaRead,
    summary="Obter meta por ID",
)
async def obter_meta(
    meta_id: str,
    service: MetaService = Depends(MetaService),
):
    """Obtém uma meta específica por ID."""
    return await service.get_by_id(meta_id)


@router.put(
    "/{meta_id}",
    response_model=MetaRead,
    summary="Atualizar meta",
)
async def atualizar_meta(
    meta_id: str,
    meta: MetaUpdate,
    service: MetaService = Depends(MetaService),
):
    """Atualiza uma meta existente."""
    return await service.edit(meta_id, meta.model_dump(exclude_unset=True))


@router.delete(
    "/{meta_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover meta",
)
async def remover_meta(
    meta_id: str,
    service: MetaService = Depends(MetaService),
):
    """Remove uma meta."""
    await service.remove(meta_id)
