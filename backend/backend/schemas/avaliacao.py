from __future__ import annotations

from datetime import datetime
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class AvaliacaoBase(BaseModel):
    avaliado_id: UUID
    avaliador_id: UUID
    ciclo_id: UUID
    status: Optional[str] = "rascunho"
    nota_global: Optional[float] = None
    comentarios_gerais: Optional[str] = None


class AvaliacaoCreate(AvaliacaoBase):
    pass


class AvaliacaoUpdate(BaseModel):
    status: Optional[str] = None
    nota_global: Optional[float] = None
    comentarios_gerais: Optional[str] = None
    data_conclusao: Optional[datetime] = None


class AvaliacaoRead(AvaliacaoBase):
    id: UUID
    data_criacao: datetime
    data_conclusao: Optional[datetime]

    class Config:
        from_attributes = True
