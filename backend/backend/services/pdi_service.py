from __future__ import annotations

from typing import Dict, Any, List
from datetime import datetime

from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.pdi_repository import PDIRepository
from backend.repositories.usuario_repository import UsuarioRepository
from backend.repositories.ciclo_avaliacao_repository import CicloAvaliacaoRepository
from backend.models.pdi_model import PDI
from core.errors import not_found, bad_request


class PDIService(BaseService):
    def __init__(
        self,
        pdi_repository: PDIRepository = Depends(PDIRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
        ciclo_repository: CicloAvaliacaoRepository = Depends(CicloAvaliacaoRepository),
    ):
        self.pdi_repository = pdi_repository
        self.usuario_repository = usuario_repository
        self.ciclo_repository = ciclo_repository

    async def add(self, data: Dict[str, Any]) -> PDI:
        usuario = await self.usuario_repository.obter_por_id(str(data["usuario_id"]))
        if not usuario:
            not_found("Usuário não encontrado para PDI")
        ciclo = await self.ciclo_repository.obter_por_id(str(data["ciclo_id"]))
        if not ciclo:
            not_found("Ciclo não encontrado para PDI")
        # impedir duplicado ativo
        existentes = await self.pdi_repository.filtrar(
            {
                "usuario_id": str(data["usuario_id"]),
                "ciclo_id": str(data["ciclo_id"]),
                "status": "ativo",
            }
        )
        if existentes:
            bad_request("Já existe PDI ativo para usuário neste ciclo")
        pdi = PDI(**data)
        await self.pdi_repository.adicionar(pdi)
        return pdi

    async def get_by_id(self, pdi_id: str) -> PDI:
        pdi = await self.pdi_repository.obter_por_id(pdi_id)
        if not pdi:
            not_found("PDI não encontrado")
        return pdi

    async def filter(self, filtro: Dict[str, Any]) -> List[PDI]:
        return await self.pdi_repository.filtrar(filtro)

    async def edit(self, pdi_id: str, data: Dict[str, Any]) -> PDI:
        pdi = await self.get_by_id(pdi_id)
        for attr, value in data.items():
            if value is not None:
                setattr(pdi, attr, value)
        pdi.data_atualizacao = datetime.utcnow()
        await self.pdi_repository.editar(pdi)
        return pdi

    async def remove(self, pdi_id: str) -> None:
        pdi = await self.get_by_id(pdi_id)
        await self.pdi_repository.remover(pdi)
