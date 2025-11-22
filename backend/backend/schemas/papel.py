git from __future__ import annotations

from typing import Optional
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class PapelBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    sistema: Optional[bool] = False


class PapelCreate(PapelBase):
    pass


class PapelUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    sistema: Optional[bool] = None


class PapelRead(PapelBase):
    id: UUID
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
