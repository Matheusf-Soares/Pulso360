"""Teste de integração abrangente dos principais endpoints.

Cobre CRUD básico e interações essenciais:
- usuarios
- ciclos-avaliacao
- avaliacoes (depende de ciclo + usuarios)
- tarefas
- metas
- feedbacks
- equipes & membros-equipe
- dashboard (summary/pdi/activity/team-performance)

Objetivo: garantir que a API retorne códigos corretos e estrutura mínima.
"""

from __future__ import annotations

import uuid
from datetime import date
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


async def criar_usuario(client: AsyncClient, email: str, nome: str = "User Test"):
    payload = {"nome": nome, "email": email, "senha": "123456"}
    return await client.post(f"{API_PREFIX}/usuarios", json=payload)


@pytest.mark.asyncio
async def test_crud_usuarios(client: AsyncClient):
    email = f"full_user_{uuid.uuid4()}@example.com"
    r_create = await criar_usuario(client, email)
    assert r_create.status_code == 201
    user_id = r_create.json()["id"]

    r_get = await client.get(f"{API_PREFIX}/usuarios/{user_id}")
    assert r_get.status_code == 200
    assert r_get.json()["email"].lower() == email.lower()


@pytest.mark.asyncio
async def test_crud_ciclo_avaliacao(client: AsyncClient):
    nome = f"Ciclo {uuid.uuid4()}"
    payload = {
        "nome": nome,
        "periodo_inicio": date.today().isoformat(),
        "periodo_fim": date.today().isoformat(),
    }
    r_create = await client.post(f"{API_PREFIX}/ciclos-avaliacao", json=payload)
    assert r_create.status_code == 201, r_create.text
    ciclo_id = r_create.json()["id"]

    r_get = await client.get(f"{API_PREFIX}/ciclos-avaliacao/{ciclo_id}")
    assert r_get.status_code == 200
    assert r_get.json()["nome"] == nome


@pytest.mark.asyncio
async def test_crud_avaliacoes(client: AsyncClient):
    # dependências: usuarios + ciclo
    email_avaliado = f"avaliado_{uuid.uuid4()}@example.com"
    email_avaliador = f"avaliador_{uuid.uuid4()}@example.com"
    r_u1 = await criar_usuario(client, email_avaliado)
    r_u2 = await criar_usuario(client, email_avaliador)
    assert r_u1.status_code == 201 and r_u2.status_code == 201
    avaliado_id = r_u1.json()["id"]
    avaliador_id = r_u2.json()["id"]

    ciclo_payload = {
        "nome": f"Ciclo Aval {uuid.uuid4()}",
        "periodo_inicio": date.today().isoformat(),
        "periodo_fim": date.today().isoformat(),
    }
    r_ciclo = await client.post(f"{API_PREFIX}/ciclos-avaliacao", json=ciclo_payload)
    assert r_ciclo.status_code == 201
    ciclo_id = r_ciclo.json()["id"]

    avaliacao_payload = {
        "avaliado_id": avaliado_id,
        "avaliador_id": avaliador_id,
        "ciclo_id": ciclo_id,
    }
    r_create = await client.post(f"{API_PREFIX}/avaliacoes", json=avaliacao_payload)
    assert r_create.status_code == 201, r_create.text
    avaliacao_id = r_create.json()["id"]

    # concluir
    r_concluir = await client.post(f"{API_PREFIX}/avaliacoes/{avaliacao_id}/concluir")
    assert r_concluir.status_code == 200
    assert r_concluir.json()["status"] != "rascunho"


@pytest.mark.asyncio
async def test_crud_tarefas(client: AsyncClient):
    r_create = await client.post(
        f"{API_PREFIX}/tarefas/",
        json={"titulo": "Tarefa X", "prioridade": "high", "categoria": "geral"},
    )
    assert r_create.status_code == 201
    tarefa_id = r_create.json()["id"]
    r_toggle = await client.patch(f"{API_PREFIX}/tarefas/{tarefa_id}/toggle")
    assert r_toggle.status_code == 200
    r_del = await client.delete(f"{API_PREFIX}/tarefas/{tarefa_id}")
    assert r_del.status_code == 204


@pytest.mark.asyncio
async def test_crud_metas(client: AsyncClient):
    # criar usuario para associar
    email = f"meta_user_{uuid.uuid4()}@example.com"
    r_u = await criar_usuario(client, email)
    assert r_u.status_code == 201
    usuario_id = r_u.json()["id"]
    meta_payload = {
        "titulo": "Meta Teste",
        "usuario_id": usuario_id,
        "progresso_percentual": 25,
    }
    r_create = await client.post(f"{API_PREFIX}/metas", json=meta_payload)
    assert r_create.status_code == 201, r_create.text
    meta_id = r_create.json()["id"]

    r_get = await client.get(f"{API_PREFIX}/metas/{meta_id}")
    assert r_get.status_code == 200
    assert r_get.json()["titulo"] == "Meta Teste"


@pytest.mark.asyncio
async def test_crud_feedbacks(client: AsyncClient):
    email1 = f"fb_user_{uuid.uuid4()}@example.com"
    email2 = f"fb_user_{uuid.uuid4()}@example.com"
    r_u1 = await criar_usuario(client, email1)
    r_u2 = await criar_usuario(client, email2)
    assert r_u1.status_code == 201 and r_u2.status_code == 201
    id1 = r_u1.json()["id"]
    id2 = r_u2.json()["id"]
    fb_payload = {
        "de_usuario_id": id1,
        "para_usuario_id": id2,
        "tipo": "geral",
        "texto": "Bom trabalho",
    }
    r_create = await client.post(f"{API_PREFIX}/feedbacks", json=fb_payload)
    assert r_create.status_code == 201
    fb_id = r_create.json()["id"]

    r_get = await client.get(f"{API_PREFIX}/feedbacks/{fb_id}")
    assert r_get.status_code == 200
    assert r_get.json()["texto"].startswith("Bom")


@pytest.mark.asyncio
async def test_crud_equipes_membros(client: AsyncClient):
    # criar equipe
    equipe_payload = {"nome": f"Equipe {uuid.uuid4()}"}
    r_eq = await client.post(f"{API_PREFIX}/equipes", json=equipe_payload)
    assert r_eq.status_code == 201
    equipe_id = r_eq.json()["id"]
    # criar usuário
    email = f"membro_{uuid.uuid4()}@example.com"
    r_u = await criar_usuario(client, email)
    assert r_u.status_code == 201
    usuario_id = r_u.json()["id"]
    # adicionar membro
    membro_payload = {"equipe_id": equipe_id, "usuario_id": usuario_id}
    r_m = await client.post(f"{API_PREFIX}/membros-equipe", json=membro_payload)
    assert r_m.status_code == 201
    # obter membro
    r_get = await client.get(f"{API_PREFIX}/membros-equipe/{equipe_id}/{usuario_id}")
    assert r_get.status_code == 200


@pytest.mark.asyncio
async def test_dashboard_endpoints(client: AsyncClient):
    # summary
    r_sum = await client.get(f"{API_PREFIX}/dashboard/summary")
    assert r_sum.status_code == 200
    # pdi
    r_pdi = await client.get(f"{API_PREFIX}/dashboard/pdi")
    assert r_pdi.status_code == 200
    # activity
    r_act = await client.get(f"{API_PREFIX}/dashboard/activity")
    assert r_act.status_code == 200
    # team performance
    r_team = await client.get(f"{API_PREFIX}/dashboard/team-performance")
    assert r_team.status_code == 200
