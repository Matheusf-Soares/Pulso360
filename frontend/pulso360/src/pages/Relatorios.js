import React, { useState } from 'react';

const Relatorios = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');
  const [selectedReport, setSelectedReport] = useState('performance');

  const reportTypes = [
    {
      id: 'performance',
      title: 'Performance Individual',
      icon: '📊',
      description: 'Análise detalhada do desempenho de colaboradores'
    },
    {
      id: 'team',
      title: 'Performance de Equipe',
      icon: '👥',
      description: 'Relatórios consolidados por equipe ou departamento'
    },
    {
      id: 'pdi',
      title: 'Evolução PDI',
      icon: '🎯',
      description: 'Progresso dos Planos de Desenvolvimento Individual'
    },
    {
      id: 'competencias',
      title: 'Mapa de Competências',
      icon: '🗺️',
      description: 'Análise de competências por área e função'
    },
    {
      id: 'feedback',
      title: 'Feedback 360°',
      icon: '🔄',
      description: 'Compilação de avaliações multidirecionais'
    },
    {
      id: 'analytics',
      title: 'Analytics Avançado',
      icon: '📈',
      description: 'Métricas e insights detalhados do sistema'
    }
  ];

  const periods = [
    { id: 'semanal', label: 'Semanal', icon: '📅' },
    { id: 'mensal', label: 'Mensal', icon: '🗓️' },
    { id: 'trimestral', label: 'Trimestral', icon: '📋' },
    { id: 'anual', label: 'Anual', icon: '📊' },
    { id: 'custom', label: 'Personalizado', icon: '⚙️' }
  ];

  const recentReports = [
    {
      title: 'Relatório Performance Q4 2024',
      type: 'Performance Individual',
      generated: '2024-01-15',
      status: 'completed',
      downloads: 45
    },
    {
      title: 'Análise Equipe Desenvolvimento',
      type: 'Performance de Equipe',
      generated: '2024-01-10',
      status: 'completed',
      downloads: 23
    },
    {
      title: 'PDI - Metas Janeiro',
      type: 'Evolução PDI',
      generated: '2024-01-08',
      status: 'processing',
      downloads: 0
    },
    {
      title: 'Competências Tech 2024',
      type: 'Mapa de Competências',
      generated: '2024-01-05',
      status: 'completed',
      downloads: 67
    },
    {
      title: 'Feedback 360° Gestores',
      type: 'Feedback 360°',
      generated: '2024-01-03',
      status: 'completed',
      downloads: 34
    }
  ];

  const quickStats = [
    {
      title: 'Relatórios Gerados',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: '📋'
    },
    {
      title: 'Downloads Totais',
      value: '5,678',
      change: '+8%',
      trend: 'up',
      icon: '⬇️'
    },
    {
      title: 'Tempo Médio Geração',
      value: '2.3min',
      change: '-15%',
      trend: 'down',
      icon: '⏱️'
    },
    {
      title: 'Satisfação Usuários',
      value: '4.8/5',
      change: '+0.2',
      trend: 'up',
      icon: '⭐'
    }
  ];

  return (
    <div className="reports-container">
        <div className="reports-header">
          <div className="header-content">
            <h1>📊 Central de Relatórios</h1>
            <p>Gere, visualize e gerencie todos os seus relatórios de performance e desenvolvimento</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <span>📤</span>
              Exportar Dados
            </button>
            <button className="btn-primary">
              <span>➕</span>
              Novo Relatório
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-overview">
          <h2>📈 Visão Geral</h2>
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">{stat.icon}</span>
                  <span className={`trend-indicator ${stat.trend}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-title">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reports-content">
          <div className="reports-main full-width">
            {/* Report Generator */}
            <div className="report-generator">
              <h2>🛠️ Gerador de Relatórios</h2>
              
              <div className="generator-controls">
                <div className="control-section">
                  <label>Tipo de Relatório</label>
                  <div className="report-types-grid">
                    {reportTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`report-type-card ${selectedReport === type.id ? 'selected' : ''}`}
                        onClick={() => setSelectedReport(type.id)}
                      >
                        <div className="type-icon">{type.icon}</div>
                        <div className="type-content">
                          <h4>{type.title}</h4>
                          <p>{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="control-section">
                  <label>Período</label>
                  <div className="period-selector">
                    {periods.map(period => (
                      <button
                        key={period.id}
                        className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
                        onClick={() => setSelectedPeriod(period.id)}
                      >
                        <span className="period-icon">{period.icon}</span>
                        <span>{period.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-section">
                  <label>Filtros Avançados</label>
                  <div className="filters-grid">
                    <select className="filter-select">
                      <option>Todos os Departamentos</option>
                      <option>Desenvolvimento</option>
                      <option>Marketing</option>
                      <option>Vendas</option>
                      <option>RH</option>
                    </select>
                    <select className="filter-select">
                      <option>Todos os Níveis</option>
                      <option>Júnior</option>
                      <option>Pleno</option>
                      <option>Sênior</option>
                      <option>Liderança</option>
                    </select>
                    <select className="filter-select">
                      <option>Formato PDF</option>
                      <option>Formato Excel</option>
                      <option>Formato CSV</option>
                      <option>Dashboard Online</option>
                    </select>
                  </div>
                </div>

                <div className="generator-actions">
                  <button className="btn-outline">
                    👁️ Visualizar Prévia
                  </button>
                  <button className="btn-primary">
                    🚀 Gerar Relatório
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="recent-reports">
              <h2>📋 Relatórios Recentes</h2>
              <div className="reports-table">
                <div className="table-header">
                  <div className="col-title">Relatório</div>
                  <div className="col-type">Tipo</div>
                  <div className="col-date">Data</div>
                  <div className="col-status">Status</div>
                  <div className="col-actions">Ações</div>
                </div>
                <div className="table-body">
                  {recentReports.map((report, index) => (
                    <div key={index} className="table-row">
                      <div className="col-title">
                        <div className="report-info">
                          <div className="report-title">{report.title}</div>
                          <div className="report-meta">
                            {report.downloads > 0 && (
                              <span className="download-count">
                                ⬇️ {report.downloads} downloads
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-type">
                        <span className="type-badge">{report.type}</span>
                      </div>
                      <div className="col-date">{report.generated}</div>
                      <div className="col-status">
                        <span className={`status-badge ${report.status}`}>
                          {report.status === 'completed' ? '✅ Concluído' : 
                           report.status === 'processing' ? '⏳ Processando' : 
                           '❌ Erro'}
                        </span>
                      </div>
                      <div className="col-actions">
                        <div className="action-buttons">
                          {report.status === 'completed' && (
                            <>
                              <button className="action-btn" title="Download">
                                ⬇️
                              </button>
                              <button className="action-btn" title="Compartilhar">
                                📤
                              </button>
                            </>
                          )}
                          <button className="action-btn" title="Detalhes">
                            👁️
                          </button>
                          <button className="action-btn danger" title="Excluir">
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Relatorios;