from __future__ import annotations

from fastapi import APIRouter, Depends, status
from schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from services.perfil_usuario_service import PerfilUsuarioService
from schemas.perfil_usuario import (
    PerfilUsuarioCreate,
    PerfilUsuarioRead,
    PerfilUsuarioUpdate,
)
from filters.perfil_usuario_filter import PerfilUsuarioFilter

router = APIRouter(prefix="/perfil-usuarios", tags=["perfil-usuarios"])


@router.post(
    "",
    response_model=PerfilUsuarioRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar perfil de usuário",
    description="Cria o perfil associado a um usuário (dados pessoais e profissionais).",
    responses={
        400: {
            "model": ErrorResponse,
            "description": "Perfil já existe ou dados inválidos",
        },
        404: {"model": ErrorResponse, "description": "Usuário não encontrado"},
    },
)
async def criar_perfil(
    payload: PerfilUsuarioCreate,
    service: PerfilUsuarioService = Depends(PerfilUsuarioService),
):
    perfil = await service.add(payload.model_dump())
    return perfil


@router.get(
    "",
    response_model=Page[PerfilUsuarioRead],
    summary="Listar perfis",
    description="Lista perfis de usuários com suporte a filtros (nome, cargo, área, datas).",
)
async def listar_perfis(
    filtro: PerfilUsuarioFilter = Depends(),
    service: PerfilUsuarioService = Depends(PerfilUsuarioService),
):
    perfis = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(perfis)


@router.get(
    "/{usuario_id}",
    response_model=PerfilUsuarioRead,
    summary="Obter perfil",
    description="Retorna o perfil completo de um usuário pelo ID do usuário.",
    responses={404: {"model": ErrorResponse, "description": "Perfil não encontrado"}},
)
async def obter_perfil(
    usuario_id: str, service: PerfilUsuarioService = Depends(PerfilUsuarioService)
):
    perfil = await service.get_by_id(usuario_id)
    return perfil


@router.put(
    "/{usuario_id}",
    response_model=PerfilUsuarioRead,
    summary="Atualizar perfil",
    description="Atualiza campos específicos do perfil (somente os enviados).",
    responses={404: {"model": ErrorResponse, "description": "Perfil não encontrado"}},
)
async def atualizar_perfil(
    usuario_id: str,
    payload: PerfilUsuarioUpdate,
    service: PerfilUsuarioService = Depends(PerfilUsuarioService),
):
    perfil = await service.edit(usuario_id, payload.model_dump(exclude_none=True))
    return perfil


@router.delete(
    "/{usuario_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover perfil",
    description="Remove o perfil associado ao usuário informado.",
    responses={404: {"model": ErrorResponse, "description": "Perfil não encontrado"}},
)
async def remover_perfil(
    usuario_id: str, service: PerfilUsuarioService = Depends(PerfilUsuarioService)
):
    await service.remove(usuario_id)
    return None
