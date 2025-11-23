"""Endpoints de autenticação e autorização."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone

from core.database import get_session
from core.security import check_password, generate_hash_password
from schemas.auth import LoginRequest, TokenResponse, UserLoginInfo
from repositories.usuario_repository import UsuarioRepository
from models.usuario_model import Usuario
from core.configs import settings

from jose import jwt
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["Autenticação"])


def generate_access_token(user_email: str, user_id: str) -> str:
    """Gera token JWT de acesso."""
    expires = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    
    payload = {
        "sub": user_email,
        "user_id": str(user_id),
        "exp": expires,
        "iat": datetime.now(timezone.utc),
        "type": "access_token"
    }
    
    token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
    return token


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Fazer login",
    description="Autentica um usuário e retorna um token JWT de acesso.",
    responses={
        200: {
            "description": "Login realizado com sucesso",
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "token_type": "bearer",
                        "user": {
                            "id": "123e4567-e89b-12d3-a456-426614174000",
                            "nome": "João Silva",
                            "email": "joao@exemplo.com",
                            "cargo": "Desenvolvedor",
                            "senioridade": "Pleno",
                            "foto_url": None,
                            "ativo": True
                        }
                    }
                }
            }
        },
        401: {"description": "Credenciais inválidas"},
        403: {"description": "Usuário inativo"}
    }
)
async def login(
    login_data: LoginRequest,
    db: AsyncSession = Depends(get_session)
):
    """
    Realiza autenticação do usuário.
    
    - **email**: Email do usuário cadastrado
    - **senha**: Senha do usuário
    
    Retorna um token JWT válido por 60 minutos e informações básicas do usuário.
    """
    usuario_repo = UsuarioRepository(db)
    
    # Buscar usuário por email
    usuario: Usuario = await usuario_repo.get_by_email(login_data.email)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verificar senha
    if not check_password(login_data.senha, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verificar se usuário está ativo
    if not usuario.ativo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuário inativo. Entre em contato com o administrador.",
        )
    
    # Atualizar último login
    usuario.ultimo_login = datetime.now(timezone.utc)
    db.add(usuario)
    await db.commit()
    await db.refresh(usuario)
    
    # Gerar token JWT
    access_token = generate_access_token(usuario.email, usuario.id)
    
    # Preparar informações do usuário
    user_info = UserLoginInfo.model_validate(usuario)
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_info
    )


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registrar novo usuário",
    description="Cria uma nova conta de usuário e retorna token de acesso.",
)
async def register(
    login_data: LoginRequest,
    db: AsyncSession = Depends(get_session)
):
    """
    Registra um novo usuário no sistema.
    
    - **email**: Email único do usuário
    - **senha**: Senha (mínimo 6 caracteres)
    
    Retorna token JWT e informações do usuário criado.
    """
    usuario_repo = UsuarioRepository(db)
    
    # Verificar se email já existe
    existing_user = await usuario_repo.get_by_email(login_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado no sistema"
        )
    
    # Criar novo usuário
    senha_hash = generate_hash_password(login_data.senha)
    
    novo_usuario = Usuario(
        nome=login_data.email.split('@')[0].title(),  # Nome temporário a partir do email
        email=login_data.email,
        senha_hash=senha_hash,
        ativo=True,
        ultimo_login=datetime.now(timezone.utc)
    )
    
    db.add(novo_usuario)
    await db.commit()
    await db.refresh(novo_usuario)
    
    # Gerar token JWT
    access_token = generate_access_token(novo_usuario.email, novo_usuario.id)
    
    # Preparar informações do usuário
    user_info = UserLoginInfo.model_validate(novo_usuario)
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_info
    )
