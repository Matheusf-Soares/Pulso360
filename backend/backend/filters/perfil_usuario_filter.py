from __future__ import annotations

from typing import Optional

from filters.base.base_filter import BaseFilter


class PerfilUsuarioFilter(BaseFilter):
    usuario_id: Optional[str] = None
    bio: Optional[str] = None
    telefone: Optional[str] = None
    linkedin_url: Optional[str] = None
    created_at__interval: Optional[str] = None  # IntervalMeta gera start/end
