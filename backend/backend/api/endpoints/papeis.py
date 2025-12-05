from __future__ import annotations

from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from backend.schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from backend.services.papel_service import PapelService
from backend.schemas.papel import PapelCreate, PapelRead, PapelUpdate
from backend.filters.papel_filter import PapelFilter
from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario
from backend.repositories.papel_repository import PapelRepository

router = APIRouter(prefix="/papeis", tags=["papeis"])


@router.post(
    "",
    response_model=PapelRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar papel",
    description="Cadastra um novo papel (função ou perfil de acesso) no sistema.",
    responses={400: {"model": ErrorResponse, "description": "Dados inválidos"}},
)
async def criar_papel(
    payload: PapelCreate, service: PapelService = Depends(PapelService)
):
    papel = await service.add(payload.model_dump())
    return papel


@router.get(
    "",
    response_model=Page[PapelRead],
    summary="Listar papéis",
    description="Retorna lista paginada de papéis com opção de filtro por nome.",
)
async def listar_papeis(
    filtro: PapelFilter = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: AsyncSession = Depends(get_session),
):
    # Valida autenticação usando a mesma sessão
    current_user = await get_user_from_token(credentials.credentials, session)
    
    # Cria service com a mesma sessão
    repo = PapelRepository(db=session)
    service = PapelService(papel_repository=repo)
    
    papeis = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(papeis)


@router.get(
    "/{papel_id}",
    response_model=PapelRead,
    summary="Obter papel",
    description="Recupera um papel pelo seu ID único.",
    responses={404: {"model": ErrorResponse, "description": "Papel não encontrado"}},
)
async def obter_papel(papel_id: str, service: PapelService = Depends(PapelService)):
    papel = await service.get_by_id(papel_id)
    return papel


@router.put(
    "/{papel_id}",
    response_model=PapelRead,
    summary="Atualizar papel",
    description="Atualiza atributos (ex: nome, descrição) do papel informado.",
    responses={404: {"model": ErrorResponse, "description": "Papel não encontrado"}},
)
async def atualizar_papel(
    papel_id: str, payload: PapelUpdate, service: PapelService = Depends(PapelService)
):
    papel = await service.edit(papel_id, payload.model_dump(exclude_none=True))
    return papel


@router.delete(
    "/{papel_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover papel",
    description="Exclui o papel pelo ID, afetando vínculos de usuários.",
    responses={404: {"model": ErrorResponse, "description": "Papel não encontrado"}},
)
async def remover_papel(papel_id: str, service: PapelService = Depends(PapelService)):
    await service.remove(papel_id)
    return None
