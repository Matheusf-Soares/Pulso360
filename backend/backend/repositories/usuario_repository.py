from __future__ import annotations

from typing import List, Optional, Dict, Any

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from models.usuario_model import Usuario
from core.dependencies import get_session


class UsuarioRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, usuario: Usuario) -> Usuario:
        await self.add(usuario)
        return usuario

    async def obter_por_id(self, usuario_id: str) -> Optional[Usuario]:
        return await self.get(model_type=Usuario, id=usuario_id)

    async def obter_por_email(self, email: str) -> Optional[Usuario]:
        usuarios = await self.get_by(
            model_type=Usuario, attr="email", value=email, one=True
        )
        return usuarios

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Usuario]:
        return await self.filter(filter_data=filtro, model_type=Usuario)

    async def editar(self, usuario: Usuario) -> Usuario:
        await self.edit(usuario)
        return usuario

    async def remover(self, usuario: Usuario) -> None:
        await self.remove(usuario)
