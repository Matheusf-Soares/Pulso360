from __future__ import annotations

from typing import Optional
from backend.filters.base.base_filter import BaseFilter


class AcaoMetaFilter(BaseFilter):
    meta_id: Optional[str] = None
    responsavel_id: Optional[str] = None
    status: Optional[str] = None
    data_inicio__interval: Optional[str] = None
    data_fim__interval: Optional[str] = None
