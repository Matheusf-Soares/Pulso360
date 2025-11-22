from __future__ import annotations

from datetime import datetime
from uuid import uuid4

from sqlalchemy import String, Text, DECIMAL, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class Avaliacao(settings.DBBaseModel):
    __tablename__ = "avaliacao"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    avaliado_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), index=True
    )
    avaliador_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), index=True
    )
    ciclo_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("ciclo_avaliacao.id")
    )
    status: Mapped[str] = mapped_column(String(30), default="rascunho")
    nota_global: Mapped[float | None] = mapped_column(DECIMAL(5, 2))
    comentarios_gerais: Mapped[str | None] = mapped_column(Text)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )
    data_conclusao: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    avaliado = relationship(
        "Usuario", foreign_keys=[avaliado_id], back_populates="avaliacoes_recebidas"
    )
    avaliador = relationship(
        "Usuario", foreign_keys=[avaliador_id], back_populates="avaliacoes_realizadas"
    )
    ciclo = relationship("CicloAvaliacao", back_populates="avaliacoes")
    itens = relationship(
        "ItemAvaliacao", back_populates="avaliacao", cascade="all, delete-orphan"
    )
    feedbacks = relationship(
        "Feedback", back_populates="avaliacao", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Avaliacao {self.id} status={self.status}>"
