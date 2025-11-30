"""Testes para endpoints de Dashboard.

Verifica estrutura das respostas em /dashboard/summary, /pdi, /activity e /team-performance
com e sem usuario_id. Aceita listas vazias (dependendo de dados existentes), mas valida chaves.
"""

from __future__ import annotations

import uuid
import pytest
import pytest_asyncio
from httpx import AsyncClient

from backend.main import app
from backend.core.configs import settings

API_PREFIX = settings.API_V1_STR


@pytest_asyncio.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c


async def criar_usuario(client: AsyncClient, email: str):
    payload = {"nome": "User Dashboard", "email": email, "senha": "123456"}
    return await client.post(f"{API_PREFIX}/usuarios", json=payload)


@pytest.mark.asyncio
async def test_dashboard_summary_sem_usuario(client: AsyncClient):
    r = await client.get(f"{API_PREFIX}/dashboard/summary")
    assert r.status_code == 200, r.text
    data = r.json()
    expected_keys = {
        "evaluations_completion",
        "evaluations_target",
        "productivity_percent",
        "meetings_count",
        "tasks_total",
        "tasks_completed",
    }
    assert expected_keys.issubset(data.keys())
    # tipos básicos
    assert isinstance(data["evaluations_completion"], (int, float))
    assert isinstance(data["tasks_total"], int)


@pytest.mark.asyncio
async def test_dashboard_summary_com_usuario(client: AsyncClient):
    email = f"dash_user_{uuid.uuid4()}@example.com"
    r_user = await criar_usuario(client, email)
    assert r_user.status_code == 201
    usuario_id = r_user.json()["id"]
    r = await client.get(f"{API_PREFIX}/dashboard/summary?usuario_id={usuario_id}")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data["evaluations_completion"], (int, float))


@pytest.mark.asyncio
async def test_dashboard_pdi(client: AsyncClient):
    r = await client.get(f"{API_PREFIX}/dashboard/pdi")
    assert r.status_code == 200
    data = r.json()
    assert "items" in data
    for item in data["items"]:
        assert {
            "meta_id",
            "title",
            "current",
            "target",
            "status",
            "next_milestone",
            "last_update",
        }.issubset(item.keys())


@pytest.mark.asyncio
async def test_dashboard_activity(client: AsyncClient):
    r = await client.get(f"{API_PREFIX}/dashboard/activity")
    assert r.status_code == 200
    data = r.json()
    assert "items" in data
    for item in data["items"]:
        assert {"id", "type", "title", "description", "time", "priority"}.issubset(
            item.keys()
        )


@pytest.mark.asyncio
async def test_dashboard_team_performance(client: AsyncClient):
    r = await client.get(f"{API_PREFIX}/dashboard/team-performance")
    assert r.status_code == 200
    data = r.json()
    assert "items" in data
    for item in data["items"]:
        assert {
            "equipe_id",
            "name",
            "members",
            "performance",
            "trend",
            "last_activity",
        }.issubset(item.keys())
