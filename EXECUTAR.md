# 🚀 Como Executar o Pulso360 - Frontend + Backend

## 📋 Pré-requisitos

- **Node.js** 16+ (para o frontend)
- **Python** 3.13+ (para o backend)
- **PostgreSQL** (banco de dados)
- **Poetry** (gerenciador de dependências Python)

---

## 🔧 Configuração do Backend

### 1. Navegar para a pasta do backend
```bash
cd backend
```

### 2. Instalar dependências com Poetry
```bash
poetry install
```

### 3. Configurar banco de dados PostgreSQL

Certifique-se de ter o PostgreSQL rodando e crie um banco de dados:

```sql
CREATE DATABASE pulso360;
```

### 4. Configurar variáveis de ambiente (opcional)

Edite `backend/core/configs.py` ou crie um arquivo `.env` com:

```python
DB_URL=postgresql+asyncpg://postgres:SUA_SENHA@localhost:5432/pulso360
```

### 5. Executar migrations do Alembic

```bash
poetry run alembic upgrade head
```

### 6. Iniciar o servidor backend

```bash
poetry run uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

O backend estará rodando em: **http://localhost:8000**

📚 Documentação da API (Swagger): **http://localhost:8000/docs**

---

## 🎨 Configuração do Frontend

### 1. Navegar para a pasta do frontend
```bash
cd frontend/pulso360
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Conteúdo do `.env`:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm start
```

O frontend estará rodando em: **http://localhost:3000**

---

## 🔄 Executando Frontend e Backend Simultaneamente

### Opção 1: Dois terminais

**Terminal 1 - Backend:**
```bash
cd backend
poetry run uvicorn backend.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend/pulso360
npm start
```

### Opção 2: Script único (se disponível)

Você pode criar um script para iniciar ambos:

**package.json (raiz do projeto):**
```json
{
  "scripts": {
    "dev:backend": "cd backend && poetry run uvicorn backend.main:app --reload",
    "dev:frontend": "cd frontend/pulso360 && npm start",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\""
  }
}
```

---

## 🧪 Testando a Integração

### 1. Acessar o Frontend
Abra o navegador em **http://localhost:3000**

### 2. Fazer Login
- A aplicação mostrará a tela de login
- Use qualquer email válido (ex: `teste@exemplo.com`)
- Use qualquer senha (ex: `123456`)
- Como o endpoint de autenticação ainda não está implementado, o sistema usará dados mockados

### 3. Navegar pelo Sistema
- Dashboard (Home)
- PDI (Plano de Desenvolvimento)
- Avaliações
- Equipe
- Outros módulos

### 4. Testar Endpoints da API
Acesse **http://localhost:8000/docs** para testar os endpoints:
- Criar usuário
- Listar usuários
- Criar equipe
- Listar equipes
- Etc.

---

## 📊 Estrutura de Diretórios

```
Pulso360/
├── backend/
│   ├── backend/
│   │   ├── alembic/          # Migrations do banco
│   │   ├── api/              # Endpoints
│   │   ├── core/             # Configurações
│   │   ├── models/           # Modelos do banco
│   │   ├── schemas/          # Schemas Pydantic
│   │   ├── services/         # Lógica de negócio
│   │   ├── repositories/     # Acesso a dados
│   │   └── main.py           # Aplicação principal
│   ├── pyproject.toml
│   └── README.md
│
└── frontend/
    └── pulso360/
        ├── public/
        ├── src/
        │   ├── components/   # Componentes React
        │   ├── pages/        # Páginas
        │   ├── services/     # Serviços de API
        │   ├── contexts/     # Contexts (Auth)
        │   ├── config/       # Configurações
        │   ├── App.js
        │   └── index.js
        ├── package.json
        ├── .env
        └── INTEGRACAO.md     # Documentação da integração
```

---

## 🐛 Troubleshooting

### Erro: "CORS policy"
- Verifique se o CORS está configurado no backend (`main.py`)
- Confirme que o frontend está rodando em `http://localhost:3000`

### Erro: "Connection refused"
- Verifique se o backend está rodando em `http://localhost:8000`
- Teste acessando `http://localhost:8000/docs`

### Erro: "Database connection"
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no `configs.py`
- Execute as migrations: `poetry run alembic upgrade head`

### Erro: "Module not found"
**Backend:**
```bash
cd backend
poetry install
```

**Frontend:**
```bash
cd frontend/pulso360
npm install
```

---

## 📝 Próximos Passos

### Backend
1. ✅ Implementar endpoint de autenticação (`/api/v1/auth/login`)
2. ✅ Implementar geração de tokens JWT
3. ✅ Adicionar middleware de autenticação
4. ✅ Criar endpoints restantes (PDI, Metas, Feedback, etc.)

### Frontend
1. ✅ Conectar páginas com dados reais da API
2. ✅ Implementar refresh token
3. ✅ Adicionar tratamento de erros mais robusto
4. ✅ Criar formulários de criação/edição
5. ✅ Adicionar testes unitários

---

## 🎯 Stack Tecnológica

### Backend
- **FastAPI** - Framework web assíncrono
- **SQLAlchemy** - ORM
- **Alembic** - Migrations
- **PostgreSQL** - Banco de dados
- **Pydantic** - Validação de dados
- **JWT** - Autenticação

### Frontend
- **React** 19 - Framework UI
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Context API** - Gerenciamento de estado
- **CSS Modules** - Estilização

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- **Documentação da API**: http://localhost:8000/docs
- **Documentação de Integração**: `frontend/pulso360/INTEGRACAO.md`
- **README do Backend**: `backend/README.md`

---

**Desenvolvido com ❤️ para Pulso360** 🚀
