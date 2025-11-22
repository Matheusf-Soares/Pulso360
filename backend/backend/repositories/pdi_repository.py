from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from models.pdi_model import PDI


class PDIRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, pdi: PDI) -> PDI:
        await self.add(pdi)
        return pdi

    async def obter_por_id(self, pdi_id: str) -> Optional[PDI]:
        return await self.get(model_type=PDI, id=pdi_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[PDI]:
        return await self.filter(filter_data=filtro, model_type=PDI)

    async def editar(self, pdi: PDI) -> PDI:
        await self.edit(pdi)
        return pdi

    async def remover(self, pdi: PDI) -> None:
        await self.remove(pdi)
