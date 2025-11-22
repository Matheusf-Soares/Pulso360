from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from services.base.base_service import BaseService
from repositories.item_avaliacao_repository import ItemAvaliacaoRepository
from repositories.avaliacao_repository import AvaliacaoRepository
from repositories.usuario_competencia_repository import UsuarioCompetenciaRepository
from models.item_avaliacao_model import ItemAvaliacao
from core.errors import not_found, bad_request


class ItemAvaliacaoService(BaseService):
    def __init__(
        self,
        item_repository: ItemAvaliacaoRepository = Depends(ItemAvaliacaoRepository),
        avaliacao_repository: AvaliacaoRepository = Depends(AvaliacaoRepository),
        competencia_repository: UsuarioCompetenciaRepository = Depends(
            UsuarioCompetenciaRepository
        ),
    ):
        self.item_repository = item_repository
        self.avaliacao_repository = avaliacao_repository
        self.competencia_repository = competencia_repository

    async def add(self, data: Dict[str, Any]) -> ItemAvaliacao:
        avaliacao = await self.avaliacao_repository.obter_por_id(
            str(data["avaliacao_id"])
        )
        if not avaliacao:
            not_found("Avaliação não encontrada")
        if avaliacao.status == "concluida":
            bad_request("Não é possível adicionar itens a avaliação concluída")
        competencia = await self.competencia_repository.obter_por_id(
            str(data["competencia_id"])
        )
        if not competencia:
            not_found("Competência não encontrada")
        if competencia.usuario_id != avaliacao.avaliado_id:
            bad_request("Competência não pertence ao usuário avaliado")
        item = ItemAvaliacao(**data)
        await self.item_repository.adicionar(item)
        return item

    async def get_by_id(self, item_id: str) -> ItemAvaliacao:
        item = await self.item_repository.obter_por_id(item_id)
        if not item:
            not_found("Item de avaliação não encontrado")
        return item

    async def filter(self, filtro: Dict[str, Any]) -> List[ItemAvaliacao]:
        return await self.item_repository.filtrar(filtro)

    async def edit(self, item_id: str, data: Dict[str, Any]) -> ItemAvaliacao:
        item = await self.get_by_id(item_id)
        avaliacao = await self.avaliacao_repository.obter_por_id(str(item.avaliacao_id))
        if avaliacao.status == "concluida":
            bad_request("Não é possível editar itens de avaliação concluída")
        for attr, value in data.items():
            if value is not None:
                setattr(item, attr, value)
        await self.item_repository.editar(item)
        return item

    async def remove(self, item_id: str) -> None:
        item = await self.get_by_id(item_id)
        avaliacao = await self.avaliacao_repository.obter_por_id(str(item.avaliacao_id))
        if avaliacao.status == "concluida":
            bad_request("Não é possível remover itens de avaliação concluída")
        await self.item_repository.remover(item)
