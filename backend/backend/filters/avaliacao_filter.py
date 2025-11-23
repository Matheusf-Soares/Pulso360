from __future__ import annotations

from typing import Optional
from filters.base.base_filter import BaseFilter


class AvaliacaoFilter(BaseFilter):
    avaliado_id: Optional[str] = None
    avaliador_id: Optional[str] = None
    ciclo_id: Optional[str] = None
    status: Optional[str] = None
    data_criacao__interval: Optional[str] = None
    data_conclusao__interval: Optional[str] = None
