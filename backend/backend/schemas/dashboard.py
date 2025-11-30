from __future__ import annotations

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel


class DashboardSummary(BaseModel):
    evaluations_completion: float
    evaluations_target: float
    productivity_percent: float
    meetings_count: int
    tasks_total: int
    tasks_completed: int


class PDIProgressItem(BaseModel):
    meta_id: UUID
    title: str
    current: float
    target: float
    status: str
    next_milestone: Optional[str] = None
    last_update: Optional[datetime] = None


class DashboardActivityItem(BaseModel):
    id: UUID
    type: str
    title: str
    description: str
    time: str
    priority: str


class TeamPerformanceItem(BaseModel):
    equipe_id: UUID
    name: str
    members: int
    performance: float
    trend: str
    last_activity: str


class DashboardPDIResponse(BaseModel):
    items: List[PDIProgressItem]


class DashboardActivityResponse(BaseModel):
    items: List[DashboardActivityItem]


class DashboardTeamPerformanceResponse(BaseModel):
    items: List[TeamPerformanceItem]
