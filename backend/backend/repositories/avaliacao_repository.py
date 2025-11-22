from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.avaliacao_model import Avaliacao


class AvaliacaoRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, avaliacao: Avaliacao) -> Avaliacao:
        await self.add(avaliacao)
        return avaliacao

    async def obter_por_id(self, avaliacao_id: str) -> Optional[Avaliacao]:
        return await self.get(model_type=Avaliacao, id=avaliacao_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Avaliacao]:
        return await self.filter(filter_data=filtro, model_type=Avaliacao)

    async def editar(self, avaliacao: Avaliacao) -> Avaliacao:
        await self.edit(avaliacao)
        return avaliacao

    async def remover(self, avaliacao: Avaliacao) -> None:
        await self.remove(avaliacao)
