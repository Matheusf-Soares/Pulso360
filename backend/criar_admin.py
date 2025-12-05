"""
Script simples para criar usuário admin de teste via API REST.
"""
import requests

BASE_URL = "http://127.0.0.1:8000/api/v1"

# Dados do usuário admin
usuario_data = {
    "nome": "Administrador",
    "email": "admin@exemplo.com",
    "senha": "senha123",
    "telefone": "11999999999",
    "cargo": "Administrador",
    "departamento": "TI",
    "senioridade": "Senior",
    "ativo": True
}

print("Criando usuário admin...")
try:
    response = requests.post(f"{BASE_URL}/usuarios", json=usuario_data)
    
    if response.status_code == 201:
        print("✓ Usuário criado com sucesso!")
        print(f"  Email: {usuario_data['email']}")
        print(f"  Senha: {usuario_data['senha']}")
    elif response.status_code == 400:
        print("⚠ Usuário já existe ou erro de validação")
        print(f"  Resposta: {response.text}")
    else:
        print(f"✗ Erro ao criar usuário: {response.status_code}")
        print(f"  Resposta: {response.text}")
except Exception as e:
    print(f"✗ Erro: {e}")
