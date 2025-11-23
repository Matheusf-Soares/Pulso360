from __future__ import annotations

from typing import Optional, Any, Dict
from pydantic import BaseModel


class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
    extra: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
