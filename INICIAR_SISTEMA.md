# 🚀 Guia Rápido - Iniciar Sistema Pulso360

## ⚡ Início Rápido (2 Terminais)

### Terminal 1️⃣ - Backend (Python/FastAPI)

```bash
# Navegar para o backend
cd /Users/levty/Documents/Trabalho\ SIGE/Pulso360/backend

# Verificar se Poetry está instalado
poetry --version

# Se não estiver instalado:
# curl -sSL https://install.python-poetry.org | python3 -

# Instalar dependências (primeira vez)
poetry install

# Verificar banco de dados PostgreSQL
# Opção 1: PostgreSQL local rodando
# Opção 2: Docker
# docker run --name pulso360-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=pulso360 -p 5432:5432 -d postgres:15

# Executar migrações do banco
poetry run alembic upgrade head

# Criar usuário de teste (primeira vez)
poetry run python -m backend.criar_usuario_teste

# INICIAR BACKEND
poetry run uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

**Backend rodando em:** http://localhost:8000  
**Documentação API:** http://localhost:8000/docs

---

### Terminal 2️⃣ - Frontend (React)

```bash
# Navegar para o frontend
cd /Users/levty/Documents/Trabalho\ SIGE/Pulso360/frontend/pulso360

# Instalar dependências (primeira vez)
npm install

# INICIAR FRONTEND
npm start
```

**Frontend rodando em:** http://localhost:3000 ou http://localhost:3001

---

## ✅ Verificar se está funcionando

### 1. Backend Online?
Acesse: http://localhost:8000/docs

Deve mostrar a documentação Swagger da API.

### 2. Frontend Online?
Acesse: http://localhost:3000

Deve mostrar a tela de login.

### 3. Testar Cadastro

**Dados para teste:**
- Nome: Seu Nome Completo
- Email: qualquer@email.com
- Cargo: Desenvolvedor
- Senioridade: Pleno
- Senha: 123456 (mínimo 6 caracteres)

---

## 🐛 Problemas Comuns

### ❌ Backend não inicia

**Erro: `poetry: command not found`**
```bash
curl -sSL https://install.python-poetry.org | python3 -
export PATH="$HOME/.local/bin:$PATH"
```

**Erro: `ModuleNotFoundError`**
```bash
cd backend
poetry install
```

**Erro: `database connection`**
```bash
# Verificar PostgreSQL
psql -U postgres -l

# Se não tiver PostgreSQL, usar Docker:
docker run --name pulso360-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pulso360 \
  -p 5432:5432 \
  -d postgres:15

# Executar migrações
poetry run alembic upgrade head
```

---

### ❌ Frontend não inicia

**Erro: `npm: command not found`**
```bash
# Instalar Node.js: https://nodejs.org/
# Ou usar Homebrew:
brew install node
```

**Erro: `Module not found`**
```bash
cd frontend/pulso360
rm -rf node_modules package-lock.json
npm install
```

**Erro: `Port 3000 already in use`**
```bash
# Usa porta alternativa automaticamente (3001, 3002, etc)
# Ou matar processo na porta 3000:
lsof -ti:3000 | xargs kill -9
```

---

### ❌ Cadastro com erro

**Erro: `Não foi possível conectar ao servidor`**
- ✅ Verificar se backend está rodando (Terminal 1)
- ✅ Acessar http://localhost:8000/docs

**Erro: `Email já cadastrado`**
- Use outro email
- Ou delete o usuário no banco de dados

**Erro: `Dados inválidos`**
- Senha mínimo 6 caracteres
- Email válido (com @)
- Nome mínimo 3 caracteres

---

## 📊 Usuário de Teste Padrão

Criado automaticamente pelo script:

```
Email: admin@pulso360.com
Senha: admin123
```

Para criar novo usuário de teste:
```bash
cd backend
poetry run python -m backend.criar_usuario_teste
```

---

## 🔍 Monitorar Logs

### Backend:
Os logs aparecem no terminal onde você rodou `uvicorn`

### Frontend:
- Console do navegador (F12 → Console)
- Terminal onde rodou `npm start`

---

## 📝 Estrutura de URLs

| Componente | URL | Descrição |
|------------|-----|-----------|
| **Backend API** | http://localhost:8000 | API REST |
| **Swagger Docs** | http://localhost:8000/docs | Documentação interativa |
| **Frontend** | http://localhost:3000 | Interface React |
| **Login** | http://localhost:3000/login | Tela de login |
| **Cadastro** | http://localhost:3000/cadastro | Criar conta |

---

## 🎯 Fluxo Completo de Teste

1. ✅ **Iniciar Backend** → Terminal 1
2. ✅ **Iniciar Frontend** → Terminal 2
3. ✅ **Acessar** http://localhost:3000/cadastro
4. ✅ **Preencher formulário** com seus dados
5. ✅ **Clicar em "Criar Conta"**
6. ✅ **Aguardar redirecionamento** para login
7. ✅ **Fazer login** com as credenciais criadas
8. ✅ **Acessar dashboard** 🎉

---

## 💡 Dicas

- Use **2 terminais** separados (backend + frontend)
- Mantenha ambos **rodando simultaneamente**
- O backend deve iniciar **primeiro**
- Verifique os logs para debug
- Use http://localhost:8000/docs para testar API diretamente

---

**Desenvolvido para Pulso360**  
Data: 23 de novembro de 2025
