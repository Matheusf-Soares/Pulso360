"""create usuario_competencia table

Revision ID: 0006
Revises: 0005
Create Date: 2025-11-22
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0006"
down_revision = "0005"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "usuario_competencia",
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
        sa.Column("nome", sa.String(length=120), nullable=False),
        sa.Column("nivel", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("descricao", sa.String(length=255), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=True,
        ),
    )
    op.create_index(
        "ix_usuario_competencia_usuario", "usuario_competencia", ["usuario_id"]
    )
    op.create_index("ix_usuario_competencia_nome", "usuario_competencia", ["nome"])


def downgrade() -> None:
    op.drop_index("ix_usuario_competencia_usuario", table_name="usuario_competencia")
    op.drop_index("ix_usuario_competencia_nome", table_name="usuario_competencia")
    op.drop_table("usuario_competencia")
