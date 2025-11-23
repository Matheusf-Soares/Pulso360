import React, { useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Avaliacoes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Informações do usuário logado
  const currentUser = user ? {
    name: user.nome || 'Usuário',
    role: user.cargo || 'Cargo'
  } : {
    name: 'Usuário',
    role: 'Cargo'
  };

  const [evaluations] = useState([
    { id: 1, title: "Autoavaliação Q1 2025", type: "Autoavaliação", status: "Em andamento", progress: 68, deadline: "25 Nov 2025", evaluator: currentUser.name },
    { id: 2, title: "Avaliação de Performance", type: "360°", status: "Aguardando", progress: 0, deadline: "30 Nov 2025", evaluator: "Gestor" },
    { id: 3, title: "Avaliação de Liderança", type: "Gestor", status: "Concluída", progress: 100, deadline: "15 Nov 2025", evaluator: user?.gestor || "Gestor" },
  ]);

  const [filters, setFilters] = useState({ status: "Todas", type: "Todas" });

  // Estatísticas para o header
  const stats = {
    total: evaluations.length,
    pending: evaluations.filter(e => e.status === "Em andamento" || e.status === "Aguardando").length,
    completed: evaluations.filter(e => e.status === "Concluída").length,
    avgScore: 8.5
  };

  const filteredEvaluations = evaluations.filter(evaluation => 
    (filters.status === "Todas" || evaluation.status === filters.status) &&
    (filters.type === "Todas" || evaluation.type === filters.type)
  );

  const getStatusColor = (status) => {
    switch(status) {
      case "Concluída": return "success";
      case "Em andamento": return "warning";
      case "Aguardando": return "info";
      default: return "muted";
    }
  };

  return (
    <div className="evaluations-page-modern">
      {/* Header Profissional */}
      <div className="evaluations-header-modern">
        <div className="header-content-wrapper">
          <div className="header-left-section">
            <div className="header-icon-wrapper-eval">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="header-text-section">
              <h1>Minhas Avaliações</h1>
              <p>Gerencie suas avaliações de desempenho e acompanhe seu desenvolvimento profissional</p>
            </div>
          </div>
          
          <div className="header-right-section">
            <button className="btn-header-secondary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M16 2H14V0H12V2H6V0H4V2H2C0.89 2 0 2.9 0 4V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2ZM16 16H2V7H16V16Z" fill="currentColor"/>
              </svg>
              Histórico
            </button>
            <button className="btn-header-primary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 13.5L4.5 9L6 7.5L8.25 9.75V0H9.75V9.75L12 7.5L13.5 9L9 13.5Z" fill="currentColor"/>
                <path d="M0 15.75V18H18V15.75H0Z" fill="currentColor"/>
              </svg>
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="evaluations-stats-modern">
        <div className="eval-stat-card total">
          <div className="stat-icon-eval">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="white"/>
              <path d="M7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-eval">
            <span className="stat-value-eval">{stats.total}</span>
            <span className="stat-label-eval">Total de Avaliações</span>
          </div>
        </div>

        <div className="eval-stat-card pending">
          <div className="stat-icon-eval">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-eval">
            <span className="stat-value-eval">{stats.pending}</span>
            <span className="stat-label-eval">Pendentes</span>
          </div>
        </div>

        <div className="eval-stat-card completed">
          <div className="stat-icon-eval">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-eval">
            <span className="stat-value-eval">{stats.completed}</span>
            <span className="stat-label-eval">Concluídas</span>
          </div>
        </div>

        <div className="eval-stat-card score">
          <div className="stat-icon-eval">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-eval">
            <span className="stat-value-eval">{stats.avgScore}</span>
            <span className="stat-label-eval">Média Geral</span>
          </div>
        </div>
      </div>

      {/* Filtros Modernos */}
      <div className="filters-section-modern">
        <div className="filters-left">
          <h3>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 14L3 9L4.4 7.6L8 11.2L15.6 3.6L17 5L8 14Z" fill="currentColor"/>
            </svg>
            Suas Avaliações
          </h3>
          <span className="results-count">{filteredEvaluations.length} {filteredEvaluations.length === 1 ? 'avaliação' : 'avaliações'}</span>
        </div>
        
        <div className="filters-right">
          <div className="filter-group-modern">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6.5 13L0 6.5L1.5 5L6.5 10L14.5 2L16 3.5L6.5 13Z" fill="currentColor"/>
            </svg>
            <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
              <option value="Todas">Todos os Status</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
          
          <div className="filter-group-modern">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L10.4 5.6L16 6.4L11.6 10.4L12.8 16L8 13.2L3.2 16L4.4 10.4L0 6.4L5.6 5.6L8 0Z" fill="currentColor"/>
            </svg>
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="Todas">Todos os Tipos</option>
              <option value="Autoavaliação">Autoavaliação</option>
              <option value="360°">360°</option>
              <option value="Gestor">Gestor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Avaliações Moderno */}
      <div className="evaluations-grid-modern">
        {filteredEvaluations.map(evaluation => (
          <div key={evaluation.id} className={`evaluation-card-modern ${evaluation.status.toLowerCase().replace(' ', '-')}`}>
            <div className="eval-card-header">
              <div className="eval-type-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {evaluation.type === "Autoavaliação" && <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>}
                  {evaluation.type === "360°" && <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z" fill="currentColor"/>}
                  {evaluation.type === "Gestor" && <path d="M12 5.9C13.16 5.9 14.1 4.96 14.1 3.8C14.1 2.64 13.16 1.7 12 1.7C10.84 1.7 9.9 2.64 9.9 3.8C9.9 4.96 10.84 5.9 12 5.9ZM4 5.9C5.16 5.9 6.1 4.96 6.1 3.8C6.1 2.64 5.16 1.7 4 1.7C2.84 1.7 1.9 2.64 1.9 3.8C1.9 4.96 2.84 5.9 4 5.9ZM4 7.9C2.34 7.9 0 8.73 0 10.4V12.1H8V10.4C8 8.73 5.66 7.9 4 7.9ZM12 7.9C11.8 7.9 11.55 7.92 11.29 7.95C12.11 8.56 12.7 9.38 12.7 10.4V12.1H16V10.4C16 8.73 13.66 7.9 12 7.9Z" fill="currentColor"/>}
                </svg>
                {evaluation.type}
              </div>
              <div className={`eval-status-badge ${getStatusColor(evaluation.status)}`}>
                {evaluation.status === "Concluída" && "✓"}
                {evaluation.status === "Em andamento" && "⏳"}
                {evaluation.status === "Aguardando" && "⏸"}
                {evaluation.status}
              </div>
            </div>

            <h3 className="eval-title">{evaluation.title}</h3>

            <div className="eval-meta-info">
              <div className="meta-item-eval">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 2H11V0H9V2H5V0H3V2H2C0.89 2 0 2.9 0 4V12C0 13.1 0.89 14 2 14H12C13.1 14 14 13.1 14 12V4C14 2.9 13.1 2 12 2ZM12 12H2V6H12V12Z" fill="currentColor"/>
                </svg>
                <span>Prazo: {evaluation.deadline}</span>
              </div>
              <div className="meta-item-eval">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 7C8.66 7 10 5.66 10 4C10 2.34 8.66 1 7 1C5.34 1 4 2.34 4 4C4 5.66 5.34 7 7 7ZM7 8.5C4.67 8.5 0 9.67 0 12V13.5H14V12C14 9.67 9.33 8.5 7 8.5Z" fill="currentColor"/>
                </svg>
                <span>{evaluation.evaluator}</span>
              </div>
            </div>

            <div className="eval-progress-section">
              <div className="progress-header-eval">
                <span>Progresso da Avaliação</span>
                <span className="progress-percentage">{evaluation.progress}%</span>
              </div>
              <div className="progress-bar-eval">
                <div 
                  className={`progress-fill-eval ${
                    evaluation.progress === 100 ? 'completed' : 
                    evaluation.progress > 50 ? 'good' : 'started'
                  }`}
                  style={{width: `${evaluation.progress}%`}}
                >
                  <div className="progress-shimmer-eval"></div>
                </div>
              </div>
            </div>

            <div className="eval-actions">
              {evaluation.status === "Concluída" ? (
                <button 
                  className="btn-eval primary"
                  onClick={() => navigate(`/avaliacao/${evaluation.id}/resultado`)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 4.5C5.5 4.5 3.4 5.86 2 8C3.4 10.14 5.5 11.5 8 11.5C10.5 11.5 12.6 10.14 14 8C12.6 5.86 10.5 4.5 8 4.5ZM8 10C6.62 10 5.5 8.88 5.5 7.5C5.5 6.12 6.62 5 8 5C9.38 5 10.5 6.12 10.5 7.5C10.5 8.88 9.38 10 8 10ZM8 6C7.17 6 6.5 6.67 6.5 7.5C6.5 8.33 7.17 9 8 9C8.83 9 9.5 8.33 9.5 7.5C9.5 6.67 8.83 6 8 6Z" fill="currentColor"/>
                  </svg>
                  Ver Resultados
                </button>
              ) : evaluation.status === "Aguardando" ? (
                <button className="btn-eval disabled" disabled>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C4.7 2 2 4.7 2 8C2 11.3 4.7 14 8 14C11.3 14 14 11.3 14 8C14 4.7 11.3 2 8 2ZM8 12.5C5.52 12.5 3.5 10.48 3.5 8C3.5 5.52 5.52 3.5 8 3.5C10.48 3.5 12.5 5.52 12.5 8C12.5 10.48 10.48 12.5 8 12.5ZM8.5 5H7.25V8.75L10.5 10.62L11.125 9.63L8.5 8.125V5Z" fill="currentColor"/>
                  </svg>
                  Aguardando Liberação
                </button>
              ) : (
                <button 
                  className="btn-eval primary"
                  onClick={() => navigate(`/avaliacao/${evaluation.id}/continuar`)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
                  </svg>
                  Continuar Avaliação
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvaluations.length === 0 && (
        <div className="empty-state-modern">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="#f7fafc"/>
            <path d="M40 20C28.96 20 20 28.96 20 40C20 51.04 28.96 60 40 60C51.04 60 60 51.04 60 40C60 28.96 51.04 20 40 20ZM40 54C32.28 54 26 47.72 26 40C26 32.28 32.28 26 40 26C47.72 26 54 32.28 54 40C54 47.72 47.72 54 40 54ZM42 32H38V42H42V32ZM42 46H38V50H42V46Z" fill="#cbd5e0"/>
          </svg>
          <h3>Nenhuma avaliação encontrada</h3>
          <p>Não há avaliações que correspondam aos filtros selecionados.</p>
        </div>
      )}
    </div>
  );
}