"""create usuario_papel table

Revision ID: 0005
Revises: 0004
Create Date: 2025-11-22
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '0005'
down_revision = '0004'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'usuario_papel',
        sa.Column('usuario_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('usuario.id', ondelete='CASCADE'), primary_key=True, nullable=False),
        sa.Column('papel_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('papel.id', ondelete='CASCADE'), primary_key=True, nullable=False),
        sa.Column('data_atribuicao', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index('ix_usuario_papel_usuario', 'usuario_papel', ['usuario_id'])
    op.create_index('ix_usuario_papel_papel', 'usuario_papel', ['papel_id'])


def downgrade() -> None:
    op.drop_index('ix_usuario_papel_usuario', table_name='usuario_papel')
    op.drop_index('ix_usuario_papel_papel', table_name='usuario_papel')
    op.drop_table('usuario_papel')
