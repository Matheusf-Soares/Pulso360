"""
Script de validação da integração Frontend-Backend
Verifica se o sistema está configurado corretamente
"""

import requests
import json

def print_header(text):
    print("\n" + "=" * 70)
    print(f"  {text}")
    print("=" * 70)

def test_system():
    BASE_URL = "http://localhost:8000/api/v1"
    
    print_header("🔍 VALIDAÇÃO DO SISTEMA PULSO360")
    
    # 1. Testar backend
    print("\n1️⃣  Testando se backend está online...")
    try:
        response = requests.get(f"{BASE_URL}/../", timeout=3)
        print(f"   ✅ Backend respondendo (Status: {response.status_code})")
    except Exception as e:
        print(f"   ❌ Backend offline: {e}")
        print("\n   💡 AÇÃO NECESSÁRIA:")
        print("      cd backend")
        print("      poetry run uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000")
        return False
    
    # 2. Testar login
    print("\n2️⃣  Testando autenticação...")
    try:
        login_data = {"email": "admin@exemplo.com", "senha": "senha123"}
        response = requests.post(f"{BASE_URL}/auth/login", json=login_data, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            token = data.get("access_token")
            user = data.get("user", {})
            
            print(f"   ✅ Login bem-sucedido")
            print(f"   👤 Usuário: {user.get('nome', 'N/A')}")
            print(f"   📧 Email: {user.get('email', 'N/A')}")
            print(f"   🔑 Token: {token[:30]}...")
            
            return token
        else:
            print(f"   ❌ Erro no login: {response.status_code}")
            print(f"      {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Erro ao fazer login: {e}")
        return False
    
def test_protected_endpoints(token):
    BASE_URL = "http://localhost:8000/api/v1"
    headers = {"Authorization": f"Bearer {token}"}
    
    print("\n3️⃣  Testando endpoints protegidos...")
    
    endpoints = [
        "/usuarios",
        "/papeis",
        "/equipes",
        "/pdis",
        "/metas",
        "/feedbacks",
        "/dashboard/summary",
        "/dashboard/pdi"
    ]
    
    success = 0
    failed = 0
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", headers=headers, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                count = "N/A"
                
                if isinstance(data, dict) and 'items' in data:
                    count = len(data['items'])
                elif isinstance(data, list):
                    count = len(data)
                
                print(f"   ✅ {endpoint:30} [{response.status_code}] ({count} items)")
                success += 1
            else:
                print(f"   ❌ {endpoint:30} [{response.status_code}]")
                failed += 1
        except Exception as e:
            print(f"   ❌ {endpoint:30} [Erro: {str(e)[:30]}]")
            failed += 1
    
    print(f"\n   📊 Resultado: {success}/{len(endpoints)} endpoints funcionando")
    return success, failed

def test_without_auth():
    BASE_URL = "http://localhost:8000/api/v1"
    
    print("\n4️⃣  Testando segurança (sem token)...")
    
    endpoints = ["/usuarios", "/papeis", "/equipes"]
    protected = 0
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=5)
            
            if response.status_code in [401, 403]:
                print(f"   ✅ {endpoint:30} protegido [{response.status_code}]")
                protected += 1
            else:
                print(f"   ⚠️  {endpoint:30} NÃO protegido [{response.status_code}]")
        except Exception as e:
            print(f"   ❌ {endpoint:30} [Erro: {str(e)[:30]}]")
    
    print(f"\n   🔒 Segurança: {protected}/{len(endpoints)} endpoints protegidos")
    return protected == len(endpoints)

def main():
    # Testar sistema
    token = test_system()
    
    if not token:
        print("\n❌ Sistema não está funcionando corretamente!")
        return
    
    # Testar endpoints protegidos
    success, failed = test_protected_endpoints(token)
    
    # Testar segurança
    is_secure = test_without_auth()
    
    # Resumo final
    print_header("📊 RESUMO DA VALIDAÇÃO")
    
    if success >= 8 and is_secure:
        print("\n   🎉 SISTEMA 100% FUNCIONAL!")
        print("\n   ✅ Backend online")
        print("   ✅ Autenticação funcionando")
        print(f"   ✅ {success} endpoints funcionando")
        print("   ✅ Segurança implementada")
        print("\n   💡 PRÓXIMOS PASSOS:")
        print("      1. Inicie o frontend: cd frontend/pulso360 && npm start")
        print("      2. Acesse: http://localhost:3000")
        print("      3. Faça login com: admin@exemplo.com / senha123")
        print("      4. Ou teste: http://localhost:3000/test-integration.html")
    elif success >= 6:
        print("\n   ✅ Sistema funcionando com pequenos problemas")
        print(f"\n   ⚠️  {failed} endpoints com problemas")
        print("   💡 Revise os endpoints que falharam acima")
    else:
        print("\n   ❌ Sistema com problemas sérios")
        print(f"\n   ❌ {failed} endpoints falharam")
        print("   💡 Verifique se o backend está configurado corretamente")
    
    print("\n" + "=" * 70 + "\n")

if __name__ == "__main__":
    main()
