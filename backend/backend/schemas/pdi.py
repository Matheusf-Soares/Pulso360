from __future__ import annotations

from datetime import datetime
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class PDICreate(BaseModel):
    usuario_id: UUID
    ciclo_id: UUID
    status: Optional[str] = "ativo"
    resumo: Optional[str] = None


class PDIUpdate(BaseModel):
    status: Optional[str] = None
    resumo: Optional[str] = None
    data_atualizacao: Optional[datetime] = None


class PDIRead(BaseModel):
    id: UUID
    usuario_id: UUID
    ciclo_id: UUID
    status: str
    resumo: Optional[str]
    data_criacao: datetime
    data_atualizacao: datetime

    class Config:
        from_attributes = True
