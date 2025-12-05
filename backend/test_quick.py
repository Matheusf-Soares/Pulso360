"""
Teste rápido de endpoints - executa sem pytest
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8000"
API_URL = f"{BASE_URL}/api/v1"

print("\n" + "="*70)
print("TESTE DE ENDPOINTS - PULSO360")
print("="*70 + "\n")

# Teste 1: Backend está rodando?
print("1. Testando se backend está rodando...")
try:
    r = requests.get(BASE_URL, timeout=2)
    print(f"   ✓ Backend respondendo: {r.status_code}")
except Exception as e:
    print(f"   ✗ Backend não responde: {e}")
    exit(1)

# Teste 2: Endpoints sem autenticação devem retornar 401
print("\n2. Testando proteção de autenticação (deve retornar 401)...")
endpoints_protegidos = [
    "/usuarios", "/papeis", "/ciclos-avaliacao", "/equipes",
    "/pdis", "/metas", "/acoes-meta", "/feedbacks",
    "/itens-avaliacao", "/avaliacoes", "/dashboard/summary"
]

for endpoint in endpoints_protegidos:
    try:
        r = requests.get(f"{API_URL}{endpoint}")
        status = "✓" if r.status_code == 401 else "✗"
        print(f"   {status} {endpoint:30} [{r.status_code}]")
    except Exception as e:
        print(f"   ✗ {endpoint:30} [ERRO: {e}]")

# Teste 3: Tentar fazer login
print("\n3. Tentando fazer login...")
try:
    r = requests.post(
        f"{API_URL}/auth/login",
        json={"email": "admin@exemplo.com", "senha": "senha123"}
    )
    if r.status_code == 200:
        token = r.json().get("access_token")
        print(f"   ✓ Login bem-sucedido")
        
        # Teste 4: Acessar endpoints com autenticação
        print("\n4. Testando endpoints COM autenticação...")
        headers = {"Authorization": f"Bearer {token}"}
        
        for endpoint in endpoints_protegidos:
            try:
                r = requests.get(f"{API_URL}{endpoint}", headers=headers)
                status = "✓" if r.status_code == 200 else "✗"
                
                # Verificar estrutura de paginação
                details = ""
                if r.status_code == 200 and endpoint not in ["/dashboard/summary", "/dashboard/pdis"]:
                    data = r.json()
                    if "items" in data:
                        details = f"(items: {len(data['items'])}, total: {data['total']})"
                
                print(f"   {status} {endpoint:30} [{r.status_code}] {details}")
            except Exception as e:
                print(f"   ✗ {endpoint:30} [ERRO: {e}]")
        
        # Teste 5: Dashboard endpoints
        print("\n5. Testando endpoints de dashboard...")
        dashboard_endpoints = ["/dashboard/summary", "/dashboard/pdis"]
        for endpoint in dashboard_endpoints:
            try:
                r = requests.get(f"{API_URL}{endpoint}", headers=headers)
                status = "✓" if r.status_code == 200 else "✗"
                print(f"   {status} {endpoint:30} [{r.status_code}]")
                if r.status_code == 200:
                    data = r.json()
                    if endpoint == "/dashboard/summary":
                        print(f"       Usuários: {data.get('total_usuarios', 'N/A')}")
                        print(f"       Equipes: {data.get('total_equipes', 'N/A')}")
                        print(f"       PDIs: {data.get('total_pdis', 'N/A')}")
            except Exception as e:
                print(f"   ✗ {endpoint:30} [ERRO: {e}]")
        
        # Teste 6: Verificar estrutura de paginação
        print("\n6. Verificando estrutura de paginação...")
        test_endpoint = "/usuarios"
        try:
            r = requests.get(f"{API_URL}{test_endpoint}", headers=headers)
            if r.status_code == 200:
                data = r.json()
                required_fields = ["items", "total", "page", "size", "pages"]
                missing = [f for f in required_fields if f not in data]
                
                if not missing:
                    print(f"   ✓ Estrutura de paginação correta")
                    print(f"       Campos presentes: {', '.join(required_fields)}")
                else:
                    print(f"   ✗ Campos faltando: {', '.join(missing)}")
            else:
                print(f"   ✗ Erro ao obter dados: {r.status_code}")
        except Exception as e:
            print(f"   ✗ Erro: {e}")
            
    else:
        print(f"   ✗ Login falhou: {r.status_code}")
        print(f"      Resposta: {r.text}")
        print("\n   ATENÇÃO: Crie um usuário de teste com:")
        print("   poetry run python backend/criar_usuario_teste.py")
        
except Exception as e:
    print(f"   ✗ Erro no login: {e}")

print("\n" + "="*70)
print("TESTE CONCLUÍDO")
print("="*70 + "\n")
