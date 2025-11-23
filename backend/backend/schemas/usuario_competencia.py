from __future__ import annotations

from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field


class UsuarioCompetenciaBase(BaseModel):
    nome: str
    nivel: int = Field(ge=0, le=5)
    descricao: Optional[str] = None


class UsuarioCompetenciaCreate(UsuarioCompetenciaBase):
    usuario_id: UUID


class UsuarioCompetenciaUpdate(BaseModel):
    nome: Optional[str] = None
    nivel: Optional[int] = Field(default=None, ge=0, le=5)
    descricao: Optional[str] = None


class UsuarioCompetenciaRead(UsuarioCompetenciaBase):
    id: UUID
    usuario_id: UUID

    class Config:
        from_attributes = True
