"""Testes para endpoints de Tarefas.

Cobrem fluxo CRUD completo e toggle de completed.
Dependem de banco e migrações aplicadas.
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
    payload = {"nome": "User Tarefa", "email": email, "senha": "123456"}
    return await client.post(f"{API_PREFIX}/usuarios", json=payload)


@pytest.mark.asyncio
async def test_tarefas_crud_sem_usuario(client: AsyncClient):
    # listar vazio inicial
    r_list_initial = await client.get(f"{API_PREFIX}/tarefas/")
    assert r_list_initial.status_code == 200
    initial_count = len(r_list_initial.json())

    # criar sem usuario_id
    r_create = await client.post(
        f"{API_PREFIX}/tarefas/",
        json={"titulo": "Tarefa Geral", "prioridade": "high", "categoria": "geral"},
    )
    assert r_create.status_code == 201, r_create.text
    tarefa_id = r_create.json()["id"]
    assert r_create.json()["completed"] is False

    # listar após criação
    r_list_after = await client.get(f"{API_PREFIX}/tarefas/")
    assert r_list_after.status_code == 200
    assert len(r_list_after.json()) == initial_count + 1

    # atualizar
    r_put = await client.put(
        f"{API_PREFIX}/tarefas/{tarefa_id}",
        json={"categoria": "alterada", "completed": True},
    )
    assert r_put.status_code == 200
    assert r_put.json()["completed"] is True
    assert r_put.json()["categoria"] == "alterada"

    # toggle
    r_toggle = await client.patch(f"{API_PREFIX}/tarefas/{tarefa_id}/toggle")
    assert r_toggle.status_code == 200
    assert r_toggle.json()["completed"] is False

    # delete
    r_del = await client.delete(f"{API_PREFIX}/tarefas/{tarefa_id}")
    assert r_del.status_code == 204

    # not found
    r_get_nf = await client.get(f"{API_PREFIX}/tarefas/{tarefa_id}")
    assert r_get_nf.status_code == 404


@pytest.mark.asyncio
async def test_tarefas_crud_filtradas_por_usuario(client: AsyncClient):
    email = f"tarefas_user_{uuid.uuid4()}@example.com"
    r_user = await criar_usuario(client, email)
    assert r_user.status_code == 201
    usuario_id = r_user.json()["id"]

    # criar associada ao usuario (query param usuario_id)
    r_create_user_task = await client.post(
        f"{API_PREFIX}/tarefas/?usuario_id={usuario_id}",
        json={"titulo": "Tarefa Usuário", "prioridade": "medium"},
    )
    assert r_create_user_task.status_code == 201
    tarefa_id = r_create_user_task.json()["id"]

    # listar todas
    r_list_all = await client.get(f"{API_PREFIX}/tarefas/")
    assert r_list_all.status_code == 200
    # listar filtradas
    r_list_filtered = await client.get(f"{API_PREFIX}/tarefas/?usuario_id={usuario_id}")
    assert r_list_filtered.status_code == 200
    filtered = r_list_filtered.json()
    assert any(t["id"] == tarefa_id for t in filtered)
    # garantir que filtro reduz (se houver outras tarefas)
    if len(r_list_all.json()) > len(filtered):
        assert all(t.get("usuario_id") == usuario_id for t in filtered)

    # toggle e depois delete
    r_toggle = await client.patch(f"{API_PREFIX}/tarefas/{tarefa_id}/toggle")
    assert r_toggle.status_code == 200
    r_del = await client.delete(f"{API_PREFIX}/tarefas/{tarefa_id}")
    assert r_del.status_code == 204
