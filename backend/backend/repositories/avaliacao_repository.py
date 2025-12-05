from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select

from backend.repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from backend.models.avaliacao_model import Avaliacao


class AvaliacaoRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, avaliacao: Avaliacao) -> Avaliacao:
        await self.add(avaliacao)
        return avaliacao

    async def obter_por_id(self, avaliacao_id: str) -> Optional[Avaliacao]:
        stmt = (
            select(Avaliacao)
            .where(Avaliacao.id == avaliacao_id)
            .options(
                selectinload(Avaliacao.avaliador),
                selectinload(Avaliacao.avaliado),
                selectinload(Avaliacao.ciclo),
                selectinload(Avaliacao.itens),
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Avaliacao]:
        stmt = select(Avaliacao).options(
            selectinload(Avaliacao.avaliador),
            selectinload(Avaliacao.avaliado),
            selectinload(Avaliacao.ciclo),
            selectinload(Avaliacao.itens),
        )

        # Aplicar filtros básicos
        if "avaliado_id" in filtro:
            stmt = stmt.where(Avaliacao.avaliado_id == filtro["avaliado_id"])
        if "avaliador_id" in filtro:
            stmt = stmt.where(Avaliacao.avaliador_id == filtro["avaliador_id"])
        if "ciclo_id" in filtro:
            stmt = stmt.where(Avaliacao.ciclo_id == filtro["ciclo_id"])
        if "status" in filtro:
            stmt = stmt.where(Avaliacao.status == filtro["status"])
        if "tipo" in filtro:
            stmt = stmt.where(Avaliacao.tipo == filtro["tipo"])

        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def editar(self, avaliacao: Avaliacao) -> Avaliacao:
        await self.edit(avaliacao)
        return avaliacao

    async def remover(self, avaliacao: Avaliacao) -> None:
        await self.remove(avaliacao)
