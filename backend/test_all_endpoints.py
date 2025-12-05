"""
Script para testar todos os endpoints do backend.
Execute com o backend rodando em http://127.0.0.1:8000
"""

import requests
import time
import sys
from datetime import datetime

BASE_URL = "http://127.0.0.1:8000"
API_URL = f"{BASE_URL}/api/v1"

# Cores para output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'


def print_status(endpoint, status_code, expected=200, details=""):
    """Imprime o status de um endpoint testado."""
    status = "✓" if status_code == expected else "✗"
    color = GREEN if status_code == expected else RED
    
    print(f"{color}{status}{RESET} {endpoint:50} [{status_code}] {details}")


def wait_for_backend(max_attempts=5, delay=2):
    """Aguarda o backend estar disponível."""
    print(f"{BLUE}Verificando se o backend está disponível...{RESET}")
    
    for attempt in range(max_attempts):
        try:
            response = requests.get(BASE_URL, timeout=2)
            if response.status_code == 200:
                print(f"{GREEN}✓ Backend está rodando!{RESET}\n")
                return True
        except requests.exceptions.RequestException:
            if attempt < max_attempts - 1:
                print(f"{YELLOW}Tentativa {attempt + 1}/{max_attempts} - Aguardando backend...{RESET}")
                time.sleep(delay)
    
    print(f"{RED}✗ Backend não está disponível em {BASE_URL}{RESET}")
    print(f"{YELLOW}Execute: poetry run uvicorn backend.main:app --reload{RESET}")
    return False


def get_auth_token():
    """Tenta obter um token de autenticação."""
    try:
        response = requests.post(
            f"{API_URL}/auth/login",
            data={
                "username": "admin@exemplo.com",
                "password": "senha123"
            }
        )
        if response.status_code == 200:
            return response.json().get("access_token")
    except:
        pass
    return None


def test_public_endpoints():
    """Testa endpoints públicos."""
    print(f"\n{BLUE}=== TESTANDO ENDPOINTS PÚBLICOS ==={RESET}")
    
    # Root endpoint
    try:
        response = requests.get(BASE_URL)
        print_status("GET /", response.status_code, 200)
    except Exception as e:
        print_status("GET /", 0, 200, f"Erro: {e}")


def test_protected_endpoints_without_auth():
    """Testa que endpoints protegidos requerem autenticação."""
    print(f"\n{BLUE}=== TESTANDO PROTEÇÃO DE AUTENTICAÇÃO ==={RESET}")
    
    endpoints = [
        ("GET", "/usuarios", 401),
        ("GET", "/papeis", 401),
        ("GET", "/ciclos-avaliacao", 401),
        ("GET", "/equipes", 401),
        ("GET", "/pdis", 401),
        ("GET", "/metas", 401),
        ("GET", "/acoes-meta", 401),
        ("GET", "/feedbacks", 401),
        ("GET", "/itens-avaliacao", 401),
        ("GET", "/avaliacoes", 401),
        ("GET", "/dashboard/summary", 401),
    ]
    
    for method, endpoint, expected in endpoints:
        try:
            url = f"{API_URL}{endpoint}"
            response = requests.get(url)
            print_status(f"{method} {endpoint}", response.status_code, expected)
        except Exception as e:
            print_status(f"{method} {endpoint}", 0, expected, f"Erro: {e}")


def test_endpoints_with_auth(token):
    """Testa endpoints com autenticação."""
    print(f"\n{BLUE}=== TESTANDO ENDPOINTS AUTENTICADOS ==={RESET}")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    endpoints = [
        ("GET", "/usuarios", 200),
        ("GET", "/papeis", 200),
        ("GET", "/ciclos-avaliacao", 200),
        ("GET", "/equipes", 200),
        ("GET", "/pdis", 200),
        ("GET", "/metas", 200),
        ("GET", "/acoes-meta", 200),
        ("GET", "/feedbacks", 200),
        ("GET", "/itens-avaliacao", 200),
        ("GET", "/avaliacoes", 200),
        ("GET", "/dashboard/summary", 200),
        ("GET", "/dashboard/pdis", 200),
    ]
    
    for method, endpoint, expected in endpoints:
        try:
            url = f"{API_URL}{endpoint}"
            response = requests.get(url, headers=headers)
            
            # Verifica estrutura de resposta paginada
            details = ""
            if response.status_code == 200 and endpoint not in ["/dashboard/summary", "/dashboard/pdis"]:
                data = response.json()
                if "items" in data and "total" in data:
                    details = f"items: {len(data['items'])}, total: {data['total']}"
                elif isinstance(data, dict):
                    details = f"keys: {', '.join(data.keys())}"
            
            print_status(f"{method} {endpoint}", response.status_code, expected, details)
        except Exception as e:
            print_status(f"{method} {endpoint}", 0, expected, f"Erro: {e}")


def check_pagination_structure(token):
    """Verifica se endpoints paginados têm a estrutura correta."""
    print(f"\n{BLUE}=== VERIFICANDO ESTRUTURA DE PAGINAÇÃO ==={RESET}")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    paginated_endpoints = [
        "/usuarios",
        "/papeis",
        "/ciclos-avaliacao",
        "/equipes",
        "/pdis",
        "/metas",
        "/acoes-meta",
        "/feedbacks",
        "/itens-avaliacao",
        "/avaliacoes",
    ]
    
    required_fields = ["items", "total", "page", "size", "pages"]
    
    for endpoint in paginated_endpoints:
        try:
            url = f"{API_URL}{endpoint}"
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    print_status(
                        f"Paginação {endpoint}", 
                        200, 
                        200, 
                        f"✓ Todos os campos presentes"
                    )
                else:
                    print_status(
                        f"Paginação {endpoint}", 
                        200, 
                        200, 
                        f"✗ Faltam campos: {', '.join(missing_fields)}"
                    )
            else:
                print_status(f"Paginação {endpoint}", response.status_code, 200, "Erro ao obter dados")
        except Exception as e:
            print_status(f"Paginação {endpoint}", 0, 200, f"Erro: {e}")


def main():
    """Função principal."""
    print(f"\n{BLUE}{'='*70}{RESET}")
    print(f"{BLUE}TESTE DE ENDPOINTS DO BACKEND - PULSO360{RESET}")
    print(f"{BLUE}{'='*70}{RESET}")
    print(f"{YELLOW}Iniciado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{RESET}")
    
    # Verifica se o backend está disponível
    if not wait_for_backend():
        sys.exit(1)
    
    # Testa endpoints públicos
    test_public_endpoints()
    
    # Testa proteção de autenticação
    test_protected_endpoints_without_auth()
    
    # Tenta obter token de autenticação
    print(f"\n{BLUE}=== OBTENDO TOKEN DE AUTENTICAÇÃO ==={RESET}")
    token = get_auth_token()
    
    if token:
        print(f"{GREEN}✓ Token obtido com sucesso{RESET}")
        
        # Testa endpoints com autenticação
        test_endpoints_with_auth(token)
        
        # Verifica estrutura de paginação
        check_pagination_structure(token)
    else:
        print(f"{YELLOW}⚠ Não foi possível obter token de autenticação{RESET}")
        print(f"{YELLOW}  Certifique-se de que existe um usuário com email 'admin@exemplo.com' e senha 'senha123'{RESET}")
        print(f"{YELLOW}  Ou execute: poetry run python backend/criar_usuario_teste.py{RESET}")
    
    print(f"\n{BLUE}{'='*70}{RESET}")
    print(f"{YELLOW}Finalizado em: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{RESET}")
    print(f"{BLUE}{'='*70}{RESET}\n")


if __name__ == "__main__":
    main()
