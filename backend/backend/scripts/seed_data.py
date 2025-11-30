"""Script de carga inicial (seed) para popular a API com dados de exemplo.

Executa chamadas HTTP aos endpoints FastAPI para criar usuários, tarefas,
metas, avaliações básicas, feedbacks e equipes/membros.

Uso:
    poetry run python backend/scripts/seed_data.py

Pode configurar variáveis de ambiente:
    BASE_URL (default: http://localhost:8000)
    API_PREFIX (default: /api/v1)

Senha padrão usada: 123456
"""

from __future__ import annotations

import os
import sys
import random
import argparse
from typing import Dict, List

import requests


BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")
API_PREFIX = os.getenv("API_PREFIX", "/api/v1")
PASSWORD = "123456"


def url(path: str) -> str:
    """Constrói URL sem quebrar o protocolo.

    Evita o uso de replace("//","/") que removia a segunda barra de "http://".
    Aceita BASE_URL com ou sem barra final e API_PREFIX com ou sem barra inicial.
    """
    base = BASE_URL.rstrip("/")
    prefix = API_PREFIX if API_PREFIX.startswith("/") else "/" + API_PREFIX
    path_part = path if path.startswith("/") else "/" + path
    return base + prefix + path_part


def log(msg: str):
    print(f"[seed] {msg}")


def create_user(email: str, nome: str, verbose: bool = False) -> str:
    payload = {"nome": nome, "email": email, "senha": PASSWORD}
    endpoint = url("/usuarios")
    if verbose:
        log(f"POST {endpoint} -> criar usuario {email}")
    r = requests.post(endpoint, json=payload)
    if r.status_code == 201:
        log(f"Usuário criado: {email}")
        return r.json()["id"]
    elif r.status_code == 400:
        log(f"Usuário já existe ou inválido ({email}) - tentando obter id...")
        # tentativa de localizar via listagem simples (pagina 1) - requer paginação.
        r_list = requests.get(url("/usuarios"))
        if r_list.ok:
            for item in r_list.json().get("items", []):
                if item.get("email") == email:
                    return item["id"]
        raise RuntimeError(f"Falha ao obter ID de usuário existente: {email}")
    else:
        raise RuntimeError(f"Erro ao criar usuário {email}: {r.status_code} {r.text}")


def login(email: str, verbose: bool = False) -> str:
    payload = {"email": email, "senha": PASSWORD}
    endpoint = url("/auth/login")
    if verbose:
        log(f"POST {endpoint} -> login {email}")
    r = requests.post(endpoint, json=payload)
    if r.status_code == 200:
        token = r.json().get("access_token")
        if not token:
            raise RuntimeError("Resposta de login sem access_token")
        log(f"Login OK: {email}")
        return token
    else:
        raise RuntimeError(f"Falha login {email}: {r.status_code} {r.text}")


def auth_headers(token: str) -> Dict[str, str]:
    return {"Authorization": f"Bearer {token}"}


def create_task(
    token: str,
    titulo: str,
    usuario_id: str | None,
    prioridade: str = "medium",
    categoria: str = "geral",
    verbose: bool = False,
) -> str:
    params = {}
    if usuario_id:
        params["usuario_id"] = usuario_id
    payload = {"titulo": titulo, "prioridade": prioridade, "categoria": categoria}
    endpoint = url("/tarefas/")
    if verbose:
        log(f"POST {endpoint} params={params} -> tarefa '{titulo}'")
    r = requests.post(
        endpoint, json=payload, params=params, headers=auth_headers(token)
    )
    if r.status_code == 201:
        return r.json()["id"]
    raise RuntimeError(f"Erro criar tarefa: {r.status_code} {r.text}")


def create_meta(
    token: str, usuario_id: str, titulo: str, progresso: float, verbose: bool = False
) -> str:
    payload = {
        "titulo": titulo,
        "usuario_id": usuario_id,
        "progresso_percentual": progresso,
        "status": "em_andamento",
    }
    endpoint = url("/metas")
    if verbose:
        log(f"POST {endpoint} -> meta '{titulo}' progresso={progresso}")
    r = requests.post(endpoint, json=payload, headers=auth_headers(token))
    if r.status_code == 201:
        return r.json()["id"]
    raise RuntimeError(f"Erro criar meta: {r.status_code} {r.text}")


def create_feedback(
    token: str,
    de_usuario_id: str,
    para_usuario_id: str,
    texto: str,
    verbose: bool = False,
) -> str:
    payload = {
        "de_usuario_id": de_usuario_id,
        "para_usuario_id": para_usuario_id,
        "tipo": "geral",
        "texto": texto,
    }
    endpoint = url("/feedbacks")
    if verbose:
        log(
            f"POST {endpoint} -> feedback de {de_usuario_id[:6]} para {para_usuario_id[:6]}"
        )
    r = requests.post(endpoint, json=payload, headers=auth_headers(token))
    if r.status_code == 201:
        return r.json()["id"]
    raise RuntimeError(f"Erro criar feedback: {r.status_code} {r.text}")


def create_equipe(token: str, nome: str, verbose: bool = False) -> str:
    payload = {"nome": nome}
    endpoint = url("/equipes")
    if verbose:
        log(f"POST {endpoint} -> equipe '{nome}'")
    r = requests.post(endpoint, json=payload, headers=auth_headers(token))
    if r.status_code == 201:
        return r.json()["id"]
    raise RuntimeError(f"Erro criar equipe: {r.status_code} {r.text}")


def add_membro_equipe(
    token: str, equipe_id: str, usuario_id: str, verbose: bool = False
) -> None:
    payload = {"equipe_id": equipe_id, "usuario_id": usuario_id}
    endpoint = url("/membros-equipe")
    if verbose:
        log(
            f"POST {endpoint} -> membro usuario={usuario_id[:6]} equipe={equipe_id[:6]}"
        )
    r = requests.post(endpoint, json=payload, headers=auth_headers(token))
    if r.status_code not in (201, 400):  # 400 se já existe
        raise RuntimeError(f"Erro adicionar membro equipe: {r.status_code} {r.text}")


def seed_usuario_principal(email: str, verbose: bool = False) -> dict:
    usuario_id = create_user(email, "Usuário Principal", verbose=verbose)
    token = login(email, verbose=verbose)
    return {"id": usuario_id, "token": token}


def main():
    parser = argparse.ArgumentParser(description="Seed de dados Pulso360")
    parser.add_argument(
        "--verbose", action="store_true", help="Exibir URLs e requisições"
    )
    parser.add_argument(
        "--usuarios-extra", type=int, default=3, help="Qtd usuários adicionais"
    )
    parser.add_argument(
        "--tarefas", type=int, default=7, help="Qtd tarefas do principal"
    )
    parser.add_argument(
        "--tarefas-gerais", type=int, default=4, help="Qtd tarefas sem usuário"
    )
    parser.add_argument("--metas", type=int, default=4, help="Qtd metas do principal")
    args = parser.parse_args()

    verbose = args.verbose
    log(f"Iniciando seed contra {BASE_URL}{API_PREFIX} (verbose={verbose})")
    # Checagem simples de conectividade
    try:
        r_health = requests.get(url("/usuarios"))
        if not r_health.ok:
            log(f"Aviso: /usuarios retornou {r_health.status_code}")
    except Exception as e:
        log(f"Erro de conexão inicial: {e}")
        sys.exit(1)

    principal = seed_usuario_principal("teste@gmail.com", verbose=verbose)

    # Usuários adicionais
    outros_emails = [f"teste{i}@gmail.com" for i in range(1, args.usuarios_extra + 1)]
    outros_ids: List[str] = []
    for e in outros_emails:
        uid = create_user(e, f"Usuario {e.split('@')[0]}", verbose=verbose)
        outros_ids.append(uid)

    # Tarefas para principal
    for i in range(1, args.tarefas + 1):
        create_task(
            principal["token"],
            f"Tarefa de acompanhamento {i}",
            principal["id"],
            prioridade=random.choice(["high", "medium", "low"]),
            verbose=verbose,
        )
    # Tarefas sem usuário
    for i in range(1, args.tarefas_gerais + 1):
        create_task(
            principal["token"],
            f"Tarefa geral {i}",
            None,
            prioridade="low",
            verbose=verbose,
        )

    # Metas
    for i in range(1, args.metas + 1):
        create_meta(
            principal["token"],
            principal["id"],
            f"Meta Estratégica {i}",
            progresso=random.choice([10, 25, 40, 55, 70, 85]),
            verbose=verbose,
        )

    # Feedbacks entre usuários (principal -> outros e vice-versa)
    for oid in outros_ids:
        create_feedback(
            principal["token"],
            principal["id"],
            oid,
            f"Bom trabalho usuário {oid[:6]}! Continue melhorando.",
        )
        create_feedback(
            principal["token"],
            oid,
            principal["id"],
            f"Feedback reverso do usuário {oid[:6]} para principal.",
        )

    # Equipes e membros
    equipe_front_id = create_equipe(
        principal["token"], "Equipe Frontend", verbose=verbose
    )
    equipe_data_id = create_equipe(principal["token"], "Equipe Data", verbose=verbose)
    for oid in outros_ids:
        add_membro_equipe(principal["token"], equipe_front_id, oid, verbose=verbose)
    add_membro_equipe(
        principal["token"], equipe_data_id, principal["id"], verbose=verbose
    )  # principal na equipe data

    log("Seed concluído com sucesso.")
    log(f"Usuário principal ID: {principal['id']}")
    log(f"Outros usuários: {', '.join(outros_ids)}")
    log("Acesse a aplicação e visualize tarefas, metas, feedbacks e equipes.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        log(f"Falha: {e}")
        sys.exit(1)
