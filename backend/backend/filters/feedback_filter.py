from __future__ import annotations

from typing import Optional
from backend.filters.base.base_filter import BaseFilter


class FeedbackFilter(BaseFilter):
    de_usuario_id: Optional[str] = None
    para_usuario_id: Optional[str] = None
    avaliacao_id: Optional[str] = None
    tipo: Optional[str] = None
    data_criacao__interval: Optional[str] = None
