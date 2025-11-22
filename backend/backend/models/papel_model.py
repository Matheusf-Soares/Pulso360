from __future__ import annotations

from typing import Optional
from uuid import uuid4

from sqlalchemy import String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings
from models.base.base_entity_model import BaseEntityModel


class Papel(settings.DBBaseModel, BaseEntityModel):
    __tablename__ = "papel"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    descricao: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    sistema: Mapped[bool] = mapped_column(Boolean, default=False)
    usuarios = relationship(
        "UsuarioPapel", back_populates="papel", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Papel {self.id} {self.nome}>"
