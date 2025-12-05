from __future__ import annotations


from fastapi import APIRouter, Depends, status
from backend.schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from backend.services.usuario_service import UsuarioService
from backend.schemas.usuario import UsuarioCreate, UsuarioRead, UsuarioUpdate, UsuarioReadSimple
from backend.filters.usuario_filter import UsuarioFilter

router = APIRouter(prefix="/usuarios", tags=["usuarios"])


@router.post(
    "",
    response_model=UsuarioRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar usuário",
    description="Cria um novo usuário no sistema aplicando hash seguro à senha fornecida.",
    responses={400: {"model": ErrorResponse, "description": "Erro de validação"}},
)
async def criar_usuario(
    payload: UsuarioCreate, service: UsuarioService = Depends(UsuarioService)
):
    usuario = await service.add(payload.model_dump())
    return usuario


@router.get(
    "",
    response_model=Page[UsuarioReadSimple],
    summary="Listar usuários",
    description="Retorna página de usuários com filtros dinâmicos (nome, email, períodos etc.).",
)
async def listar_usuarios(
    filtro: UsuarioFilter = Depends(), service: UsuarioService = Depends(UsuarioService)
):
    usuarios = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(usuarios)


@router.get(
    "/{usuario_id}",
    response_model=UsuarioRead,
    summary="Obter usuário",
    description="Recupera detalhes completos de um usuário pelo seu ID.",
    responses={404: {"model": ErrorResponse, "description": "Usuário não encontrado"}},
)
async def obter_usuario(
    usuario_id: str, service: UsuarioService = Depends(UsuarioService)
):
    usuario = await service.get_by_id(usuario_id)
    return usuario


@router.put(
    "/{usuario_id}",
    response_model=UsuarioRead,
    summary="Atualizar usuário",
    description="Atualiza campos informados para o usuário (senha será re-hasheada se enviada).",
    responses={404: {"model": ErrorResponse, "description": "Usuário não encontrado"}},
)
async def atualizar_usuario(
    usuario_id: str,
    payload: UsuarioUpdate,
    service: UsuarioService = Depends(UsuarioService),
):
    usuario = await service.edit(usuario_id, payload.model_dump(exclude_none=True))
    return usuario


@router.delete(
    "/{usuario_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover usuário",
    description="Remove definitivamente o usuário pelo ID.",
    responses={404: {"model": ErrorResponse, "description": "Usuário não encontrado"}},
)
async def remover_usuario(
    usuario_id: str, service: UsuarioService = Depends(UsuarioService)
):
    await service.remove(usuario_id)
    return None
