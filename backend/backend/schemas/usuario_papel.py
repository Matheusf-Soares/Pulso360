from __future__ import annotations

from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class UsuarioPapelCreate(BaseModel):
    usuario_id: UUID
    papel_id: UUID


class UsuarioPapelRead(BaseModel):
    usuario_id: UUID
    papel_id: UUID
    data_atribuicao: datetime

    class Config:
        from_attributes = True
