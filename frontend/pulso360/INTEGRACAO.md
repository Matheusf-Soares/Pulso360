# 🔗 Guia de Integração Frontend-Backend - Pulso360

## 📋 Visão Geral

Este documento descreve como o frontend React está integrado com o backend FastAPI seguindo as especificações da OpenAPI.

## 🏗️ Arquitetura da Integração

```
frontend/
├── src/
│   ├── config/
│   │   └── api.config.js          # Configurações da API
│   ├── services/
│   │   ├── apiClient.js           # Cliente HTTP (Axios)
│   │   ├── authService.js         # Autenticação
│   │   ├── usuarioService.js      # Serviço de usuários
│   │   ├── equipeService.js       # Serviço de equipes
│   │   ├── cicloAvaliacaoService.js # Serviço de ciclos
│   │   └── index.js               # Export centralizado
│   ├── contexts/
│   │   └── AuthContext.js         # Context de autenticação
│   └── components/
│       └── ProtectedRoute.js      # Componente de rota protegida
```

## 🔐 Sistema de Autenticação

### AuthContext
Gerencia o estado global de autenticação:
- `user`: Dados do usuário logado
- `isAuthenticated`: Status de autenticação
- `login(email, senha)`: Realizar login
- `logout()`: Realizar logout
- `updateUser(userData)`: Atualizar dados do usuário

### Fluxo de Autenticação
1. Usuário faz login na página `/login`
2. `authService.login()` envia credenciais para o backend
3. Backend retorna `access_token` e dados do usuário
4. Token é salvo no `localStorage`
5. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer {token}`

### Interceptors do Axios
- **Request**: Adiciona automaticamente o token JWT em todas as requisições
- **Response**: Trata erros 401 (não autorizado) redirecionando para login

## 📡 Services (Camada de API)

### apiClient.js
Cliente HTTP configurado com:
- Base URL: `http://localhost:8000/api/v1` (configurável via `.env`)
- Timeout: 30 segundos
- Interceptors para autenticação e tratamento de erros

### authService.js
Métodos:
- `login(email, senha)`: Autentica usuário
- `logout()`: Remove token e dados do usuário
- `isAuthenticated()`: Verifica se está autenticado
- `getCurrentUser()`: Retorna usuário do localStorage
- `getToken()`: Retorna token de acesso

### usuarioService.js
Implementa endpoints de usuários conforme OpenAPI:
- `POST /usuarios` - `criar(userData)`
- `GET /usuarios` - `listar(filtros, page, size)`
- `GET /usuarios/{id}` - `obterPorId(id)`
- `PUT /usuarios/{id}` - `atualizar(id, userData)`
- `DELETE /usuarios/{id}` - `remover(id)`

### equipeService.js
Implementa endpoints de equipes conforme OpenAPI:
- `POST /equipes` - `criar(equipeData)`
- `GET /equipes` - `listar(filtros, page, size)`
- `GET /equipes/{id}` - `obterPorId(id)`
- `PUT /equipes/{id}` - `atualizar(id, equipeData)`
- `DELETE /equipes/{id}` - `remover(id)`
- `POST /membros_equipe` - `adicionarMembro(membroData)`
- `DELETE /membros_equipe/{equipeId}/{usuarioId}` - `removerMembro(equipeId, usuarioId)`
- `GET /membros_equipe` - `listarMembros(filtros)`

### cicloAvaliacaoService.js
Implementa endpoints de ciclos conforme OpenAPI:
- `POST /ciclos_avaliacao` - `criar(cicloData)`
- `GET /ciclos_avaliacao` - `listar(filtros, page, size)`
- `GET /ciclos_avaliacao/{id}` - `obterPorId(id)`
- `PUT /ciclos_avaliacao/{id}` - `atualizar(id, cicloData)`
- `DELETE /ciclos_avaliacao/{id}` - `remover(id)`

## 🛣️ Sistema de Rotas

### Rotas Públicas
- `/login` - Página de autenticação

### Rotas Protegidas (requerem autenticação)
- `/` - Dashboard (Home)
- `/avaliacoes` - Avaliações
- `/pdi` - Plano de Desenvolvimento Individual
- `/equipe` - Gestão de Equipe
- `/relatorios` - Relatórios
- `/administracao` - Administração
- `/perfil` - Perfil do Usuário
- `/notificacoes` - Notificações
- `/ajuda` - Ajuda

### Componente ProtectedRoute
Protege rotas verificando autenticação:
- Se não autenticado → Redireciona para `/login`
- Se autenticado → Renderiza o componente
- Durante verificação → Exibe tela de loading

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

### Arquivo de Configuração (api.config.js)
```javascript
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  API_VERSION: '/api/v1',
  TIMEOUT: 30000,
};
```

## 🚀 Como Usar nos Componentes

### Exemplo: Listar Usuários
```javascript
import { usuarioService } from '../services';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await usuarioService.listar({ ativo: true }, 1, 50);
        setUsuarios(response.items);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  // ...
};
```

### Exemplo: Usar Autenticação
```javascript
import { useAuth } from '../contexts/AuthContext';

const MeuComponente = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Olá, {user?.nome}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
};
```

## 📦 Tratamento de Erros

### Erros HTTP
Todos os erros HTTP são tratados automaticamente:
- **401 Unauthorized**: Redireciona para login
- **404 Not Found**: Exibe notificação de recurso não encontrado
- **500 Internal Server Error**: Exibe notificação de erro do servidor

### Notificações
O sistema usa `window.showNotification()` para exibir feedback:
```javascript
window.showNotification('Mensagem', 'tipo'); // tipo: success, error, warning, info
```

## 🔄 Paginação

Os endpoints de listagem suportam paginação via FastAPI-Pagination:
```javascript
const response = await usuarioService.listar(
  { nome: 'João' },  // filtros
  1,                  // página
  50                  // tamanho da página
);

// Resposta:
// {
//   items: [...],
//   total: 100,
//   page: 1,
//   size: 50,
//   pages: 2
// }
```

## 🎯 Próximos Passos

### Implementar Endpoints de Autenticação no Backend
1. Criar `POST /api/v1/auth/login`
2. Criar `POST /api/v1/auth/refresh`
3. Criar `POST /api/v1/auth/logout`

### Adicionar Mais Services
1. `avaliacaoService.js` - Gerenciar avaliações
2. `pdiService.js` - Gerenciar PDIs
3. `metaService.js` - Gerenciar metas
4. `feedbackService.js` - Gerenciar feedbacks

### Integrar Dados Reais
1. Conectar página Home aos dados reais
2. Conectar página PDI aos dados reais
3. Conectar página Avaliações aos dados reais
4. Conectar página Equipe aos dados reais

## 📝 Notas Importantes

1. **CORS**: Configure CORS no backend FastAPI para aceitar requisições do frontend:
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Token JWT**: O backend deve retornar um token JWT válido no formato:
   ```json
   {
     "access_token": "eyJ...",
     "token_type": "bearer",
     "user": {
       "id": "uuid",
       "nome": "string",
       "email": "string"
     }
   }
   ```

3. **Validação**: Os schemas Pydantic do backend já validam os dados. O frontend deve enviar dados no formato correto.

## 🛠️ Troubleshooting

### Erro de CORS
**Problema**: `Access-Control-Allow-Origin` error  
**Solução**: Adicionar middleware CORS no backend

### Token Expirado
**Problema**: Requisições retornam 401  
**Solução**: O interceptor já redireciona para login automaticamente

### Backend Não Responde
**Problema**: `Network Error` ou `ECONNREFUSED`  
**Solução**: Verificar se backend está rodando em `http://localhost:8000`

---

**Desenvolvido para Pulso360** 🚀
