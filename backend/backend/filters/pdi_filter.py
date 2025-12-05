from __future__ import annotations

from typing import Optional
from backend.filters.base.base_filter import BaseFilter


class PDIFilter(BaseFilter):
    usuario_id: Optional[str] = None
    ciclo_id: Optional[str] = None
    status: Optional[str] = None
    data_criacao__interval: Optional[str] = None
    data_atualizacao__interval: Optional[str] = None
