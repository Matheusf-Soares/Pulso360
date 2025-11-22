"""create papel table

Revision ID: 0004
Revises: 0003
Create Date: 2025-11-22
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision = "0004"
down_revision = "0003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "papel",
        sa.Column(
            "id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False
        ),
        sa.Column("nome", sa.String(length=100), nullable=False),
        sa.Column("descricao", sa.String(length=255), nullable=True),
        sa.Column(
            "sistema", sa.Boolean(), server_default=sa.text("false"), nullable=False
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=True,
        ),
        sa.UniqueConstraint("nome", name="uq_papel_nome"),
    )
    op.create_index("ix_papel_nome", "papel", ["nome"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_papel_nome", table_name="papel")
    op.drop_table("papel")
