"""Endpoints para gerenciamento de feedbacks."""

from fastapi import APIRouter, Depends, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_pagination import Page, Params, paginate

from backend.schemas.feedback import FeedbackCreate, FeedbackUpdate, FeedbackRead
from backend.services.feedback_service import FeedbackService
from backend.filters.feedback_filter import FeedbackFilter
from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario

router = APIRouter(prefix="/feedbacks", tags=["Feedbacks"])


@router.post(
    "",
    response_model=FeedbackRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar feedback",
)
async def criar_feedback(
    feedback: FeedbackCreate,
    service: FeedbackService = Depends(FeedbackService),
):
    """Cria um novo feedback."""
    return await service.add(feedback.model_dump())


@router.get(
    "",
    response_model=Page[FeedbackRead],
    summary="Listar feedbacks",
)
async def listar_feedbacks(
    filtros: FeedbackFilter = Depends(),
    params: Params = Depends(),
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: AsyncSession = Depends(get_session),
    service: FeedbackService = Depends(FeedbackService),
):
    """Lista feedbacks com filtros e paginação."""
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, session)
    
    feedbacks = await service.filter(filtros.model_dump(exclude_none=True))
    return paginate(feedbacks)


@router.get(
    "/{feedback_id}",
    response_model=FeedbackRead,
    summary="Obter feedback por ID",
)
async def obter_feedback(
    feedback_id: str,
    service: FeedbackService = Depends(FeedbackService),
):
    """Obtém um feedback específico por ID."""
    return await service.get_by_id(feedback_id)


@router.put(
    "/{feedback_id}",
    response_model=FeedbackRead,
    summary="Atualizar feedback",
)
async def atualizar_feedback(
    feedback_id: str,
    feedback: FeedbackUpdate,
    service: FeedbackService = Depends(FeedbackService),
):
    """Atualiza um feedback existente."""
    return await service.edit(feedback_id, feedback.model_dump(exclude_unset=True))


@router.delete(
    "/{feedback_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover feedback",
)
async def remover_feedback(
    feedback_id: str,
    service: FeedbackService = Depends(FeedbackService),
):
    """Remove um feedback."""
    await service.remove(feedback_id)
