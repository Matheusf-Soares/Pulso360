from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from services.base.base_service import BaseService
from repositories.papel_repository import PapelRepository
from models.papel_model import Papel
from core.errors import not_found


class PapelService(BaseService):
    def __init__(self, papel_repository: PapelRepository = Depends(PapelRepository)):
        self.papel_repository = papel_repository

    async def add(self, data: Dict[str, Any]) -> Papel:
        # Poderia validar unicidade manual, mas está via constraint unique.
        papel = Papel(**data)
        await self.papel_repository.adicionar(papel)
        return papel

    async def get_by_id(self, papel_id: str) -> Papel:
        papel = await self.papel_repository.obter_por_id(papel_id)
        if not papel:
            not_found("Papel não encontrado")
        return papel

    async def filter(self, filtro: Dict[str, Any]) -> List[Papel]:
        return await self.papel_repository.filtrar(filtro)

    async def edit(self, papel_id: str, data: Dict[str, Any]) -> Papel:
        papel = await self.get_by_id(papel_id)
        for attr, value in data.items():
            if value is not None:
                setattr(papel, attr, value)
        await self.papel_repository.editar(papel)
        return papel

    async def remove(self, papel_id: str) -> None:
        papel = await self.get_by_id(papel_id)
        await self.papel_repository.remover(papel)
