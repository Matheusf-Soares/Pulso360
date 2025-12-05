from __future__ import annotations

from datetime import date, datetime
from uuid import UUID
from typing import Optional
from pydantic import BaseModel, Field


class TarefaBase(BaseModel):
    titulo: str = Field(..., min_length=2, max_length=180)
    due_date: Optional[date] = None
    prioridade: Optional[str] = Field(None, pattern="^(high|medium|low)$")
    categoria: Optional[str] = Field(None, max_length=50)
    completed: Optional[bool] = False


class TarefaCreate(TarefaBase):
    usuario_id: Optional[UUID] = None


class TarefaUpdate(BaseModel):
    titulo: Optional[str] = Field(None, min_length=2, max_length=180)
    due_date: Optional[date] = None
    prioridade: Optional[str] = Field(None, pattern="^(high|medium|low)$")
    categoria: Optional[str] = Field(None, max_length=50)
    completed: Optional[bool] = None


class TarefaResponse(TarefaBase):
    id: UUID
    usuario_id: Optional[UUID] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class TarefaToggleResponse(BaseModel):
    id: UUID
    completed: bool

    model_config = {"from_attributes": True}
