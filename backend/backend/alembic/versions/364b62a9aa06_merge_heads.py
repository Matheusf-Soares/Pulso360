"""merge heads

Revision ID: 364b62a9aa06
Revises: 0008, 18ab99499add
Create Date: 2025-12-04 21:06:18.548483

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '364b62a9aa06'
down_revision: Union[str, Sequence[str], None] = ('0008', '18ab99499add')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
