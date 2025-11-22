from __future__ import annotations

from datetime import date
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class CicloAvaliacaoBase(BaseModel):
    nome: str
    periodo_inicio: date
    periodo_fim: date
    status: Optional[str] = "planejado"


class CicloAvaliacaoCreate(CicloAvaliacaoBase):
    pass


class CicloAvaliacaoUpdate(BaseModel):
    nome: Optional[str] = None
    periodo_inicio: Optional[date] = None
    periodo_fim: Optional[date] = None
    status: Optional[str] = None


class CicloAvaliacaoRead(CicloAvaliacaoBase):
    id: UUID

    class Config:
        from_attributes = True
