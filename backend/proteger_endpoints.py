"""
Script para adicionar proteção de autenticação em todos os endpoints GET.
"""

import os
import re

# Diretório dos endpoints
ENDPOINTS_DIR = r"C:\Users\Matheus\meus_documentos\faculdade\bacharelado\oitavo\trabalho_interdisciplinhar\pulso360\backend\backend\api\endpoints"

# Arquivos a proteger (excluindo auth.py)
ARQUIVOS = [
    "ciclos_avaliacao.py",
    "equipes.py",
    "pdis.py",
    "metas.py",
    "acoes_meta.py",
    "feedbacks.py",
    "itens_avaliacao.py",
    "avaliacoes.py",
    "dashboard.py"
]

def adicionar_imports(conteudo):
    """Adiciona imports necessários se não existirem."""
    if "from core.dependencies import get_current_user" in conteudo:
        return conteudo
    
    # Procura última linha de import
    linhas = conteudo.split('\n')
    ultimo_import_idx = 0
    
    for i, linha in enumerate(linhas):
        if linha.startswith('from ') or linha.startswith('import '):
            ultimo_import_idx = i
    
    # Adiciona imports após o último import
    linhas.insert(ultimo_import_idx + 1, "from core.dependencies import get_current_user")
    linhas.insert(ultimo_import_idx + 2, "from backend.models.usuario_model import Usuario")
    
    return '\n'.join(linhas)

def proteger_funcao(conteudo):
    """Adiciona current_user aos parâmetros das funções async def."""
    # Padrão para encontrar funções async def que ainda não têm current_user
    padrao = r'(async def \w+\([^)]+)\):'
    
    def substituir(match):
        parametros = match.group(1)
        if 'current_user' in parametros:
            return match.group(0)  # Já tem, não faz nada
        
        # Adiciona current_user antes do último )
        return f"{parametros},\n    current_user: Usuario = Depends(get_current_user)\n):"
    
    return re.sub(padrao, substituir, conteudo)

def processar_arquivo(filepath):
    """Processa um arquivo adicionando proteção."""
    print(f"Processando: {os.path.basename(filepath)}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            conteudo = f.read()
        
        # Adiciona imports
        conteudo = adicionar_imports(conteudo)
        
        # Protege funções
        conteudo_novo = proteger_funcao(conteudo)
        
        # Salva apenas se houve mudanças
        if conteudo != conteudo_novo:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(conteudo_novo)
            print(f"  ✓ Protegido")
        else:
            print(f"  - Já protegido")
    
    except Exception as e:
        print(f"  ✗ Erro: {e}")

def main():
    print("="*70)
    print("ADICIONANDO PROTEÇÃO DE AUTENTICAÇÃO")
    print("="*70 + "\n")
    
    for arquivo in ARQUIVOS:
        filepath = os.path.join(ENDPOINTS_DIR, arquivo)
        if os.path.exists(filepath):
            processar_arquivo(filepath)
        else:
            print(f"Arquivo não encontrado: {arquivo}")
    
    print("\n" + "="*70)
    print("CONCLUÍDO")
    print("="*70)

if __name__ == "__main__":
    main()
