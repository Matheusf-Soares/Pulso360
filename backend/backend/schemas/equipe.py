from __future__ import annotations

from typing import Optional, List
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, field_validator


class EquipeBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    lider_id: Optional[UUID] = None
    ativo: Optional[bool] = True

    @field_validator("nome")
    @classmethod
    def nome_len(cls, v: str) -> str:
        if len(v) < 2:
            raise ValueError("Nome da equipe muito curto")
        return v


class EquipeCreate(EquipeBase):
    pass


class EquipeUpdate(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    lider_id: Optional[UUID] = None
    ativo: Optional[bool] = None


class EquipeRead(EquipeBase):
    id: UUID
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class MembroEquipeRead(BaseModel):
    equipe_id: UUID
    usuario_id: UUID
    papel: Optional[str] = None
    data_entrada: Optional[str] = None

    class Config:
        from_attributes = True


class EquipeReadDetalhada(EquipeRead):
    membros: List[MembroEquipeRead] = []
