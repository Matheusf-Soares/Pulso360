from __future__ import annotations

from typing import List, Dict, Any

from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.usuario_repository import UsuarioRepository
from backend.models.usuario_model import Usuario
from core.security import generate_hash_password
from core.errors import not_found


class UsuarioService(BaseService):
    def __init__(self, repository: UsuarioRepository = Depends(UsuarioRepository)):
        self.repository = repository

    async def add(self, data: Dict[str, Any]) -> Usuario:
        # validação mínima será feita nos schemas; aqui tratamos hash da senha
        senha_plana = data.pop("senha")
        usuario = Usuario(senha_hash=generate_hash_password(senha_plana), **data)
        await self.repository.adicionar(usuario)
        return usuario

    async def get_by_id(self, usuario_id: str) -> Usuario:
        usuario = await self.repository.obter_por_id(usuario_id)
        if not usuario:
            not_found("Usuário não encontrado")
        return usuario

    async def filter(self, filtro: Dict[str, Any]) -> List[Usuario]:
        return await self.repository.filtrar(filtro)

    async def edit(self, usuario_id: str, data: Dict[str, Any]) -> Usuario:
        usuario = await self.get_by_id(usuario_id)
        if "senha" in data and data["senha"]:
            usuario.senha_hash = generate_hash_password(data.pop("senha"))
        for attr, value in data.items():
            if value is not None:
                setattr(usuario, attr, value)
        await self.repository.editar(usuario)
        return usuario

    async def remove(self, usuario_id: str) -> None:
        usuario = await self.get_by_id(usuario_id)
        await self.repository.remover(usuario)
