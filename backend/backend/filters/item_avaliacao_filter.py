from __future__ import annotations

from typing import Optional
from backend.filters.base.base_filter import BaseFilter


class ItemAvaliacaoFilter(BaseFilter):
    avaliacao_id: Optional[str] = None
    competencia_id: Optional[str] = None
    nota__interval: Optional[str] = None
