from __future__ import annotations

from typing import Optional

from filters.base.base_filter import BaseFilter


class PapelFilter(BaseFilter):
    nome: Optional[str] = None
    sistema: Optional[bool] = None
    created_at__interval: Optional[str] = None
