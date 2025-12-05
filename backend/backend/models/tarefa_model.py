from __future__ import annotations

from datetime import date
from typing import Optional
from uuid import uuid4

from sqlalchemy import String, Boolean, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings
from backend.models.base.base_entity_model import BaseEntityModel


class Tarefa(settings.DBBaseModel, BaseEntityModel):
    """Modelo de Tarefa para exibição e gestão na Home.

    Campos principais refletem itens exibidos no dashboard (title, due_date, priority, category, completed).
    Relacionada opcionalmente a um usuário (criador / responsável).
    """

    __tablename__ = "tarefa"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    titulo: Mapped[str] = mapped_column(String(180), nullable=False)
    due_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    prioridade: Mapped[Optional[str]] = mapped_column(
        String(20), nullable=True
    )  # high | medium | low
    categoria: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    usuario_id: Mapped[Optional[str]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), nullable=True, index=True
    )

    usuario = relationship("Usuario", back_populates="tarefas", lazy="joined")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Tarefa {self.id} {self.titulo} completed={self.completed}>"
