from __future__ import annotations

from typing import Optional, Dict, Any, List

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.usuario_papel_model import UsuarioPapel


class UsuarioPapelRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, item: UsuarioPapel) -> UsuarioPapel:
        await self.add(item)
        return item

    async def obter(self, usuario_id: str, papel_id: str) -> Optional[UsuarioPapel]:
        query = select(UsuarioPapel).filter(
            UsuarioPapel.usuario_id == usuario_id, UsuarioPapel.papel_id == papel_id
        )
        result = await self.db.execute(query)
        return result.scalars().first()

    async def editar(self, item: UsuarioPapel) -> UsuarioPapel:
        await self.edit(item)
        return item

    async def filtrar(self, filtro: Dict[str, Any]) -> List[UsuarioPapel]:
        return await self.filter(filter_data=filtro, model_type=UsuarioPapel)

    async def remover(self, item: UsuarioPapel) -> None:
        await self.remove(item)
