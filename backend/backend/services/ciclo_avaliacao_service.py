from __future__ import annotations

from typing import Dict, Any, List
from datetime import date

from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.ciclo_avaliacao_repository import CicloAvaliacaoRepository
from backend.models.ciclo_avaliacao_model import CicloAvaliacao
from core.errors import bad_request, not_found


class CicloAvaliacaoService(BaseService):
    def __init__(
        self, repository: CicloAvaliacaoRepository = Depends(CicloAvaliacaoRepository)
    ):
        self.repository = repository

    async def add(self, data: Dict[str, Any]) -> CicloAvaliacao:
        inicio: date = data["periodo_inicio"]
        fim: date = data["periodo_fim"]
        if fim < inicio:
            bad_request("periodo_fim não pode ser menor que periodo_inicio")
        if await self.repository.existe_nome_periodo(data["nome"], inicio, fim):
            bad_request("Já existe ciclo com mesmo nome que se sobrepõe ao período")
        ciclo = CicloAvaliacao(**data)
        await self.repository.adicionar(ciclo)
        return ciclo

    async def get_by_id(self, ciclo_id: str) -> CicloAvaliacao:
        ciclo = await self.repository.obter_por_id(ciclo_id)
        if not ciclo:
            not_found("Ciclo de avaliação não encontrado")
        return ciclo

    async def filter(self, filtro: Dict[str, Any]) -> List[CicloAvaliacao]:
        return await self.repository.filtrar(filtro)

    async def edit(self, ciclo_id: str, data: Dict[str, Any]) -> CicloAvaliacao:
        ciclo = await self.get_by_id(ciclo_id)
        inicio = data.get("periodo_inicio", ciclo.periodo_inicio)
        fim = data.get("periodo_fim", ciclo.periodo_fim)
        if fim < inicio:
            bad_request("periodo_fim não pode ser menor que periodo_inicio")
        novo_nome = data.get("nome", ciclo.nome)
        if (
            novo_nome != ciclo.nome
            or inicio != ciclo.periodo_inicio
            or fim != ciclo.periodo_fim
        ) and await self.repository.existe_nome_periodo(novo_nome, inicio, fim):
            bad_request("Já existe ciclo com mesmo nome que se sobrepõe ao período")
        for attr, value in data.items():
            if value is not None:
                setattr(ciclo, attr, value)
        await self.repository.editar(ciclo)
        return ciclo

    async def remove(self, ciclo_id: str) -> None:
        ciclo = await self.get_by_id(ciclo_id)
        await self.repository.remover(ciclo)
