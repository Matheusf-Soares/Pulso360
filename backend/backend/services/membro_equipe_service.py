from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.membro_equipe_repository import MembroEquipeRepository
from backend.repositories.equipe_repository import EquipeRepository
from backend.repositories.usuario_repository import UsuarioRepository
from backend.models.equipe_model import MembroEquipe
from core.errors import not_found, bad_request


class MembroEquipeService(BaseService):
    def __init__(
        self,
        membro_repository: MembroEquipeRepository = Depends(MembroEquipeRepository),
        equipe_repository: EquipeRepository = Depends(EquipeRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
    ):
        self.membro_repository = membro_repository
        self.equipe_repository = equipe_repository
        self.usuario_repository = usuario_repository

    async def add(self, data: Dict[str, Any]) -> MembroEquipe:
        equipe_id = str(data["equipe_id"])
        usuario_id = str(data["usuario_id"])
        equipe = await self.equipe_repository.obter_por_id(equipe_id)
        if not equipe:
            not_found("Equipe não encontrada")
        usuario = await self.usuario_repository.obter_por_id(usuario_id)
        if not usuario:
            not_found("Usuário não encontrado")
        existente = await self.membro_repository.obter(equipe_id, usuario_id)
        if existente:
            bad_request("Usuário já é membro desta equipe")
        membro = MembroEquipe(**data)
        await self.membro_repository.adicionar(membro)
        return membro

    async def get_by_id(self, equipe_id: str, usuario_id: str) -> MembroEquipe:
        membro = await self.membro_repository.obter(equipe_id, usuario_id)
        if not membro:
            not_found("Membro não encontrado")
        return membro

    async def filter(self, filtro: Dict[str, Any]) -> List[MembroEquipe]:
        return await self.membro_repository.filtrar(filtro)

    async def edit(
        self, equipe_id: str, usuario_id: str, data: Dict[str, Any]
    ) -> MembroEquipe:
        membro = await self.get_by_id(equipe_id, usuario_id)
        for attr, value in data.items():
            if value is not None:
                setattr(membro, attr, value)
        await self.membro_repository.editar(membro)
        return membro

    async def remove(self, equipe_id: str, usuario_id: str) -> None:
        membro = await self.get_by_id(equipe_id, usuario_id)
        await self.membro_repository.remover(membro)
