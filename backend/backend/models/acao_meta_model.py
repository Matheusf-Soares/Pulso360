from __future__ import annotations

from datetime import date
from uuid import uuid4

from sqlalchemy import String, Text, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class AcaoMeta(settings.DBBaseModel):
    __tablename__ = "acao_meta"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    meta_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("meta.id", ondelete="CASCADE"), index=True
    )
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    responsavel_id: Mapped[str | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id")
    )
    data_inicio: Mapped[date | None] = mapped_column(Date)
    data_fim: Mapped[date | None] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(30), default="pendente")

    meta = relationship("Meta", back_populates="acoes")
    responsavel = relationship("Usuario", back_populates="acoes_responsavel")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<AcaoMeta {self.id} status={self.status}>"
