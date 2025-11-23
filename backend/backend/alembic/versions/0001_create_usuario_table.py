"""create usuario table

Revision ID: 0001
Revises:
Create Date: 2025-11-22
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "usuario",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column("nome", sa.String(length=150), nullable=False),
        sa.Column("email", sa.String(length=180), nullable=False),
        sa.Column("senha_hash", sa.String(length=255), nullable=False),
        sa.Column("cargo", sa.String(length=120), nullable=True),
        sa.Column("senioridade", sa.String(length=80), nullable=True),
        sa.Column(
            "ativo", sa.Boolean(), server_default=sa.text("true"), nullable=False
        ),
        sa.Column("foto_url", sa.String(length=255), nullable=True),
        sa.Column("ultimo_login", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=True,
        ),
        sa.UniqueConstraint("email", name="uq_usuario_email"),
    )
    op.create_index("ix_usuario_email", "usuario", ["email"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_usuario_email", table_name="usuario")
    op.drop_table("usuario")
