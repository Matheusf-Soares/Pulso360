from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime

class BaseEntityModel():
    created_at = Column(DateTime, server_default=func.now()) 