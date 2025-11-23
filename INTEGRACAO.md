# 🚀 Guia de Integração Backend-Frontend - Pulso360

## ✅ Implementações Concluídas

### Backend
1. **Autenticação JWT** ✅
   - Endpoint: `POST /api/v1/auth/login`
   - Endpoint: `POST /api/v1/auth/register`
   - Schemas: `LoginRequest`, `TokenResponse`, `UserLoginInfo`
   - Geração e validação de tokens JWT

2. **Endpoints Completos** ✅
   - ✅ `/api/v1/usuarios` - CRUD de usuários
   - ✅ `/api/v1/auth` - Autenticação (login/register)
   - ✅ `/api/v1/perfil-usuarios` - Perfis
   - ✅ `/api/v1/equipes` - Equipes
   - ✅ `/api/v1/membros-equipe` - Membros de equipe
   - ✅ `/api/v1/papeis` - Papéis
   - ✅ `/api/v1/usuario-papeis` - Papéis de usuário
   - ✅ `/api/v1/usuario-competencias` - Competências
   - ✅ `/api/v1/ciclos-avaliacao` - Ciclos de avaliação
   - ✅ `/api/v1/avaliacoes` - Avaliações
   - ✅ `/api/v1/itens-avaliacao` - Itens de avaliação
   - ✅ `/api/v1/pdis` - PDIs
   - ✅ `/api/v1/metas` - Metas
   - ✅ `/api/v1/acoes-meta` - Ações de meta
   - ✅ `/api/v1/feedbacks` - Feedbacks

3. **Frontend Atualizado** ✅
   - ❌ Removidos fallbacks mockados do `authService.js`
   - ❌ Removidos fallbacks mockados do `usuarioService.js`
   - ✅ Interceptors Axios configurados com JWT
   - ✅ Tratamento de erros 401 (token expirado)

## 🔧 Passos para Testar a Integração

### 1. Preparar o Ambiente

#### Instalar dependências do backend:
```bash
cd backend
poetry install
```

#### Instalar dependências do frontend:
```bash
cd frontend/pulso360
npm install
```

### 2. Configurar Banco de Dados

#### Criar arquivo `.env` no backend (se não existir):
```bash
cd backend
cat > .env << 'EOF'
DB_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/pulso360
JWT_SECRET=sua_chave_secreta_super_segura_aqui_mude_em_producao
ACCESS_TOKEN_EXPIRE_MINUTES=60
API_V1_STR=/api/v1
EOF
```

#### Executar migrações do Alembic:
```bash
cd backend
poetry run alembic upgrade head
```

### 3. Criar Usuário de Teste

```bash
cd backend
poetry run python -m backend.criar_usuario_teste
```

**Credenciais criadas:**
- Email: `admin@pulso360.com`
- Senha: `admin123`

### 4. Iniciar Backend

```bash
cd backend
poetry run uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Acesse a documentação da API: http://localhost:8000/docs

### 5. Iniciar Frontend

```bash
cd frontend/pulso360
npm start
```

Acesse o frontend: http://localhost:3000

### 6. Testar Login

1. Acesse http://localhost:3000/login
2. Use as credenciais:
   - **Email:** `admin@pulso360.com`
   - **Senha:** `admin123`
3. Você será redirecionado para o dashboard

## 🧪 Testar Endpoints

### No Swagger (http://localhost:8000/docs):

1. **Fazer Login:**
   - Endpoint: `POST /api/v1/auth/login`
   - Body:
     ```json
     {
       "email": "admin@pulso360.com",
       "senha": "admin123"
     }
     ```
   - Copie o `access_token` retornado

2. **Autorizar:**
   - Clique em "Authorize" no topo
   - Cole o token no formato: `Bearer seu_token_aqui`
   - Clique em "Authorize"

3. **Testar Endpoints Protegidos:**
   - `GET /api/v1/usuarios` - Listar usuários
   - `POST /api/v1/usuarios` - Criar usuário
   - `GET /api/v1/avaliacoes` - Listar avaliações
   - etc.

## 📊 Endpoints Disponíveis

### Autenticação
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Registro

### Usuários e Perfis
- `GET/POST/PUT/DELETE /api/v1/usuarios`
- `GET/POST/PUT/DELETE /api/v1/perfil-usuarios`

### Equipes
- `GET/POST/PUT/DELETE /api/v1/equipes`
- `GET/POST/PUT/DELETE /api/v1/membros-equipe`

### Papéis e Competências
- `GET/POST/PUT/DELETE /api/v1/papeis`
- `GET/POST/PUT/DELETE /api/v1/usuario-papeis`
- `GET/POST/PUT/DELETE /api/v1/usuario-competencias`

### Avaliações
- `GET/POST/PUT/DELETE /api/v1/ciclos-avaliacao`
- `GET/POST/PUT/DELETE /api/v1/avaliacoes`
- `POST /api/v1/avaliacoes/{id}/concluir` - Concluir avaliação
- `GET/POST/PUT/DELETE /api/v1/itens-avaliacao`

### PDI e Metas
- `GET/POST/PUT/DELETE /api/v1/pdis`
- `GET/POST/PUT/DELETE /api/v1/metas`
- `GET/POST/PUT/DELETE /api/v1/acoes-meta`

### Feedbacks
- `GET/POST/PUT/DELETE /api/v1/feedbacks`

## 🔍 Verificar Integração

### No Console do Navegador (F12):

Procure por:
- ✅ `🔐 Tentando fazer login com: admin@pulso360.com`
- ✅ `✅ Login bem-sucedido:` (deve mostrar dados reais, não mock)
- ❌ `🎭 Usando autenticação mock` (NÃO deve aparecer mais)

### No Network Tab:

1. Faça login
2. Abra DevTools → Network
3. Procure por chamada para `auth/login`
4. Status deve ser `200 OK`
5. Response deve conter `access_token` e dados do `user`

## 📝 Estrutura do Token JWT

O token contém:
```json
{
  "sub": "admin@pulso360.com",
  "user_id": "uuid-do-usuario",
  "exp": 1234567890,
  "iat": 1234567890,
  "type": "access_token"
}
```

## 🐛 Troubleshooting

### Backend não inicia:
```bash
# Verificar se Poetry está instalado
poetry --version

# Se não, instalar:
curl -sSL https://install.python-poetry.org | python3 -

# Instalar dependências
cd backend
poetry install
```

### Erro de banco de dados:
```bash
# Criar banco PostgreSQL
createdb pulso360

# Ou usar Docker:
docker run --name pulso360-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=pulso360 -p 5432:5432 -d postgres:15

# Executar migrações
cd backend
poetry run alembic upgrade head
```

### Frontend não conecta:
- Verificar se backend está rodando em http://localhost:8000
- Verificar console do navegador para erros de CORS
- CORS já está configurado no `main.py` para aceitar `localhost:3000`

### Token expira:
- Token válido por 60 minutos
- Após expirar, usuário será redirecionado para login automaticamente
- Para alterar tempo, editar `ACCESS_TOKEN_EXPIRE_MINUTES` em `.env`

## 🎉 Próximos Passos

1. ✅ Autenticação funcionando
2. ✅ Todos os endpoints implementados
3. ✅ Frontend sem mocks
4. 🔜 Testes automatizados
5. 🔜 Refresh token
6. 🔜 Permissões por papel (RBAC)
7. 🔜 Rate limiting
8. 🔜 Logs de auditoria

---

**Desenvolvido para Pulso360**  
Data: 23 de novembro de 2025
