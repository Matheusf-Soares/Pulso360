from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from backend.models.meta_model import Meta


class MetaRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, meta: Meta) -> Meta:
        await self.add(meta)
        return meta

    async def obter_por_id(self, meta_id: str) -> Optional[Meta]:
        return await self.get(model_type=Meta, id=meta_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Meta]:
        return await self.filter(filter_data=filtro, model_type=Meta)

    async def editar(self, meta: Meta) -> Meta:
        await self.edit(meta)
        return meta

    async def remover(self, meta: Meta) -> None:
        await self.remove(meta)
