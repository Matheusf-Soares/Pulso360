"""
Testes de integração que testam a API rodando localmente.

IMPORTANTE: O backend deve estar rodando em http://127.0.0.1:8000
Execute primeiro: poetry run uvicorn backend.main:app --reload
"""

import requests
import pytest

BASE_URL = "http://127.0.0.1:8000/api/v1"


def test_backend_esta_rodando():
    """Verifica se o backend está acessível."""
    try:
        response = requests.get("http://127.0.0.1:8000/", timeout=2)
        assert response.status_code == 200, "Backend não está rodando ou retornou erro"
    except requests.exceptions.RequestException:
        pytest.skip("Backend não está rodando em http://127.0.0.1:8000")


def test_usuarios_sem_autenticacao():
    """Endpoint de usuários deve exigir autenticação."""
    response = requests.get(f"{BASE_URL}/usuarios")
    assert response.status_code == 401


def test_papeis_sem_autenticacao():
    """Endpoint de papéis deve exigir autenticação."""
    response = requests.get(f"{BASE_URL}/papeis")
    assert response.status_code == 401


def test_ciclos_sem_autenticacao():
    """Endpoint de ciclos deve exigir autenticação."""
    response = requests.get(f"{BASE_URL}/ciclos-avaliacao")
    assert response.status_code == 401


def test_pdis_sem_autenticacao():
    """Endpoint de PDIs deve exigir autenticação."""
    response = requests.get(f"{BASE_URL}/pdis")
    assert response.status_code == 401


def test_metas_sem_autenticacao():
    """Endpoint de metas deve exigir autenticação."""
    response = requests.get(f"{BASE_URL}/metas")
    assert response.status_code == 401
