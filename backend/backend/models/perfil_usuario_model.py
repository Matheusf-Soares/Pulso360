from __future__ import annotations

from typing import Optional, Dict, Any

from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.configs import settings
from models.base.base_entity_model import BaseEntityModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.usuario_model import Usuario


class PerfilUsuario(settings.DBBaseModel, BaseEntityModel):
    """Perfil adicional de um usuário (1:1).
    PK = usuario_id (referencia Usuario.id)
    """

    __tablename__ = "perfil_usuario"

    usuario_id: Mapped[str] = mapped_column(UUID(as_uuid=True), ForeignKey("usuario.id"), primary_key=True)
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    telefone: Mapped[Optional[str]] = mapped_column(String(30), nullable=True)
    linkedin_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    skills: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    preferencias_notificacao: Mapped[Optional[Dict[str, Any]]] = mapped_column(
        JSONB, nullable=True
    )

    usuario: Mapped["Usuario"] = relationship("Usuario", back_populates="perfil")

    def __repr__(self) -> str:  # pragma: no cover
        return f"<PerfilUsuario usuario_id={self.usuario_id}>"
