from __future__ import annotations

from typing import Dict, Any, List

from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.item_avaliacao_repository import ItemAvaliacaoRepository
from backend.repositories.avaliacao_repository import AvaliacaoRepository
from backend.repositories.usuario_competencia_repository import (
    UsuarioCompetenciaRepository,
)
from backend.models.item_avaliacao_model import ItemAvaliacao
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
        self._avaliacao_service = None

    async def _get_avaliacao_service(self):
        """Lazy import to avoid circular dependency."""
        if self._avaliacao_service is None:
            from backend.services.avaliacao_service import AvaliacaoService

            self._avaliacao_service = AvaliacaoService(
                self.avaliacao_repository,
                None,  # usuario_repository
                None,  # ciclo_repository
                self.item_repository,
            )
        return self._avaliacao_service

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

        # Recalcula nota_global se nota foi fornecida
        if data.get("nota") is not None:
            avaliacao_service = await self._get_avaliacao_service()
            await avaliacao_service.calcular_nota_global(str(data["avaliacao_id"]))

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

        # Recalcula nota_global se nota foi modificada
        if "nota" in data:
            avaliacao_service = await self._get_avaliacao_service()
            await avaliacao_service.calcular_nota_global(str(item.avaliacao_id))

        return item

    async def remove(self, item_id: str) -> None:
        item = await self.get_by_id(item_id)
        avaliacao = await self.avaliacao_repository.obter_por_id(str(item.avaliacao_id))
        if avaliacao.status == "concluida":
            bad_request("Não é possível remover itens de avaliação concluída")
        await self.item_repository.remover(item)
