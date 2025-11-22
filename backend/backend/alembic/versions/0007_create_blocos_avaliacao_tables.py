"""create evaluation related tables

Revision ID: 0007
Revises: 0006
Create Date: 2025-11-22
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0007"
down_revision = "0006"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ciclo_avaliacao
    op.create_table(
        "ciclo_avaliacao",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column("nome", sa.String(length=150), nullable=False),
        sa.Column("periodo_inicio", sa.Date(), nullable=False),
        sa.Column("periodo_fim", sa.Date(), nullable=False),
        sa.Column(
            "status", sa.String(length=30), server_default="planejado", nullable=False
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=True,
        ),
    )
    op.create_index("ix_ciclo_avaliacao_nome", "ciclo_avaliacao", ["nome"])

    # avaliacao
    op.create_table(
        "avaliacao",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column(
            "avaliado_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "avaliador_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "ciclo_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("ciclo_avaliacao.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "status", sa.String(length=30), server_default="rascunho", nullable=False
        ),
        sa.Column("nota_global", sa.Numeric(5, 2), nullable=True),
        sa.Column("comentarios_gerais", sa.Text(), nullable=True),
        sa.Column(
            "data_criacao",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column("data_conclusao", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_avaliacao_avaliado", "avaliacao", ["avaliado_id"])
    op.create_index("ix_avaliacao_avaliador", "avaliacao", ["avaliador_id"])

    # pdi
    op.create_table(
        "pdi",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column(
            "usuario_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "ciclo_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("ciclo_avaliacao.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "status", sa.String(length=30), server_default="ativo", nullable=False
        ),
        sa.Column("resumo", sa.Text(), nullable=True),
        sa.Column(
            "data_criacao",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "data_atualizacao",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )
    op.create_index("ix_pdi_usuario", "pdi", ["usuario_id"])

    # meta
    op.create_table(
        "meta",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column(
            "pdi_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("pdi.id", ondelete="SET NULL"),
            nullable=True,
            index=True,
        ),
        sa.Column(
            "usuario_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="SET NULL"),
            nullable=True,
            index=True,
        ),
        sa.Column(
            "ciclo_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("ciclo_avaliacao.id", ondelete="SET NULL"),
            nullable=True,
            index=True,
        ),
        sa.Column("titulo", sa.String(length=180), nullable=False),
        sa.Column("descricao", sa.Text(), nullable=True),
        sa.Column("tipo", sa.String(length=40), nullable=True),
        sa.Column("indicador", sa.String(length=120), nullable=True),
        sa.Column("valor_alvo_num", sa.Numeric(12, 2), nullable=True),
        sa.Column("valor_alvo_texto", sa.String(length=120), nullable=True),
        sa.Column("valor_atual_num", sa.Numeric(12, 2), nullable=True),
        sa.Column("valor_atual_texto", sa.String(length=120), nullable=True),
        sa.Column("data_inicio", sa.Date(), nullable=True),
        sa.Column("data_fim", sa.Date(), nullable=True),
        sa.Column(
            "status",
            sa.String(length=30),
            server_default="em_andamento",
            nullable=False,
        ),
        sa.Column("progresso_percentual", sa.Numeric(5, 2), nullable=True),
    )
    op.create_index("ix_meta_usuario", "meta", ["usuario_id"])
    op.create_index("ix_meta_ciclo", "meta", ["ciclo_id"])

    # acao_meta
    op.create_table(
        "acao_meta",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column(
            "meta_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("meta.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column("descricao", sa.Text(), nullable=False),
        sa.Column(
            "responsavel_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("data_inicio", sa.Date(), nullable=True),
        sa.Column("data_fim", sa.Date(), nullable=True),
        sa.Column(
            "status", sa.String(length=30), server_default="pendente", nullable=False
        ),
    )
    op.create_index("ix_acao_meta_meta", "acao_meta", ["meta_id"])

    # feedback
    op.create_table(
        "feedback",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column(
            "de_usuario_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "para_usuario_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "avaliacao_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("avaliacao.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("tipo", sa.String(length=30), nullable=False),
        sa.Column("texto", sa.Text(), nullable=False),
        sa.Column(
            "visivel_para_avaliado",
            sa.Boolean(),
            server_default=sa.text("true"),
            nullable=False,
        ),
        sa.Column(
            "data_criacao",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )
    op.create_index("ix_feedback_de_usuario", "feedback", ["de_usuario_id"])
    op.create_index("ix_feedback_para_usuario", "feedback", ["para_usuario_id"])

    # item_avaliacao
    op.create_table(
        "item_avaliacao",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column(
            "avaliacao_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("avaliacao.id", ondelete="CASCADE"),
            nullable=False,
            index=True,
        ),
        sa.Column(
            "competencia_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario_competencia.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("nota", sa.Numeric(5, 2), nullable=True),
        sa.Column("comentario", sa.Text(), nullable=True),
    )
    op.create_index("ix_item_avaliacao_avaliacao", "item_avaliacao", ["avaliacao_id"])


def downgrade() -> None:
    op.drop_table("item_avaliacao")
    op.drop_table("feedback")
    op.drop_table("acao_meta")
    op.drop_table("meta")
    op.drop_table("pdi")
    op.drop_table("avaliacao")
    op.drop_table("ciclo_avaliacao")
