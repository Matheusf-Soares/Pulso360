# 📘 Guia de Estilo e Padrões - Pulso360

## 🎯 Princípios Fundamentais

1. **Clareza**: Código legível e fácil de entender
2. **Consistência**: Padrões uniformes em todo o projeto
3. **Manutenibilidade**: Fácil de manter e evoluir
4. **Performance**: Otimizado para velocidade
5. **Segurança**: Proteção contra vulnerabilidades comuns

## 📝 Convenção de Nomenclatura

### Arquivos e Pastas
```javascript
// Componentes React (PascalCase)
components/Button/Button.js
components/Modal/Modal.js

// Hooks (camelCase com prefixo 'use')
hooks/useForm.js
hooks/useFetch.js

// Utilidades (camelCase)
utils/validators.js
utils/formatters.js

// Contextos (PascalCase + Context)
contexts/AuthContext.js
contexts/AppContext.js

// Serviços (camelCase + Service)
services/apiService.js
services/authService.js
```

### Variáveis e Funções
```javascript
// Constantes (UPPER_SNAKE_CASE)
const API_BASE_URL = 'http://localhost:8000';
const MAX_RETRY_ATTEMPTS = 3;

// Funções e métodos (camelCase)
function getUserData() {}
const handleSubmit = () => {};

// Variáveis booleanas (prefixo 'is', 'has', 'should')
const isLoading = true;
const hasError = false;
const shouldValidate = true;

// Variáveis privadas (prefixo '_')
const _privateMethod = () => {};
```

## 🏗️ Estrutura de Componentes

### Componente Funcional Padrão
```javascript
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Botão reutilizável
 * @component
 * @example
 * const label = 'Click me';
 * return <Button label={label} onClick={() => console.log('clicked')} />
 */
function Button({ label, onClick, disabled, className, ...props }) {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <button
      className={`btn ${className || ''}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
}

// Validação de props
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

// Valores padrão
Button.defaultProps = {
  disabled: false,
  className: ''
};

export default Button;
```

## 🔧 Padrões de Hooks

### Hook Customizado Padrão
```javascript
import { useState, useCallback, useEffect } from 'react';

/**
 * Hook para gerenciar estado de loading
 * @param {Function} asyncFunction - Função assíncrona a executar
 * @returns {Object} - {data, loading, error, execute, reset}
 */
export const useAsync = (asyncFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
};
```

## 🎨 Padrões de Estilo

### CSS Modular
```css
/* Nomenclatura BEM (Block Element Modifier) */
.button { /* Block */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.button__icon { /* Element */
  margin-right: 8px;
}

.button--primary { /* Modifier */
  background-color: #667eea;
  color: white;
}

.button--primary:hover {
  background-color: #5568d3;
}

.button--disabled { /* Modifier */
  opacity: 0.6;
  cursor: not-allowed;
}
```

## 🔐 Segurança

### Validação de Entrada
```javascript
import { validateEmail, validatePassword } from '@/utils/validators';

const handleSubmit = (formData) => {
  // Validar cada campo
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  if (emailError || passwordError) {
    // Mostrar erros
    return;
  }

  // Processar dados seguros
  submitForm(formData);
};
```

### Sanitização de Output
```javascript
import DOMPurify from 'dompurify';

// Sanitizar HTML antes de renderizar
const SafeHTML = ({ html }) => (
  <div dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(html) 
  }} />
);
```

## 📊 Tratamento de Erros

### Padrão de Erro Consistente
```javascript
import { handleError, AppError } from '@/utils/errors';

try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new AppError(
      'Erro ao buscar dados',
      'FETCH_ERROR',
      response.status
    );
  }
  return await response.json();
} catch (error) {
  const errorInfo = handleError(error);
  console.error(errorInfo);
  // Mostrar ao usuário
  showErrorNotification(errorInfo.message);
}
```

## 🧪 Testes

### Teste de Componente
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  it('renders button with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    render(<Button label="Click me" disabled />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

## 📚 Documentação JSDoc

### Padrão de Documentação
```javascript
/**
 * Função para calcular média de notas
 * @function
 * @param {Array<number>} grades - Array com as notas
 * @param {number} [weight=1] - Peso das notas (opcional)
 * @returns {number} - Média calculada
 * @throws {Error} Se grades não for um array
 * @example
 * const average = calculateAverage([8, 9, 7]);
 * // returns 8
 */
function calculateAverage(grades, weight = 1) {
  if (!Array.isArray(grades)) {
    throw new Error('grades deve ser um array');
  }
  
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return (sum / grades.length) * weight;
}
```

## 🚀 Performance

### Memoização de Componentes
```javascript
import { memo, useCallback } from 'react';

const Button = memo(function Button({ label, onClick }) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return <button onClick={handleClick}>{label}</button>;
});

Button.displayName = 'Button';
export default Button;
```

### Lazy Loading de Rotas
```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}
```

## ✅ Checklist de Qualidade

- [ ] Código sem warnings de ESLint
- [ ] Todas as funções têm JSDoc
- [ ] PropTypes ou TypeScript validados
- [ ] Sem variáveis não utilizadas
- [ ] Tratamento de erros implementado
- [ ] Validação de entrada completa
- [ ] Testes unitários básicos
- [ ] Componentes são memoizados quando apropriado
- [ ] Nomes descritivos em variáveis e funções
- [ ] Código formatado com Prettier

---

**Versão**: 1.0
**Última atualização**: 23 de Novembro de 2025
