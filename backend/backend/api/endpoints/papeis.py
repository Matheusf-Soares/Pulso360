from __future__ import annotations

from fastapi import APIRouter, Depends, status
from schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from services.papel_service import PapelService
from schemas.papel import PapelCreate, PapelRead, PapelUpdate
from filters.papel_filter import PapelFilter

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
    filtro: PapelFilter = Depends(), service: PapelService = Depends(PapelService)
):
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
