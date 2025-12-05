"""add tipo to avaliacao

Revision ID: 0008
Revises: 0007
Create Date: 2024-12-04
"""

from alembic import op
import sqlalchemy as sa


revision = "0008"
down_revision = "0007"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Adicionar coluna tipo à tabela avaliacao
    op.add_column(
        "avaliacao",
        sa.Column(
            "tipo", sa.String(length=30), server_default="gestor", nullable=False
        ),
    )


def downgrade() -> None:
    # Remover coluna tipo da tabela avaliacao
    op.drop_column("avaliacao", "tipo")
