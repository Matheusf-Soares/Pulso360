"""Testes integrados dos endpoints existentes em um único arquivo.

Assume que o banco de dados está acessível e migrações aplicadas.
Testa cenários de sucesso e erros HTTP.
"""

from __future__ import annotations

from datetime import date, timedelta
import uuid

import pytest
import pytest_asyncio
from httpx import AsyncClient

from backend.main import app
from backend.core.configs import settings


@pytest_asyncio.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c


API_PREFIX = settings.API_V1_STR


async def criar_usuario(client: AsyncClient, email: str, senha: str = "123456"):
    payload = {
        "nome": "Usuario Teste",
        "email": email,
        "cargo": "Dev",
        "senha": senha,
    }
    r = await client.post(f"{API_PREFIX}/usuarios", json=payload)
    return r


@pytest.mark.asyncio
async def test_usuario_criacao_sucesso_e_fluxo_crud(client: AsyncClient):
    email = f"teste_{uuid.uuid4()}@exemplo.com"
    # create
    resp_create = await criar_usuario(client, email)
    assert resp_create.status_code == 201, resp_create.text
    usuario_id = resp_create.json()["id"]

    # get
    resp_get = await client.get(f"{API_PREFIX}/usuarios/{usuario_id}")
    assert resp_get.status_code == 200
    assert resp_get.json()["email"] == email

    # update
    resp_put = await client.put(
        f"{API_PREFIX}/usuarios/{usuario_id}",
        json={"cargo": "Senior Dev", "senha": "654321"},
    )
    assert resp_put.status_code == 200
    assert resp_put.json()["cargo"] == "Senior Dev"

    # list
    resp_list = await client.get(f"{API_PREFIX}/usuarios")
    assert resp_list.status_code == 200
    body = resp_list.json()
    assert "items" in body

    # delete
    resp_del = await client.delete(f"{API_PREFIX}/usuarios/{usuario_id}")
    assert resp_del.status_code == 204

    # get not found
    resp_get_nf = await client.get(f"{API_PREFIX}/usuarios/{usuario_id}")
    assert resp_get_nf.status_code == 404
    detail = resp_get_nf.json()["detail"]
    assert detail["code"] == "NOT_FOUND"


@pytest.mark.asyncio
async def test_usuario_criacao_senha_invalida(client: AsyncClient):
    email = f"invalid_{uuid.uuid4()}@exemplo.com"
    resp = await criar_usuario(client, email, senha="123")
    # Validação Pydantic -> 422
    assert resp.status_code == 422
    body = resp.json()
    assert body["detail"][0]["loc"][-1] == "senha"


async def criar_ciclo(client: AsyncClient, nome: str, inicio: date, fim: date):
    payload = {
        "nome": nome,
        "periodo_inicio": inicio.isoformat(),
        "periodo_fim": fim.isoformat(),
        "status": "ativo",
    }
    return await client.post(f"{API_PREFIX}/ciclos-avaliacao", json=payload)


@pytest.mark.asyncio
async def test_ciclo_avaliacao_fluxo_sucesso_e_erros(client: AsyncClient):
    base_nome = f"Ciclo-{uuid.uuid4()}"
    hoje = date.today()
    fim_ok = hoje + timedelta(days=30)

    # sucesso
    r_create = await criar_ciclo(client, base_nome, hoje, fim_ok)
    assert r_create.status_code == 201, r_create.text
    ciclo_id = r_create.json()["id"]

    # erro periodo inválido (fim < inicio)
    r_bad_period = await criar_ciclo(client, base_nome + "-inv", fim_ok, hoje)
    assert r_bad_period.status_code == 400
    assert r_bad_period.json()["detail"]["code"] == "BAD_REQUEST"

    # sobreposição nome/período (mesmo nome e período intersecta)
    r_overlap = await criar_ciclo(
        client, base_nome, hoje + timedelta(days=5), fim_ok + timedelta(days=10)
    )
    assert r_overlap.status_code == 400
    assert "sobrepõe" in r_overlap.json()["detail"]["detail"]

    # get
    r_get = await client.get(f"{API_PREFIX}/ciclos-avaliacao/{ciclo_id}")
    assert r_get.status_code == 200

    # update com período inválido
    r_put_bad = await client.put(
        f"{API_PREFIX}/ciclos-avaliacao/{ciclo_id}",
        json={"periodo_inicio": fim_ok.isoformat(), "periodo_fim": hoje.isoformat()},
    )
    assert r_put_bad.status_code == 400

    # delete
    r_del = await client.delete(f"{API_PREFIX}/ciclos-avaliacao/{ciclo_id}")
    assert r_del.status_code == 204

    # get not found
    r_get_nf = await client.get(f"{API_PREFIX}/ciclos-avaliacao/{ciclo_id}")
    assert r_get_nf.status_code == 404

    # get com uuid aleatório inexistente
    random_id = str(uuid.uuid4())
    r_get_rand = await client.get(f"{API_PREFIX}/ciclos-avaliacao/{random_id}")
    # pode ser 404 ou se futuro middleware diferir; validar 404 atualmente
    assert r_get_rand.status_code == 404


@pytest.mark.asyncio
async def test_equipes_crud_e_erros(client: AsyncClient):
    # criar equipe
    nome = f"Equipe-{uuid.uuid4()}"
    r_create = await client.post(f"{API_PREFIX}/equipes", json={"nome": nome})
    assert r_create.status_code == 201
    equipe_id = r_create.json()["id"]
    # obter
    r_get = await client.get(f"{API_PREFIX}/equipes/{equipe_id}")
    assert r_get.status_code == 200
    # atualizar
    r_put = await client.put(f"{API_PREFIX}/equipes/{equipe_id}", json={"descricao": "Nova desc"})
    assert r_put.status_code == 200
    # listar
    r_list = await client.get(f"{API_PREFIX}/equipes")
    assert r_list.status_code == 200
    # remover
    r_del = await client.delete(f"{API_PREFIX}/equipes/{equipe_id}")
    assert r_del.status_code == 204
    # not found
    r_nf = await client.get(f"{API_PREFIX}/equipes/{equipe_id}")
    assert r_nf.status_code == 404


@pytest.mark.asyncio
async def test_papeis_crud_e_usuario_papel(client: AsyncClient):
    # criar papel
    nome_papel = f"Papel-{uuid.uuid4()}"
    r_papel = await client.post(f"{API_PREFIX}/papeis", json={"nome": nome_papel})
    assert r_papel.status_code == 201
    papel_id = r_papel.json()["id"]
    # criar usuario
    email = f"papel_{uuid.uuid4()}@exemplo.com"
    r_usuario = await client.post(f"{API_PREFIX}/usuarios", json={"nome": "User Papel", "email": email, "senha": "123456"})
    assert r_usuario.status_code == 201
    usuario_id = r_usuario.json()["id"]
    # atribuir papel
    r_attr = await client.post(f"{API_PREFIX}/usuario-papeis", json={"usuario_id": usuario_id, "papel_id": papel_id})
    assert r_attr.status_code == 201
    # atribuir duplicado -> 400
    r_attr_dup = await client.post(f"{API_PREFIX}/usuario-papeis", json={"usuario_id": usuario_id, "papel_id": papel_id})
    assert r_attr_dup.status_code == 400
    # obter vínculo
    r_get_vinc = await client.get(f"{API_PREFIX}/usuario-papeis/{usuario_id}/{papel_id}")
    assert r_get_vinc.status_code == 200
    # remover vínculo
    r_del_vinc = await client.delete(f"{API_PREFIX}/usuario-papeis/{usuario_id}/{papel_id}")
    assert r_del_vinc.status_code == 204
    # vínculo não encontrado
    r_get_vinc_nf = await client.get(f"{API_PREFIX}/usuario-papeis/{usuario_id}/{papel_id}")
    assert r_get_vinc_nf.status_code == 404
    # remover papel
    r_del_papel = await client.delete(f"{API_PREFIX}/papeis/{papel_id}")
    assert r_del_papel.status_code == 204


@pytest.mark.asyncio
async def test_usuario_competencia_crud(client: AsyncClient):
    # criar usuario
    email = f"comp_{uuid.uuid4()}@exemplo.com"
    r_usuario = await client.post(f"{API_PREFIX}/usuarios", json={"nome": "User Competencia", "email": email, "senha": "123456"})
    assert r_usuario.status_code == 201
    usuario_id = r_usuario.json()["id"]
    # criar competencia
    r_comp = await client.post(f"{API_PREFIX}/usuario-competencias", json={"usuario_id": usuario_id, "nome": "Python", "nivel": 3})
    assert r_comp.status_code == 201
    comp_id = r_comp.json()["id"]
    # obter
    r_get = await client.get(f"{API_PREFIX}/usuario-competencias/{comp_id}")
    assert r_get.status_code == 200
    # atualizar
    r_put = await client.put(f"{API_PREFIX}/usuario-competencias/{comp_id}", json={"nivel": 4})
    assert r_put.status_code == 200
    assert r_put.json()["nivel"] == 4
    # listar
    r_list = await client.get(f"{API_PREFIX}/usuario-competencias")
    assert r_list.status_code == 200
    # remover
    r_del = await client.delete(f"{API_PREFIX}/usuario-competencias/{comp_id}")
    assert r_del.status_code == 204
    # not found
    r_nf = await client.get(f"{API_PREFIX}/usuario-competencias/{comp_id}")
    assert r_nf.status_code == 404
