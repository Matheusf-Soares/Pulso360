from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from core.database import Session

"""Fornece uma AsyncSession por requisição/teste com controle único de transação.

Estratégia revisada: uma transação por requisição. Os repositórios apenas fazem
add / delete / alterações e chamam flush quando necessário; o commit/rollback
fica centralizado aqui. Isso evita iniciação repetida de transações (start_transaction)
em operações sequenciais rápidas que podem gerar `InterfaceError: another operation is in progress`
no asyncpg quando vários commits são disparados em sequência no mesmo connection.

Fluxo:
1. Cria sessão.
2. Entrega ao endpoint.
3. Se não houve exceção: commit único.
4. Em caso de erro: rollback.
5. Fecha sessão sempre.
"""
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Abre sessão + inicia transação imediatamente.

    Usar session.begin() cria o transaction boundary único; múltiplos flush/add
    não reiniciam transações. Ao sair do contexto, o commit ou rollback é feito
    automaticamente pelo SQLAlchemy.
    """
    async with Session() as session:
        async with session.begin():
            yield session