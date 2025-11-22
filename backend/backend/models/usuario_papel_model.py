from __future__ import annotations

from datetime import datetime

from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class UsuarioPapel(settings.DBBaseModel):
    __tablename__ = "usuario_papel"

    usuario_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("usuario.id", ondelete="CASCADE"),
        primary_key=True,
    )
    papel_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("papel.id", ondelete="CASCADE"), primary_key=True
    )
    data_atribuicao: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )

    usuario = relationship("Usuario", back_populates="papeis")
    papel = relationship("Papel", back_populates="usuarios")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<UsuarioPapel usuario={self.usuario_id} papel={self.papel_id}>"
