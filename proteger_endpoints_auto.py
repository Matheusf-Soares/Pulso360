"""
Script para adicionar autenticação aos endpoints não protegidos.
Adiciona as importações necessárias e o parâmetro de autenticação aos endpoints GET.
"""

import re
from pathlib import Path

# Lista de arquivos de endpoints para proteger
ENDPOINTS_TO_PROTECT = [
    "ciclos_avaliacao.py",
    "equipes.py",
    "pdis.py",
    "metas.py",
    "acoes_meta.py",
    "feedbacks.py",
    "itens_avaliacao.py",
    "avaliacoes.py",
]

BACKEND_ENDPOINTS_DIR = Path("c:/Users/Matheus/meus_documentos/faculdade/bacharelado/oitavo/trabalho_interdisciplinhar/pulso360/backend/backend/api/endpoints")

# Importações necessárias
REQUIRED_IMPORTS = """from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from core.dependencies import get_session, get_user_from_token, security
from backend.models.usuario_model import Usuario"""

def add_imports(content: str) -> str:
    """Adiciona as importações necessárias se não existirem."""
    
    # Verifica se já tem a importação do security
    if "from core.dependencies import" in content and "get_user_from_token" in content:
        return content
    
    # Encontra a linha de importação do fastapi
    fastapi_import_match = re.search(r"from fastapi import.*", content)
    if not fastapi_import_match:
        return content
    
    insert_pos = fastapi_import_match.end()
    
    # Verifica quais importações já existem
    imports_to_add = []
    
    if "HTTPAuthorizationCredentials" not in content:
        imports_to_add.append("from fastapi.security import HTTPAuthorizationCredentials")
    
    if "AsyncSession" not in content:
        imports_to_add.append("from sqlalchemy.ext.asyncio import AsyncSession")
    
    if "get_session" not in content or "get_user_from_token" not in content:
        imports_to_add.append("from core.dependencies import get_session, get_user_from_token, security")
    
    if "from backend.models.usuario_model import Usuario" not in content:
        imports_to_add.append("from backend.models.usuario_model import Usuario")
    
    if imports_to_add:
        new_imports = "\n" + "\n".join(imports_to_add)
        content = content[:insert_pos] + new_imports + content[insert_pos:]
    
    return content

def add_auth_to_get_endpoints(content: str, filename: str) -> str:
    """Adiciona autenticação aos endpoints GET que não têm."""
    
    # Padrão para encontrar endpoints GET sem autenticação
    # Procura por @router.get seguido pela função async def
    pattern = r'(@router\.get\([^)]*\)[^\n]*\n(?:[^\n]*\n)*?async def \w+\([^)]*)\)'
    
    def add_auth_params(match):
        func_signature = match.group(1)
        
        # Se já tem credentials ou current_user, skip
        if "credentials:" in func_signature or "current_user:" in func_signature:
            return match.group(0)
        
        # Adiciona os parâmetros de autenticação
        new_signature = func_signature.rstrip()
        
        # Verifica se já tem parâmetros
        if "(" in new_signature and not new_signature.endswith("("):
            # Tem outros parâmetros, adiciona vírgula
            auth_params = ",\n    credentials: HTTPAuthorizationCredentials = Depends(security),\n    session: AsyncSession = Depends(get_session)"
        else:
            # Sem parâmetros
            auth_params = "\n    credentials: HTTPAuthorizationCredentials = Depends(security),\n    session: AsyncSession = Depends(get_session)"
        
        return new_signature + auth_params + "):\n    # Valida autenticação\n    current_user = await get_user_from_token(credentials.credentials, session)\n    "
    
    content = re.sub(pattern, add_auth_params, content, flags=re.MULTILINE)
    
    return content

def protect_endpoint_file(filepath: Path):
    """Protege um arquivo de endpoint adicionando autenticação."""
    print(f"\nProcessando: {filepath.name}")
    
    # Lê o conteúdo
    content = filepath.read_text(encoding="utf-8")
    original_content = content
    
    # Adiciona importações
    content = add_imports(content)
    
    # Adiciona autenticação aos endpoints GET
    content = add_auth_to_get_endpoints(content, filepath.name)
    
    # Salva se houver mudanças
    if content != original_content:
        filepath.write_text(content, encoding="utf-8")
        print(f"  ✓ Autenticação adicionada")
        return True
    else:
        print(f"  - Já protegido ou sem endpoints GET")
        return False

def main():
    print("=" * 70)
    print("SCRIPT DE PROTEÇÃO DE ENDPOINTS")
    print("=" * 70)
    
    protected_count = 0
    
    for endpoint_file in ENDPOINTS_TO_PROTECT:
        filepath = BACKEND_ENDPOINTS_DIR / endpoint_file
        
        if not filepath.exists():
            print(f"\n✗ Arquivo não encontrado: {endpoint_file}")
            continue
        
        if protect_endpoint_file(filepath):
            protected_count += 1
    
    print("\n" + "=" * 70)
    print(f"CONCLUÍDO: {protected_count} arquivos modificados")
    print("=" * 70)

if __name__ == "__main__":
    main()
