from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from services.base.base_service import BaseService
from repositories.equipe_repository import EquipeRepository
from repositories.usuario_repository import UsuarioRepository
from models.equipe_model import Equipe
from core.errors import not_found


class EquipeService(BaseService):
    def __init__(
        self,
        equipe_repository: EquipeRepository = Depends(EquipeRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
    ):
        self.equipe_repository = equipe_repository
        self.usuario_repository = usuario_repository

    async def add(self, data: Dict[str, Any]) -> Equipe:
        lider_id = data.get("lider_id")
        if lider_id:
            leader = await self.usuario_repository.obter_por_id(str(lider_id))
            if not leader:
                not_found("Líder não encontrado")
        equipe = Equipe(**data)
        await self.equipe_repository.adicionar(equipe)
        return equipe

    async def get_by_id(self, equipe_id: str) -> Equipe:
        equipe = await self.equipe_repository.obter_por_id(equipe_id)
        if not equipe:
            not_found("Equipe não encontrada")
        return equipe

    async def filter(self, filtro: Dict[str, Any]) -> List[Equipe]:
        return await self.equipe_repository.filtrar(filtro)

    async def edit(self, equipe_id: str, data: Dict[str, Any]) -> Equipe:
        equipe = await self.get_by_id(equipe_id)
        lider_id = data.get("lider_id")
        if lider_id:
            leader = await self.usuario_repository.obter_por_id(str(lider_id))
            if not leader:
                not_found("Líder não encontrado")
        for attr, value in data.items():
            if value is not None:
                setattr(equipe, attr, value)
        await self.equipe_repository.editar(equipe)
        return equipe

    async def remove(self, equipe_id: str) -> None:
        equipe = await self.get_by_id(equipe_id)
        await self.equipe_repository.remover(equipe)
