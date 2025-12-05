from __future__ import annotations
from typing import Optional, List
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.tarefa_model import Tarefa
from backend.repositories.tarefa_repository import TarefaRepository
from core.dependencies import get_session


class TarefaService:
    def __init__(self, db: AsyncSession = Depends(get_session)):
        self.repo = TarefaRepository(db=db)

    async def criar(self, tarefa: Tarefa) -> Tarefa:
        return await self.repo.criar(tarefa)

    async def obter_por_id(self, tarefa_id: str) -> Optional[Tarefa]:
        return await self.repo.obter_por_id(tarefa_id)

    async def listar(self, usuario_id: Optional[str] = None) -> List[Tarefa]:
        return await self.repo.listar(usuario_id)

    async def editar(self, tarefa: Tarefa) -> Tarefa:
        return await self.repo.editar(tarefa)

    async def remover(self, tarefa: Tarefa) -> None:
        await self.repo.remover(tarefa)
