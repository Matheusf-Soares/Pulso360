import React from 'react';
// Mock antes de importar Home
jest.mock('../services/tasksService', () => ({
  __esModule: true,
  default: {
    list: jest.fn().mockResolvedValue([
      { id: '1', titulo: 'Tarefa Mock 1', prioridade: 'high', categoria: 'geral', completed: false },
      { id: '2', titulo: 'Tarefa Mock 2', prioridade: 'medium', categoria: 'dev', completed: true }
    ]),
    create: jest.fn(),
    toggle: jest.fn(),
    remove: jest.fn()
  }
}));
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { AuthProvider } from '../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';

// Wrapper para injetar usuário no contexto
function Wrapper({ children }) {
  window.localStorage.setItem('user', JSON.stringify({ id: 'user-123', nome: 'Usuário Teste', email: 'teste@example.com' }));
  window.localStorage.setItem('access_token', 'fake-jwt');
  return (
    <MemoryRouter>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
}

describe('Home Page - Tasks Integration (Mock)', () => {
  test('renderiza tarefas retornadas pelo serviço', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(await screen.findByText('Tarefa Mock 1')).toBeInTheDocument();
    expect(await screen.findByText('Tarefa Mock 2')).toBeInTheDocument();
    expect(screen.getByText(/pendentes/i)).toHaveTextContent('1 pendentes');
  });
});
