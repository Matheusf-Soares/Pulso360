# 🎯 Próximas Ações - Pulso360

## Status Atual
- ✅ **Fase 1**: Estrutura Base - CONCLUÍDO (100%)
- ⏳ **Fase 2**: Camada de Serviços - PRÓXIMA (0%)
- ⏸️ **Fases 3-6**: Pendentes

---

## 📋 Fase 2: Camada de Serviços (PRÓXIMA)

### Prioridade 1: API Client e Endpoints (1-2 dias)

#### 1. Criar `src/services/api/client.js`
```javascript
// Configuração centralizada do Axios
// Interceptadores de request e response
// Tratamento de erros globais
// Refresh automático de tokens
```

**Por que primeiro?**
- Todas as chamadas de API dependem disso
- Base para todos os serviços
- Permite compartilhamento de configuração

---

#### 2. Criar `src/services/api/endpoints.js`
```javascript
// Centralizar URLs de todos os endpoints
// Facilitar manutenção
// Evitar strings mágicas no código
```

**Por que logo após?**
- Complementa o client.js
- Necessário antes de implementar serviços

---

### Prioridade 2: Serviços Básicos (2-3 dias)

#### 3. Criar `src/services/auth/authService.js`
```javascript
// login(email, password)
// logout()
// register(userData)
// isAuthenticated()
// getToken()
// refreshToken()
```

**Por que fundamental?**
- Necessário para autenticação
- Usado em quase todos os outros serviços
- Deve ser implementado antes dos demais

---

#### 4. Criar `src/services/user/userService.js`
```javascript
// getUsers(filters, pagination)
// getUserById(id)
// createUser(userData)
// updateUser(id, userData)
// deleteUser(id)
```

**Prioridade**: Alta - Base para admin pages

---

#### 5. Criar `src/services/evaluation/evaluationService.js`
```javascript
// getEvaluations(filters)
// getEvaluationById(id)
// createEvaluation(data)
// submitEvaluation(id, responses)
// getEvaluationResults(id)
```

**Prioridade**: Alta - Core do sistema

---

### Prioridade 3: Integração com Componentes (2-3 dias)

#### 6. Atualizar páginas para usar serviços
- [ ] `pages/auth/Login.js` → usar authService
- [ ] `pages/admin/Users.js` → usar userService
- [ ] `pages/AvaliacaoPendente.js` → usar evaluationService
- [ ] `pages/DashboardExecutivo.js` → usar múltiplos serviços

---

## 🔄 Fluxo de Trabalho Recomendado

### Dia 1-2: API Client
```
1. Criar client.js com Axios
2. Adicionar interceptadores
3. Testar com requisição simples
4. Documentar uso
```

### Dia 2-3: Endpoints e AuthService
```
1. Criar endpoints.js
2. Criar authService.js
3. Testar login/logout
4. Integrar com Login.js
5. Testar fluxo completo
```

### Dia 4-5: UserService
```
1. Criar userService.js
2. Teste funções CRUD
3. Integrar com Users.js
4. Testar paginação e filtros
```

### Dia 5-6: EvaluationService
```
1. Criar evaluationService.js
2. Testar principais funções
3. Integrar com páginas de avaliação
4. Testar fluxo completo
```

### Dia 6-7: Revisão e Testes
```
1. Testar todas as integrações
2. Verificar erros
3. Documentar
4. Preparar para Fase 3
```

---

## 💡 Dicas de Implementação

### Para AuthService:
```javascript
// Salvar token após login
localStorage.setItem('auth_token', response.token);

// Usar em interceptadores
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Para Outros Serviços:
```javascript
// Pattern consistente
const userService = {
  async getUsers() { /* ... */ },
  async getUserById(id) { /* ... */ },
  async createUser(data) { /* ... */ }
};

// Sempre retornar dados ou lançar erro
export default userService;
```

### Para Tratamento de Erros:
```javascript
try {
  const response = await apiClient.post(endpoint, data);
  return response;
} catch (error) {
  if (error.response?.status === 400) {
    throw new ValidationError(error.response.data.message);
  } else if (error.response?.status === 401) {
    throw new AuthenticationError('Unauthorized');
  }
  throw error;
}
```

---

## 📊 Impacto de Cada Serviço

| Serviço | Complexidade | Impacto | Dependências |
|---------|-------------|--------|--------------|
| API Client | Alto | Crítica | Nenhuma |
| Auth | Médio | Crítica | API Client |
| User | Médio | Alta | API Client, Auth |
| Evaluation | Alto | Alta | API Client, Auth |
| Team | Médio | Média | API Client, Auth |
| Meta | Médio | Média | API Client, Auth |
| PDI | Médio | Média | API Client, Auth |
| Feedback | Baixo | Média | API Client, Auth |

---

## ✅ Critérios de Aceitação

### Cada Serviço Deve:
- [ ] Usar o API client centralizado
- [ ] Ter tratamento de erro apropriado
- [ ] Retornar dados consistentes
- [ ] Estar documentado com JSDoc
- [ ] Ter exemplos de uso
- [ ] Funcionar com os hooks existentes (useFetch)

### Cada Integração Deve:
- [ ] Usar o serviço correspondente
- [ ] Mostrar loading enquanto busca dados
- [ ] Mostrar erro em caso de falha
- [ ] Refetch quando necessário
- [ ] Usar validação antes de enviar

---

## 🚨 Problemas Comuns a Evitar

❌ **Não fazer:**
- Fazer chamadas de API diretamente nos componentes
- Duplicar URLs de endpoints em múltiplos locais
- Ignorar erros de API
- Enviar dados sem validação
- Ter lógica de negócio nos componentes

✅ **Fazer:**
- Usar serviços centralizados
- Definir endpoints uma vez
- Sempre capturar e tratar erros
- Validar dados antes de enviar
- Manter lógica de negócio nos serviços

---

## 📝 Template para Novo Serviço

```javascript
/**
 * @fileoverview Serviço para [recurso]
 * @requires src/services/api/client
 * @requires src/services/api/endpoints
 */

import apiClient from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { handleError } from '@/utils/errors';

/**
 * Serviço para gerenciar [recurso]
 * @namespace [recurso]Service
 */
const [recurso]Service = {
  /**
   * Busca lista de [recursos]
   * @async
   * @param {Object} params - Parâmetros de busca
   * @param {number} [params.page=1] - Página
   * @param {number} [params.pageSize=10] - Itens por página
   * @returns {Promise<Array>} Lista de [recursos]
   */
  async getAll(params = {}) {
    try {
      return await apiClient.get(API_ENDPOINTS.[RECURSO].LIST, { params });
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Busca um [recurso] por ID
   * @async
   * @param {string|number} id - ID do [recurso]
   * @returns {Promise<Object>} Dados do [recurso]
   */
  async getById(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.[RECURSO].GET(id));
    } catch (error) {
      throw handleError(error);
    }
  },

  /**
   * Cria um novo [recurso]
   * @async
   * @param {Object} data - Dados do novo [recurso]
   * @returns {Promise<Object>} [Recurso] criado
   */
  async create(data) {
    try {
      return await apiClient.post(API_ENDPOINTS.[RECURSO].CREATE, data);
    } catch (error) {
      throw handleError(error);
    }
  }
};

export default [recurso]Service;
```

---

## 🎓 Aprendizados e Boas Práticas

### 1. **Separação de Responsabilidades**
- Componentes: Renderização e interação
- Hooks: Gerenciamento de estado
- Serviços: Lógica de negócio e API
- Utils: Funções reutilizáveis

### 2. **Reutilização de Código**
- Todos os serviços usam o mesmo API client
- Todos usam os mesmos error handlers
- Padrões consistentes em todos os serviços

### 3. **Tratamento de Erros**
- Erros capturados em serviços
- Convertidos para exceções apropriadas
- Tratados em componentes com feedback visual

### 4. **Documentação**
- JSDoc em todas as funções
- Exemplos de uso
- Tipos de parâmetros e retorno

---

## 📈 Próximos Passos Após Fase 2

Uma vez completa a Fase 2, proceder para:

1. **Fase 3**: Qualidade de Código
   - Adicionar testes para serviços
   - Implementar validação em formulários
   - Melhorar tratamento de erros

2. **Fase 4**: Performance
   - Implementar caching
   - Lazy loading de componentes
   - Otimizações de render

3. **Fase 5**: Segurança
   - Validação de entrada
   - CSRF protection
   - Rate limiting

4. **Fase 6**: Entrega
   - Build otimizado
   - Documentação final
   - Deploy

---

**Estimativa**: 7-10 dias para concluir Fase 2
**Próxima Revisão**: Após conclusão do API Client

