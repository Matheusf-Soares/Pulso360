from __future__ import annotations

from typing import Optional
from backend.filters.base.base_filter import BaseFilter


class MetaFilter(BaseFilter):
    pdi_id: Optional[str] = None
    usuario_id: Optional[str] = None
    ciclo_id: Optional[str] = None
    titulo: Optional[str] = None
    status: Optional[str] = None
    data_inicio__interval: Optional[str] = None
    data_fim__interval: Optional[str] = None
