from __future__ import annotations

from fastapi import APIRouter, Depends, status
from schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from services.membro_equipe_service import MembroEquipeService
from schemas.membro_equipe import (
    MembroEquipeCreate,
    MembroEquipeRead,
    MembroEquipeUpdate,
)
from filters.membro_equipe_filter import MembroEquipeFilter

router = APIRouter(prefix="/membros-equipe", tags=["membros-equipe"])


@router.post(
    "",
    response_model=MembroEquipeRead,
    status_code=status.HTTP_201_CREATED,
    summary="Adicionar membro à equipe",
    description="Inclui um usuário em uma equipe definindo papel/função e datas de participação.",
    responses={
        400: {"model": ErrorResponse, "description": "Usuário já é membro"},
        404: {
            "model": ErrorResponse,
            "description": "Equipe ou usuário não encontrado",
        },
    },
)
async def adicionar_membro(
    payload: MembroEquipeCreate,
    service: MembroEquipeService = Depends(MembroEquipeService),
):
    membro = await service.add(payload.model_dump())
    return membro


@router.get(
    "",
    response_model=Page[MembroEquipeRead],
    summary="Listar membros de equipes",
    description="Lista membros com filtros por equipe, usuário e intervalos de datas.",
)
async def listar_membros(
    filtro: MembroEquipeFilter = Depends(),
    service: MembroEquipeService = Depends(MembroEquipeService),
):
    membros = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(membros)


@router.get(
    "/{equipe_id}/{usuario_id}",
    response_model=MembroEquipeRead,
    summary="Obter membro específico",
    description="Recupera o vínculo de um usuário com uma equipe usando ambos IDs.",
    responses={404: {"model": ErrorResponse, "description": "Membro não encontrado"}},
)
async def obter_membro(
    equipe_id: str,
    usuario_id: str,
    service: MembroEquipeService = Depends(MembroEquipeService),
):
    membro = await service.get_by_id(equipe_id, usuario_id)
    return membro


@router.put(
    "/{equipe_id}/{usuario_id}",
    response_model=MembroEquipeRead,
    summary="Atualizar membro de equipe",
    description="Atualiza atributos do vínculo (datas, função, status).",
    responses={404: {"model": ErrorResponse, "description": "Membro não encontrado"}},
)
async def atualizar_membro(
    equipe_id: str,
    usuario_id: str,
    payload: MembroEquipeUpdate,
    service: MembroEquipeService = Depends(MembroEquipeService),
):
    membro = await service.edit(
        equipe_id, usuario_id, payload.model_dump(exclude_none=True)
    )
    return membro


@router.delete(
    "/{equipe_id}/{usuario_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover membro de equipe",
    description="Remove a associação do usuário à equipe fornecida.",
    responses={404: {"model": ErrorResponse, "description": "Membro não encontrado"}},
)
async def remover_membro(
    equipe_id: str,
    usuario_id: str,
    service: MembroEquipeService = Depends(MembroEquipeService),
):
    await service.remove(equipe_id, usuario_id)
    return None
