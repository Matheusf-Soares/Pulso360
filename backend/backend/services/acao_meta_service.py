from __future__ import annotations

from typing import Dict, Any, List
from fastapi import Depends

from services.base.base_service import BaseService
from repositories.acao_meta_repository import AcaoMetaRepository
from repositories.meta_repository import MetaRepository
from models.acao_meta_model import AcaoMeta
from core.errors import not_found, bad_request


class AcaoMetaService(BaseService):
    def __init__(
        self,
        acao_repository: AcaoMetaRepository = Depends(AcaoMetaRepository),
        meta_repository: MetaRepository = Depends(MetaRepository),
    ):
        self.acao_repository = acao_repository
        self.meta_repository = meta_repository

    async def add(self, data: Dict[str, Any]) -> AcaoMeta:
        if not data.get("meta_id"):
            bad_request("meta_id é obrigatório")
        meta = await self.meta_repository.obter_por_id(str(data["meta_id"]))
        if not meta:
            not_found("Meta associada não encontrada")
        acao = AcaoMeta(**data)
        await self.acao_repository.adicionar(acao)
        return acao

    async def get_by_id(self, acao_id: str) -> AcaoMeta:
        acao = await self.acao_repository.obter_por_id(acao_id)
        if not acao:
            not_found("Ação de meta não encontrada")
        return acao

    async def filter(self, filtro: Dict[str, Any]) -> List[AcaoMeta]:
        return await self.acao_repository.filtrar(filtro)

    async def edit(self, acao_id: str, data: Dict[str, Any]) -> AcaoMeta:
        acao = await self.get_by_id(acao_id)
        for attr, value in data.items():
            if value is not None:
                setattr(acao, attr, value)
        await self.acao_repository.editar(acao)
        return acao

    async def remove(self, acao_id: str) -> None:
        acao = await self.get_by_id(acao_id)
        await self.acao_repository.remover(acao)
