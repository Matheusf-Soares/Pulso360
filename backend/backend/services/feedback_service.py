from __future__ import annotations

from typing import Dict, Any, List
from fastapi import Depends

from backend.services.base.base_service import BaseService
from backend.repositories.feedback_repository import FeedbackRepository
from backend.repositories.avaliacao_repository import AvaliacaoRepository
from backend.repositories.usuario_repository import UsuarioRepository
from backend.models.feedback_model import Feedback
from core.errors import not_found, bad_request


class FeedbackService(BaseService):
    def __init__(
        self,
        feedback_repository: FeedbackRepository = Depends(FeedbackRepository),
        avaliacao_repository: AvaliacaoRepository = Depends(AvaliacaoRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
    ):
        self.feedback_repository = feedback_repository
        self.avaliacao_repository = avaliacao_repository
        self.usuario_repository = usuario_repository

    async def add(self, data: Dict[str, Any]) -> Feedback:
        """Cria feedback validando IDs conforme schema (de_usuario_id, para_usuario_id)."""
        if data.get("avaliacao_id"):
            avaliacao = await self.avaliacao_repository.obter_por_id(
                str(data["avaliacao_id"])
            )
            if not avaliacao:
                not_found("Avaliação associada não encontrada")
        # de_usuario_id (autor) e para_usuario_id (destinatário) obrigatórios
        if not data.get("de_usuario_id") or not data.get("para_usuario_id"):
            bad_request("de_usuario_id e para_usuario_id são obrigatórios")
        autor = await self.usuario_repository.obter_por_id(str(data["de_usuario_id"]))
        if not autor:
            not_found("Autor do feedback não encontrado")
        destinatario = await self.usuario_repository.obter_por_id(
            str(data["para_usuario_id"])
        )
        if not destinatario:
            not_found("Usuário destinatário não encontrado")
        feedback = Feedback(**data)
        await self.feedback_repository.adicionar(feedback)
        return feedback

    async def get_by_id(self, feedback_id: str) -> Feedback:
        fb = await self.feedback_repository.obter_por_id(feedback_id)
        if not fb:
            not_found("Feedback não encontrado")
        return fb

    async def filter(self, filtro: Dict[str, Any]) -> List[Feedback]:
        return await self.feedback_repository.filtrar(filtro)

    async def edit(self, feedback_id: str, data: Dict[str, Any]) -> Feedback:
        fb = await self.get_by_id(feedback_id)
        for attr, value in data.items():
            if value is not None:
                setattr(fb, attr, value)
        await self.feedback_repository.editar(fb)
        return fb

    async def remove(self, feedback_id: str) -> None:
        fb = await self.get_by_id(feedback_id)
        await self.feedback_repository.remover(fb)
