"""Endpoints para gerenciamento de itens de avaliação."""

from typing import List
from fastapi import APIRouter, Depends, status
from fastapi_pagination import Page, Params

from backend.schemas.item_avaliacao import (
    ItemAvaliacaoCreate,
    ItemAvaliacaoUpdate,
    ItemAvaliacaoRead,
)
from backend.services.item_avaliacao_service import ItemAvaliacaoService
from backend.filters.item_avaliacao_filter import ItemAvaliacaoFilter

router = APIRouter(prefix="/itens-avaliacao", tags=["Itens de Avaliação"])


@router.post(
    "",
    response_model=ItemAvaliacaoRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar item de avaliação",
)
async def criar_item(
    item: ItemAvaliacaoCreate,
    service: ItemAvaliacaoService = Depends(ItemAvaliacaoService),
):
    """Cria um novo item de avaliação."""
    return await service.add(item.model_dump())


@router.get(
    "",
    response_model=Page[ItemAvaliacaoRead],
    summary="Listar itens de avaliação",
)
async def listar_itens(
    filtros: ItemAvaliacaoFilter = Depends(),
    params: Params = Depends(),
    service: ItemAvaliacaoService = Depends(ItemAvaliacaoService),
):
    """Lista itens de avaliação com filtros e paginação."""
    return await service.filter(filtros.to_dict())


@router.get(
    "/avaliacao/{avaliacao_id}",
    response_model=List[ItemAvaliacaoRead],
    summary="Listar itens por avaliação",
)
async def listar_itens_por_avaliacao(
    avaliacao_id: str,
    service: ItemAvaliacaoService = Depends(ItemAvaliacaoService),
):
    """Lista todos os itens de uma avaliação específica."""
    return await service.filter({"avaliacao_id": avaliacao_id})


@router.get(
    "/{item_id}",
    response_model=ItemAvaliacaoRead,
    summary="Obter item por ID",
)
async def obter_item(
    item_id: str,
    service: ItemAvaliacaoService = Depends(ItemAvaliacaoService),
):
    """Obtém um item de avaliação específico por ID."""
    return await service.get_by_id(item_id)


@router.put(
    "/{item_id}",
    response_model=ItemAvaliacaoRead,
    summary="Atualizar item de avaliação",
)
async def atualizar_item(
    item_id: str,
    item: ItemAvaliacaoUpdate,
    service: ItemAvaliacaoService = Depends(ItemAvaliacaoService),
):
    """Atualiza um item de avaliação existente."""
    return await service.edit(item_id, item.model_dump(exclude_unset=True))


@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover item de avaliação",
)
async def remover_item(
    item_id: str,
    service: ItemAvaliacaoService = Depends(ItemAvaliacaoService),
):
    """Remove um item de avaliação."""
    await service.remove(item_id)
