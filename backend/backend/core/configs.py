from logging import Logger
from typing import Any, List
from pydantic_settings import BaseSettings
from sqlalchemy.ext.declarative import declarative_base
from core.logging_config import configure_logging

class Settings(BaseSettings):
    API_V1_STR: str = '/api/v1'
    DB_URL: str = 'postgresql+asyncpg://postgres:1234@localhost:5432/pulso360'
    DB_SYNC_URL: str = DB_URL.replace('+asyncpg', '')
    DBBaseModel: Any = declarative_base()

    JWT_SECRET: str = 'uv_uiN1L3oYMm7fC5b3ZoLIafehXPvjID3FEAFVl708'

    ALGORITHM: str = 'HS256'

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    
    logger: Logger = configure_logging()

    SHOULD_CONFIRM_EMAIL: bool = False

    class Config:
        case_sensitive: bool = True

settings: Settings = Settings()