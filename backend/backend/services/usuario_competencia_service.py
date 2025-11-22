from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from services.base.base_service import BaseService
from repositories.usuario_competencia_repository import UsuarioCompetenciaRepository
from repositories.usuario_repository import UsuarioRepository
from models.usuario_competencia_model import UsuarioCompetencia
from core.errors import not_found


class UsuarioCompetenciaService(BaseService):
    def __init__(
        self,
        competencia_repository: UsuarioCompetenciaRepository = Depends(
            UsuarioCompetenciaRepository
        ),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
    ):
        self.competencia_repository = competencia_repository
        self.usuario_repository = usuario_repository

    async def add(self, data: Dict[str, Any]) -> UsuarioCompetencia:
        usuario_id = str(data["usuario_id"])
        usuario = await self.usuario_repository.obter_por_id(usuario_id)
        if not usuario:
            not_found("Usuário não encontrado")
        item = UsuarioCompetencia(**data)
        await self.competencia_repository.adicionar(item)
        return item

    async def get_by_id(self, competencia_id: str) -> UsuarioCompetencia:
        item = await self.competencia_repository.obter_por_id(competencia_id)
        if not item:
            not_found("Competência não encontrada")
        return item

    async def filter(self, filtro: Dict[str, Any]) -> List[UsuarioCompetencia]:
        return await self.competencia_repository.filtrar(filtro)

    async def edit(
        self, competencia_id: str, data: Dict[str, Any]
    ) -> UsuarioCompetencia:
        item = await self.get_by_id(competencia_id)
        for attr, value in data.items():
            if value is not None:
                setattr(item, attr, value)
        await self.competencia_repository.editar(item)
        return item

    async def remove(self, competencia_id: str) -> None:
        item = await self.get_by_id(competencia_id)
        await self.competencia_repository.remover(item)
