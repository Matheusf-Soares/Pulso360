from __future__ import annotations

from typing import Optional, Dict, Any, List

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.papel_model import Papel


class PapelRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, papel: Papel) -> Papel:
        await self.add(papel)
        return papel

    async def obter_por_id(self, papel_id: str) -> Optional[Papel]:
        return await self.get(model_type=Papel, id=papel_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Papel]:
        return await self.filter(filter_data=filtro, model_type=Papel)

    async def editar(self, papel: Papel) -> Papel:
        await self.edit(papel)
        return papel

    async def remover(self, papel: Papel) -> None:
        await self.remove(papel)
