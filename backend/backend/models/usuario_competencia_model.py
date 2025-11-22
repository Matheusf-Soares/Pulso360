from __future__ import annotations

from uuid import uuid4
from typing import Optional

from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings
from models.base.base_entity_model import BaseEntityModel


class UsuarioCompetencia(settings.DBBaseModel, BaseEntityModel):
    __tablename__ = "usuario_competencia"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    usuario_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("usuario.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    nome: Mapped[str] = mapped_column(String(120), nullable=False)
    nivel: Mapped[int] = mapped_column(
        Integer, nullable=False, default=0
    )  # escala 0-5 por exemplo
    descricao: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    usuario = relationship("Usuario", back_populates="competencias")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<UsuarioCompetencia {self.id} {self.nome} nivel={self.nivel}>"
