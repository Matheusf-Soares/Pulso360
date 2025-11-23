from __future__ import annotations

from datetime import datetime
from uuid import uuid4

from sqlalchemy import String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class Feedback(settings.DBBaseModel):
    __tablename__ = "feedback"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    de_usuario_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), index=True
    )
    para_usuario_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), index=True
    )
    avaliacao_id: Mapped[str | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("avaliacao.id")
    )
    tipo: Mapped[str] = mapped_column(String(30))
    texto: Mapped[str] = mapped_column(Text)
    visivel_para_avaliado: Mapped[bool] = mapped_column(Boolean, default=True)
    data_criacao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )

    de_usuario = relationship(
        "Usuario", foreign_keys=[de_usuario_id], back_populates="feedbacks_enviados"
    )
    para_usuario = relationship(
        "Usuario", foreign_keys=[para_usuario_id], back_populates="feedbacks_recebidos"
    )
    avaliacao = relationship("Avaliacao", back_populates="feedbacks")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Feedback {self.id} tipo={self.tipo}>"
