from __future__ import annotations

from datetime import datetime
from uuid import uuid4

from sqlalchemy import String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class PDI(settings.DBBaseModel):
    __tablename__ = "pdi"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    usuario_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), index=True
    )
    ciclo_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("ciclo_avaliacao.id"), index=True
    )
    status: Mapped[str] = mapped_column(String(30), default="ativo")
    resumo: Mapped[str | None] = mapped_column(Text)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )
    data_atualizacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )

    usuario = relationship("Usuario", back_populates="pdis")
    ciclo = relationship("CicloAvaliacao", back_populates="pdis")
    metas = relationship("Meta", back_populates="pdi", cascade="all, delete-orphan")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<PDI {self.id} usuario={self.usuario_id}>"
