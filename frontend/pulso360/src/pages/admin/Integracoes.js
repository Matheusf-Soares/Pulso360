import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Integracoes() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const integracoes = [
    { 
      id: 1,
      nome: "Microsoft Teams", 
      descricao: "Integração com chat e videoconferências corporativas", 
      icone: "💬", 
      status: "conectado", 
      cor: "#5558AF",
      categoria: "Comunicação",
      ultimaSync: "23/11/2025 às 14:30",
      eventos: 1247,
      apiKey: "ms-teams-api-key-***",
      webhookUrl: "https://outlook.office.com/webhook/***"
    },
    { 
      id: 2,
      nome: "Google Workspace", 
      descricao: "Gmail, Calendar, Drive e Meet para produtividade", 
      icone: "📧", 
      status: "conectado", 
      cor: "#EA4335",
      categoria: "Produtividade",
      ultimaSync: "23/11/2025 às 15:20",
      eventos: 3456,
      apiKey: "google-workspace-***",
      webhookUrl: "https://workspace.google.com/webhook/***"
    },
    { 
      id: 3,
      nome: "Slack", 
      descricao: "Comunicação em equipe e colaboração em tempo real", 
      icone: "💼", 
      status: "desconectado", 
      cor: "#4A154B",
      categoria: "Comunicação",
      ultimaSync: "Nunca",
      eventos: 0,
      apiKey: "",
      webhookUrl: ""
    },
    { 
      id: 4,
      nome: "Salesforce", 
      descricao: "CRM e gestão de relacionamento com clientes", 
      icone: "☁️", 
      status: "erro", 
      cor: "#00A1E0",
      categoria: "CRM",
      ultimaSync: "20/11/2025 às 10:15",
      eventos: 892,
      apiKey: "salesforce-api-***",
      webhookUrl: "https://salesforce.com/webhook/***"
    },
    { 
      id: 5,
      nome: "SAP ERP", 
      descricao: "Sistema de gestão empresarial integrado", 
      icone: "🏢", 
      status: "conectado", 
      cor: "#0FAAFF",
      categoria: "ERP",
      ultimaSync: "23/11/2025 às 16:00",
      eventos: 5678,
      apiKey: "sap-erp-api-***",
      webhookUrl: "https://sap.com/webhook/***"
    },
    { 
      id: 6,
      nome: "Jira Software", 
      descricao: "Gerenciamento de projetos ágeis e tracking", 
      icone: "📋", 
      status: "conectado", 
      cor: "#0052CC",
      categoria: "Gestão de Projetos",
      ultimaSync: "23/11/2025 às 14:45",
      eventos: 2341,
      apiKey: "jira-api-***",
      webhookUrl: "https://jira.atlassian.com/webhook/***"
    },
    { 
      id: 7,
      nome: "Webhook Customizado", 
      descricao: "API personalizada para integração proprietária", 
      icone: "🔗", 
      status: "configurar", 
      cor: "#667eea",
      categoria: "API",
      ultimaSync: "Não configurado",
      eventos: 0,
      apiKey: "",
      webhookUrl: ""
    },
    { 
      id: 8,
      nome: "Azure DevOps", 
      descricao: "CI/CD e gerenciamento de código-fonte", 
      icone: "⚙️", 
      status: "desconectado", 
      cor: "#0078D4",
      categoria: "DevOps",
      ultimaSync: "Nunca",
      eventos: 0,
      apiKey: "",
      webhookUrl: ""
    },
    { 
      id: 9,
      nome: "Zoom", 
      descricao: "Videoconferências e webinars corporativos", 
      icone: "🎥", 
      status: "conectado", 
      cor: "#2D8CFF",
      categoria: "Comunicação",
      ultimaSync: "23/11/2025 às 13:50",
      eventos: 567,
      apiKey: "zoom-api-***",
      webhookUrl: "https://zoom.us/webhook/***"
    },
  ];

  const stats = [
    { label: "Total de Integrações", value: "9", icon: "🔗", color: "#667eea" },
    { label: "Conectadas", value: "5", icon: "✓", color: "#00b894" },
    { label: "Com Erro", value: "1", icon: "⚠", color: "#d63031" },
    { label: "Eventos Sincronizados", value: "14.2k", icon: "📊", color: "#fdcb6e" },
  ];

  const filteredIntegrations = integracoes.filter(integration => {
    const matchesStatus = filterStatus === "all" || integration.status === filterStatus;
    const matchesSearch = integration.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.categoria.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleConnect = (integration) => {
    console.log("Conectando:", integration.nome);
    setSelectedIntegration(integration);
    setShowConfigModal(true);
  };

  const handleDisconnect = (integration) => {
    setSelectedIntegration(integration);
    setShowDisconnectModal(true);
  };

  const handleConfigure = (integration) => {
    setSelectedIntegration(integration);
    setShowConfigModal(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'conectado': return '#00b894';
      case 'desconectado': return '#636e72';
      case 'erro': return '#d63031';
      case 'configurar': return '#fdcb6e';
      default: return '#636e72';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'conectado': return 'Conectado';
      case 'desconectado': return 'Desconectado';
      case 'erro': return 'Erro';
      case 'configurar': return 'Configurar';
      default: return status;
    }
  };

  return (
    <div className="admin-page-integracoes">
      {/* Header Profissional */}
      <header className="admin-header-professional">
        <div className="header-left">
          <button onClick={() => navigate("/administracao")} className="btn-back-professional">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </button>
          <div className="page-title-block">
            <div className="icon-circle-professional" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.09 15.59L11.5 17L16.5 12L11.5 7L10.09 8.41L12.67 11H3V13H12.67L10.09 15.59ZM19 3H5C3.89 3 3 3.9 3 5V9H5V5H19V19H5V15H3V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="page-title">Integrações</h1>
              <p className="page-subtitle">Conecte e gerencie APIs e serviços externos</p>
            </div>
          </div>
        </div>
        <div className="header-actions-professional">
          <button className="btn-export-professional">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Exportar Log
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid-professional">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-professional" style={{ borderTop: `3px solid ${stat.color}` }}>
            <div className="stat-header">
              <div className="stat-icon-professional" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <span style={{ fontSize: "28px" }}>{stat.icon}</span>
              </div>
              <div className="stat-info">
                <p className="stat-label-professional">{stat.label}</p>
                <h3 className="stat-value-professional">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros e Busca */}
      <div className="filters-section-integrations">
        <div className="search-box-integrations">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Buscar integrações..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-buttons-integrations">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Todas ({integracoes.length})
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'conectado' ? 'active' : ''}`}
            onClick={() => setFilterStatus('conectado')}
          >
            <span className="status-dot conectado"></span>
            Conectadas (5)
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'desconectado' ? 'active' : ''}`}
            onClick={() => setFilterStatus('desconectado')}
          >
            <span className="status-dot desconectado"></span>
            Desconectadas (2)
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'erro' ? 'active' : ''}`}
            onClick={() => setFilterStatus('erro')}
          >
            <span className="status-dot erro"></span>
            Com Erro (1)
          </button>
        </div>
      </div>

      {/* Grid de Integrações */}
      <div className="integrations-grid-professional">
        {filteredIntegrations.length > 0 ? (
          filteredIntegrations.map((integracao) => (
            <div key={integracao.id} className={`integration-card-professional ${integracao.status}`}>
              <div className="integration-card-header">
                <div className="integration-icon-large" style={{ background: `${integracao.cor}20` }}>
                  <span style={{ fontSize: "40px" }}>{integracao.icone}</span>
                </div>
                <span 
                  className="integration-status-badge" 
                  style={{ background: getStatusColor(integracao.status) }}
                >
                  {getStatusLabel(integracao.status)}
                </span>
              </div>

              <div className="integration-card-body">
                <h3 className="integration-name">{integracao.nome}</h3>
                <p className="integration-description">{integracao.descricao}</p>

                <div className="integration-meta">
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.10051 9.8995 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.8995 4.10051 12.25 7 12.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 4.375V7L8.75 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{integracao.ultimaSync}</span>
                  </div>
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.25 2.625H1.75C1.40482 2.625 1.125 2.90482 1.125 3.25V10.75C1.125 11.0952 1.40482 11.375 1.75 11.375H12.25C12.5952 11.375 12.875 11.0952 12.875 10.75V3.25C12.875 2.90482 12.5952 2.625 12.25 2.625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.125 5.5H12.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{integracao.categoria}</span>
                  </div>
                </div>

                {integracao.status === 'conectado' && (
                  <div className="integration-stats">
                    <div className="stat-item-integration">
                      <span className="stat-value">{integracao.eventos.toLocaleString()}</span>
                      <span className="stat-label">Eventos</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="integration-card-actions">
                {integracao.status === 'conectado' ? (
                  <>
                    <button 
                      className="btn-integration-secondary"
                      onClick={() => handleConfigure(integracao)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12.6667 8.66666C12.7333 8.26666 12.7333 7.86666 12.7333 7.46666C12.7333 7.06666 12.7333 6.66666 12.6667 6.26666L14.2667 5.06666C14.4 4.96666 14.4333 4.76666 14.3667 4.6L12.8333 1.93333C12.7667 1.76666 12.6 1.7 12.4 1.76666L10.5333 2.53333C10.1333 2.23333 9.7 1.96666 9.2 1.76666L8.93333 0.733328C8.9 0.533328 8.73333 0.399994 8.53333 0.399994H5.46667C5.26667 0.399994 5.1 0.533328 5.06667 0.733328L4.8 1.76666C4.3 1.96666 3.86667 2.23333 3.46667 2.53333L1.6 1.76666C1.4 1.7 1.23333 1.76666 1.16667 1.93333L-0.366667 4.6C-0.433333 4.76666 -0.4 4.96666 -0.266667 5.06666L1.33333 6.26666C1.26667 6.66666 1.26667 7.06666 1.26667 7.46666C1.26667 7.86666 1.26667 8.26666 1.33333 8.66666L-0.266667 9.86666C-0.4 9.96666 -0.433333 10.1667 -0.366667 10.3333L1.16667 13C1.23333 13.1667 1.4 13.2333 1.6 13.1667L3.46667 12.4C3.86667 12.7 4.3 12.9667 4.8 13.1667L5.06667 14.2C5.1 14.4 5.26667 14.5333 5.46667 14.5333H8.53333C8.73333 14.5333 8.9 14.4 8.93333 14.2L9.2 13.1667C9.7 12.9667 10.1333 12.7 10.5333 12.4L12.4 13.1667C12.6 13.2333 12.7667 13.1667 12.8333 13L14.3667 10.3333C14.4333 10.1667 14.4 9.96666 14.2667 9.86666L12.6667 8.66666ZM7 9.93333C5.63333 9.93333 4.53333 8.83333 4.53333 7.46666C4.53333 6.1 5.63333 5 7 5C8.36667 5 9.46667 6.1 9.46667 7.46666C9.46667 8.83333 8.36667 9.93333 7 9.93333Z" fill="currentColor"/>
                      </svg>
                      Configurar
                    </button>
                    <button 
                      className="btn-integration-danger"
                      onClick={() => handleDisconnect(integracao)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 6L6 10M6 6L10 10M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Desconectar
                    </button>
                  </>
                ) : integracao.status === 'erro' ? (
                  <>
                    <button 
                      className="btn-integration-warning"
                      onClick={() => handleConfigure(integracao)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 5.33333V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Resolver Erro
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn-integration-primary"
                    onClick={() => handleConnect(integracao)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8.6 5.33333L9.93333 6.66666M11.2667 8L12.6 9.33333M9.93333 9.33333L8.6 10.6667M6.66667 8L5.33333 9.33333M3.4 5.33333L4.73333 6.66666M8 1.33333V2.66666M8 13.3333V14.6667M1.33333 8H2.66667M13.3333 8H14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Conectar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state-integrations">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#f8f9fa"/>
              <path d="M32 20V32M32 38H32.02M44 32C44 38.6274 38.6274 44 32 44C25.3726 44 20 38.6274 20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32Z" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Nenhuma integração encontrada</h3>
            <p>Tente ajustar os filtros ou buscar por outro termo</p>
          </div>
        )}
      </div>

      {/* Modal: Configuração */}
      {showConfigModal && selectedIntegration && (
        <div className="modal-overlay-professional" onClick={() => setShowConfigModal(false)}>
          <div className="modal-content-professional large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <div className="modal-header-with-icon">
                <div className="integration-icon-modal" style={{ background: `${selectedIntegration.cor}20` }}>
                  <span style={{ fontSize: "32px" }}>{selectedIntegration.icone}</span>
                </div>
                <div>
                  <h2>Configurar {selectedIntegration.nome}</h2>
                  <p>{selectedIntegration.categoria}</p>
                </div>
              </div>
              <button className="modal-close-professional" onClick={() => setShowConfigModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <div className="form-group-modal">
                <label className="form-label-modal">API Key</label>
                <input 
                  type="text" 
                  className="form-input-modal"
                  defaultValue={selectedIntegration.apiKey}
                  placeholder="Digite a API Key fornecida pelo serviço"
                />
                <span className="input-hint-modal">Mantenha sua API Key em segurança</span>
              </div>

              <div className="form-group-modal">
                <label className="form-label-modal">Webhook URL</label>
                <input 
                  type="url" 
                  className="form-input-modal"
                  defaultValue={selectedIntegration.webhookUrl}
                  placeholder="https://exemplo.com/webhook"
                />
                <span className="input-hint-modal">URL para receber eventos em tempo real</span>
              </div>

              <div className="form-group-modal">
                <label className="form-label-modal">Eventos para Sincronizar</label>
                <div className="checkbox-group-modal">
                  <label className="checkbox-label-modal">
                    <input type="checkbox" defaultChecked />
                    <span>Novos usuários</span>
                  </label>
                  <label className="checkbox-label-modal">
                    <input type="checkbox" defaultChecked />
                    <span>Atualizações de perfil</span>
                  </label>
                  <label className="checkbox-label-modal">
                    <input type="checkbox" />
                    <span>Atividades do sistema</span>
                  </label>
                  <label className="checkbox-label-modal">
                    <input type="checkbox" defaultChecked />
                    <span>Notificações</span>
                  </label>
                </div>
              </div>

              <div className="alert-box-modal info">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 6V10" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14H10.01" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>Documentação da API</strong>
                  <p>Consulte a documentação oficial para obter sua API Key e configurar corretamente.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer-professional">
              <button className="btn-cancel-professional" onClick={() => setShowConfigModal(false)}>
                Cancelar
              </button>
              <button className="btn-primary-professional" onClick={() => setShowConfigModal(false)}>
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Desconectar */}
      {showDisconnectModal && selectedIntegration && (
        <div className="modal-overlay-professional" onClick={() => setShowDisconnectModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Desconectar Integração?</h2>
              <button className="modal-close-professional" onClick={() => setShowDisconnectModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <div className="alert-box-modal warning">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 6V10M10 14H10.01M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="#d63031" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <strong>Atenção!</strong>
                  <p>Ao desconectar <strong>{selectedIntegration.nome}</strong>, você perderá acesso aos dados sincronizados e eventos em tempo real.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer-professional">
              <button className="btn-cancel-professional" onClick={() => setShowDisconnectModal(false)}>
                Cancelar
              </button>
              <button className="btn-delete-professional" onClick={() => setShowDisconnectModal(false)}>
                Desconectar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
