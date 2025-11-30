from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine, AsyncSession
from sqlalchemy.pool import NullPool
from core.configs import settings

# Para evitar conflitos de "another operation is in progress" em testes rápidos,
# utilizamos NullPool para sempre abrir/fechar conexões sem reutilização imediata.
engine: AsyncEngine = create_async_engine(settings.DB_URL, poolclass=NullPool)

Session = sessionmaker(
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
    class_=AsyncSession,
    bind=engine,
)

__all__ = ["AsyncSession", "Session", "engine"]
