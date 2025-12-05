from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from core.dependencies import get_session
from backend.models.tarefa_model import Tarefa
from backend.repositories.tarefa_repository import TarefaRepository
from backend.schemas.tarefa import (
    TarefaCreate,
    TarefaUpdate,
    TarefaResponse,
    TarefaToggleResponse,
)

router = APIRouter(prefix="/tarefas", tags=["Tarefas"])


@router.get("/", response_model=List[TarefaResponse])
async def listar_tarefas(
    usuario_id: UUID | None = None,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    return await repo.listar(usuario_id=str(usuario_id) if usuario_id else None)


@router.post("/", response_model=TarefaResponse, status_code=status.HTTP_201_CREATED)
async def criar_tarefa(
    dados: TarefaCreate,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    tarefa = Tarefa(
        titulo=dados.titulo.strip(),
        due_date=dados.due_date,
        prioridade=dados.prioridade,
        categoria=dados.categoria,
        completed=dados.completed or False,
        usuario_id=str(dados.usuario_id) if dados.usuario_id else None,
    )
    await repo.criar(tarefa)
    return tarefa


@router.put("/{tarefa_id}", response_model=TarefaResponse)
async def atualizar_tarefa(
    tarefa_id: UUID,
    dados: TarefaUpdate,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    tarefa = await repo.obter_por_id(str(tarefa_id))
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    if dados.titulo is not None:
        tarefa.titulo = dados.titulo.strip()
    if dados.due_date is not None:
        tarefa.due_date = dados.due_date
    if dados.prioridade is not None:
        tarefa.prioridade = dados.prioridade
    if dados.categoria is not None:
        tarefa.categoria = dados.categoria
    if dados.completed is not None:
        tarefa.completed = dados.completed
    await repo.editar(tarefa)
    return tarefa


@router.delete("/{tarefa_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_tarefa(
    tarefa_id: UUID,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    tarefa = await repo.obter_por_id(str(tarefa_id))
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    await repo.remover(tarefa)
    return None


@router.get("/{tarefa_id}", response_model=TarefaResponse)
async def obter_tarefa(
    tarefa_id: UUID,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    tarefa = await repo.obter_por_id(str(tarefa_id))
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return tarefa


@router.patch("/{tarefa_id}/toggle", response_model=TarefaToggleResponse)
async def toggle_tarefa(
    tarefa_id: UUID,
    db: AsyncSession = Depends(get_session),
    repo: TarefaRepository = Depends(),
):
    tarefa = await repo.obter_por_id(str(tarefa_id))
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    tarefa.completed = not tarefa.completed
    await repo.editar(tarefa)
    return tarefa
