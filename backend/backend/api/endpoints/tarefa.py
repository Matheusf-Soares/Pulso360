from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from backend.models.tarefa_model import Tarefa
from backend.schemas.tarefa import TarefaCreate, TarefaUpdate, TarefaResponse
from backend.services.tarefa_service import TarefaService
from core.dependencies import get_session

router = APIRouter(prefix="/tarefas", tags=["Tarefas"])


@router.post("/", response_model=TarefaResponse, status_code=status.HTTP_201_CREATED)
async def criar_tarefa(
    tarefa_in: TarefaCreate, db: AsyncSession = Depends(get_session)
):
    service = TarefaService(db)
    tarefa = Tarefa(**tarefa_in.model_dump())
    tarefa_criada = await service.criar(tarefa)
    return tarefa_criada


@router.get("/", response_model=List[TarefaResponse])
async def listar_tarefas(
    usuario_id: Optional[str] = None, db: AsyncSession = Depends(get_session)
):
    service = TarefaService(db)
    tarefas = await service.listar(usuario_id)
    return tarefas


@router.get("/{tarefa_id}", response_model=TarefaResponse)
async def obter_tarefa(tarefa_id: str, db: AsyncSession = Depends(get_session)):
    service = TarefaService(db)
    tarefa = await service.obter_por_id(tarefa_id)
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return tarefa


@router.put("/{tarefa_id}", response_model=TarefaResponse)
async def editar_tarefa(
    tarefa_id: str, tarefa_in: TarefaUpdate, db: AsyncSession = Depends(get_session)
):
    service = TarefaService(db)
    tarefa = await service.obter_por_id(tarefa_id)
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    for attr, value in tarefa_in.model_dump(exclude_unset=True).items():
        setattr(tarefa, attr, value)
    tarefa_editada = await service.editar(tarefa)
    return tarefa_editada


@router.delete("/{tarefa_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remover_tarefa(tarefa_id: str, db: AsyncSession = Depends(get_session)):
    service = TarefaService(db)
    tarefa = await service.obter_por_id(tarefa_id)
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    await service.remover(tarefa)
    return None
