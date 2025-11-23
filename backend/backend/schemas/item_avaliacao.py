from __future__ import annotations

from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class ItemAvaliacaoBase(BaseModel):
    avaliacao_id: UUID
    competencia_id: UUID
    nota: Optional[float] = None
    comentario: Optional[str] = None


class ItemAvaliacaoCreate(ItemAvaliacaoBase):
    pass


class ItemAvaliacaoUpdate(BaseModel):
    nota: Optional[float] = None
    comentario: Optional[str] = None


class ItemAvaliacaoRead(ItemAvaliacaoBase):
    id: UUID

    class Config:
        from_attributes = True
