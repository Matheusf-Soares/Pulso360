from __future__ import annotations

from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from uuid import uuid4

from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

# removed duplicate TYPE_CHECKING import

if TYPE_CHECKING:
    from models.perfil_usuario_model import PerfilUsuario
    from models.usuario_papel_model import UsuarioPapel
    from models.usuario_competencia_model import UsuarioCompetencia
    from models.pdi_model import PDI
    from models.meta_model import Meta
    from models.acao_meta_model import AcaoMeta

# Importações diretas para evitar ambiguidade de FKs nas relações (Avaliacao e Feedback possuem duas FKs para Usuario)
from models.avaliacao_model import Avaliacao  # noqa: E402
from models.feedback_model import Feedback  # noqa: E402

from core.configs import settings
from models.base.base_entity_model import BaseEntityModel


class Usuario(settings.DBBaseModel, BaseEntityModel):
    """Modelo de usuário do sistema.

    Observações:
    - senha é armazenada como hash em `senha_hash`.
    - campos de data seguem padrão snake_case (data_criacao via BaseEntityModel: created_at).
    - ultimo_login pode ser atualizado em autenticação.
    """

    __tablename__ = "usuario"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(
        String(180), unique=True, index=True, nullable=False
    )
    senha_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    cargo: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    senioridade: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    ativo: Mapped[bool] = mapped_column(Boolean, default=True)
    foto_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    ultimo_login: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # relação 1:1 com PerfilUsuario (definida por perfil_usuario.usuario_id)
    perfil: Mapped["PerfilUsuario"] = relationship(
        "PerfilUsuario", back_populates="usuario", uselist=False
    )
    papeis: Mapped[List["UsuarioPapel"]] = relationship(
        "UsuarioPapel", back_populates="usuario", cascade="all, delete-orphan"
    )
    competencias: Mapped[List["UsuarioCompetencia"]] = relationship(
        "UsuarioCompetencia", back_populates="usuario", cascade="all, delete-orphan"
    )
    avaliacoes_recebidas: Mapped[List["Avaliacao"]] = relationship(
        "Avaliacao",
        back_populates="avaliado",
        cascade="all, delete-orphan",
        foreign_keys=[Avaliacao.avaliado_id],
    )
    avaliacoes_realizadas: Mapped[List["Avaliacao"]] = relationship(
        "Avaliacao",
        back_populates="avaliador",
        cascade="all, delete-orphan",
        foreign_keys=[Avaliacao.avaliador_id],
    )
    pdis: Mapped[List["PDI"]] = relationship(
        "PDI", back_populates="usuario", cascade="all, delete-orphan"
    )
    metas: Mapped[List["Meta"]] = relationship(
        "Meta", back_populates="usuario", cascade="all, delete-orphan"
    )
    feedbacks_enviados: Mapped[List["Feedback"]] = relationship(
        "Feedback",
        back_populates="de_usuario",
        cascade="all, delete-orphan",
        foreign_keys=[Feedback.de_usuario_id],
    )
    feedbacks_recebidos: Mapped[List["Feedback"]] = relationship(
        "Feedback",
        back_populates="para_usuario",
        cascade="all, delete-orphan",
        foreign_keys=[Feedback.para_usuario_id],
    )
    acoes_responsavel: Mapped[List["AcaoMeta"]] = relationship(
        "AcaoMeta", back_populates="responsavel", cascade="all, delete-orphan"
    )

    # tarefas associadas (dashboard)
    tarefas: Mapped[List["Tarefa"]] = relationship(
        "Tarefa", back_populates="usuario", cascade="all, delete-orphan"
    )

    # created_at herdado de BaseEntityModel (created_at)

    def __repr__(self) -> str:  # pragma: no cover (apenas depuração)
        return f"<Usuario {self.id} {self.email}>"
