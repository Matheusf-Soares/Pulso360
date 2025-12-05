"""Endpoints para gerenciamento de metas."""

from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination import Page, Params, paginate

from backend.schemas.meta import MetaCreate, MetaUpdate, MetaRead
from backend.services.meta_service import MetaService
from backend.filters.meta_filter import MetaFilter
from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario

router = APIRouter(prefix="/metas", tags=["Metas"])


@router.post(
    "",
    response_model=MetaRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar meta",
)
async def criar_meta(
    meta: MetaCreate,
    service: MetaService = Depends(MetaService),
):
    """Cria uma nova meta."""
    return await service.add(meta.model_dump())


@router.get(
    "",
    response_model=Page[MetaRead],
    summary="Listar metas",
)
async def listar_metas(
    filtros: MetaFilter = Depends(),
    params: Params = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: AsyncSession = Depends(get_session),
    service: MetaService = Depends(MetaService),
):
    """Lista metas com filtros e paginação."""
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, session)
    
    metas = await service.filter(filtros.model_dump(exclude_none=True))
    return paginate(metas)


@router.get(
    "/{meta_id}",
    response_model=MetaRead,
    summary="Obter meta por ID",
)
async def obter_meta(
    meta_id: str,
    service: MetaService = Depends(MetaService),
):
    """Obtém uma meta específica por ID."""
    return await service.get_by_id(meta_id)


@router.put(
    "/{meta_id}",
    response_model=MetaRead,
    summary="Atualizar meta",
)
async def atualizar_meta(
    meta_id: str,
    meta: MetaUpdate,
    service: MetaService = Depends(MetaService),
):
    """Atualiza uma meta existente."""
    return await service.edit(meta_id, meta.model_dump(exclude_unset=True))


@router.delete(
    "/{meta_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover meta",
)
async def remover_meta(
    meta_id: str,
    service: MetaService = Depends(MetaService),
):
    """Remove uma meta."""
    await service.remove(meta_id)
