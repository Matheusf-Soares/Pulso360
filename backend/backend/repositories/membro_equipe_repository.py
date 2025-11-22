from __future__ import annotations

from typing import Optional, Dict, Any, List

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.equipe_model import MembroEquipe


class MembroEquipeRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, membro: MembroEquipe) -> MembroEquipe:
        await self.add(membro)
        return membro

    async def obter(self, equipe_id: str, usuario_id: str) -> Optional[MembroEquipe]:
        query = select(MembroEquipe).filter(
            MembroEquipe.equipe_id == equipe_id,
            MembroEquipe.usuario_id == usuario_id,
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def filtrar(self, filtro: Dict[str, Any]) -> List[MembroEquipe]:
        return await self.filter(filter_data=filtro, model_type=MembroEquipe)

    async def editar(self, membro: MembroEquipe) -> MembroEquipe:
        await self.edit(membro)
        return membro

    async def remover(self, membro: MembroEquipe) -> None:
        await self.remove(membro)
