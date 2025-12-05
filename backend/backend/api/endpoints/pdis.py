"""Endpoints para gerenciamento de PDIs (Planos de Desenvolvimento Individual)."""

from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination import Page, Params, paginate

from backend.schemas.pdi import PDICreate, PDIUpdate, PDIRead
from backend.services.pdi_service import PDIService
from backend.filters.pdi_filter import PDIFilter
from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario

router = APIRouter(prefix="/pdis", tags=["PDI"])


@router.post(
    "",
    response_model=PDIRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar PDI",
)
async def criar_pdi(
    pdi: PDICreate,
    service: PDIService = Depends(PDIService),
):
    """Cria um novo Plano de Desenvolvimento Individual."""
    return await service.add(pdi.model_dump())


@router.get(
    "",
    response_model=Page[PDIRead],
    summary="Listar PDIs",
)
async def listar_pdis(
    filtros: PDIFilter = Depends(),
    params: Params = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: AsyncSession = Depends(get_session),
    service: PDIService = Depends(PDIService),
):
    """Lista PDIs com filtros e paginação."""
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, session)
    
    pdis = await service.filter(filtros.model_dump(exclude_none=True))
    return paginate(pdis)


@router.get(
    "/{pdi_id}",
    response_model=PDIRead,
    summary="Obter PDI por ID",
)
async def obter_pdi(
    pdi_id: str,
    service: PDIService = Depends(PDIService),
):
    """Obtém um PDI específico por ID."""
    return await service.get_by_id(pdi_id)


@router.put(
    "/{pdi_id}",
    response_model=PDIRead,
    summary="Atualizar PDI",
)
async def atualizar_pdi(
    pdi_id: str,
    pdi: PDIUpdate,
    service: PDIService = Depends(PDIService),
):
    """Atualiza um PDI existente."""
    return await service.edit(pdi_id, pdi.model_dump(exclude_unset=True))


@router.delete(
    "/{pdi_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover PDI",
)
async def remover_pdi(
    pdi_id: str,
    service: PDIService = Depends(PDIService),
):
    """Remove um PDI."""
    await service.remove(pdi_id)
