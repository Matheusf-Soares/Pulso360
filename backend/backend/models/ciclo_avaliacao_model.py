from __future__ import annotations

from datetime import date
from uuid import uuid4

from sqlalchemy import String, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings
from backend.models.base.base_entity_model import BaseEntityModel


class CicloAvaliacao(settings.DBBaseModel, BaseEntityModel):
    __tablename__ = "ciclo_avaliacao"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    periodo_inicio: Mapped[date] = mapped_column(Date, nullable=False)
    periodo_fim: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="planejado")

    avaliacoes = relationship(
        "Avaliacao", back_populates="ciclo", cascade="all, delete-orphan"
    )
    pdis = relationship("PDI", back_populates="ciclo", cascade="all, delete-orphan")
    metas = relationship("Meta", back_populates="ciclo", cascade="all, delete-orphan")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<CicloAvaliacao {self.id} {self.nome}>"
