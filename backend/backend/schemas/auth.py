"""Schemas para autenticação e autorização."""

from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Optional
from datetime import datetime


class LoginRequest(BaseModel):
    """Schema para request de login."""

    email: EmailStr = Field(..., description="Email do usuário")
    senha: str = Field(..., min_length=6, description="Senha do usuário")

    model_config = {
        "json_schema_extra": {
            "examples": [{"email": "usuario@exemplo.com", "senha": "senha123"}]
        }
    }


class TokenResponse(BaseModel):
    """Schema para response com token JWT."""

    access_token: str = Field(..., description="Token de acesso JWT")
    token_type: str = Field(default="bearer", description="Tipo do token")
    user: "UserLoginInfo" = Field(..., description="Informações básicas do usuário")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "token_type": "bearer",
                    "user": {
                        "id": "123e4567-e89b-12d3-a456-426614174000",
                        "nome": "João Silva",
                        "email": "joao@exemplo.com",
                        "cargo": "Desenvolvedor",
                        "senioridade": "Pleno",
                        "foto_url": None,
                    },
                }
            ]
        }
    }


class UserLoginInfo(BaseModel):
    """Informações do usuário retornadas no login.

    Aceita UUID diretamente do modelo ORM (Pydantic serializa como string).
    """

    id: UUID = Field(..., description="ID do usuário")
    nome: str = Field(..., description="Nome completo")
    email: EmailStr = Field(..., description="Email")
    cargo: Optional[str] = Field(None, description="Cargo do usuário")
    senioridade: Optional[str] = Field(None, description="Senioridade")
    foto_url: Optional[str] = Field(None, description="URL da foto de perfil")
    ativo: bool = Field(..., description="Se o usuário está ativo")
    ultimo_login: Optional[datetime] = Field(None, description="Data do último login")

    model_config = {"from_attributes": True}


class TokenData(BaseModel):
    """Dados extraídos do token JWT."""

    email: Optional[EmailStr] = None
    user_id: Optional[str] = None
