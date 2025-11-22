from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class MembroEquipeBase(BaseModel):
    papel: Optional[str] = None


class MembroEquipeCreate(MembroEquipeBase):
    equipe_id: UUID
    usuario_id: UUID


class MembroEquipeUpdate(BaseModel):
    papel: Optional[str] = None


class MembroEquipeRead(MembroEquipeBase):
    equipe_id: UUID
    usuario_id: UUID
    data_entrada: datetime

    class Config:
        from_attributes = True
