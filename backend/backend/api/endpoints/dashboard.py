from __future__ import annotations

from datetime import datetime
from uuid import UUID
from typing import List

from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario
from backend.models.avaliacao_model import Avaliacao
from backend.models.tarefa_model import Tarefa
from backend.models.meta_model import Meta
from backend.models.feedback_model import Feedback
from backend.models.equipe_model import Equipe, MembroEquipe
from backend.schemas.dashboard import (
    DashboardSummary,
    DashboardPDIResponse,
    PDIProgressItem,
    DashboardActivityResponse,
    DashboardActivityItem,
    DashboardTeamPerformanceResponse,
    TeamPerformanceItem,
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummary)
async def summary(
    usuario_id: UUID | None = None,
    period: str | None = None,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_session),
):
    # Valida autenticação usando a mesma sessão
    current_user = await get_user_from_token(credentials.credentials, db)
    
    # Avaliações concluídas vs total (para usuario como avaliado)
    evaluations_total_q = select(func.count(Avaliacao.id)).filter(
        Avaliacao.avaliado_id == str(usuario_id) if usuario_id else True
    )
    evaluations_done_q = select(func.count(Avaliacao.id)).filter(
        Avaliacao.avaliado_id == str(usuario_id) if usuario_id else True,
        Avaliacao.status == "concluida",
    )
    tasks_total_q = select(func.count(Tarefa.id)).filter(
        Tarefa.usuario_id == str(usuario_id) if usuario_id else True
    )
    tasks_completed_q = select(func.count(Tarefa.id)).filter(
        Tarefa.usuario_id == str(usuario_id) if usuario_id else True,
        Tarefa.completed.is_(True),
    )

    evaluations_total = (await db.execute(evaluations_total_q)).scalar() or 0
    evaluations_done = (await db.execute(evaluations_done_q)).scalar() or 0
    tasks_total = (await db.execute(tasks_total_q)).scalar() or 0
    tasks_completed = (await db.execute(tasks_completed_q)).scalar() or 0

    evaluations_completion = (
        (evaluations_done / evaluations_total) * 100 if evaluations_total else 0
    )
    # target simples fictício (pode vir de configuração futura)
    evaluations_target = 80.0
    # produtividade fictícia (pode ser derivada de métricas reais)
    productivity_percent = min(100.0, evaluations_completion + tasks_completed)
    # reuniões fictícias (não há entidade ainda) -> 0
    meetings_count = 0

    return DashboardSummary(
        evaluations_completion=evaluations_completion,
        evaluations_target=evaluations_target,
        productivity_percent=productivity_percent,
        meetings_count=meetings_count,
        tasks_total=tasks_total,
        tasks_completed=tasks_completed,
    )


@router.get("/pdi", response_model=DashboardPDIResponse)
async def pdi_progress(
    usuario_id: UUID | None = None,
    period: str | None = None,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_session),
):
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, db)
    
    # Metas do usuário com progresso
    query = (
        select(Meta).filter(Meta.usuario_id == str(usuario_id))
        if usuario_id
        else select(Meta)
    )
    result = await db.execute(query)
    metas: List[Meta] = result.scalars().unique().all()
    items: List[PDIProgressItem] = []
    for m in metas[:10]:  # limitar quantidade para dashboard
        current = float(m.progresso_percentual or 0)
        target = 100.0
        items.append(
            PDIProgressItem(
                meta_id=m.id,
                title=m.titulo,
                current=current,
                target=target,
                status=m.status,
                next_milestone=None,
                last_update=datetime.utcnow(),
            )
        )
    return DashboardPDIResponse(items=items)


@router.get("/activity", response_model=DashboardActivityResponse)
async def recent_activity(
    usuario_id: UUID | None = None,
    period: str | None = None,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_session),
):
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, db)
    
    # Feedbacks recentes direcionados ao usuário
    query = (
        (
            select(Feedback)
            .filter(Feedback.para_usuario_id == str(usuario_id))
            .order_by(Feedback.data_criacao.desc())
            .limit(15)
        )
        if usuario_id
        else select(Feedback).order_by(Feedback.data_criacao.desc()).limit(15)
    )
    result = await db.execute(query)
    feedbacks: List[Feedback] = result.scalars().unique().all()
    items: List[DashboardActivityItem] = []
    for f in feedbacks:
        items.append(
            DashboardActivityItem(
                id=f.id,
                type="feedback",
                title=f"Feedback de {str(f.de_usuario_id)[:6]}",
                description=f.texto[:80],
                time=f.data_criacao.isoformat(),
                priority="medium",
            )
        )
    return DashboardActivityResponse(items=items)


@router.get("/team-performance", response_model=DashboardTeamPerformanceResponse)
async def team_performance(
    usuario_id: UUID | None = None,
    period: str | None = None,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_session),
):
    # Valida autenticação
    current_user = await get_user_from_token(credentials.credentials, db)
    
    # Desempenho simples: número de membros por equipe como base para percentual fictício
    equipes_rs = await db.execute(select(Equipe))
    equipes: List[Equipe] = equipes_rs.scalars().unique().all()
    items: List[TeamPerformanceItem] = []
    for e in equipes[:10]:
        # MembroEquipe possui chave composta (equipe_id, usuario_id); não há coluna 'id'.
        # Contamos pelo usuario_id para obter total de membros na equipe.
        membros_rs = await db.execute(
            select(func.count(MembroEquipe.usuario_id)).filter(
                MembroEquipe.equipe_id == e.id
            )
        )
        membros = membros_rs.scalar() or 0
        performance = min(100.0, membros * 10.0)  # lógica fictícia
        trend = "up" if performance >= 50 else "neutral"
        items.append(
            TeamPerformanceItem(
                equipe_id=e.id,
                name=e.nome,
                members=membros,
                performance=performance,
                trend=trend,
                last_activity="-",
            )
        )
    return DashboardTeamPerformanceResponse(items=items)
