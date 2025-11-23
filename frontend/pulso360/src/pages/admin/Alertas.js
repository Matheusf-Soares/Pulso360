import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Alertas() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("regras");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");

  // Estado para regras de alerta
  const [alertRules, setAlertRules] = useState([
    {
      id: 1,
      nome: "Uso Elevado de CPU",
      descricao: "Alerta quando o uso da CPU exceder 80%",
      categoria: "performance",
      condicao: "cpu_usage > 80",
      metrica: "CPU",
      operador: ">",
      valor: "80",
      unidade: "%",
      severidade: "critico",
      ativo: true,
      destinos: ["email", "sms"],
      ultimoDisparo: "2 horas atrás",
      totalDisparos: 15,
      criadoPor: "admin@pulso360.com",
      criadoEm: "15/01/2025"
    },
    {
      id: 2,
      nome: "Disco Quase Cheio",
      descricao: "Notificação quando o espaço em disco atingir 90%",
      categoria: "recursos",
      condicao: "disk_usage > 90",
      metrica: "Disco",
      operador: ">",
      valor: "90",
      unidade: "%",
      severidade: "alto",
      ativo: true,
      destinos: ["email", "slack"],
      ultimoDisparo: "1 dia atrás",
      totalDisparos: 8,
      criadoPor: "admin@pulso360.com",
      criadoEm: "10/01/2025"
    },
    {
      id: 3,
      nome: "Múltiplas Falhas de Login",
      descricao: "Detecta tentativas suspeitas de login",
      categoria: "seguranca",
      condicao: "failed_logins >= 5 in 5min",
      metrica: "Falhas de Login",
      operador: ">=",
      valor: "5",
      unidade: "tentativas/5min",
      severidade: "critico",
      ativo: true,
      destinos: ["email", "sms", "slack"],
      ultimoDisparo: "30 minutos atrás",
      totalDisparos: 23,
      criadoPor: "security@pulso360.com",
      criadoEm: "05/01/2025"
    },
    {
      id: 4,
      nome: "Backup Falhou",
      descricao: "Alerta quando o backup automático falhar",
      categoria: "backup",
      condicao: "backup_status == 'failed'",
      metrica: "Status do Backup",
      operador: "==",
      valor: "failed",
      unidade: "",
      severidade: "alto",
      ativo: false,
      destinos: ["email"],
      ultimoDisparo: "3 dias atrás",
      totalDisparos: 2,
      criadoPor: "admin@pulso360.com",
      criadoEm: "01/01/2025"
    },
    {
      id: 5,
      nome: "Memória RAM Crítica",
      descricao: "Alerta quando a memória RAM disponível for menor que 10%",
      categoria: "performance",
      condicao: "memory_available < 10",
      metrica: "Memória Disponível",
      operador: "<",
      valor: "10",
      unidade: "%",
      severidade: "alto",
      ativo: true,
      destinos: ["email", "slack"],
      ultimoDisparo: "5 horas atrás",
      totalDisparos: 12,
      criadoPor: "admin@pulso360.com",
      criadoEm: "20/12/2024"
    },
    {
      id: 6,
      nome: "Tempo de Resposta Alto",
      descricao: "Notifica quando o tempo de resposta exceder 2 segundos",
      categoria: "performance",
      condicao: "response_time > 2000",
      metrica: "Tempo de Resposta",
      operador: ">",
      valor: "2000",
      unidade: "ms",
      severidade: "medio",
      ativo: true,
      destinos: ["email"],
      ultimoDisparo: "1 hora atrás",
      totalDisparos: 45,
      criadoPor: "devops@pulso360.com",
      criadoEm: "18/12/2024"
    },
    {
      id: 7,
      nome: "Acesso Não Autorizado",
      descricao: "Detecta acessos de IPs não autorizados",
      categoria: "seguranca",
      condicao: "ip not in whitelist",
      metrica: "IP de Origem",
      operador: "not in",
      valor: "whitelist",
      unidade: "",
      severidade: "critico",
      ativo: true,
      destinos: ["email", "sms"],
      ultimoDisparo: "15 minutos atrás",
      totalDisparos: 7,
      criadoPor: "security@pulso360.com",
      criadoEm: "28/12/2024"
    },
    {
      id: 8,
      nome: "Taxa de Erros Elevada",
      descricao: "Alerta quando a taxa de erros HTTP 5xx exceder 5%",
      categoria: "aplicacao",
      condicao: "error_rate_5xx > 5",
      metrica: "Taxa de Erros 5xx",
      operador: ">",
      valor: "5",
      unidade: "%",
      severidade: "alto",
      ativo: true,
      destinos: ["slack", "email"],
      ultimoDisparo: "4 horas atrás",
      totalDisparos: 19,
      criadoPor: "devops@pulso360.com",
      criadoEm: "12/01/2025"
    }
  ]);

  // Histórico de alertas disparados
  // eslint-disable-next-line no-unused-vars
  const [alertHistory, setAlertHistory] = useState([
    {
      id: 1,
      regra: "Múltiplas Falhas de Login",
      severidade: "critico",
      timestamp: "2025-01-23 14:30:00",
      mensagem: "5 tentativas de login falhadas detectadas de IP 192.168.1.100",
      status: "resolvido",
      resolvidoPor: "admin@pulso360.com",
      resolvidoEm: "2025-01-23 14:45:00",
      acoes: ["IP bloqueado", "Usuário notificado"]
    },
    {
      id: 2,
      regra: "Uso Elevado de CPU",
      severidade: "critico",
      timestamp: "2025-01-23 12:15:00",
      mensagem: "CPU atingiu 85% de utilização no servidor principal",
      status: "ativo",
      resolvidoPor: null,
      resolvidoEm: null,
      acoes: ["Equipe notificada"]
    },
    {
      id: 3,
      regra: "Memória RAM Crítica",
      severidade: "alto",
      timestamp: "2025-01-23 09:00:00",
      mensagem: "Memória RAM disponível abaixo de 10% (8% disponível)",
      status: "resolvido",
      resolvidoPor: "devops@pulso360.com",
      resolvidoEm: "2025-01-23 09:30:00",
      acoes: ["Serviços reiniciados", "Cache limpo"]
    },
    {
      id: 4,
      regra: "Tempo de Resposta Alto",
      severidade: "medio",
      timestamp: "2025-01-23 13:45:00",
      mensagem: "Tempo de resposta da API atingiu 2.5 segundos",
      status: "ativo",
      resolvidoPor: null,
      resolvidoEm: null,
      acoes: ["Em investigação"]
    },
    {
      id: 5,
      regra: "Acesso Não Autorizado",
      severidade: "critico",
      timestamp: "2025-01-23 14:00:00",
      mensagem: "Tentativa de acesso de IP 203.0.113.45 não autorizado",
      status: "resolvido",
      resolvidoPor: "security@pulso360.com",
      resolvidoEm: "2025-01-23 14:05:00",
      acoes: ["IP bloqueado", "Incidente registrado"]
    },
    {
      id: 6,
      regra: "Taxa de Erros Elevada",
      severidade: "alto",
      timestamp: "2025-01-23 10:30:00",
      mensagem: "Taxa de erros HTTP 5xx atingiu 7.2% nas últimas 5 minutos",
      status: "resolvido",
      resolvidoPor: "devops@pulso360.com",
      resolvidoEm: "2025-01-23 11:00:00",
      acoes: ["Serviço reiniciado", "Logs analisados"]
    }
  ]);

  // Configurações de notificação
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      ativo: true,
      destinatarios: ["admin@pulso360.com", "security@pulso360.com"],
      frequencia: "imediato"
    },
    sms: {
      ativo: true,
      numeros: ["+55 11 98765-4321"],
      frequencia: "critico"
    },
    slack: {
      ativo: true,
      webhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX",
      canal: "#alertas-sistema",
      frequencia: "imediato"
    },
    webhook: {
      ativo: false,
      url: "",
      frequencia: "imediato"
    }
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critico": return "#d63031";
      case "alto": return "#fdcb6e";
      case "medio": return "#0984e3";
      case "baixo": return "#00b894";
      default: return "#95a5a6";
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case "critico": return "Crítico";
      case "alto": return "Alto";
      case "medio": return "Médio";
      case "baixo": return "Baixo";
      default: return severity;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "performance": return "⚡";
      case "recursos": return "💾";
      case "seguranca": return "🔒";
      case "backup": return "💿";
      case "aplicacao": return "🌐";
      default: return "📊";
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "performance": return "Performance";
      case "recursos": return "Recursos";
      case "seguranca": return "Segurança";
      case "backup": return "Backup";
      case "aplicacao": return "Aplicação";
      default: return category;
    }
  };

  const getStatusColor = (status) => {
    return status === "ativo" ? "#d63031" : "#00b894";
  };

  const getStatusLabel = (status) => {
    return status === "ativo" ? "Ativo" : "Resolvido";
  };

  const toggleAlertRule = (id) => {
    setAlertRules(alertRules.map(rule =>
      rule.id === id ? { ...rule, ativo: !rule.ativo } : rule
    ));
  };

  const deleteAlertRule = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta regra de alerta?")) {
      setAlertRules(alertRules.filter(rule => rule.id !== id));
    }
  };

  const filteredRules = alertRules.filter(rule => {
    const matchesSearch = rule.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "todos" || rule.severidade === filterSeverity;
    const matchesStatus = filterStatus === "todos" || 
                         (filterStatus === "ativo" && rule.ativo) ||
                         (filterStatus === "inativo" && !rule.ativo);
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const stats = [
    { label: "Total de Regras", value: alertRules.length, icon: "📋", color: "#667eea" },
    { label: "Regras Ativas", value: alertRules.filter(r => r.ativo).length, icon: "✓", color: "#00b894" },
    { label: "Alertas (24h)", value: alertHistory.filter(h => h.timestamp.includes("2025-01-23")).length, icon: "🔔", color: "#fdcb6e" },
    { label: "Críticos Ativos", value: alertHistory.filter(h => h.status === "ativo" && h.severidade === "critico").length, icon: "⚠️", color: "#d63031" }
  ];

  return (
    <div className="admin-page-alertas">
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
              <path d="M12 22C10.9 22 10 21.1 10 20H14C14 21.1 13.1 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Configurar Alertas</h1>
            <p>Gerencie regras de alerta e notificações do sistema</p>
          </div>
        </div>

        <button className="btn-primary-admin" onClick={() => setShowModal(true)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Nova Regra
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-professional">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-professional">
            <div className="stat-icon-professional" style={{ background: stat.color }}>
              <span style={{ fontSize: "28px" }}>{stat.icon}</span>
            </div>
            <div className="stat-info-professional">
              <div className="stat-value-professional">{stat.value}</div>
              <div className="stat-label-professional">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation-alertas">
        <button
          className={`tab-button-alertas ${activeTab === "regras" ? "active" : ""}`}
          onClick={() => setActiveTab("regras")}
        >
          <span className="tab-icon">📋</span>
          <span className="tab-label">Regras de Alerta</span>
        </button>
        <button
          className={`tab-button-alertas ${activeTab === "historico" ? "active" : ""}`}
          onClick={() => setActiveTab("historico")}
        >
          <span className="tab-icon">📜</span>
          <span className="tab-label">Histórico</span>
        </button>
        <button
          className={`tab-button-alertas ${activeTab === "notificacoes" ? "active" : ""}`}
          onClick={() => setActiveTab("notificacoes")}
        >
          <span className="tab-icon">🔔</span>
          <span className="tab-label">Notificações</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content-alertas">
        {activeTab === "regras" && (
          <div className="regras-content">
            {/* Filters and Search */}
            <div className="filters-section-alertas">
              <div className="search-box-alertas">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Buscar regras de alerta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group-alertas">
                <select 
                  className="filter-select-alertas"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="todos">Todas as Severidades</option>
                  <option value="critico">Crítico</option>
                  <option value="alto">Alto</option>
                  <option value="medio">Médio</option>
                  <option value="baixo">Baixo</option>
                </select>

                <select 
                  className="filter-select-alertas"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="todos">Todos os Status</option>
                  <option value="ativo">Ativas</option>
                  <option value="inativo">Inativas</option>
                </select>
              </div>
            </div>

            {/* Alert Rules Grid */}
            <div className="alert-rules-grid">
              {filteredRules.map((rule) => (
                <div key={rule.id} className="alert-rule-card">
                  <div className="alert-rule-header">
                    <div className="alert-rule-title-section">
                      <span className="category-icon">{getCategoryIcon(rule.categoria)}</span>
                      <div>
                        <h3>{rule.nome}</h3>
                        <span className="category-badge">{getCategoryLabel(rule.categoria)}</span>
                      </div>
                    </div>
                    <label className="toggle-switch-alertas">
                      <input
                        type="checkbox"
                        checked={rule.ativo}
                        onChange={() => toggleAlertRule(rule.id)}
                      />
                      <span className="toggle-slider-alertas"></span>
                    </label>
                  </div>

                  <p className="alert-rule-description">{rule.descricao}</p>

                  <div className="alert-rule-condition">
                    <div className="condition-badge">
                      <strong>{rule.metrica}</strong> {rule.operador} <strong>{rule.valor}</strong>
                      {rule.unidade && <span> {rule.unidade}</span>}
                    </div>
                  </div>

                  <div className="alert-rule-meta">
                    <div className="meta-item">
                      <span className="meta-label">Severidade:</span>
                      <span 
                        className="severity-badge-alertas"
                        style={{ 
                          background: `${getSeverityColor(rule.severidade)}15`,
                          color: getSeverityColor(rule.severidade)
                        }}
                      >
                        {getSeverityLabel(rule.severidade)}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Destinos:</span>
                      <div className="destinos-badges">
                        {rule.destinos.map((destino, idx) => (
                          <span key={idx} className="destino-badge">
                            {destino === "email" && "📧"}
                            {destino === "sms" && "📱"}
                            {destino === "slack" && "💬"}
                            {destino === "webhook" && "🔗"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="alert-rule-stats">
                    <div className="stat-item-small">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10 5V10L13 13M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>{rule.ultimoDisparo}</span>
                    </div>
                    <div className="stat-item-small">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M12 22C10.9 22 10 21.1 10 20H14C14 21.1 13.1 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" stroke="#95a5a6" strokeWidth="1.5"/>
                      </svg>
                      <span>{rule.totalDisparos} disparos</span>
                    </div>
                  </div>

                  <div className="alert-rule-actions">
                    <button className="btn-edit-rule">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98919C15.2167 1.87085 15.5232 1.81006 15.8327 1.81006C16.1422 1.81006 16.4487 1.87085 16.7347 1.98919C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0101 3.26468C18.1285 3.55064 18.1893 3.85714 18.1893 4.16667C18.1893 4.47619 18.1285 4.78269 18.0101 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Editar
                    </button>
                    <button className="btn-history-rule">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39771 1.66667 1.66675 5.39763 1.66675 10C1.66675 14.6024 5.39771 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      Histórico
                    </button>
                    <button 
                      className="btn-delete-rule"
                      onClick={() => deleteAlertRule(rule.id)}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M2.5 5H4.16667H17.5M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5M6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Excluir
                    </button>
                  </div>

                  <div className="alert-rule-footer">
                    <span className="footer-info">Criado por {rule.criadoPor}</span>
                    <span className="footer-date">{rule.criadoEm}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredRules.length === 0 && (
              <div className="empty-state-alertas">
                <div className="empty-icon">🔍</div>
                <h3>Nenhuma regra encontrada</h3>
                <p>Tente ajustar os filtros ou criar uma nova regra de alerta</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "historico" && (
          <div className="historico-content">
            <div className="history-list">
              {alertHistory.map((alert) => (
                <div key={alert.id} className="history-card">
                  <div className="history-header">
                    <div className="history-title-section">
                      <h3>{alert.regra}</h3>
                      <span 
                        className="severity-badge-alertas"
                        style={{ 
                          background: `${getSeverityColor(alert.severidade)}15`,
                          color: getSeverityColor(alert.severidade)
                        }}
                      >
                        {getSeverityLabel(alert.severidade)}
                      </span>
                      <span 
                        className="status-badge-history"
                        style={{ 
                          background: `${getStatusColor(alert.status)}15`,
                          color: getStatusColor(alert.status)
                        }}
                      >
                        {getStatusLabel(alert.status)}
                      </span>
                    </div>
                    <span className="history-timestamp">{alert.timestamp}</span>
                  </div>

                  <p className="history-message">{alert.mensagem}</p>

                  {alert.acoes && alert.acoes.length > 0 && (
                    <div className="history-actions-taken">
                      <strong>Ações tomadas:</strong>
                      <ul>
                        {alert.acoes.map((acao, idx) => (
                          <li key={idx}>{acao}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {alert.status === "resolvido" && (
                    <div className="history-resolution">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="#00b894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Resolvido por {alert.resolvidoPor} em {alert.resolvidoEm}</span>
                    </div>
                  )}

                  {alert.status === "ativo" && (
                    <div className="history-active-actions">
                      <button className="btn-resolve-alert">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Marcar como Resolvido
                      </button>
                      <button className="btn-view-details">Ver Detalhes</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notificacoes" && (
          <div className="notificacoes-content">
            <div className="notification-channels">
              {/* Email Notification */}
              <div className="notification-channel-card">
                <div className="channel-header">
                  <div className="channel-title">
                    <span className="channel-icon">📧</span>
                    <div>
                      <h3>Email</h3>
                      <p>Envie alertas por email</p>
                    </div>
                  </div>
                  <label className="toggle-switch-alertas">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email.ativo}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        email: { ...notificationSettings.email, ativo: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider-alertas"></span>
                  </label>
                </div>

                {notificationSettings.email.ativo && (
                  <div className="channel-settings">
                    <div className="setting-group">
                      <label>Destinatários</label>
                      <div className="recipients-list">
                        {notificationSettings.email.destinatarios.map((email, idx) => (
                          <span key={idx} className="recipient-badge">
                            {email}
                            <button className="remove-recipient">×</button>
                          </span>
                        ))}
                      </div>
                      <button className="btn-add-recipient">+ Adicionar destinatário</button>
                    </div>

                    <div className="setting-group">
                      <label>Frequência de Envio</label>
                      <select className="channel-select">
                        <option value="imediato">Imediato</option>
                        <option value="agrupado">Agrupado (5 minutos)</option>
                        <option value="diario">Resumo Diário</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* SMS Notification */}
              <div className="notification-channel-card">
                <div className="channel-header">
                  <div className="channel-title">
                    <span className="channel-icon">📱</span>
                    <div>
                      <h3>SMS</h3>
                      <p>Notificações por mensagem de texto</p>
                    </div>
                  </div>
                  <label className="toggle-switch-alertas">
                    <input
                      type="checkbox"
                      checked={notificationSettings.sms.ativo}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        sms: { ...notificationSettings.sms, ativo: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider-alertas"></span>
                  </label>
                </div>

                {notificationSettings.sms.ativo && (
                  <div className="channel-settings">
                    <div className="setting-group">
                      <label>Números de Telefone</label>
                      <div className="recipients-list">
                        {notificationSettings.sms.numeros.map((numero, idx) => (
                          <span key={idx} className="recipient-badge">
                            {numero}
                            <button className="remove-recipient">×</button>
                          </span>
                        ))}
                      </div>
                      <button className="btn-add-recipient">+ Adicionar número</button>
                    </div>

                    <div className="setting-group">
                      <label>Enviar apenas para</label>
                      <select className="channel-select">
                        <option value="critico">Alertas Críticos</option>
                        <option value="alto">Alto e Crítico</option>
                        <option value="todos">Todos os alertas</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Slack Notification */}
              <div className="notification-channel-card">
                <div className="channel-header">
                  <div className="channel-title">
                    <span className="channel-icon">💬</span>
                    <div>
                      <h3>Slack</h3>
                      <p>Integração com Slack workspace</p>
                    </div>
                  </div>
                  <label className="toggle-switch-alertas">
                    <input
                      type="checkbox"
                      checked={notificationSettings.slack.ativo}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        slack: { ...notificationSettings.slack, ativo: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider-alertas"></span>
                  </label>
                </div>

                {notificationSettings.slack.ativo && (
                  <div className="channel-settings">
                    <div className="setting-group">
                      <label>Webhook URL</label>
                      <input
                        type="text"
                        className="channel-input"
                        value={notificationSettings.slack.webhook}
                        placeholder="https://hooks.slack.com/services/..."
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          slack: { ...notificationSettings.slack, webhook: e.target.value }
                        })}
                      />
                    </div>

                    <div className="setting-group">
                      <label>Canal</label>
                      <input
                        type="text"
                        className="channel-input"
                        value={notificationSettings.slack.canal}
                        placeholder="#alertas-sistema"
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          slack: { ...notificationSettings.slack, canal: e.target.value }
                        })}
                      />
                    </div>

                    <button className="btn-test-integration">Testar Integração</button>
                  </div>
                )}
              </div>

              {/* Webhook Notification */}
              <div className="notification-channel-card">
                <div className="channel-header">
                  <div className="channel-title">
                    <span className="channel-icon">🔗</span>
                    <div>
                      <h3>Webhook Personalizado</h3>
                      <p>Envie alertas para qualquer endpoint HTTP</p>
                    </div>
                  </div>
                  <label className="toggle-switch-alertas">
                    <input
                      type="checkbox"
                      checked={notificationSettings.webhook.ativo}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        webhook: { ...notificationSettings.webhook, ativo: e.target.checked }
                      })}
                    />
                    <span className="toggle-slider-alertas"></span>
                  </label>
                </div>

                {notificationSettings.webhook.ativo && (
                  <div className="channel-settings">
                    <div className="setting-group">
                      <label>URL do Webhook</label>
                      <input
                        type="text"
                        className="channel-input"
                        value={notificationSettings.webhook.url}
                        placeholder="https://api.exemplo.com/webhooks/alertas"
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          webhook: { ...notificationSettings.webhook, url: e.target.value }
                        })}
                      />
                    </div>

                    <div className="setting-group">
                      <label>Método HTTP</label>
                      <select className="channel-select">
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                      </select>
                    </div>

                    <button className="btn-test-integration">Testar Webhook</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for New Alert Rule */}
      {showModal && (
        <div className="modal-overlay-alertas" onClick={() => setShowModal(false)}>
          <div className="modal-content-alertas" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-alertas">
              <h2>Nova Regra de Alerta</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body-alertas">
              <div className="form-group-alertas">
                <label>Nome da Regra</label>
                <input type="text" placeholder="Ex: CPU Elevada" />
              </div>

              <div className="form-group-alertas">
                <label>Descrição</label>
                <textarea placeholder="Descreva o que esta regra monitora..." rows="3"></textarea>
              </div>

              <div className="form-row-alertas">
                <div className="form-group-alertas">
                  <label>Categoria</label>
                  <select>
                    <option value="performance">Performance</option>
                    <option value="recursos">Recursos</option>
                    <option value="seguranca">Segurança</option>
                    <option value="backup">Backup</option>
                    <option value="aplicacao">Aplicação</option>
                  </select>
                </div>

                <div className="form-group-alertas">
                  <label>Severidade</label>
                  <select>
                    <option value="critico">Crítico</option>
                    <option value="alto">Alto</option>
                    <option value="medio">Médio</option>
                    <option value="baixo">Baixo</option>
                  </select>
                </div>
              </div>

              <div className="form-group-alertas">
                <label>Condição</label>
                <div className="condition-builder">
                  <select className="condition-select">
                    <option value="cpu">CPU</option>
                    <option value="memoria">Memória</option>
                    <option value="disco">Disco</option>
                    <option value="response_time">Tempo de Resposta</option>
                    <option value="error_rate">Taxa de Erros</option>
                  </select>
                  <select className="operator-select">
                    <option value=">">maior que (&gt;)</option>
                    <option value="<">menor que (&lt;)</option>
                    <option value=">=">maior ou igual (&gt;=)</option>
                    <option value="<=">menor ou igual (&lt;=)</option>
                    <option value="==">igual (==)</option>
                  </select>
                  <input type="text" placeholder="Valor" className="value-input" />
                  <input type="text" placeholder="Unidade" className="unit-input" />
                </div>
              </div>

              <div className="form-group-alertas">
                <label>Destinos de Notificação</label>
                <div className="checkbox-group-modal">
                  <label className="checkbox-label-modal">
                    <input type="checkbox" defaultChecked />
                    <span>📧 Email</span>
                  </label>
                  <label className="checkbox-label-modal">
                    <input type="checkbox" />
                    <span>📱 SMS</span>
                  </label>
                  <label className="checkbox-label-modal">
                    <input type="checkbox" />
                    <span>💬 Slack</span>
                  </label>
                  <label className="checkbox-label-modal">
                    <input type="checkbox" />
                    <span>🔗 Webhook</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer-alertas">
              <button className="btn-cancel-modal" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-save-modal">Criar Regra</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
