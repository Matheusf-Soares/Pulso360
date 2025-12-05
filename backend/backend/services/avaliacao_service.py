from __future__ import annotations

from typing import Dict, Any, List
from statistics import mean
from datetime import datetime

from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.avaliacao_repository import AvaliacaoRepository
from backend.repositories.usuario_repository import UsuarioRepository
from backend.repositories.ciclo_avaliacao_repository import CicloAvaliacaoRepository
from backend.repositories.item_avaliacao_repository import ItemAvaliacaoRepository
from backend.models.avaliacao_model import Avaliacao
from core.errors import not_found, bad_request


class AvaliacaoService(BaseService):
    def __init__(
        self,
        avaliacao_repository: AvaliacaoRepository = Depends(AvaliacaoRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
        ciclo_repository: CicloAvaliacaoRepository = Depends(CicloAvaliacaoRepository),
        item_repository: ItemAvaliacaoRepository = Depends(ItemAvaliacaoRepository),
    ):
        self.avaliacao_repository = avaliacao_repository
        self.usuario_repository = usuario_repository
        self.ciclo_repository = ciclo_repository
        self.item_repository = item_repository

    async def add(self, data: Dict[str, Any]) -> Avaliacao:
        avaliado = await self.usuario_repository.obter_por_id(str(data["avaliado_id"]))
        if not avaliado:
            not_found("Usuário avaliado não encontrado")
        avaliador = await self.usuario_repository.obter_por_id(
            str(data["avaliador_id"])
        )
        if not avaliador:
            not_found("Usuário avaliador não encontrado")
        ciclo = await self.ciclo_repository.obter_por_id(str(data["ciclo_id"]))
        if not ciclo:
            not_found("Ciclo de avaliação não encontrado")
        avaliacao = Avaliacao(**data)
        await self.avaliacao_repository.adicionar(avaliacao)
        return avaliacao

    async def get_by_id(self, avaliacao_id: str) -> Avaliacao:
        avaliacao = await self.avaliacao_repository.obter_por_id(avaliacao_id)
        if not avaliacao:
            not_found("Avaliação não encontrada")
        return avaliacao

    async def filter(self, filtro: Dict[str, Any]) -> List[Avaliacao]:
        avaliacoes = await self.avaliacao_repository.filtrar(filtro)

        # Calcular progresso para cada avaliação
        for avaliacao in avaliacoes:
            if hasattr(avaliacao, "itens") and avaliacao.itens:
                total_itens = len(avaliacao.itens)
                itens_respondidos = sum(
                    1 for item in avaliacao.itens if item.nota is not None
                )
                avaliacao.progresso = round(
                    (itens_respondidos / total_itens * 100) if total_itens > 0 else 0, 2
                )
                avaliacao.total_itens = total_itens
                avaliacao.itens_respondidos = itens_respondidos
            else:
                avaliacao.progresso = 0
                avaliacao.total_itens = 0
                avaliacao.itens_respondidos = 0

        return avaliacoes

    async def edit(self, avaliacao_id: str, data: Dict[str, Any]) -> Avaliacao:
        avaliacao = await self.get_by_id(avaliacao_id)
        novo_status = data.get("status")
        if novo_status and novo_status not in {"rascunho", "em_andamento", "concluida"}:
            bad_request("Status de avaliação inválido")
        for attr, value in data.items():
            if value is not None:
                setattr(avaliacao, attr, value)
        await self.avaliacao_repository.editar(avaliacao)
        return avaliacao

    async def concluir(self, avaliacao_id: str) -> Avaliacao:
        avaliacao = await self.get_by_id(avaliacao_id)
        if avaliacao.status == "concluida":
            bad_request("Avaliação já concluída")
        # calcula nota_global se houver itens com nota
        await self.calcular_nota_global(avaliacao_id)
        avaliacao.status = "concluida"
        avaliacao.data_conclusao = datetime.utcnow()
        await self.avaliacao_repository.editar(avaliacao)
        return avaliacao

    async def calcular_nota_global(self, avaliacao_id: str) -> float:
        """Calcula a nota global da avaliação baseada nos itens."""
        itens = await self.item_repository.filtrar({"avaliacao_id": avaliacao_id})
        notas = [float(i.nota) for i in itens if i.nota is not None]
        if notas:
            nota_global = round(mean(notas), 2)
            avaliacao = await self.get_by_id(avaliacao_id)
            avaliacao.nota_global = nota_global
            await self.avaliacao_repository.editar(avaliacao)
            return nota_global
        return 0.0

    async def remove(self, avaliacao_id: str) -> None:
        avaliacao = await self.get_by_id(avaliacao_id)
        await self.avaliacao_repository.remover(avaliacao)
