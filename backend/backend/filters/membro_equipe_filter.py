from __future__ import annotations

from typing import Optional

from filters.base.base_filter import BaseFilter


class MembroEquipeFilter(BaseFilter):
    equipe_id: Optional[str] = None
    usuario_id: Optional[str] = None
    papel: Optional[str] = None
    data_entrada__interval: Optional[str] = None
