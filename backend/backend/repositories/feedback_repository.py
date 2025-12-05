from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from backend.models.feedback_model import Feedback


class FeedbackRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, feedback: Feedback) -> Feedback:
        await self.add(feedback)
        return feedback

    async def obter_por_id(self, feedback_id: str) -> Optional[Feedback]:
        return await self.get(model_type=Feedback, id=feedback_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[Feedback]:
        return await self.filter(filter_data=filtro, model_type=Feedback)

    async def editar(self, feedback: Feedback) -> Feedback:
        await self.edit(feedback)
        return feedback

    async def remover(self, feedback: Feedback) -> None:
        await self.remove(feedback)
