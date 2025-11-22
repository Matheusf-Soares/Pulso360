from __future__ import annotations

from typing import Dict, Any

from fastapi import Depends

from services.base.base_service import BaseService
from repositories.perfil_usuario_repository import PerfilUsuarioRepository
from repositories.usuario_repository import UsuarioRepository
from models.perfil_usuario_model import PerfilUsuario
from core.errors import not_found, bad_request


class PerfilUsuarioService(BaseService):
    def __init__(
        self,
        perfil_repository: PerfilUsuarioRepository = Depends(PerfilUsuarioRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
    ):
        self.perfil_repository = perfil_repository
        self.usuario_repository = usuario_repository

    async def add(self, data: Dict[str, Any]) -> PerfilUsuario:
        usuario_id = str(data["usuario_id"])
        usuario = await self.usuario_repository.obter_por_id(usuario_id)
        if not usuario:
            not_found("Usuário não encontrado para criar perfil")
        existente = await self.perfil_repository.obter_por_usuario(usuario_id)
        if existente:
            bad_request("Perfil já existe para este usuário")
        perfil = PerfilUsuario(**data)
        await self.perfil_repository.adicionar(perfil)
        return perfil

    async def get_by_id(self, usuario_id: str) -> PerfilUsuario:
        perfil = await self.perfil_repository.obter_por_usuario(usuario_id)
        if not perfil:
            not_found("Perfil não encontrado")
        return perfil

    async def filter(self, filtro: Dict[str, Any]):  # retorna lista
        return await self.perfil_repository.filtrar(filtro)

    async def edit(self, usuario_id: str, data: Dict[str, Any]) -> PerfilUsuario:
        perfil = await self.get_by_id(usuario_id)
        for attr, value in data.items():
            if value is not None:
                setattr(perfil, attr, value)
        await self.perfil_repository.editar(perfil)
        return perfil

    async def remove(self, usuario_id: str) -> None:
        perfil = await self.get_by_id(usuario_id)
        await self.perfil_repository.remover(perfil)
