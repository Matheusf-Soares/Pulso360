from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, field_validator


class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr
    cargo: Optional[str] = None
    senioridade: Optional[str] = None
    ativo: Optional[bool] = True
    foto_url: Optional[str] = None


class UsuarioCreate(UsuarioBase):
    senha: str

    @field_validator("senha")
    @classmethod
    def senha_min_len(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Senha deve ter pelo menos 6 caracteres")
        return v


class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    cargo: Optional[str] = None
    senioridade: Optional[str] = None
    ativo: Optional[bool] = None
    foto_url: Optional[str] = None
    senha: Optional[str] = None

    @field_validator("senha")
    @classmethod
    def senha_min_len(cls, v: str) -> str:
        if v and len(v) < 6:
            raise ValueError("Senha deve ter pelo menos 6 caracteres")
        return v


class UsuarioRead(UsuarioBase):
    id: UUID
    created_at: datetime
    ultimo_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class UsuarioReadSimple(BaseModel):
    id: UUID
    nome: str
    email: EmailStr

    class Config:
        from_attributes = True
