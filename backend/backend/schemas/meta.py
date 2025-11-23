from __future__ import annotations

from datetime import date
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class MetaBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    tipo: Optional[str] = None
    indicador: Optional[str] = None
    valor_alvo_num: Optional[float] = None
    valor_alvo_texto: Optional[str] = None
    valor_atual_num: Optional[float] = None
    valor_atual_texto: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[str] = "em_andamento"
    progresso_percentual: Optional[float] = None


class MetaCreate(MetaBase):
    pdi_id: Optional[UUID] = None
    usuario_id: Optional[UUID] = None
    ciclo_id: Optional[UUID] = None


class MetaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    tipo: Optional[str] = None
    indicador: Optional[str] = None
    valor_alvo_num: Optional[float] = None
    valor_alvo_texto: Optional[str] = None
    valor_atual_num: Optional[float] = None
    valor_atual_texto: Optional[str] = None
    data_inicio: Optional[date] = None
    data_fim: Optional[date] = None
    status: Optional[str] = None
    progresso_percentual: Optional[float] = None


class MetaRead(MetaBase):
    id: UUID
    pdi_id: Optional[UUID]
    usuario_id: Optional[UUID]
    ciclo_id: Optional[UUID]

    class Config:
        from_attributes = True
