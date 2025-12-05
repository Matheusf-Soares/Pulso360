from __future__ import annotations

from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from backend.schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from backend.services.equipe_service import EquipeService
from backend.schemas.equipe import EquipeCreate, EquipeRead, EquipeUpdate
from backend.filters.equipe_filter import EquipeFilter
from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario

router = APIRouter(prefix="/equipes", tags=["equipes"])


@router.post(
    "",
    response_model=EquipeRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar equipe",
    description="Cadastra uma nova equipe definindo seu nome e opcionalmente responsável.",
    responses={404: {"model": ErrorResponse, "description": "Líder não encontrado"}},
)
async def criar_equipe(
    payload: EquipeCreate, service: EquipeService = Depends(EquipeService)
):
    equipe = await service.add(payload.model_dump())
    return equipe


@router.get(
    "",
    response_model=Page[EquipeRead],
    summary="Listar equipes",
    description="Retorna lista paginada de equipes com filtros por nome e período.",
)
async def listar_equipes(
    filtro: EquipeFilter = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: AsyncSession = Depends(get_session),
    service: EquipeService = Depends(EquipeService)
):
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, session)
    
    equipes = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(equipes)


@router.get(
    "/{equipe_id}",
    response_model=EquipeRead,
    summary="Obter equipe",
    description="Retorna detalhes de uma equipe pelo seu ID.",
    responses={404: {"model": ErrorResponse, "description": "Equipe não encontrada"}},
)
async def obter_equipe(equipe_id: str, service: EquipeService = Depends(EquipeService)):
    equipe = await service.get_by_id(equipe_id)
    return equipe


@router.put(
    "/{equipe_id}",
    response_model=EquipeRead,
    summary="Atualizar equipe",
    description="Atualiza campos da equipe (apenas valores enviados).",
    responses={
        404: {"model": ErrorResponse, "description": "Equipe ou líder não encontrado"}
    },
)
async def atualizar_equipe(
    equipe_id: str,
    payload: EquipeUpdate,
    service: EquipeService = Depends(EquipeService),
):
    equipe = await service.edit(equipe_id, payload.model_dump(exclude_none=True))
    return equipe


@router.delete(
    "/{equipe_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover equipe",
    description="Exclui a equipe pelo ID e desvincula membros associados.",
    responses={404: {"model": ErrorResponse, "description": "Equipe não encontrada"}},
)
async def remover_equipe(
    equipe_id: str, service: EquipeService = Depends(EquipeService)
):
    await service.remove(equipe_id)
    return None
