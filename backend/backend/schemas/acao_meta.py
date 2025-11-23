from __future__ import annotations

from datetime import date
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class AcaoMetaBase(BaseModel):
    meta_id: UUID
    descricao: str
    responsavel_id: Optional[UUID] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[str] = "pendente"


class AcaoMetaCreate(AcaoMetaBase):
    pass


class AcaoMetaUpdate(BaseModel):
    descricao: Optional[str] = None
    responsavel_id: Optional[UUID] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[str] = None


class AcaoMetaRead(AcaoMetaBase):
    id: UUID

    class Config:
        from_attributes = True
