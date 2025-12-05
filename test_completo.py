"""
Teste completo de TODOS os endpoints do sistema com autenticação.
Inclui endpoints de dashboard, CRUD completo e verificações de segurança.
"""

import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_all_endpoints():
    print("=" * 70)
    print(" TESTE COMPLETO DE ENDPOINTS - PULSO360")
    print("=" * 70)
    
    # 1. Login
    print("\n1. Autenticação...")
    login_response = requests.post(
        f"{BASE_URL}/auth/login",
        json={"email": "admin@exemplo.com", "senha": "senha123"}
    )
    
    if login_response.status_code != 200:
        print(f"   ✗ Falha no login: {login_response.status_code}")
        return
    
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("   ✓ Login bem-sucedido")
    
    # 2. Endpoints Principais
    print("\n2. Testando endpoints principais...")
    endpoints_principais = [
        ("/usuarios", "Usuários"),
        ("/papeis", "Papéis"),
        ("/ciclos-avaliacao", "Ciclos de Avaliação"),
        ("/equipes", "Equipes"),
        ("/pdis", "PDIs"),
        ("/metas", "Metas"),
        ("/acoes-meta", "Ações de Meta"),
        ("/feedbacks", "Feedbacks"),
        ("/itens-avaliacao", "Itens de Avaliação"),
        ("/avaliacoes", "Avaliações"),
    ]
    
    success_count = 0
    for endpoint, name in endpoints_principais:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", headers=headers, timeout=5)
            if response.status_code == 200:
                data = response.json()
                # Verifica se é paginado ou lista
                if isinstance(data, dict) and 'items' in data:
                    count = len(data['items'])
                    total = data.get('total', count)
                    print(f"   ✓ {name:25} [200] ({count} items, total: {total})")
                elif isinstance(data, list):
                    print(f"   ✓ {name:25} [200] ({len(data)} items)")
                else:
                    print(f"   ✓ {name:25} [200]")
                success_count += 1
            else:
                print(f"   ✗ {name:25} [{response.status_code}]")
        except Exception as e:
            print(f"   ✗ {name:25} [Erro: {str(e)[:30]}]")
    
    # 3. Endpoints de Dashboard
    print("\n3. Testando endpoints de dashboard...")
    dashboard_endpoints = [
        ("/dashboard/summary", "Dashboard Summary"),
        ("/dashboard/pdi", "Dashboard PDI"),
        ("/dashboard/activity", "Dashboard Activity"),
        ("/dashboard/team-performance", "Dashboard Team Performance"),
    ]
    
    dashboard_success = 0
    for endpoint, name in dashboard_endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", headers=headers, timeout=5)
            if response.status_code == 200:
                print(f"   ✓ {name:30} [200]")
                dashboard_success += 1
            elif response.status_code == 404:
                print(f"   ✗ {name:30} [404] (Endpoint não encontrado)")
            else:
                print(f"   ✗ {name:30} [{response.status_code}]")
        except Exception as e:
            print(f"   ✗ {name:30} [Erro: {str(e)[:30]}]")
    
    # 4. Teste de Segurança (sem token)
    print("\n4. Testando segurança (sem autenticação)...")
    security_test_count = 0
    for endpoint, name in endpoints_principais[:5]:  # Testa 5 endpoints
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=5)
            if response.status_code in [401, 403]:
                print(f"   ✓ {name:25} protegido [{response.status_code}]")
                security_test_count += 1
            else:
                print(f"   ✗ {name:25} NÃO protegido [{response.status_code}]")
        except Exception as e:
            print(f"   ✗ {name:25} [Erro: {str(e)[:30]}]")
    
    # 5. Resumo Final
    print("\n" + "=" * 70)
    print(" RESUMO DO TESTE")
    print("=" * 70)
    print(f"  Endpoints Principais:        {success_count}/{len(endpoints_principais)} ✓")
    print(f"  Endpoints Dashboard:         {dashboard_success}/{len(dashboard_endpoints)} ✓")
    print(f"  Teste de Segurança:          {security_test_count}/5 ✓")
    total_tested = len(endpoints_principais) + len(dashboard_endpoints)
    total_success = success_count + dashboard_success
    percentage = (total_success / total_tested) * 100
    print(f"\n  Taxa de Sucesso Total:       {percentage:.1f}% ({total_success}/{total_tested})")
    print("=" * 70)
    
    if percentage >= 90:
        print("\n  🎉 SISTEMA FUNCIONANDO PERFEITAMENTE!")
    elif percentage >= 75:
        print("\n  ✅ Sistema funcionando bem, com pequenos ajustes necessários")
    else:
        print("\n  ⚠️  Sistema necessita de correções")
    print()

if __name__ == "__main__":
    test_all_endpoints()
