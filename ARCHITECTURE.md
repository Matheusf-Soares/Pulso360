# 🏛️ Arquitetura e Best Practices - Pulso360

## 1. Estrutura de Diretórios Recomendada

```
frontend/pulso360/src/
├── assets/                 # Imagens, ícones, fontes
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/
│   ├── common/             # Componentes reutilizáveis
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── Card/
│   ├── layout/             # Layout principal
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── MainLayout/
│   └── features/           # Componentes específicos de features
│       ├── Auth/
│       ├── Dashboard/
│       └── Admin/
├── contexts/               # Context API
│   ├── AuthContext.js
│   ├── AppContext.js
│   └── NotificationContext.js
├── hooks/                  # Hooks customizados
│   ├── useForm.js
│   ├── useFetch.js
│   └── useLocalStorage.js
├── pages/                  # Páginas/Rotas
│   ├── auth/
│   │   ├── Login.js
│   │   └── Register.js
│   ├── dashboard/
│   ├── admin/
│   └── 404.js
├── services/               # Serviços de API
│   ├── api/
│   │   ├── client.js       # Configuração Axios
│   │   ├── endpoints.js    # URLs de endpoints
│   │   └── interceptors.js # Interceptadores HTTP
│   ├── auth/
│   │   └── authService.js
│   └── data/
│       ├── userService.js
│       └── evaluationService.js
├── utils/                  # Utilidades
│   ├── validators.js       # Validadores
│   ├── formatters.js       # Formatadores
│   ├── constants.js        # Constantes
│   ├── cache.js            # Cache
│   ├── errors.js           # Tratamento de erros
│   └── helpers.js          # Funções auxiliares
├── styles/                 # Estilos globais
│   ├── variables.css       # Variáveis CSS
│   ├── global.css          # Estilos globais
│   ├── reset.css           # CSS reset
│   └── responsive.css      # Media queries
├── types/                  # Tipos JSDoc
│   ├── user.types.js
│   └── api.types.js
├── config/                 # Configurações
│   ├── api.config.js
│   ├── auth.config.js
│   └── routes.config.js
├── App.js                  # Componente raiz
└── index.js                # Ponto de entrada
```

## 2. Serviço de API Centralizado

### api/client.js
```javascript
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptador de requisição
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptador de resposta
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Redirecionar para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### api/endpoints.js
```javascript
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh'
  },
  
  // Users
  USERS: {
    LIST: '/users',
    GET: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`
  },
  
  // Evaluations
  EVALUATIONS: {
    LIST: '/evaluations',
    GET: (id) => `/evaluations/${id}`,
    CREATE: '/evaluations',
    UPDATE: (id) => `/evaluations/${id}`
  }
};
```

## 3. Serviços de Dados

### services/auth/authService.js
```javascript
import apiClient from '@/services/api/client';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { AuthenticationError } from '@/utils/errors';

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );
      
      localStorage.setItem('auth_token', response.token);
      return response;
    } catch (error) {
      throw new AuthenticationError('Falha ao fazer login');
    }
  },

  async logout() {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },

  async register(userData) {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  getToken() {
    return localStorage.getItem('auth_token');
  }
};

export default authService;
```

## 4. Roteamento Seguro

### config/routes.config.js
```javascript
import { lazy } from 'react';

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Admin = lazy(() => import('@/pages/admin/Admin'));
const Login = lazy(() => import('@/pages/auth/Login'));
const NotFound = lazy(() => import('@/pages/404'));

export const PUBLIC_ROUTES = [
  {
    path: '/login',
    element: <Login />,
    name: 'Login'
  }
];

export const PROTECTED_ROUTES = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    name: 'Dashboard',
    roles: ['user', 'admin']
  },
  {
    path: '/admin',
    element: <Admin />,
    name: 'Administração',
    roles: ['admin']
  }
];

export const FALLBACK_ROUTE = {
  path: '*',
  element: <NotFound />,
  name: 'Não Encontrado'
};

export const ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES, FALLBACK_ROUTE];
```

## 5. Context API com TypeScript

### contexts/AuthContext.js
```javascript
import { createContext, useState, useCallback, useEffect } from 'react';
import authService from '@/services/auth/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação ao carregar
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        setIsAuthenticated(true);
        // Buscar dados do usuário
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await authService.login(email, password);
    setUser(result.user);
    setIsAuthenticated(true);
    return result;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 6. Proteção de Rotas

### components/ProtectedRoute/ProtectedRoute.js
```javascript
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

export function ProtectedRoute({ element, roles = [] }) {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/404" replace />;
  }

  return element;
}
```

## 7. Tratamento de Erros Global

### App.js
```javascript
import { useEffect } from 'react';
import { handleError } from '@/utils/errors';

function App() {
  useEffect(() => {
    // Tratador de erro global
    window.addEventListener('error', (event) => {
      console.error('Erro global:', event.error);
      handleError(event.error);
    });

    // Tratador de rejeição de promise não capturada
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Promise rejeitada:', event.reason);
      handleError(event.reason);
    });

    return () => {
      window.removeEventListener('error', undefined);
      window.removeEventListener('unhandledrejection', undefined);
    };
  }, []);

  return (
    // ...
  );
}

export default App;
```

## 8. Variáveis de Ambiente

### .env.example
```env
# API
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_API_TIMEOUT=30000

# Auth
REACT_APP_AUTH_TOKEN_KEY=auth_token
REACT_APP_TOKEN_EXPIRATION=86400000

# App
REACT_APP_APP_NAME=Pulso360
REACT_APP_VERSION=0.1.0
REACT_APP_ENVIRONMENT=development
```

## 9. CI/CD Pipeline

### .github/workflows/build.yml
```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

## 10. Monitoramento e Logging

### utils/logger.js
```javascript
const logLevels = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

export const logger = {
  debug: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  
  info: (message, data) => {
    console.log(`[INFO] ${message}`, data);
  },
  
  warn: (message, data) => {
    console.warn(`[WARN] ${message}`, data);
  },
  
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
    // Enviar para serviço de logging externo
  }
};
```

---

**Versão**: 1.0
**Última atualização**: 23 de Novembro de 2025
