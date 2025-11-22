from __future__ import annotations

from typing import Optional, Dict, Any
from uuid import UUID
from pydantic import BaseModel, field_validator


class PerfilUsuarioBase(BaseModel):
    bio: Optional[str] = None
    telefone: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills: Optional[Dict[str, Any]] = None  # ex.: {"skills": ["Python","SQL"]}
    preferencias_notificacao: Optional[Dict[str, Any]] = None

    @field_validator("telefone")
    @classmethod
    def validar_telefone(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v) > 30:
            raise ValueError("Telefone excede 30 caracteres")
        return v


class PerfilUsuarioCreate(PerfilUsuarioBase):
    usuario_id: UUID


class PerfilUsuarioUpdate(PerfilUsuarioBase):
    pass


class PerfilUsuarioRead(PerfilUsuarioBase):
    usuario_id: UUID
    created_at: Optional[str] = None  # herdado de BaseEntityModel

    class Config:
        from_attributes = True
