from __future__ import annotations

from fastapi import APIRouter, Depends, status
from schemas.error import ErrorResponse
from fastapi_pagination import Page, paginate

from services.usuario_competencia_service import UsuarioCompetenciaService
from schemas.usuario_competencia import (
    UsuarioCompetenciaCreate,
    UsuarioCompetenciaRead,
    UsuarioCompetenciaUpdate,
)
from filters.usuario_competencia_filter import UsuarioCompetenciaFilter

router = APIRouter(prefix="/usuario-competencias", tags=["usuario-competencias"])


@router.post(
    "",
    response_model=UsuarioCompetenciaRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar competência de usuário",
    description="Registra nível de proficiência de uma competência para o usuário.",
    responses={404: {"model": ErrorResponse, "description": "Usuário não encontrado"}},
)
async def criar_competencia(
    payload: UsuarioCompetenciaCreate,
    service: UsuarioCompetenciaService = Depends(UsuarioCompetenciaService),
):
    item = await service.add(payload.model_dump())
    return item


@router.get(
    "",
    response_model=Page[UsuarioCompetenciaRead],
    summary="Listar competências de usuários",
    description="Lista competências com filtros por usuário, nome e níveis.",
)
async def listar_competencias(
    filtro: UsuarioCompetenciaFilter = Depends(),
    service: UsuarioCompetenciaService = Depends(UsuarioCompetenciaService),
):
    itens = await service.filter(filtro.model_dump(exclude_none=True))
    return paginate(itens)


@router.get(
    "/{competencia_id}",
    response_model=UsuarioCompetenciaRead,
    summary="Obter competência",
    description="Retorna competência específica pelo seu ID.",
    responses={
        404: {"model": ErrorResponse, "description": "Competência não encontrada"}
    },
)
async def obter_competencia(
    competencia_id: str,
    service: UsuarioCompetenciaService = Depends(UsuarioCompetenciaService),
):
    item = await service.get_by_id(competencia_id)
    return item


@router.put(
    "/{competencia_id}",
    response_model=UsuarioCompetenciaRead,
    summary="Atualizar competência",
    description="Atualiza dados enviados (ex: nível, descrição) da competência.",
    responses={
        404: {"model": ErrorResponse, "description": "Competência não encontrada"}
    },
)
async def atualizar_competencia(
    competencia_id: str,
    payload: UsuarioCompetenciaUpdate,
    service: UsuarioCompetenciaService = Depends(UsuarioCompetenciaService),
):
    item = await service.edit(competencia_id, payload.model_dump(exclude_none=True))
    return item


@router.delete(
    "/{competencia_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover competência",
    description="Exclui o registro de competência do usuário informado.",
    responses={
        404: {"model": ErrorResponse, "description": "Competência não encontrada"}
    },
)
async def remover_competencia(
    competencia_id: str,
    service: UsuarioCompetenciaService = Depends(UsuarioCompetenciaService),
):
    await service.remove(competencia_id)
    return None
