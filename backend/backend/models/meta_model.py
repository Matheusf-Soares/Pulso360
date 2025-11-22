from __future__ import annotations

from datetime import date
from uuid import uuid4

from sqlalchemy import String, Text, DECIMAL, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings


class Meta(settings.DBBaseModel):
    __tablename__ = "meta"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    pdi_id: Mapped[str | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pdi.id"), index=True
    )
    usuario_id: Mapped[str | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("usuario.id"), index=True
    )
    ciclo_id: Mapped[str | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("ciclo_avaliacao.id"), index=True
    )
    titulo: Mapped[str] = mapped_column(String(180), nullable=False)
    descricao: Mapped[str | None] = mapped_column(Text)
    tipo: Mapped[str | None] = mapped_column(String(40))
    indicador: Mapped[str | None] = mapped_column(String(120))
    valor_alvo_num: Mapped[float | None] = mapped_column(DECIMAL(12, 2))
    valor_alvo_texto: Mapped[str | None] = mapped_column(String(120))
    valor_atual_num: Mapped[float | None] = mapped_column(DECIMAL(12, 2))
    valor_atual_texto: Mapped[str | None] = mapped_column(String(120))
    data_inicio: Mapped[date | None] = mapped_column(Date)
    data_fim: Mapped[date | None] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(30), default="em_andamento")
    progresso_percentual: Mapped[float | None] = mapped_column(DECIMAL(5, 2))

    pdi = relationship("PDI", back_populates="metas")
    usuario = relationship("Usuario", back_populates="metas")
    ciclo = relationship("CicloAvaliacao", back_populates="metas")
    acoes = relationship(
        "AcaoMeta", back_populates="meta", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Meta {self.id} titulo={self.titulo}>"
