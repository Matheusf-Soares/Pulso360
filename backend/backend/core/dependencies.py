from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from core.database import Session

"""Dependency que entrega uma AsyncSession isolada por requisição/teste.

Correção: removido uso de ``session.begin()`` dentro do provider porque em alta
frequência de chamadas sequenciais (como nos testes de integração) isso acabava
gerando conflitos de transação no asyncpg (``InterfaceError: another operation is in progress``),
especialmente durante múltiplos ``flush()`` próximos. Agora o controle explícito
de commit/rollback é feito após o yield.

Fluxo:
1. Cria sessão.
2. Entrega ao endpoint/repositório.
3. Após retorno: ``commit`` único se não houve exceção.
4. Em caso de erro: ``rollback`` e propaga.
5. Fecha a sessão.
"""


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with Session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
