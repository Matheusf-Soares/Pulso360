from __future__ import annotations

from typing import Dict, Any, List
from fastapi import Depends

from services.base.base_service import BaseService
from repositories.meta_repository import MetaRepository
from repositories.pdi_repository import PDIRepository
from repositories.usuario_repository import UsuarioRepository
from repositories.ciclo_avaliacao_repository import CicloAvaliacaoRepository
from models.meta_model import Meta
from core.errors import not_found, bad_request


class MetaService(BaseService):
    def __init__(
        self,
        meta_repository: MetaRepository = Depends(MetaRepository),
        pdi_repository: PDIRepository = Depends(PDIRepository),
        usuario_repository: UsuarioRepository = Depends(UsuarioRepository),
        ciclo_repository: CicloAvaliacaoRepository = Depends(CicloAvaliacaoRepository),
    ):
        self.meta_repository = meta_repository
        self.pdi_repository = pdi_repository
        self.usuario_repository = usuario_repository
        self.ciclo_repository = ciclo_repository

    async def add(self, data: Dict[str, Any]) -> Meta:
        # garantir contexto válido (ao menos um dos ids)
        if (
            not data.get("pdi_id")
            and not data.get("usuario_id")
            and not data.get("ciclo_id")
        ):
            bad_request("Necessário fornecer pdi_id ou usuario_id ou ciclo_id")
        if data.get("pdi_id"):
            pdi = await self.pdi_repository.obter_por_id(str(data["pdi_id"]))
            if not pdi:
                not_found("PDI associado não encontrado")
        if data.get("usuario_id"):
            usuario = await self.usuario_repository.obter_por_id(
                str(data["usuario_id"])
            )
            if not usuario:
                not_found("Usuário associado não encontrado")
        if data.get("ciclo_id"):
            ciclo = await self.ciclo_repository.obter_por_id(str(data["ciclo_id"]))
            if not ciclo:
                not_found("Ciclo associado não encontrado")
        meta = Meta(**data)
        self._recalcular_progresso(meta)
        await self.meta_repository.adicionar(meta)
        return meta

    async def get_by_id(self, meta_id: str) -> Meta:
        meta = await self.meta_repository.obter_por_id(meta_id)
        if not meta:
            not_found("Meta não encontrada")
        return meta

    async def filter(self, filtro: Dict[str, Any]) -> List[Meta]:
        return await self.meta_repository.filtrar(filtro)

    async def edit(self, meta_id: str, data: Dict[str, Any]) -> Meta:
        meta = await self.get_by_id(meta_id)
        for attr, value in data.items():
            if value is not None:
                setattr(meta, attr, value)
        self._recalcular_progresso(meta)
        await self.meta_repository.editar(meta)
        return meta

    async def atualizar_progresso(
        self,
        meta_id: str,
        valor_atual_num: float | None = None,
        valor_atual_texto: str | None = None,
    ) -> Meta:
        meta = await self.get_by_id(meta_id)
        if valor_atual_num is not None:
            meta.valor_atual_num = valor_atual_num
        if valor_atual_texto is not None:
            meta.valor_atual_texto = valor_atual_texto
        self._recalcular_progresso(meta)
        await self.meta_repository.editar(meta)
        return meta

    async def remove(self, meta_id: str) -> None:
        meta = await self.get_by_id(meta_id)
        await self.meta_repository.remover(meta)

    def _recalcular_progresso(self, meta: Meta) -> None:
        if meta.valor_alvo_num and meta.valor_atual_num is not None:
            if meta.valor_alvo_num == 0:
                meta.progresso_percentual = 0
            else:
                pct = (meta.valor_atual_num / meta.valor_alvo_num) * 100
                meta.progresso_percentual = round(float(pct), 2)
        # caso num não disponível manter existente ou deixar None
