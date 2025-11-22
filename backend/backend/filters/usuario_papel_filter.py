from __future__ import annotations

from typing import Optional

from filters.base.base_filter import BaseFilter


class UsuarioPapelFilter(BaseFilter):
    usuario_id: Optional[str] = None
    papel_id: Optional[str] = None
    data_atribuicao__interval: Optional[str] = None
