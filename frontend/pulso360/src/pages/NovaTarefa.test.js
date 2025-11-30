import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NovaTarefa from './NovaTarefa';
import { AuthProvider } from '../contexts/AuthContext';

jest.mock('../services/tasksService', () => ({
  __esModule: true,
  default: {
    create: jest.fn().mockResolvedValue({ id: 'new-1', titulo: 'Teste criar', prioridade: 'medium', categoria: 'geral', completed: false })
  }
}));

function Wrapper({ children }) {
  window.localStorage.setItem('user', JSON.stringify({ id: 'user-1', nome: 'Usuário Teste' }));
  window.localStorage.setItem('access_token', 'fake');
  return (
    <MemoryRouter>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );
}

describe('NovaTarefa Page', () => {
  test('cria tarefa ao enviar formulário', async () => {
    render(<NovaTarefa />, { wrapper: Wrapper });
    fireEvent.change(screen.getByPlaceholderText('Ex.: Preparar relatório mensal'), { target: { value: 'Preparar relatório mensal' } });
    fireEvent.click(screen.getByText('Criar Tarefa'));
    expect(await screen.findByText(/Criar Tarefa/)).toBeInTheDocument();
  });
});
