"""create equipe and membro_equipe tables

Revision ID: 0003
Revises: 0002
Create Date: 2025-11-22
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "equipe",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column("nome", sa.String(length=120), nullable=False),
        sa.Column("descricao", sa.Text(), nullable=True),
        sa.Column(
            "lider_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id"),
            nullable=True,
        ),
        sa.Column(
            "ativo", sa.Boolean(), server_default=sa.text("true"), nullable=False
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=True,
        ),
        sa.UniqueConstraint("nome", name="uq_equipe_nome"),
    )
    op.create_index("ix_equipe_nome", "equipe", ["nome"], unique=False)

    op.create_table(
        "membro_equipe",
        sa.Column(
            "equipe_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("equipe.id", ondelete="CASCADE"),
            primary_key=True,
            nullable=False,
        ),
        sa.Column(
            "usuario_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("usuario.id", ondelete="CASCADE"),
            primary_key=True,
            nullable=False,
        ),
        sa.Column("papel", sa.String(length=100), nullable=True),
        sa.Column(
            "data_entrada",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )


def downgrade() -> None:
    op.drop_table("membro_equipe")
    op.drop_index("ix_equipe_nome", table_name="equipe")
    op.drop_table("equipe")
