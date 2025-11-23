import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RelatoriosAgendados() {
  const navigate = useNavigate();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFrequency, setFilterFrequency] = useState("todas");

  // Estatísticas de agendamentos
  const stats = [
    {
      id: 1,
      label: "Total de Agendamentos",
      value: "12",
      icon: "📅",
      color: "#667eea",
      trend: "+3",
      trendLabel: "este mês"
    },
    {
      id: 2,
      label: "Agendamentos Ativos",
      value: "8",
      icon: "✅",
      color: "#00b894",
      trend: "67%",
      trendLabel: "taxa de ativação"
    },
    {
      id: 3,
      label: "Envios Hoje",
      value: "4",
      icon: "🚀",
      color: "#0984e3",
      trend: "16",
      trendLabel: "total esta semana"
    },
    {
      id: 4,
      label: "Taxa de Sucesso",
      value: "98.5%",
      icon: "📊",
      color: "#00b894",
      trend: "+2.3%",
      trendLabel: "vs mês anterior"
    },
  ];

  // Agendamentos com mais informações
  const agendamentos = [
    { 
      id: 1, 
      nome: "Relatório Mensal de Desempenho", 
      tipo: "Desempenho",
      descricao: "Análise completa de performance mensal",
      frequencia: "Mensal", 
      frequenciaDetalhada: "Todo dia 1º de cada mês",
      horario: "08:00",
      proximo: "01/12/2025", 
      destinatarios: ["gerencia@pulso360.com", "diretoria@pulso360.com"], 
      ativo: true,
      formato: "PDF",
      criadoEm: "15/10/2025",
      criadoPor: "Admin Sistema",
      ultimoEnvio: "01/11/2025",
      statusUltimoEnvio: "sucesso",
      totalEnvios: 8,
      taxaSucesso: 100
    },
    { 
      id: 2, 
      nome: "Dashboard Executivo Semanal", 
      tipo: "Dashboard",
      descricao: "KPIs e métricas executivas consolidadas",
      frequencia: "Semanal", 
      frequenciaDetalhada: "Toda segunda-feira",
      horario: "07:00",
      proximo: "25/11/2025", 
      destinatarios: ["diretoria@pulso360.com", "ceo@pulso360.com"], 
      ativo: true,
      formato: "Excel",
      criadoEm: "01/09/2025",
      criadoPor: "João Silva",
      ultimoEnvio: "18/11/2025",
      statusUltimoEnvio: "sucesso",
      totalEnvios: 12,
      taxaSucesso: 100
    },
    { 
      id: 3, 
      nome: "Métricas de RH Quinzenais", 
      tipo: "RH",
      descricao: "Indicadores de recursos humanos",
      frequencia: "Quinzenal", 
      frequenciaDetalhada: "Dias 1 e 15 de cada mês",
      horario: "09:00",
      proximo: "01/12/2025", 
      destinatarios: ["rh@pulso360.com"], 
      ativo: false,
      formato: "PDF",
      criadoEm: "20/08/2025",
      criadoPor: "Maria Santos",
      ultimoEnvio: "15/11/2025",
      statusUltimoEnvio: "falha",
      totalEnvios: 6,
      taxaSucesso: 83.3
    },
    { 
      id: 4, 
      nome: "Avaliações Diárias", 
      tipo: "Avaliações",
      descricao: "Resumo diário de avaliações realizadas",
      frequencia: "Diária", 
      frequenciaDetalhada: "Todos os dias úteis",
      horario: "18:00",
      proximo: "23/11/2025", 
      destinatarios: ["gestores@pulso360.com", "rh@pulso360.com"], 
      ativo: true,
      formato: "CSV",
      criadoEm: "10/11/2025",
      criadoPor: "Ana Costa",
      ultimoEnvio: "22/11/2025",
      statusUltimoEnvio: "sucesso",
      totalEnvios: 13,
      taxaSucesso: 100
    },
    { 
      id: 5, 
      nome: "PDIs em Andamento", 
      tipo: "PDI",
      descricao: "Status de planos de desenvolvimento",
      frequencia: "Semanal", 
      frequenciaDetalhada: "Toda sexta-feira",
      horario: "10:00",
      proximo: "29/11/2025", 
      destinatarios: ["gestores@pulso360.com"], 
      ativo: true,
      formato: "PDF",
      criadoEm: "05/10/2025",
      criadoPor: "Carlos Mendes",
      ultimoEnvio: "22/11/2025",
      statusUltimoEnvio: "sucesso",
      totalEnvios: 7,
      taxaSucesso: 100
    },
    { 
      id: 6, 
      nome: "Feedbacks Mensais", 
      tipo: "Feedback",
      descricao: "Consolidado mensal de feedbacks",
      frequencia: "Mensal", 
      frequenciaDetalhada: "Último dia útil do mês",
      horario: "16:00",
      proximo: "29/11/2025", 
      destinatarios: ["rh@pulso360.com", "gestores@pulso360.com"], 
      ativo: true,
      formato: "Excel",
      criadoEm: "12/09/2025",
      criadoPor: "Fernanda Lima",
      ultimoEnvio: "31/10/2025",
      statusUltimoEnvio: "sucesso",
      totalEnvios: 2,
      taxaSucesso: 100
    },
  ];

  // Histórico de envios (exemplo)
  const historicoEnvios = [
    { id: 1, data: "22/11/2025", horario: "18:00", status: "sucesso", destinatarios: 2, tamanho: "1.2 MB" },
    { id: 2, data: "21/11/2025", horario: "18:00", status: "sucesso", destinatarios: 2, tamanho: "1.1 MB" },
    { id: 3, data: "20/11/2025", horario: "18:00", status: "sucesso", destinatarios: 2, tamanho: "1.3 MB" },
    { id: 4, data: "19/11/2025", horario: "18:00", status: "sucesso", destinatarios: 2, tamanho: "0.9 MB" },
    { id: 5, data: "18/11/2025", horario: "18:00", status: "sucesso", destinatarios: 2, tamanho: "1.0 MB" },
    { id: 6, data: "15/11/2025", horario: "18:00", status: "falha", destinatarios: 2, tamanho: "-", erro: "Servidor SMTP indisponível" },
  ];

  const handleToggleActive = (id) => {
    console.log("Toggle ativo:", id);
  };

  const handleEdit = (agendamento) => {
    setSelectedSchedule(agendamento);
    setShowScheduleModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este agendamento?")) {
      console.log("Excluir agendamento:", id);
    }
  };

  const handleShowHistory = (agendamento) => {
    setSelectedSchedule(agendamento);
    setShowHistoryModal(true);
  };

  const getFilteredSchedules = () => {
    let filtered = agendamentos;

    // Filtro por status (tab)
    if (activeTab === "ativos") {
      filtered = filtered.filter(a => a.ativo);
    } else if (activeTab === "inativos") {
      filtered = filtered.filter(a => !a.ativo);
    }

    // Filtro por frequência
    if (filterFrequency !== "todas") {
      filtered = filtered.filter(a => a.frequencia.toLowerCase() === filterFrequency);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredSchedules = getFilteredSchedules();

  return (
    <div className="admin-page-scheduled-reports">
      <div className="page-header-admin">
        <button className="back-button" onClick={() => navigate("/administracao")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar
        </button>
        
        <div className="header-content">
          <div className="header-icon-circle" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Relatórios Agendados</h1>
            <p>Gerencie e programe envios automáticos de relatórios</p>
          </div>
        </div>

        <button className="btn-primary-admin" onClick={() => { setSelectedSchedule(null); setShowScheduleModal(true); }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Novo Agendamento
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-scheduled">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card-scheduled">
            <div className="stat-icon-scheduled" style={{ background: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info-scheduled">
              <p className="stat-label-scheduled">{stat.label}</p>
              <h3 className="stat-value-scheduled">{stat.value}</h3>
              <div className="stat-trend-scheduled">
                <span className="trend-value" style={{ color: stat.color }}>{stat.trend}</span>
                <span className="trend-label">{stat.trendLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="filters-section-scheduled">
        <div className="tabs-navigation-scheduled">
          <button 
            className={`tab-button-scheduled ${activeTab === "todos" ? "active" : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            Todos ({agendamentos.length})
          </button>
          <button 
            className={`tab-button-scheduled ${activeTab === "ativos" ? "active" : ""}`}
            onClick={() => setActiveTab("ativos")}
          >
            Ativos ({agendamentos.filter(a => a.ativo).length})
          </button>
          <button 
            className={`tab-button-scheduled ${activeTab === "inativos" ? "active" : ""}`}
            onClick={() => setActiveTab("inativos")}
          >
            Inativos ({agendamentos.filter(a => !a.ativo).length})
          </button>
        </div>

        <div className="filters-controls-scheduled">
          <div className="search-box-scheduled">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nome ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-select-scheduled">
            <select value={filterFrequency} onChange={(e) => setFilterFrequency(e.target.value)}>
              <option value="todas">Todas as Frequências</option>
              <option value="diária">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="quinzenal">Quinzenal</option>
              <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedules List */}
      <div className="schedules-grid">
        {filteredSchedules.length === 0 ? (
          <div className="empty-state-scheduled">
            <div className="empty-icon-scheduled">📅</div>
            <h3>Nenhum agendamento encontrado</h3>
            <p>Ajuste os filtros ou crie um novo agendamento</p>
            <button className="btn-primary-admin" onClick={() => { setSelectedSchedule(null); setShowScheduleModal(true); }}>
              Criar Agendamento
            </button>
          </div>
        ) : (
          filteredSchedules.map((agendamento) => (
            <div key={agendamento.id} className={`schedule-card ${!agendamento.ativo ? 'inactive' : ''}`}>
              <div className="schedule-card-header">
                <div className="schedule-title-section">
                  <h3>{agendamento.nome}</h3>
                  <span className="schedule-type-badge">{agendamento.tipo}</span>
                </div>
                <label className="toggle-switch-scheduled">
                  <input 
                    type="checkbox" 
                    checked={agendamento.ativo} 
                    onChange={() => handleToggleActive(agendamento.id)}
                  />
                  <span className="toggle-slider-scheduled"></span>
                </label>
              </div>

              <p className="schedule-description">{agendamento.descricao}</p>

              <div className="schedule-details">
                <div className="detail-item">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{agendamento.frequenciaDetalhada} às {agendamento.horario}</span>
                </div>

                <div className="detail-item">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M3 8L10 1L17 8M5 10V17C5 18.1 5.9 19 7 19H13C14.1 19 15 18.1 15 17V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{agendamento.destinatarios.length} destinatário(s)</span>
                </div>

                <div className="detail-item">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M12 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H16C17.1 18 18 17.1 18 16V8L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span>Formato: {agendamento.formato}</span>
                </div>
              </div>

              <div className="schedule-meta">
                <div className="meta-row">
                  <span className="meta-label">Próximo envio:</span>
                  <span className="meta-value next-send">{agendamento.proximo} às {agendamento.horario}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Último envio:</span>
                  <span className={`meta-value status-${agendamento.statusUltimoEnvio}`}>
                    {agendamento.ultimoEnvio}
                    {agendamento.statusUltimoEnvio === "sucesso" ? " ✓" : " ✗"}
                  </span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Taxa de sucesso:</span>
                  <span className="meta-value">{agendamento.taxaSucesso}% ({agendamento.totalEnvios} envios)</span>
                </div>
              </div>

              <div className="schedule-card-footer">
                <button className="btn-schedule-action primary" onClick={() => handleEdit(agendamento)}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80963 15.8327 1.80963C16.1422 1.80963 16.4487 1.87061 16.7347 1.98906C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55064 18.1897 3.85714 18.1897 4.16667C18.1897 4.47619 18.1287 4.78269 18.0103 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Editar
                </button>
                <button className="btn-schedule-action secondary" onClick={() => handleShowHistory(agendamento)}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 6V10L13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Histórico
                </button>
                <button className="btn-schedule-action danger" onClick={() => handleDelete(agendamento.id)}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M2.5 5H4.16667H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5M6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Criar/Editar Agendamento */}
      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content-scheduled" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-scheduled">
              <h2>{selectedSchedule ? "Editar Agendamento" : "Novo Agendamento"}</h2>
              <button className="modal-close" onClick={() => setShowScheduleModal(false)}>×</button>
            </div>
            
            <div className="modal-body-scheduled">
              <div className="form-section-scheduled">
                <h3>📋 Informações Básicas</h3>
                <div className="form-grid-scheduled">
                  <div className="form-group-scheduled full-width">
                    <label>Nome do Agendamento *</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Relatório Mensal de Desempenho"
                      defaultValue={selectedSchedule?.nome}
                    />
                  </div>
                  <div className="form-group-scheduled full-width">
                    <label>Descrição</label>
                    <textarea 
                      rows="2"
                      placeholder="Breve descrição sobre o conteúdo do relatório..."
                      defaultValue={selectedSchedule?.descricao}
                    ></textarea>
                  </div>
                  <div className="form-group-scheduled">
                    <label>Tipo de Relatório *</label>
                    <select defaultValue={selectedSchedule?.tipo}>
                      <option value="">Selecione...</option>
                      <option value="Desempenho">Desempenho</option>
                      <option value="Avaliações">Avaliações</option>
                      <option value="PDI">PDI</option>
                      <option value="Dashboard">Dashboard</option>
                      <option value="RH">RH</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Personalizado">Personalizado</option>
                    </select>
                  </div>
                  <div className="form-group-scheduled">
                    <label>Formato de Exportação *</label>
                    <select defaultValue={selectedSchedule?.formato}>
                      <option value="PDF">PDF</option>
                      <option value="Excel">Excel (XLSX)</option>
                      <option value="CSV">CSV</option>
                      <option value="JSON">JSON</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section-scheduled">
                <h3>⏰ Configuração de Periodicidade</h3>
                <div className="form-grid-scheduled">
                  <div className="form-group-scheduled">
                    <label>Frequência *</label>
                    <select defaultValue={selectedSchedule?.frequencia}>
                      <option value="Diária">Diária</option>
                      <option value="Semanal">Semanal</option>
                      <option value="Quinzenal">Quinzenal</option>
                      <option value="Mensal">Mensal</option>
                    </select>
                  </div>
                  <div className="form-group-scheduled">
                    <label>Horário de Envio *</label>
                    <input 
                      type="time" 
                      defaultValue={selectedSchedule?.horario || "08:00"}
                    />
                  </div>
                  <div className="form-group-scheduled">
                    <label>Data de Início</label>
                    <input 
                      type="date"
                      defaultValue="2025-11-23"
                    />
                  </div>
                  <div className="form-group-scheduled">
                    <label>Data de Término (opcional)</label>
                    <input type="date" />
                  </div>
                </div>
              </div>

              <div className="form-section-scheduled">
                <h3>📧 Destinatários</h3>
                <div className="form-group-scheduled full-width">
                  <label>Emails dos Destinatários *</label>
                  <textarea
                    rows="3"
                    placeholder="Separe múltiplos emails por vírgula ou quebra de linha&#10;Exemplo: gerencia@pulso360.com, diretoria@pulso360.com"
                    defaultValue={selectedSchedule?.destinatarios.join(", ")}
                  ></textarea>
                  <small className="form-hint">Você pode adicionar múltiplos destinatários separando-os por vírgula</small>
                </div>
              </div>

              <div className="form-section-scheduled">
                <h3>⚙️ Opções Adicionais</h3>
                <div className="checkbox-group-scheduled">
                  <label className="checkbox-label-scheduled">
                    <input type="checkbox" defaultChecked />
                    <span>Ativar agendamento imediatamente</span>
                  </label>
                  <label className="checkbox-label-scheduled">
                    <input type="checkbox" />
                    <span>Enviar cópia para mim</span>
                  </label>
                  <label className="checkbox-label-scheduled">
                    <input type="checkbox" defaultChecked />
                    <span>Notificar em caso de falha no envio</span>
                  </label>
                  <label className="checkbox-label-scheduled">
                    <input type="checkbox" />
                    <span>Incluir gráficos e visualizações</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer-scheduled">
              <button className="btn-modal-cancel" onClick={() => setShowScheduleModal(false)}>
                Cancelar
              </button>
              <button className="btn-modal-save">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {selectedSchedule ? "Salvar Alterações" : "Criar Agendamento"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Histórico */}
      {showHistoryModal && selectedSchedule && (
        <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="modal-content-scheduled" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-scheduled">
              <h2>📊 Histórico de Envios - {selectedSchedule.nome}</h2>
              <button className="modal-close" onClick={() => setShowHistoryModal(false)}>×</button>
            </div>
            
            <div className="modal-body-scheduled">
              <div className="history-stats">
                <div className="history-stat-item">
                  <span className="history-stat-label">Total de Envios</span>
                  <span className="history-stat-value">{selectedSchedule.totalEnvios}</span>
                </div>
                <div className="history-stat-item">
                  <span className="history-stat-label">Taxa de Sucesso</span>
                  <span className="history-stat-value success">{selectedSchedule.taxaSucesso}%</span>
                </div>
                <div className="history-stat-item">
                  <span className="history-stat-label">Último Envio</span>
                  <span className="history-stat-value">{selectedSchedule.ultimoEnvio}</span>
                </div>
              </div>

              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Horário</th>
                      <th>Status</th>
                      <th>Destinatários</th>
                      <th>Tamanho</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoEnvios.map((envio) => (
                      <tr key={envio.id}>
                        <td>{envio.data}</td>
                        <td>{envio.horario}</td>
                        <td>
                          <span className={`status-badge-history ${envio.status}`}>
                            {envio.status === "sucesso" ? "✓ Sucesso" : "✗ Falha"}
                          </span>
                        </td>
                        <td>{envio.destinatarios}</td>
                        <td>{envio.tamanho}</td>
                        <td>
                          {envio.erro ? (
                            <span className="error-message" title={envio.erro}>⚠️ Ver erro</span>
                          ) : (
                            <span className="success-message">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer-scheduled">
              <button className="btn-modal-cancel" onClick={() => setShowHistoryModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
