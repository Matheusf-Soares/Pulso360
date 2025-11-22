from __future__ import annotations

from datetime import datetime
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class FeedbackCreate(BaseModel):
    de_usuario_id: UUID
    para_usuario_id: UUID
    avaliacao_id: Optional[UUID] = None
    tipo: str
    texto: str
    visivel_para_avaliado: Optional[bool] = True


class FeedbackRead(BaseModel):
    id: UUID
    de_usuario_id: UUID
    para_usuario_id: UUID
    avaliacao_id: Optional[UUID]
    tipo: str
    texto: str
    visivel_para_avaliado: bool
    data_criacao: datetime

    class Config:
        from_attributes = True
