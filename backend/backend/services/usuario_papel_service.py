from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from services.base.base_service import BaseService
from repositories.usuario_papel_repository import UsuarioPapelRepository
from repositories.usuario_repository import UsuarioRepository
from repositories.papel_repository import PapelRepository
from models.usuario_papel_model import UsuarioPapel
from core.errors import not_found, bad_request


class UsuarioPapelService(BaseService):
    def __init__(
        self,
        usuario_papel_repository: UsuarioPapelRepository = Depends(
            UsuarioPapelRepository
        ),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
        papel_repository: PapelRepository = Depends(PapelRepository),
    ):
        self.usuario_papel_repository = usuario_papel_repository
        self.usuario_repository = usuario_repository
        self.papel_repository = papel_repository

    async def add(self, data: Dict[str, Any]) -> UsuarioPapel:
        usuario_id = str(data["usuario_id"])
        papel_id = str(data["papel_id"])
        usuario = await self.usuario_repository.obter_por_id(usuario_id)
        if not usuario:
            not_found("Usuário não encontrado")
        papel = await self.papel_repository.obter_por_id(papel_id)
        if not papel:
            not_found("Papel não encontrado")
        existente = await self.usuario_papel_repository.obter(usuario_id, papel_id)
        if existente:
            bad_request("Papel já atribuído ao usuário")
        item = UsuarioPapel(**data)
        await self.usuario_papel_repository.adicionar(item)
        return item

    async def get_by_id(self, usuario_id: str, papel_id: str) -> UsuarioPapel:
        item = await self.usuario_papel_repository.obter(usuario_id, papel_id)
        if not item:
            not_found("Associação não encontrada")
        return item

    async def filter(self, filtro: Dict[str, Any]) -> List[UsuarioPapel]:
        return await self.usuario_papel_repository.filtrar(filtro)

    async def remove(self, usuario_id: str, papel_id: str) -> None:
        item = await self.get_by_id(usuario_id, papel_id)
        await self.usuario_papel_repository.remover(item)

    async def edit(self, usuario_id: str, papel_id: str, data: Dict[str, Any]) -> UsuarioPapel:
        """Atualiza associação usuário-papel. Permite trocar o papel.

        Se "papel_id" estiver em data e for diferente, valida existência e atualiza.
        Outros campos são ignorados pois a associação só contém chaves.
        """
        item = await self.get_by_id(usuario_id, papel_id)
        new_papel_id = data.get("papel_id")
        if new_papel_id and str(new_papel_id) != str(papel_id):
            papel = await self.papel_repository.obter_por_id(str(new_papel_id))
            if not papel:
                not_found("Novo papel não encontrado")
            item.papel_id = str(new_papel_id)
            await self.usuario_papel_repository.adicionar(item)  # reusa adicionar para persistir mudança
        return item
