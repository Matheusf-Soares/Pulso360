from __future__ import annotations

from typing import Optional, List
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.repositories.base.base_repository import BaseRepository
from core.dependencies import get_session
from backend.models.tarefa_model import Tarefa


class TarefaRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def criar(self, tarefa: Tarefa) -> Tarefa:
        await self.add(tarefa)
        return tarefa

    async def obter_por_id(self, tarefa_id: str) -> Optional[Tarefa]:
        return await self.get(model_type=Tarefa, id=tarefa_id)

    async def listar(self, usuario_id: Optional[str] = None) -> List[Tarefa]:
        if usuario_id:
            # Evita uso de ilike em UUID (não suportado); aplica igualdade direta
            from sqlalchemy import select

            query = select(Tarefa).filter(Tarefa.usuario_id == usuario_id)
            result = await self.db.execute(query)
            return result.scalars().unique().all()
        return await self.filter(filter_data={}, model_type=Tarefa)

    async def editar(self, tarefa: Tarefa) -> Tarefa:
        await self.edit(tarefa)
        return tarefa

    async def remover(self, tarefa: Tarefa) -> None:
        await self.remove(tarefa)
