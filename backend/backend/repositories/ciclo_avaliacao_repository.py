from __future__ import annotations

from typing import List, Dict, Any, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from repositories.base.base_repository import BaseRepository
from models.ciclo_avaliacao_model import CicloAvaliacao
from core.dependencies import get_session


class CicloAvaliacaoRepository(BaseRepository):
    def __init__(self, db: AsyncSession = Depends(get_session)):
        super().__init__(db=db)

    async def adicionar(self, ciclo: CicloAvaliacao) -> CicloAvaliacao:
        await self.add(ciclo)
        return ciclo

    async def obter_por_id(self, ciclo_id: str) -> Optional[CicloAvaliacao]:
        return await self.get(model_type=CicloAvaliacao, id=ciclo_id)

    async def filtrar(self, filtro: Dict[str, Any]) -> List[CicloAvaliacao]:
        return await self.filter(filter_data=filtro, model_type=CicloAvaliacao)

    async def editar(self, ciclo: CicloAvaliacao) -> CicloAvaliacao:
        await self.edit(ciclo)
        return ciclo

    async def remover(self, ciclo: CicloAvaliacao) -> None:
        await self.remove(ciclo)

    async def existe_nome_periodo(self, nome: str, inicio, fim) -> bool:
        # Verifica se já existe ciclo com mesmo nome que intersecta período informado
        filtro = {"nome": nome}
        ciclos = await self.filtrar(filtro)
        for c in ciclos:
            if not (fim < c.periodo_inicio or inicio > c.periodo_fim):
                return True
        return False
