from __future__ import annotations

from typing import Optional

from filters.base.base_filter import BaseFilter


class EquipeFilter(BaseFilter):
    nome: Optional[str] = None
    lider_id: Optional[str] = None
    ativo: Optional[bool] = None
    created_at__interval: Optional[str] = None
