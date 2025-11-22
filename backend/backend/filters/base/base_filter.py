from typing import Optional, List

# from pydantic import BaseModel, field_validator

from pydantic import BaseModel

from datetime import datetime

from filters.base.interval_meta import IntervalMeta


DatetimeInterval = Optional[List[Optional[datetime]]]
FloatInterval = Optional[List[Optional[float]]]
IntInterval = Optional[List[Optional[int]]]

class BaseFilter(BaseModel, metaclass=IntervalMeta):
    id: Optional[int] = None
    created_at__interval: Optional[datetime] = None

    