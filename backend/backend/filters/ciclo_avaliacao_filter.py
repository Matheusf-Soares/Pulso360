from __future__ import annotations

from typing import Optional
from filters.base.base_filter import BaseFilter


class CicloAvaliacaoFilter(BaseFilter):
    nome: Optional[str] = None
    status: Optional[str] = None
    periodo_inicio__interval: Optional[str] = None
    periodo_fim__interval: Optional[str] = None
