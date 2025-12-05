from __future__ import annotations

from datetime import datetime, date
from uuid import UUID
from typing import Optional
from pydantic import BaseModel, Field


class UsuarioSimple(BaseModel):
    id: UUID
    nome: str
    email: str
    cargo: Optional[str] = None
    foto_url: Optional[str] = None

    class Config:
        from_attributes = True


class CicloSimple(BaseModel):
    id: UUID
    nome: str
    periodo_inicio: date
    periodo_fim: date
    status: str

    class Config:
        from_attributes = True


class AvaliacaoBase(BaseModel):
    avaliado_id: UUID
    avaliador_id: UUID
    ciclo_id: UUID
    tipo: Optional[str] = "gestor"  # gestor, autoavaliacao, 360
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
    avaliador: Optional[UsuarioSimple] = None
    avaliado: Optional[UsuarioSimple] = None
    ciclo: Optional[CicloSimple] = None
    progresso: Optional[float] = Field(default=0, description="Progresso em %")
    total_itens: Optional[int] = Field(default=0, description="Total de itens")
    itens_respondidos: Optional[int] = Field(default=0, description="Itens respondidos")

    class Config:
        from_attributes = True
