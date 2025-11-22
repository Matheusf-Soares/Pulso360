from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.equipe_model import Equipe


class EquipeRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, equipe: Equipe) -> Equipe:
        await self.add(equipe)
        return equipe

    async def obter_por_id(self, equipe_id: str) -> Optional[Equipe]:
        return await self.get(model_type=Equipe, id=equipe_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Equipe]:
        return await self.filter(filter_data=filtro, model_type=Equipe)

    async def editar(self, equipe: Equipe) -> Equipe:
        await self.edit(equipe)
        return equipe

    async def remover(self, equipe: Equipe) -> None:
        await self.remove(equipe)
