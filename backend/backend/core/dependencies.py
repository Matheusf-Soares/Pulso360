from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

from core.database import Session
from core.configs import settings
from backend.models.usuario_model import Usuario

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


# Esquema de segurança Bearer token
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: AsyncSession = Depends(get_session)
) -> Usuario:
    """
    Dependency para validar token JWT e retornar o usuário autenticado.
    
    Raises:
        HTTPException: Se o token for inválido ou o usuário não existir.
    
    Returns:
        Usuario: O usuário autenticado.
    """
    return await get_user_from_token(credentials.credentials, session)


async def get_user_from_token(token: str, session: AsyncSession) -> Usuario:
    """
    Valida um token JWT e retorna o usuário correspondente.
    Função auxiliar que pode ser reutilizada sem depender do HTTPBearer.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Decodificar o token
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.ALGORITHM]
        )
        
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Buscar usuário no banco usando query direta
    from backend.models.usuario_model import Usuario as UsuarioModel
    from sqlalchemy import select
    
    result = await session.execute(
        select(UsuarioModel).where(UsuarioModel.id == user_id)
    )
    user = result.scalar_one_or_none()
    
    if user is None:
        raise credentials_exception
    
    if not user.ativo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    
    return user
