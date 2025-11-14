import React, { useState } from "react";

export default function Avaliacoes() {
  const [evaluations] = useState([
    { id: 1, title: "Autoavaliação Q1 2025", type: "Autoavaliação", status: "Em andamento", progress: 68, deadline: "25 Nov 2025" },
    { id: 2, title: "Avaliação de Performance", type: "360°", status: "Aguardando", progress: 0, deadline: "30 Nov 2025" },
    { id: 3, title: "Avaliação de Liderança", type: "Gestor", status: "Concluída", progress: 100, deadline: "15 Nov 2025" },
  ]);

  const [filters, setFilters] = useState({ status: "Todas", type: "Todas" });

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
    <div>
      <div className="page-header">
        <h1>Minhas Avaliações</h1>
        <p className="muted">Gerencie e complete suas avaliações de desempenho</p>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
            <option value="Todas">Todas</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Aguardando">Aguardando</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Tipo:</label>
          <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
            <option value="Todas">Todas</option>
            <option value="Autoavaliação">Autoavaliação</option>
            <option value="360°">360°</option>
            <option value="Gestor">Gestor</option>
          </select>
        </div>
      </div>

      <div className="evaluations-grid">
        {filteredEvaluations.map(evaluation => (
          <div key={evaluation.id} className="card evaluation-card">
            <div className="card-header">
              <h3>{evaluation.title}</h3>
              <span className={`tag ${getStatusColor(evaluation.status)}`}>{evaluation.status}</span>
            </div>
            
            <div className="evaluation-meta">
              <div className="meta-item">
                <span className="label">Tipo:</span>
                <span>{evaluation.type}</span>
              </div>
              <div className="meta-item">
                <span className="label">Prazo:</span>
                <span>{evaluation.deadline}</span>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Progresso</span>
                <span>{evaluation.progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${evaluation.progress}%` }}></div>
              </div>
            </div>

            <div className="card-actions">
              {evaluation.status === "Concluída" ? (
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Abrindo resultados da avaliação...", "info")}
                >
                  Ver Resultados
                </button>
              ) : (
                <button 
                  className="btn-primary"
                  onClick={() => window.showNotification && window.showNotification("Continuando avaliação...", "info")}
                >
                  Continuar Avaliação
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvaluations.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Nenhuma avaliação encontrada</h3>
          <p>Não há avaliações que correspondam aos filtros selecionados.</p>
        </div>
      )}
    </div>
  );
}