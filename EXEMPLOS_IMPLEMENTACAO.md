# 📚 Exemplos de Implementação - Pulso360

## 1. Componente de Login com Validação

### pages/auth/Login.js
```javascript
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { validateForm } from '@/utils/validators';
import { AuthContext } from '@/contexts/AuthContext';
import { handleError } from '@/utils/errors';
import './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const rules = {
    email: ['required', 'email'],
    password: ['required', 'password']
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { email: '', password: '' },
    rules,
    onSubmit
  );

  async function onSubmit() {
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Bem-vindo ao Pulso360</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
            placeholder="seu@email.com"
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.password && errors.password ? 'error' : ''}
            placeholder="••••••••"
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login;
```

## 2. Lista de Usuários com Paginação

### pages/admin/Users.js
```javascript
import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { formatDate } from '@/utils/formatters';
import { CacheManager } from '@/utils/cache';
import './Users.module.css';

const cacheManager = new CacheManager();

function Users() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, loading, error, refetch } = useFetch(
    `${API_ENDPOINTS.USERS.LIST}?page=${page}&pageSize=${pageSize}`,
    {
      cacheTime: 5 * 60 * 1000 // 5 minutos
    }
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div className="users-container">
      <h1>Usuários</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Data Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{formatDate(user.createdAt, 'DD/MM/YYYY')}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>Página {page} de {data?.totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === data?.totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

function handleEdit(userId) {
  // Implementar lógica de edição
}

function handleDelete(userId) {
  // Implementar lógica de exclusão
}

export default Users;
```

## 3. Formulário com Múltiplos Campos

### components/features/UserForm/UserForm.js
```javascript
import { useForm } from '@/hooks/useForm';
import { validateForm } from '@/utils/validators';
import { formatPhone, formatCPF } from '@/utils/formatters';
import { handleError } from '@/utils/errors';
import './UserForm.module.css';

function UserForm({ onSubmit, initialValues = {} }) {
  const rules = {
    name: ['required', { min: 3 }, { max: 100 }],
    email: ['required', 'email'],
    phone: ['required', 'phone'],
    cpf: ['required', 'cpf'],
    departamento: ['required']
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm(
    initialValues || {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      departamento: ''
    },
    rules,
    async (formData) => {
      try {
        await onSubmit(formData);
        reset();
      } catch (error) {
        handleError(error);
      }
    }
  );

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    handleChange({
      target: {
        name: 'phone',
        value: formatted
      }
    });
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    handleChange({
      target: {
        name: 'cpf',
        value: formatted
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nome Completo *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? 'error' : ''}
            placeholder="João Silva"
          />
          {touched.name && errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
            placeholder="joao@example.com"
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Telefone *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            className={touched.phone && errors.phone ? 'error' : ''}
            placeholder="(11) 98765-4321"
          />
          {touched.phone && errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF *</label>
          <input
            id="cpf"
            type="text"
            name="cpf"
            value={values.cpf}
            onChange={handleCPFChange}
            onBlur={handleBlur}
            className={touched.cpf && errors.cpf ? 'error' : ''}
            placeholder="123.456.789-00"
          />
          {touched.cpf && errors.cpf && (
            <span className="error-message">{errors.cpf}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="departamento">Departamento *</label>
        <select
          id="departamento"
          name="departamento"
          value={values.departamento}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.departamento && errors.departamento ? 'error' : ''}
        >
          <option value="">Selecione um departamento</option>
          <option value="ti">TI</option>
          <option value="rh">RH</option>
          <option value="vendas">Vendas</option>
          <option value="financeiro">Financeiro</option>
        </select>
        {touched.departamento && errors.departamento && (
          <span className="error-message">{errors.departamento}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={reset}>
          Limpar
        </button>
      </div>
    </form>
  );
}

export default UserForm;
```

## 4. Dashboard com Dados em Cache

### pages/dashboard/Dashboard.js
```javascript
import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { CacheManager } from '@/utils/cache';
import DashboardChart from '@/components/DashboardChart';
import './Dashboard.module.css';

const cache = new CacheManager();

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useLocalStorage('dashboard_period', 'month');
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: stats, loading: statsLoading } = useFetch(
    `${API_ENDPOINTS.USERS.LIST}/stats?period=${selectedPeriod}`,
    { 
      cacheTime: 10 * 60 * 1000,
      key: `stats_${selectedPeriod}_${refreshKey}`
    }
  );

  const { data: evaluations, loading: evalLoading } = useFetch(
    API_ENDPOINTS.EVALUATIONS.LIST,
    { cacheTime: 5 * 60 * 1000 }
  );

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setRefreshKey(prev => prev + 1); // Força refetch
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    cache.clear();
  };

  if (statsLoading || evalLoading) {
    return <div className="loading">Carregando dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleRefresh} className="refresh-btn">
          ↻ Atualizar
        </button>
      </header>

      <div className="dashboard-controls">
        <button
          className={selectedPeriod === 'week' ? 'active' : ''}
          onClick={() => handlePeriodChange('week')}
        >
          Esta Semana
        </button>
        <button
          className={selectedPeriod === 'month' ? 'active' : ''}
          onClick={() => handlePeriodChange('month')}
        >
          Este Mês
        </button>
        <button
          className={selectedPeriod === 'year' ? 'active' : ''}
          onClick={() => handlePeriodChange('year')}
        >
          Este Ano
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total de Usuários</h3>
          <p className="stat-value">{stats?.totalUsers ?? 0}</p>
          <p className="stat-change">
            {stats?.userGrowth > 0 ? '↑' : '↓'} {Math.abs(stats?.userGrowth ?? 0)}%
          </p>
        </div>

        <div className="stat-card">
          <h3>Avaliações Realizadas</h3>
          <p className="stat-value">{stats?.totalEvaluations ?? 0}</p>
          <p className="stat-change">
            {stats?.evaluationGrowth > 0 ? '↑' : '↓'} {Math.abs(stats?.evaluationGrowth ?? 0)}%
          </p>
        </div>

        <div className="stat-card">
          <h3>Taxa de Conclusão</h3>
          <p className="stat-value">{stats?.completionRate ?? 0}%</p>
        </div>

        <div className="stat-card">
          <h3>Última Atualização</h3>
          <p className="stat-value">
            {formatDate(stats?.lastUpdate, 'DD/MM/YYYY HH:mm')}
          </p>
        </div>
      </div>

      <div className="dashboard-charts">
        <DashboardChart
          title="Avaliações por Período"
          data={evaluations?.byPeriod}
          type="line"
        />
        <DashboardChart
          title="Distribuição por Departamento"
          data={evaluations?.byDepartment}
          type="pie"
        />
      </div>
    </div>
  );
}

export default Dashboard;
```

## 5. Tratamento de Erros Global

### hooks/useErrorHandler.js
```javascript
import { useContext } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';
import { 
  ValidationError, 
  AuthenticationError, 
  AuthorizationError,
  NotFoundError,
  handleError 
} from '@/utils/errors';

export function useErrorHandler() {
  const { addNotification } = useContext(NotificationContext);

  const handle = (error) => {
    let title = 'Erro';
    let message = 'Ocorreu um erro. Tente novamente.';
    let type = 'error';

    if (error instanceof ValidationError) {
      title = 'Validação';
      message = error.message;
      type = 'warning';
    } else if (error instanceof AuthenticationError) {
      title = 'Autenticação';
      message = 'Sua sessão expirou. Faça login novamente.';
      // Redirecionar para login
      window.location.href = '/login';
    } else if (error instanceof AuthorizationError) {
      title = 'Autorização';
      message = 'Você não tem permissão para acessar este recurso.';
    } else if (error instanceof NotFoundError) {
      title = 'Não Encontrado';
      message = error.message;
    } else if (error.response?.status) {
      message = error.response.data?.message || error.message;
    }

    addNotification({
      title,
      message,
      type
    });

    // Log para ambiente de produção
    if (process.env.NODE_ENV === 'production') {
      handleError(error);
    }
  };

  return { handleError: handle };
}
```

---

**Versão**: 1.0
**Última atualização**: 23 de Novembro de 2025
