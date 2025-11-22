from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING
from uuid import uuid4

from sqlalchemy import String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings
from models.base.base_entity_model import BaseEntityModel

if TYPE_CHECKING:
    from models.usuario_model import Usuario


class Equipe(settings.DBBaseModel, BaseEntityModel):
    __tablename__ = "equipe"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    lider_id: Mapped[Optional[str]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id")
    )
    ativo: Mapped[bool] = mapped_column(Boolean, default=True)
    # created_at herdado

    lider: Mapped[Optional["Usuario"]] = relationship("Usuario")
    membros: Mapped[list["MembroEquipe"]] = relationship(
        "MembroEquipe", back_populates="equipe", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Equipe {self.id} {self.nome}>"


class MembroEquipe(settings.DBBaseModel):
    __tablename__ = "membro_equipe"

    equipe_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("equipe.id", ondelete="CASCADE"),
        primary_key=True,
    )
    usuario_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("usuario.id", ondelete="CASCADE"),
        primary_key=True,
    )
    papel: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    data_entrada: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )

    equipe: Mapped["Equipe"] = relationship("Equipe", back_populates="membros")
    usuario: Mapped["Usuario"] = relationship("Usuario")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<MembroEquipe equipe={self.equipe_id} usuario={self.usuario_id}>"
