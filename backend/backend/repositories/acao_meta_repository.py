from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from backend.models.acao_meta_model import AcaoMeta


class AcaoMetaRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, acao: AcaoMeta) -> AcaoMeta:
        await self.add(acao)
        return acao

    async def obter_por_id(self, acao_id: str) -> Optional[AcaoMeta]:
        return await self.get(model_type=AcaoMeta, id=acao_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[AcaoMeta]:
        return await self.filter(filter_data=filtro, model_type=AcaoMeta)

    async def editar(self, acao: AcaoMeta) -> AcaoMeta:
        await self.edit(acao)
        return acao

    async def remover(self, acao: AcaoMeta) -> None:
        await self.remove(acao)
