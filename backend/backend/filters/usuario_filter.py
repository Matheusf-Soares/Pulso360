from __future__ import annotations

from typing import Optional
from datetime import datetime

from pydantic import EmailStr

from filters.base.base_filter import BaseFilter


class UsuarioFilter(BaseFilter):
    """Filtro para listagem de usuários.

    Campos com sufixo `__interval` serão transformados em `<campo>__start` e `<campo>__end`
    pela metaclasse IntervalMeta (ver `interval_meta.py`).
    """

    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    cargo: Optional[str] = None
    senioridade: Optional[str] = None
    ativo: Optional[bool] = None
    ultimo_login__interval: Optional[datetime] = (
        None  # gera ultimo_login__start / ultimo_login__end
    )
