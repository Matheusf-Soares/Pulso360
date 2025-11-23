from __future__ import annotations

from typing import Optional, Dict, Any, List

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.usuario_competencia_model import UsuarioCompetencia


class UsuarioCompetenciaRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, item: UsuarioCompetencia) -> UsuarioCompetencia:
        await self.add(item)
        return item

    async def obter_por_id(self, competencia_id: str) -> Optional[UsuarioCompetencia]:
        return await self.get(model_type=UsuarioCompetencia, id=competencia_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[UsuarioCompetencia]:
        return await self.filter(filter_data=filtro, model_type=UsuarioCompetencia)

    async def editar(self, item: UsuarioCompetencia) -> UsuarioCompetencia:
        await self.edit(item)
        return item

    async def remover(self, item: UsuarioCompetencia) -> None:
        await self.remove(item)
