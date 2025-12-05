from __future__ import annotations

from fastapi import APIRouter, Depends, status
from backend.schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from backend.services.usuario_papel_service import UsuarioPapelService
from backend.schemas.usuario_papel import UsuarioPapelCreate, UsuarioPapelRead
from backend.filters.usuario_papel_filter import UsuarioPapelFilter

router = APIRouter(prefix="/usuario-papeis", tags=["usuario-papeis"])


@router.post(
    "",
    response_model=UsuarioPapelRead,
    status_code=status.HTTP_201_CREATED,
    summary="Atribuir papel a usuário",
    description="Cria vínculo entre usuário e papel (controle de acesso / função).",
    responses={
        400: {"model": ErrorResponse, "description": "Papel já atribuído"},
        404: {"model": ErrorResponse, "description": "Usuário ou papel não encontrado"},
    },
)
async def atribuir_papel(
    payload: UsuarioPapelCreate,
    service: UsuarioPapelService = Depends(UsuarioPapelService),
):
    item = await service.add(payload.model_dump())
    return item


@router.get(
    "",
    response_model=Page[UsuarioPapelRead],
    summary="Listar vínculos usuário-papel",
    description="Lista atribuições com filtros por usuário, papel e datas.",
)
async def listar_usuario_papeis(
    filtro: UsuarioPapelFilter = Depends(),
    service: UsuarioPapelService = Depends(UsuarioPapelService),
):
    itens = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(itens)


@router.get(
    "/{usuario_id}/{papel_id}",
    response_model=UsuarioPapelRead,
    summary="Obter vínculo específico",
    description="Retorna vínculo usuário-papel a partir dos dois IDs.",
    responses={
        404: {"model": ErrorResponse, "description": "Associação não encontrada"}
    },
)
async def obter_usuario_papel(
    usuario_id: str,
    papel_id: str,
    service: UsuarioPapelService = Depends(UsuarioPapelService),
):
    item = await service.get_by_id(usuario_id, papel_id)
    return item


@router.delete(
    "/{usuario_id}/{papel_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover vínculo usuário-papel",
    description="Remove atribuição do papel para o usuário informado.",
    responses={
        404: {"model": ErrorResponse, "description": "Associação não encontrada"}
    },
)
async def remover_usuario_papel(
    usuario_id: str,
    papel_id: str,
    service: UsuarioPapelService = Depends(UsuarioPapelService),
):
    await service.remove(usuario_id, papel_id)
    return None
