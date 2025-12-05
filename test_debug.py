import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

# Login
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    json={"email": "admin@exemplo.com", "senha": "senha123"}
)
print("Login Status:", login_response.status_code)
token = login_response.json()["access_token"]
print("Token obtido:", token[:50] + "...")

# Teste de endpoint com autenticação
headers = {"Authorization": f"Bearer {token}"}

print("\n=== Testando /usuarios ===")
try:
    response = requests.get(f"{BASE_URL}/usuarios", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 500:
        print("Erro 500 - Detalhes:")
        print(response.text)
    else:
        print("Sucesso:", json.dumps(response.json(), indent=2)[:200])
except Exception as e:
    print(f"Exceção: {e}")

print("\n=== Testando /papeis ===")
try:
    response = requests.get(f"{BASE_URL}/papeis", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 500:
        print("Erro 500 - Detalhes:")
        print(response.text)
    else:
        print("Sucesso:", json.dumps(response.json(), indent=2)[:200])
except Exception as e:
    print(f"Exceção: {e}")

print("\n=== Testando /dashboard/summary ===")
try:
    response = requests.get(f"{BASE_URL}/dashboard/summary", headers=headers)
    print(f"Status: {response.status_code}")
    if response.status_code == 500:
        print("Erro 500 - Detalhes:")
        print(response.text)
    else:
        print("Sucesso:", json.dumps(response.json(), indent=2)[:200])
except Exception as e:
    print(f"Exceção: {e}")
