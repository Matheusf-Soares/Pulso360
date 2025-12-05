from __future__ import annotations

from typing import Optional

from backend.filters.base.base_filter import BaseFilter


class UsuarioCompetenciaFilter(BaseFilter):
    usuario_id: Optional[str] = None
    nome: Optional[str] = None
    nivel__interval: Optional[str] = None
