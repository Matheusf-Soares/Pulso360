from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.item_avaliacao_model import ItemAvaliacao


class ItemAvaliacaoRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, item: ItemAvaliacao) -> ItemAvaliacao:
        await self.add(item)
        return item

    async def obter_por_id(self, item_id: str) -> Optional[ItemAvaliacao]:
        return await self.get(model_type=ItemAvaliacao, id=item_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[ItemAvaliacao]:
        return await self.filter(filter_data=filtro, model_type=ItemAvaliacao)

    async def editar(self, item: ItemAvaliacao) -> ItemAvaliacao:
        await self.edit(item)
        return item

    async def remover(self, item: ItemAvaliacao) -> None:
        await self.remove(item)
