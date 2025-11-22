from __future__ import annotations

from uuid import uuid4

from sqlalchemy import Text, DECIMAL, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class ItemAvaliacao(settings.DBBaseModel):
    __tablename__ = "item_avaliacao"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    avaliacao_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("avaliacao.id", ondelete="CASCADE")
    )
    competencia_id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario_competencia.id")
    )
    nota: Mapped[float | None] = mapped_column(DECIMAL(5, 2))
    comentario: Mapped[str | None] = mapped_column(Text)

    avaliacao = relationship("Avaliacao", back_populates="itens")
    competencia = relationship("UsuarioCompetencia")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<ItemAvaliacao {self.id} nota={self.nota}>"
