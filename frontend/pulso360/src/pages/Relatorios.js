import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Relatorios = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');
  const [selectedReport, setSelectedReport] = useState('performance');
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    type: '',
    period: 'mensal',
    department: '',
    level: '',
    format: 'pdf',
    includeCharts: true,
    includeComments: false,
    startDate: '',
    endDate: ''
  });

  // Informações do usuário logado (para uso futuro em filtros)
  // eslint-disable-next-line no-unused-vars
  const currentUser = user ? {
    name: user.nome || 'Usuário',
    department: user.departamento || 'Departamento'
  } : {
    name: 'Usuário',
    department: 'Departamento'
  };

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

  // Inicializa o tipo de relatório a partir de ?type=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = (params.get('type') || '').toLowerCase();
    const map = {
      individual: 'performance',
      team: 'team',
      pdi: 'pdi',
      competencias: 'competencias',
      feedback: 'feedback',
      analytics: 'analytics'
    };
    if (map[type]) setSelectedReport(map[type]);
  }, [location.search]);

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
        {/* Header Moderno Profissional */}
        <div className="reports-header-modern">
          <div className="header-content-wrapper">
            <div className="header-left-section">
              <div className="header-icon-wrapper-reports">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
                </svg>
              </div>
              <div className="header-text-section">
                <h1>Central de Relatórios</h1>
                <p>Gere, visualize e gerencie relatórios inteligentes de performance e desenvolvimento</p>
              </div>
            </div>
            
            <div className="header-right-section">
              <button className="btn-header-secondary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 2H12V0H10V2H8V0H6V2H4C2.89 2 2 2.9 2 4V16C2 17.1 2.89 18 4 18H14C15.1 18 16 17.1 16 16V4C16 2.9 15.1 2 14 2ZM14 16H4V7H14V16Z" fill="currentColor"/>
                </svg>
                Agendar Relatório
              </button>
              <button className="btn-header-secondary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 13.5L4.5 9L6 7.5L8.25 9.75V0H9.75V9.75L12 7.5L13.5 9L9 13.5Z" fill="currentColor"/>
                  <path d="M0 15.75V18H18V15.75H0Z" fill="currentColor"/>
                </svg>
                Exportar Dados
              </button>
              <button className="btn-header-primary" onClick={() => setShowNewReportModal(true)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M8 8V0H10V8H18V10H10V18H8V10H0V8H8Z" fill="currentColor"/>
                </svg>
                Novo Relatório
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Modernos */}
        <div className="reports-stats-modern">
          {quickStats.map((stat, index) => (
            <div key={index} className={`report-stat-card ${stat.trend}`}>
              <div className="stat-icon-modern">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  {index === 0 && <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>}
                  {index === 1 && <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" fill="white"/>}
                  {index === 2 && <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="white"/>}
                  {index === 3 && <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="white"/>}
                </svg>
              </div>
              <div className="stat-details-modern">
                <span className="stat-value-modern">{stat.value}</span>
                <span className="stat-label-modern">{stat.title}</span>
                <div className={`stat-change-modern ${stat.trend}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    {stat.trend === 'up' ? 
                      <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor"/> :
                      <path d="M6 10L2 6H5V2H7V6H10L6 10Z" fill="currentColor"/>
                    }
                  </svg>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
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

        {/* Modal de Novo Relatório */}
        {showNewReportModal && (
          <div className="modal-overlay-modern" onClick={() => setShowNewReportModal(false)}>
            <div className="modal-content-modern new-report-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-modern">
                <div className="modal-header-left">
                  <div className="modal-icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <h2>Criar Novo Relatório</h2>
                    <p>Configure seu relatório personalizado com filtros avançados</p>
                  </div>
                </div>
                <button className="modal-close-btn" onClick={() => setShowNewReportModal(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>

              <div className="modal-body-modern">
                <div className="form-grid-modern">
                  <div className="form-group-modern full-width">
                    <label className="form-label-modern">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14 2H2C0.9 2 0 2.9 0 4V12C0 13.1 0.9 14 2 14H14C15.1 14 16 13.1 16 12V4C16 2.9 15.1 2 14 2ZM14 12H2V6H14V12Z" fill="currentColor"/>
                      </svg>
                      Título do Relatório *
                    </label>
                    <input
                      type="text"
                      className="form-input-modern"
                      placeholder="Ex: Relatório de Performance Q4 2024"
                      value={newReport.title}
                      onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group-modern full-width">
                    <label className="form-label-modern">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H12C13.1 14 14 13.1 14 12V4C14 2.9 13.1 2 12 2ZM7 11H5V9H7V11ZM7 8H5V6H7V8ZM7 5H5V3H7V5ZM11 11H9V9H11V11ZM11 8H9V6H11V8ZM11 5H9V3H11V5Z" fill="currentColor"/>
                      </svg>
                      Tipo de Relatório *
                    </label>
                    <select
                      className="form-input-modern"
                      value={newReport.type}
                      onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                      required
                    >
                      <option value="">Selecione o tipo de relatório</option>
                      {reportTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.icon} {type.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14 2H12V0H10V2H6V0H4V2H2C0.89 2 0 2.9 0 4V14C0 15.1 0.89 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z" fill="currentColor"/>
                      </svg>
                      Período *
                    </label>
                    <select
                      className="form-input-modern"
                      value={newReport.period}
                      onChange={(e) => setNewReport({...newReport, period: e.target.value})}
                      required
                    >
                      {periods.map(period => (
                        <option key={period.id} value={period.id}>{period.icon} {period.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 0L10.4 5.6L16 6.4L11.6 10.4L12.8 16L8 13.2L3.2 16L4.4 10.4L0 6.4L5.6 5.6L8 0Z" fill="currentColor"/>
                      </svg>
                      Formato de Saída *
                    </label>
                    <select
                      className="form-input-modern"
                      value={newReport.format}
                      onChange={(e) => setNewReport({...newReport, format: e.target.value})}
                      required
                    >
                      <option value="pdf">📄 PDF</option>
                      <option value="excel">📊 Excel</option>
                      <option value="csv">📋 CSV</option>
                      <option value="online">🌐 Dashboard Online</option>
                    </select>
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 0H4C2.9 0 2 0.9 2 2V14C2 15.1 2.9 16 4 16H12C13.1 16 14 15.1 14 14V2C14 0.9 13.1 0 12 0ZM6 14H4V12H6V14ZM6 11H4V9H6V11ZM6 8H4V6H6V8ZM6 5H4V3H6V5ZM10 14H8V12H10V14ZM10 11H8V9H10V11ZM10 8H8V6H10V8ZM10 5H8V3H10V5ZM12 14H12V3H12V14Z" fill="currentColor"/>
                      </svg>
                      Departamento
                    </label>
                    <select
                      className="form-input-modern"
                      value={newReport.department}
                      onChange={(e) => setNewReport({...newReport, department: e.target.value})}
                    >
                      <option value="">Todos os Departamentos</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="vendas">Vendas</option>
                      <option value="rh">Recursos Humanos</option>
                    </select>
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                      </svg>
                      Nível/Senioridade
                    </label>
                    <select
                      className="form-input-modern"
                      value={newReport.level}
                      onChange={(e) => setNewReport({...newReport, level: e.target.value})}
                    >
                      <option value="">Todos os Níveis</option>
                      <option value="junior">Júnior</option>
                      <option value="pleno">Pleno</option>
                      <option value="senior">Sênior</option>
                      <option value="lideranca">Liderança</option>
                    </select>
                  </div>

                  {newReport.period === 'custom' && (
                    <>
                      <div className="form-group-modern">
                        <label className="form-label-modern">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 2H12V0H10V2H6V0H4V2H2C0.89 2 0 2.9 0 4V14C0 15.1 0.89 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z" fill="currentColor"/>
                          </svg>
                          Data Início *
                        </label>
                        <input
                          type="date"
                          className="form-input-modern"
                          value={newReport.startDate}
                          onChange={(e) => setNewReport({...newReport, startDate: e.target.value})}
                          required
                        />
                      </div>

                      <div className="form-group-modern">
                        <label className="form-label-modern">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 2H12V0H10V2H6V0H4V2H2C0.89 2 0 2.9 0 4V14C0 15.1 0.89 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z" fill="currentColor"/>
                          </svg>
                          Data Fim *
                        </label>
                        <input
                          type="date"
                          className="form-input-modern"
                          value={newReport.endDate}
                          onChange={(e) => setNewReport({...newReport, endDate: e.target.value})}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group-modern full-width">
                    <label className="form-label-modern">Opções Adicionais</label>
                    <div className="checkbox-group-modern">
                      <label className="checkbox-label-modern">
                        <input
                          type="checkbox"
                          checked={newReport.includeCharts}
                          onChange={(e) => setNewReport({...newReport, includeCharts: e.target.checked})}
                        />
                        <span className="checkbox-custom"></span>
                        <span>Incluir gráficos e visualizações</span>
                      </label>
                      <label className="checkbox-label-modern">
                        <input
                          type="checkbox"
                          checked={newReport.includeComments}
                          onChange={(e) => setNewReport({...newReport, includeComments: e.target.checked})}
                        />
                        <span className="checkbox-custom"></span>
                        <span>Incluir comentários e feedbacks</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-info-box">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
                  </svg>
                  <p>O relatório será gerado com base nos filtros selecionados. Relatórios complexos podem levar alguns minutos para serem processados. Você receberá uma notificação quando estiver pronto.</p>
                </div>
              </div>

              <div className="modal-footer-modern">
                <button className="btn-modal-secondary" onClick={() => {
                  setShowNewReportModal(false);
                  setNewReport({
                    title: '',
                    type: '',
                    period: 'mensal',
                    department: '',
                    level: '',
                    format: 'pdf',
                    includeCharts: true,
                    includeComments: false,
                    startDate: '',
                    endDate: ''
                  });
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Cancelar
                </button>
                <button className="btn-modal-primary" onClick={() => {
                  console.log('Novo relatório:', newReport);
                  alert(`Relatório "${newReport.title}" está sendo gerado!\n\nTipo: ${newReport.type}\nPeríodo: ${newReport.period}\nFormato: ${newReport.format}`);
                  setShowNewReportModal(false);
                  setNewReport({
                    title: '',
                    type: '',
                    period: 'mensal',
                    department: '',
                    level: '',
                    format: 'pdf',
                    includeCharts: true,
                    includeComments: false,
                    startDate: '',
                    endDate: ''
                  });
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2L6 10L2 6L0.5 7.5L6 13L15.5 3.5L14 2Z" fill="currentColor"/>
                  </svg>
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Relatorios;