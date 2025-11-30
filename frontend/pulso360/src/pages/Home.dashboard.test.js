import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mocks antes de importar Home
jest.mock('../contexts/AuthContext', () => ({
  __esModule: true,
  useAuth: () => ({ user: { id: 'user-xyz', nome: 'Usuário Dashboard', email: 'dash@example.com' } })
}));
jest.mock('../services/tasksService', () => ({
  __esModule: true,
  default: {
    list: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    toggle: jest.fn(),
    remove: jest.fn()
  }
}));
jest.mock('../services/dashboardService', () => ({
  __esModule: true,
  default: {
    getSummary: jest.fn().mockResolvedValue({
      evaluations_completion: 55.0,
      evaluations_target: 80.0,
      productivity_percent: 70.0,
      meetings_count: 3,
      tasks_total: 5,
      tasks_completed: 2
    }),
    getPDI: jest.fn().mockResolvedValue([
      {
        meta_id: 'meta-1',
        title: 'Liderança Estratégica',
        current: 75,
        target: 100,
        status: 'andamento',
        next_milestone: null,
        last_update: new Date().toISOString()
      }
    ]),
    getActivity: jest.fn().mockResolvedValue([
      {
        id: 'act-1',
        type: 'feedback',
        title: 'Feedback de ABC123',
        description: 'Bom trabalho!',
        time: new Date().toISOString(),
        priority: 'medium'
      }
    ]),
    getTeamPerformance: jest.fn().mockResolvedValue([
      {
        equipe_id: 'team-1',
        name: 'Equipe Frontend',
        members: 4,
        performance: 85,
        trend: 'up',
        last_activity: '-'
      }
    ])
  }
}));

function Wrapper({ children }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe('Home Page - Dashboard Data (Mock)', () => {
  test('renderiza estatísticas rápidas do summary', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(await screen.findByText(/Produtividade/i)).toBeInTheDocument();
    expect(await screen.findByText(/55%/i)).toBeInTheDocument(); // avaliações percentual
    expect(await screen.findByText(/2\/5/i)).toBeInTheDocument(); // tarefas completed/total
  });

  test('renderiza item de PDI', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(await screen.findByText('Liderança Estratégica')).toBeInTheDocument();
  });

  test('renderiza atividade recente', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(await screen.findByText(/Feedback de ABC123/i)).toBeInTheDocument();
  });

  test('renderiza performance de equipe', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(await screen.findByText('Equipe Frontend')).toBeInTheDocument();
  });
});
