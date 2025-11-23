# 🛠️ Guia Prático: Iniciando Fase 2

## Resumo Executivo
Esta é a próxima fase crítica da refatoração. Vamos criar a camada de serviços que centraliza todas as chamadas de API.

---

## 📁 Estrutura a Criar

```
src/services/
├── api/
│   ├── client.js          ← Axios configurado
│   ├── endpoints.js       ← URLs centralizadas
│   ├── interceptors.js    ← (opcional) Interceptadores
│   └── index.js           ← Barrel export
├── auth/
│   └── authService.js     ← Autenticação
├── user/
│   └── userService.js     ← Gestão de usuários
├── evaluation/
│   └── evaluationService.js ← Avaliações
├── team/
│   └── teamService.js     ← Equipes (futuro)
├── meta/
│   └── metaService.js     ← Metas (futuro)
├── pdi/
│   └── pdiService.js      ← PDI (futuro)
└── feedback/
    └── feedbackService.js ← Feedback (futuro)
```

---

## 🚀 Passo 1: Criar Estrutura de Diretórios

```bash
# No terminal, dentro de frontend/pulso360/
mkdir -p src/services/api
mkdir -p src/services/auth
mkdir -p src/services/user
mkdir -p src/services/evaluation
mkdir -p src/services/team
mkdir -p src/services/meta
mkdir -p src/services/pdi
mkdir -p src/services/feedback
```

---

## 📝 Passo 2: Criar API Client

### Arquivo: `src/services/api/client.js`

```javascript
/**
 * @fileoverview Configuração centralizada do cliente HTTP
 * @requires axios
 */

import axios from 'axios';
import { 
  API_BASE_URL, 
  API_TIMEOUT, 
  AUTH_TOKEN_KEY 
} from '@/utils/constants';
import { AuthenticationError } from '@/utils/errors';

/**
 * Instância centralizada do Axios com configurações padrão
 * @type {AxiosInstance}
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Interceptador de requisição
 * Adiciona token de autenticação automaticamente
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptador de resposta
 * Trata erros comuns (401, 403, etc)
 */
apiClient.interceptors.response.use(
  (response) => {
    // Retornar apenas os dados, não a resposta toda
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    
    // Tratar 401 (não autenticado)
    if (status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = '/login';
      throw new AuthenticationError('Sessão expirada. Faça login novamente.');
    }
    
    // Tratar 403 (não autorizado)
    if (status === 403) {
      throw new Error('Você não tem permissão para acessar este recurso.');
    }
    
    // Tratar 404 (não encontrado)
    if (status === 404) {
      throw new Error('Recurso não encontrado.');
    }
    
    // Tratar erro de servidor
    if (status >= 500) {
      throw new Error('Erro no servidor. Tente novamente mais tarde.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 📍 Passo 3: Definir Endpoints

### Arquivo: `src/services/api/endpoints.js`

```javascript
/**
 * @fileoverview Definição centralizada de endpoints da API
 * @description Todos os endpoints devem ser definidos aqui para facilitar manutenção
 */

/**
 * Endpoints da API
 * @type {Object}
 */
export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me'
  },

  // Usuários
  USERS: {
    LIST: '/users',
    GET: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    PASSWORD: '/users/password'
  },

  // Avaliações
  EVALUATIONS: {
    LIST: '/evaluations',
    GET: (id) => `/evaluations/${id}`,
    CREATE: '/evaluations',
    UPDATE: (id) => `/evaluations/${id}`,
    DELETE: (id) => `/evaluations/${id}`,
    SUBMIT: (id) => `/evaluations/${id}/submit`,
    RESULTS: (id) => `/evaluations/${id}/results`,
    STATS: '/evaluations/stats'
  },

  // Equipes
  TEAMS: {
    LIST: '/teams',
    GET: (id) => `/teams/${id}`,
    CREATE: '/teams',
    UPDATE: (id) => `/teams/${id}`,
    DELETE: (id) => `/teams/${id}`,
    MEMBERS: (id) => `/teams/${id}/members`
  },

  // Metas
  METAS: {
    LIST: '/metas',
    GET: (id) => `/metas/${id}`,
    CREATE: '/metas',
    UPDATE: (id) => `/metas/${id}`,
    DELETE: (id) => `/metas/${id}`,
    ACTIONS: (id) => `/metas/${id}/actions`
  },

  // PDI (Plano de Desenvolvimento Individual)
  PDI: {
    LIST: '/pdi',
    GET: (id) => `/pdi/${id}`,
    CREATE: '/pdi',
    UPDATE: (id) => `/pdi/${id}`,
    DELETE: (id) => `/pdi/${id}`,
    PROGRESS: (id) => `/pdi/${id}/progress`
  },

  // Feedback
  FEEDBACK: {
    LIST: '/feedback',
    GET: (id) => `/feedback/${id}`,
    CREATE: '/feedback',
    UPDATE: (id) => `/feedback/${id}`,
    DELETE: (id) => `/feedback/${id}`,
    RESPONSES: (id) => `/feedback/${id}/responses`,
    ANALYTICS: '/feedback/analytics'
  }
};

export default API_ENDPOINTS;
```

---

## 🔐 Passo 4: Implementar AuthService

### Arquivo: `src/services/auth/authService.js`

```javascript
/**
 * @fileoverview Serviço de autenticação
 * @requires src/services/api/client
 * @requires src/services/api/endpoints
 * @requires src/utils/validators
 * @requires src/utils/errors
 */

import apiClient from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { validateEmail, validatePassword } from '@/utils/validators';
import { 
  AuthenticationError, 
  ValidationError,
  handleError 
} from '@/utils/errors';
import { AUTH_TOKEN_KEY } from '@/utils/constants';

/**
 * Serviço de autenticação e gerenciamento de sessão
 * @namespace authService
 */
const authService = {
  /**
   * Realiza login do usuário
   * @async
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<{token: string, user: Object}>} Token e dados do usuário
   * @throws {ValidationError} Se email ou senha inválidos
   * @throws {AuthenticationError} Se credenciais incorretas
   * 
   * @example
   * try {
   *   const result = await authService.login('user@example.com', 'password123');
   *   console.log('Login bem-sucedido:', result.user);
   * } catch (error) {
   *   console.error('Erro no login:', error.message);
   * }
   */
  async login(email, password) {
    try {
      // Validar entrada
      if (!validateEmail(email)) {
        throw new ValidationError('Email inválido');
      }
      if (!validatePassword(password)) {
        throw new ValidationError('Senha deve ter ao menos 8 caracteres');
      }

      // Fazer requisição
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );

      // Salvar token
      if (response.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      }

      return {
        token: response.token,
        user: response.user
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new AuthenticationError('Falha ao fazer login. Verifique suas credenciais.');
    }
  },

  /**
   * Realiza logout do usuário
   * @async
   * @returns {Promise<void>}
   * @example
   * await authService.logout();
   * window.location.href = '/login';
   */
  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.warn('Erro ao fazer logout no servidor:', error);
    } finally {
      // Sempre limpar dados locais
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('user_data');
    }
  },

  /**
   * Registra um novo usuário
   * @async
   * @param {Object} userData - Dados do novo usuário
   * @param {string} userData.email - Email
   * @param {string} userData.password - Senha
   * @param {string} userData.name - Nome completo
   * @returns {Promise<{token: string, user: Object}>} Token e dados do usuário criado
   * @throws {ValidationError} Se dados inválidos
   * @example
   * const newUser = await authService.register({
   *   email: 'novo@example.com',
   *   password: 'senhaSegura123',
   *   name: 'Novo Usuário'
   * });
   */
  async register(userData) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );

      if (response.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.token);
      }

      return response;
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Verifica se usuário está autenticado
   * @returns {boolean} True se tem token válido
   * @example
   * if (authService.isAuthenticated()) {
   *   // Mostrar dados do usuário
   * }
   */
  isAuthenticated() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  },

  /**
   * Obtém token de autenticação
   * @returns {string|null} Token ou null se não autenticado
   */
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Obtém dados do usuário autenticado
   * @async
   * @returns {Promise<Object>} Dados do usuário
   * @throws {AuthenticationError} Se não autenticado
   * @example
   * const user = await authService.getCurrentUser();
   * console.log('Usuário:', user.name);
   */
  async getCurrentUser() {
    try {
      return await apiClient.get(API_ENDPOINTS.AUTH.ME);
    } catch (error) {
      throw new AuthenticationError('Falha ao carregar dados do usuário');
    }
  },

  /**
   * Atualiza senha do usuário
   * @async
   * @param {string} oldPassword - Senha atual
   * @param {string} newPassword - Nova senha
   * @returns {Promise<void>}
   * @throws {ValidationError} Se senhas inválidas
   * @throws {AuthenticationError} Se senha atual incorreta
   */
  async changePassword(oldPassword, newPassword) {
    try {
      await apiClient.post(
        API_ENDPOINTS.USERS.PASSWORD,
        { oldPassword, newPassword }
      );
    } catch (error) {
      throw handleError(error);
    }
  }
};

export default authService;
```

---

## 👥 Passo 5: Implementar UserService

### Arquivo: `src/services/user/userService.js`

```javascript
/**
 * @fileoverview Serviço de gerenciamento de usuários
 * @requires src/services/api/client
 * @requires src/services/api/endpoints
 */

import apiClient from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { handleError } from '@/utils/errors';

/**
 * Serviço de usuários
 * @namespace userService
 */
const userService = {
  /**
   * Busca lista de usuários
   * @async
   * @param {Object} params - Parâmetros de busca
   * @param {number} [params.page=1] - Página
   * @param {number} [params.pageSize=10] - Itens por página
   * @param {string} [params.search] - Texto de busca
   * @param {string} [params.role] - Filtro por papel
   * @returns {Promise<{users: Array, total: number, totalPages: number}>} Lista de usuários
   * @example
   * const result = await userService.getUsers({ page: 1, pageSize: 10 });
   */
  async getUsers(params = {}) {
    try {
      return await apiClient.get(API_ENDPOINTS.USERS.LIST, { params });
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Busca usuário por ID
   * @async
   * @param {string|number} id - ID do usuário
   * @returns {Promise<Object>} Dados do usuário
   * @example
   * const user = await userService.getUserById(123);
   */
  async getUserById(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.USERS.GET(id));
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Cria novo usuário
   * @async
   * @param {Object} userData - Dados do novo usuário
   * @returns {Promise<Object>} Usuário criado
   * @example
   * const newUser = await userService.createUser({
   *   name: 'João Silva',
   *   email: 'joao@example.com',
   *   role: 'user'
   * });
   */
  async createUser(userData) {
    try {
      return await apiClient.post(API_ENDPOINTS.USERS.CREATE, userData);
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Atualiza usuário
   * @async
   * @param {string|number} id - ID do usuário
   * @param {Object} userData - Dados atualizados
   * @returns {Promise<Object>} Usuário atualizado
   */
  async updateUser(id, userData) {
    try {
      return await apiClient.put(
        API_ENDPOINTS.USERS.UPDATE(id),
        userData
      );
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Deleta usuário
   * @async
   * @param {string|number} id - ID do usuário
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    try {
      return await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    } catch (error) {
      throw handleError(error);
    }
  }
};

export default userService;
```

---

## 📊 Passo 6: Criar Barrel Export

### Arquivo: `src/services/api/index.js`

```javascript
export { default as apiClient } from './client';
export { API_ENDPOINTS } from './endpoints';
```

### Arquivo: `src/services/index.js`

```javascript
export { default as apiClient } from './api/client';
export { API_ENDPOINTS } from './api/endpoints';
export { default as authService } from './auth/authService';
export { default as userService } from './user/userService';
```

---

## ✅ Checklist de Implementação

- [ ] Criar estrutura de diretórios
- [ ] Implementar `api/client.js`
- [ ] Implementar `api/endpoints.js`
- [ ] Implementar `auth/authService.js`
- [ ] Implementar `user/userService.js`
- [ ] Criar barrel exports
- [ ] Testar API client com requisição simples
- [ ] Testar login com dados reais
- [ ] Verificar se tokens estão sendo salvos
- [ ] Documentar uso em README

---

## 🧪 Testes Rápidos

### No Console do Navegador:

```javascript
// Testar se serviços estão disponíveis
import { authService, userService } from '@/services';

// Testar login
authService.login('usuario@example.com', 'senha123')
  .then(result => console.log('Login:', result))
  .catch(error => console.error('Erro:', error));

// Testar busca de usuários
userService.getUsers({ page: 1 })
  .then(result => console.log('Usuários:', result))
  .catch(error => console.error('Erro:', error));
```

---

## 📚 Próximas Tarefas

Após concluir esta seção:

1. [ ] Criar `evaluation/evaluationService.js`
2. [ ] Implementar componentes de teste (Login, Users)
3. [ ] Adicionar testes unitários para serviços
4. [ ] Documentar como usar em componentes

---

**Estimativa**: 2-3 dias para completar
**Status**: Pronto para iniciar

