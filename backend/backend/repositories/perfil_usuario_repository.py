from __future__ import annotations

from typing import Optional, List, Dict, Any

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from backend.models.perfil_usuario_model import PerfilUsuario


class PerfilUsuarioRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, perfil: PerfilUsuario) -> PerfilUsuario:
        await self.add(perfil)
        return perfil

    async def obter_por_usuario(self, usuario_id: str) -> Optional[PerfilUsuario]:
        return await self.get(model_type=PerfilUsuario, id=usuario_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[PerfilUsuario]:
        return await self.filter(filter_data=filtro, model_type=PerfilUsuario)

    async def editar(self, perfil: PerfilUsuario) -> PerfilUsuario:
        await self.edit(perfil)
        return perfil

    async def remover(self, perfil: PerfilUsuario) -> None:
        await self.remove(perfil)
