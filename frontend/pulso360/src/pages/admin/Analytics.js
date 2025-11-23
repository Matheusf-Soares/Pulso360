import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("7");

  const metricas = [
    { 
      id: "usuarios-ativos",
      label: "Usuários Ativos", 
      value: "189", 
      change: "+12%", 
      trend: "up",
      icon: "👥",
      color: "#667eea",
      description: "Ativos hoje"
    },
    { 
      id: "engajamento",
      label: "Taxa de Engajamento", 
      value: "78%", 
      change: "+5%", 
      trend: "up",
      icon: "📊",
      color: "#00b894",
      description: "Interações médias"
    },
    { 
      id: "sessao",
      label: "Tempo Médio de Sessão", 
      value: "24min", 
      change: "-3%", 
      trend: "down",
      icon: "⏱️",
      color: "#fdcb6e",
      description: "Por usuário"
    },
    { 
      id: "paginas",
      label: "Páginas por Sessão", 
      value: "8.3", 
      change: "+15%", 
      trend: "up",
      icon: "📄",
      color: "#74b9ff",
      description: "Visualizações médias"
    },
  ];

  const acessosPorDia = [
    { dia: 'Seg', acessos: 145, percent: 72 },
    { dia: 'Ter', acessos: 189, percent: 94 },
    { dia: 'Qua', acessos: 167, percent: 83 },
    { dia: 'Qui', acessos: 201, percent: 100 },
    { dia: 'Sex', acessos: 178, percent: 89 },
    { dia: 'Sáb', acessos: 89, percent: 44 },
    { dia: 'Dom', acessos: 56, percent: 28 },
  ];

  const modulosMaisAcessados = [
    { nome: "PDI", acessos: 1234, percent: 85, icon: "🎯", color: "#667eea" },
    { nome: "Avaliações", acessos: 987, percent: 70, icon: "⭐", color: "#00b894" },
    { nome: "Equipe", acessos: 654, percent: 55, icon: "👨‍👩‍👧‍👦", color: "#fdcb6e" },
    { nome: "Relatórios", acessos: 432, percent: 40, icon: "📈", color: "#e17055" },
    { nome: "Feedbacks", acessos: 321, percent: 28, icon: "💬", color: "#74b9ff" },
  ];

  const horariosPico = [
    { horario: "08:00 - 10:00", usuarios: 87, percent: 65 },
    { horario: "10:00 - 12:00", usuarios: 134, percent: 100 },
    { horario: "12:00 - 14:00", usuarios: 98, percent: 73 },
    { horario: "14:00 - 16:00", usuarios: 112, percent: 84 },
    { horario: "16:00 - 18:00", usuarios: 89, percent: 66 },
  ];

  const dispositivosAcesso = [
    { tipo: "Desktop", porcentagem: 62, usuarios: 153, icon: "💻", color: "#667eea" },
    { tipo: "Mobile", porcentagem: 28, usuarios: 69, icon: "📱", color: "#00b894" },
    { tipo: "Tablet", porcentagem: 10, usuarios: 25, icon: "📱", color: "#fdcb6e" },
  ];

  const taxasConversao = [
    { acao: "PDI Criados", total: 234, concluidos: 187, taxa: 80 },
    { acao: "Avaliações Completadas", total: 156, concluidos: 142, taxa: 91 },
    { acao: "Feedbacks Enviados", total: 98, concluidos: 89, taxa: 91 },
    { acao: "Metas Definidas", total: 176, concluidos: 134, taxa: 76 },
  ];

  const navegadoresMaisUsados = [
    { nome: "Chrome", percent: 68, icon: "🌐" },
    { nome: "Safari", percent: 18, icon: "🧭" },
    { nome: "Firefox", percent: 9, icon: "🦊" },
    { nome: "Edge", percent: 5, icon: "🔷" },
  ];

  const crescimentoMensal = [
    { mes: "Jan", usuarios: 167 },
    { mes: "Fev", usuarios: 189 },
    { mes: "Mar", usuarios: 201 },
    { mes: "Abr", usuarios: 234 },
    { mes: "Mai", usuarios: 247 },
  ];

  const maxCrescimento = Math.max(...crescimentoMensal.map(m => m.usuarios));

  return (
    <div className="admin-page-analytics">
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
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="page-title">Analytics de Usuários</h1>
              <p className="page-subtitle">Métricas de uso, atividade e engajamento do sistema</p>
            </div>
          </div>
        </div>
        <div className="header-actions-professional">
          <select 
            className="filter-select-professional" 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Este ano</option>
          </select>
          <button className="btn-export-professional">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 14V16H16V14H4ZM16 6L14.59 7.41L11 3.83V14H9V3.83L5.41 7.41L4 6L10 0L16 6Z" fill="currentColor"/>
            </svg>
            Exportar Dados
          </button>
        </div>
      </header>

      {/* Cards de Métricas Principais */}
      <div className="analytics-metrics-grid">
        {metricas.map((metrica, index) => (
          <div key={index} className="analytics-metric-card">
            <div className="metric-icon-analytics" style={{ background: `${metrica.color}20`, color: metrica.color }}>
              <span style={{ fontSize: "28px" }}>{metrica.icon}</span>
            </div>
            <div className="metric-content-analytics">
              <p className="metric-label-analytics">{metrica.label}</p>
              <h3 className="metric-value-analytics">{metrica.value}</h3>
              <div className="metric-footer-analytics">
                <span className="metric-description">{metrica.description}</span>
                <div className={`metric-change ${metrica.trend}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    {metrica.trend === 'up' ? (
                      <path d="M7 11V3M3 7L7 3L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    ) : (
                      <path d="M7 3V11M3 7L7 11L11 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    )}
                  </svg>
                  {metrica.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Principal de Analytics */}
      <div className="analytics-grid-professional">
        {/* Acessos por Dia da Semana */}
        <div className="analytics-card-professional large">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Acessos por Dia da Semana</h3>
              <p className="card-subtitle-analytics">Distribuição de acessos nos últimos 7 dias</p>
            </div>
            <button className="btn-card-action">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z" fill="currentColor"/>
                <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"/>
                <path d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="bar-chart-container">
            {acessosPorDia.map((dia, i) => (
              <div key={i} className="bar-item-analytics">
                <div className="bar-value">{dia.acessos}</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${dia.percent}%` }}
                  ></div>
                </div>
                <span className="bar-label">{dia.dia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Módulos Mais Acessados */}
        <div className="analytics-card-professional">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Módulos Mais Acessados</h3>
              <p className="card-subtitle-analytics">Top 5 funcionalidades</p>
            </div>
          </div>
          <div className="modules-list-analytics">
            {modulosMaisAcessados.map((mod, i) => (
              <div key={i} className="module-item-analytics">
                <div className="module-header-analytics">
                  <div className="module-icon-analytics" style={{ background: `${mod.color}20`, color: mod.color }}>
                    <span style={{ fontSize: "20px" }}>{mod.icon}</span>
                  </div>
                  <div className="module-info-analytics">
                    <span className="module-name-analytics">{mod.nome}</span>
                    <span className="module-count-analytics">{mod.acessos.toLocaleString()} acessos</span>
                  </div>
                  <span className="module-percent">{mod.percent}%</span>
                </div>
                <div className="progress-bar-analytics">
                  <div 
                    className="progress-fill-analytics" 
                    style={{ width: `${mod.percent}%`, background: mod.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Horários de Pico */}
        <div className="analytics-card-professional">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Horários de Pico</h3>
              <p className="card-subtitle-analytics">Usuários simultâneos</p>
            </div>
          </div>
          <div className="time-slots-list">
            {horariosPico.map((slot, i) => (
              <div key={i} className="time-slot-item">
                <div className="time-slot-header">
                  <span className="time-label">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#667eea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 4V8L10.5 10.5" stroke="#667eea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {slot.horario}
                  </span>
                  <span className="time-users">{slot.usuarios} usuários</span>
                </div>
                <div className="progress-bar-analytics thin">
                  <div 
                    className="progress-fill-analytics" 
                    style={{ width: `${slot.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispositivos de Acesso */}
        <div className="analytics-card-professional">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Dispositivos de Acesso</h3>
              <p className="card-subtitle-analytics">Distribuição por tipo</p>
            </div>
          </div>
          <div className="devices-grid">
            {dispositivosAcesso.map((device, i) => (
              <div key={i} className="device-card">
                <div className="device-icon-large" style={{ background: `${device.color}20`, color: device.color }}>
                  <span style={{ fontSize: "32px" }}>{device.icon}</span>
                </div>
                <h4 className="device-type">{device.tipo}</h4>
                <div className="device-percent-large">{device.porcentagem}%</div>
                <p className="device-users">{device.usuarios} usuários</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crescimento Mensal */}
        <div className="analytics-card-professional large">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Crescimento de Usuários</h3>
              <p className="card-subtitle-analytics">Últimos 5 meses</p>
            </div>
          </div>
          <div className="line-chart-container">
            <div className="line-chart-grid">
              {crescimentoMensal.map((item, i) => (
                <div key={i} className="line-point">
                  <div 
                    className="point-line" 
                    style={{ height: `${(item.usuarios / maxCrescimento) * 100}%` }}
                  >
                    <div className="point-circle"></div>
                    <span className="point-value">{item.usuarios}</span>
                  </div>
                  <span className="point-label">{item.mes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Taxas de Conversão */}
        <div className="analytics-card-professional">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Taxas de Conversão</h3>
              <p className="card-subtitle-analytics">Ações completadas</p>
            </div>
          </div>
          <div className="conversion-list">
            {taxasConversao.map((item, i) => (
              <div key={i} className="conversion-item">
                <div className="conversion-header">
                  <span className="conversion-label">{item.acao}</span>
                  <span className="conversion-stats">
                    {item.concluidos}/{item.total}
                  </span>
                </div>
                <div className="conversion-bar-wrapper">
                  <div className="progress-bar-analytics">
                    <div 
                      className="progress-fill-analytics success" 
                      style={{ width: `${item.taxa}%` }}
                    ></div>
                  </div>
                  <span className="conversion-percent">{item.taxa}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navegadores Mais Usados */}
        <div className="analytics-card-professional">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title-analytics">Navegadores</h3>
              <p className="card-subtitle-analytics">Distribuição de uso</p>
            </div>
          </div>
          <div className="browsers-list">
            {navegadoresMaisUsados.map((browser, i) => (
              <div key={i} className="browser-item">
                <span className="browser-icon">{browser.icon}</span>
                <span className="browser-name">{browser.nome}</span>
                <div className="browser-bar">
                  <div 
                    className="browser-fill" 
                    style={{ width: `${browser.percent}%` }}
                  ></div>
                </div>
                <span className="browser-percent">{browser.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
