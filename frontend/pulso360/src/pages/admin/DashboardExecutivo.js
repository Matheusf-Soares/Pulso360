import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardExecutivo() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  // eslint-disable-next-line no-unused-vars
  const [selectedDepartment, setSelectedDepartment] = useState("todos");

  // KPIs Principais
  const mainKpis = [
    { 
      label: "ROI do Sistema", 
      value: "342%", 
      previousValue: "289%",
      trend: "+18.3%", 
      trendType: "up",
      icon: "💰",
      color: "#00b894",
      description: "Retorno sobre Investimento"
    },
    { 
      label: "Taxa de Adoção", 
      value: "94%", 
      previousValue: "88%",
      trend: "+6.8%", 
      trendType: "up",
      icon: "📈",
      color: "#667eea",
      description: "Usuários ativos mensais"
    },
    { 
      label: "NPS Score", 
      value: "87", 
      previousValue: "78",
      trend: "+11.5%", 
      trendType: "up",
      icon: "⭐",
      color: "#fdcb6e",
      description: "Net Promoter Score"
    },
    { 
      label: "Produtividade", 
      value: "+23%", 
      previousValue: "+18%",
      trend: "+5.0%", 
      trendType: "up",
      icon: "🚀",
      color: "#6c5ce7",
      description: "Ganho em eficiência"
    },
  ];

  // Métricas Financeiras
  const financialMetrics = [
    { label: "Receita Recorrente (MRR)", value: "R$ 2.8M", trend: "+12%", icon: "💵", color: "#00b894" },
    { label: "Custo por Usuário", value: "R$ 42", trend: "-8%", icon: "💳", color: "#0984e3" },
    { label: "Lifetime Value (LTV)", value: "R$ 18.5K", trend: "+15%", icon: "💎", color: "#fdcb6e" },
    { label: "Churn Rate", value: "2.3%", trend: "-1.2%", icon: "📉", color: "#d63031" },
  ];

  // Performance por Departamento
  const departmentPerformance = [
    { 
      nome: "Recursos Humanos", 
      score: 92, 
      usuarios: 145, 
      engajamento: 89,
      crescimento: "+12%",
      color: "#667eea",
      icon: "👥"
    },
    { 
      nome: "Tecnologia da Informação", 
      score: 96, 
      usuarios: 87, 
      engajamento: 95,
      crescimento: "+8%",
      color: "#00b894",
      icon: "💻"
    },
    { 
      nome: "Comercial", 
      score: 88, 
      usuarios: 203, 
      engajamento: 82,
      crescimento: "+18%",
      color: "#fdcb6e",
      icon: "📊"
    },
    { 
      nome: "Financeiro", 
      score: 91, 
      usuarios: 76, 
      engajamento: 87,
      crescimento: "+6%",
      color: "#0984e3",
      icon: "💰"
    },
    { 
      nome: "Operações", 
      score: 85, 
      usuarios: 198, 
      engajamento: 78,
      crescimento: "+15%",
      color: "#6c5ce7",
      icon: "⚙️"
    },
    { 
      nome: "Marketing", 
      score: 89, 
      usuarios: 112, 
      engajamento: 84,
      crescimento: "+10%",
      color: "#e17055",
      icon: "📢"
    },
  ];

  // Dados de evolução mensal (últimos 6 meses)
  const monthlyEvolution = [
    { month: "Set", roi: 285, adoption: 82, nps: 74, productivity: 15 },
    { month: "Out", roi: 298, adoption: 85, nps: 76, productivity: 17 },
    { month: "Nov", roi: 312, adoption: 88, nps: 78, productivity: 18 },
    { month: "Dez", roi: 325, adoption: 90, nps: 82, productivity: 20 },
    { month: "Jan", roi: 335, adoption: 92, nps: 85, productivity: 21 },
    { month: "Fev", roi: 342, adoption: 94, nps: 87, productivity: 23 },
  ];

  // Objetivos Estratégicos
  const strategicGoals = [
    {
      objetivo: "Aumentar ROI para 400%",
      progresso: 85,
      atual: "342%",
      meta: "400%",
      prazo: "Q2 2025",
      status: "on-track",
      responsavel: "CFO"
    },
    {
      objetivo: "Alcançar 98% de Adoção",
      progresso: 96,
      atual: "94%",
      meta: "98%",
      prazo: "Q1 2025",
      status: "on-track",
      responsavel: "CTO"
    },
    {
      objetivo: "NPS acima de 90",
      progresso: 97,
      atual: "87",
      meta: "90",
      prazo: "Q2 2025",
      status: "on-track",
      responsavel: "COO"
    },
    {
      objetivo: "Reduzir Churn para 1.5%",
      progresso: 65,
      atual: "2.3%",
      meta: "1.5%",
      prazo: "Q3 2025",
      status: "at-risk",
      responsavel: "Head CS"
    },
  ];

  // Insights e Recomendações
  const insights = [
    {
      tipo: "sucesso",
      titulo: "ROI Excepcional",
      descricao: "O ROI de 342% está 18% acima do período anterior, superando expectativas.",
      acao: "Documentar e compartilhar melhores práticas com outras unidades",
      prioridade: "alta"
    },
    {
      tipo: "atencao",
      titulo: "Churn em Alta",
      descricao: "Taxa de churn em 2.3% requer atenção para atingir meta de 1.5%.",
      acao: "Implementar programa de retenção e melhorar onboarding",
      prioridade: "critica"
    },
    {
      tipo: "oportunidade",
      titulo: "Expansão Comercial",
      descricao: "Departamento comercial mostra crescimento de 18% - oportunidade de expansão.",
      acao: "Avaliar investimento em novos recursos para vendas",
      prioridade: "media"
    },
  ];

  // Top Usuários
  const topUsers = [
    { nome: "Ana Silva", departamento: "RH", acessos: 342, score: 98, avatar: "👩" },
    { nome: "Carlos Santos", departamento: "TI", acessos: 318, score: 96, avatar: "👨" },
    { nome: "Mariana Costa", departamento: "Comercial", acessos: 289, score: 94, avatar: "👩" },
    { nome: "Pedro Oliveira", departamento: "Financeiro", acessos: 267, score: 92, avatar: "👨" },
    { nome: "Julia Ferreira", departamento: "Marketing", acessos: 245, score: 90, avatar: "👩" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "on-track": return "#00b894";
      case "at-risk": return "#fdcb6e";
      case "delayed": return "#d63031";
      default: return "#95a5a6";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "on-track": return "No Prazo";
      case "at-risk": return "Em Risco";
      case "delayed": return "Atrasado";
      default: return status;
    }
  };

  const getInsightIcon = (tipo) => {
    switch (tipo) {
      case "sucesso": return "✅";
      case "atencao": return "⚠️";
      case "oportunidade": return "💡";
      default: return "ℹ️";
    }
  };

  const getInsightColor = (tipo) => {
    switch (tipo) {
      case "sucesso": return "#00b894";
      case "atencao": return "#fdcb6e";
      case "oportunidade": return "#667eea";
      default: return "#95a5a6";
    }
  };

  const getPriorityBadge = (prioridade) => {
    const configs = {
      critica: { label: "Crítica", color: "#d63031" },
      alta: { label: "Alta", color: "#fdcb6e" },
      media: { label: "Média", color: "#0984e3" },
      baixa: { label: "Baixa", color: "#95a5a6" }
    };
    return configs[prioridade] || configs.media;
  };

  return (
    <div className="admin-page-dashboard-exec">
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
              <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Dashboard Executivo</h1>
            <p>Indicadores estratégicos e visão de alto nível</p>
          </div>
        </div>

        <div className="header-filters-exec">
          <select 
            className="filter-select-exec"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Este ano</option>
          </select>

          <button className="btn-export-exec">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Exportar
          </button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="main-kpis-grid">
        {mainKpis.map((kpi, index) => (
          <div key={index} className="main-kpi-card">
            <div className="kpi-card-header">
              <div className="kpi-icon" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                <span>{kpi.icon}</span>
              </div>
              <div className={`kpi-trend-badge ${kpi.trendType}`}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4L10 16M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {kpi.trend}
              </div>
            </div>
            <div className="kpi-main-value" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="kpi-label-exec">{kpi.label}</div>
            <div className="kpi-description">{kpi.description}</div>
            <div className="kpi-comparison">
              Período anterior: <strong>{kpi.previousValue}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Métricas Financeiras */}
      <div className="section-title-exec">
        <h2>💰 Métricas Financeiras</h2>
        <p>Indicadores econômicos e de sustentabilidade</p>
      </div>

      <div className="financial-metrics-grid">
        {financialMetrics.map((metric, index) => (
          <div key={index} className="financial-metric-card">
            <div className="metric-icon-circle" style={{ background: `${metric.color}15`, color: metric.color }}>
              {metric.icon}
            </div>
            <div className="metric-content">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value" style={{ color: metric.color }}>{metric.value}</div>
              <div className={`metric-trend ${metric.trend.startsWith('+') || (metric.trend.startsWith('-') && !metric.trend.includes('-')) ? 'positive' : 'negative'}`}>
                {metric.trend} vs período anterior
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-row-exec">
        {/* Evolução Temporal */}
        <div className="chart-card-exec large">
          <div className="chart-header-exec">
            <div>
              <h3>📊 Evolução de KPIs</h3>
              <p>Tendência dos principais indicadores</p>
            </div>
            <div className="chart-legend-exec">
              <span className="legend-item" style={{ color: "#00b894" }}>● ROI</span>
              <span className="legend-item" style={{ color: "#667eea" }}>● Adoção</span>
              <span className="legend-item" style={{ color: "#fdcb6e" }}>● NPS</span>
              <span className="legend-item" style={{ color: "#6c5ce7" }}>● Produtividade</span>
            </div>
          </div>
          <div className="evolution-chart">
            {monthlyEvolution.map((data, index) => (
              <div key={index} className="month-column">
                <div className="bars-stack">
                  <div 
                    className="evolution-bar roi" 
                    style={{ height: `${(data.roi / 400) * 100}%`, background: "#00b894" }}
                    title={`ROI: ${data.roi}%`}
                  ></div>
                  <div 
                    className="evolution-bar adoption" 
                    style={{ height: `${data.adoption}%`, background: "#667eea" }}
                    title={`Adoção: ${data.adoption}%`}
                  ></div>
                  <div 
                    className="evolution-bar nps" 
                    style={{ height: `${data.nps}%`, background: "#fdcb6e" }}
                    title={`NPS: ${data.nps}`}
                  ></div>
                  <div 
                    className="evolution-bar productivity" 
                    style={{ height: `${data.productivity * 4}%`, background: "#6c5ce7" }}
                    title={`Produtividade: +${data.productivity}%`}
                  ></div>
                </div>
                <div className="month-label">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance por Departamento */}
        <div className="chart-card-exec medium">
          <div className="chart-header-exec">
            <div>
              <h3>🏢 Performance por Departamento</h3>
              <p>Score de engajamento e uso</p>
            </div>
          </div>
          <div className="department-list-exec">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="department-item-exec">
                <div className="dept-info">
                  <span className="dept-icon">{dept.icon}</span>
                  <div className="dept-details">
                    <div className="dept-name">{dept.nome}</div>
                    <div className="dept-users">{dept.usuarios} usuários</div>
                  </div>
                </div>
                <div className="dept-metrics">
                  <div className="dept-score" style={{ color: dept.color }}>
                    {dept.score}
                    <span className="score-label">/100</span>
                  </div>
                  <div className="dept-growth" style={{ color: "#00b894" }}>
                    {dept.crescimento}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Objetivos Estratégicos */}
      <div className="section-title-exec">
        <h2>🎯 Objetivos Estratégicos</h2>
        <p>Acompanhamento de metas e prazos</p>
      </div>

      <div className="strategic-goals-grid">
        {strategicGoals.map((goal, index) => (
          <div key={index} className="goal-card-exec">
            <div className="goal-header-exec">
              <h4>{goal.objetivo}</h4>
              <span 
                className="status-badge-exec"
                style={{ 
                  background: `${getStatusColor(goal.status)}15`,
                  color: getStatusColor(goal.status)
                }}
              >
                {getStatusLabel(goal.status)}
              </span>
            </div>
            
            <div className="goal-progress-section">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill"
                  style={{ 
                    width: `${goal.progresso}%`,
                    background: getStatusColor(goal.status)
                  }}
                ></div>
              </div>
              <span className="progress-percentage">{goal.progresso}%</span>
            </div>

            <div className="goal-metrics-row">
              <div className="goal-metric">
                <span className="metric-label-small">Atual</span>
                <span className="metric-value-small">{goal.atual}</span>
              </div>
              <div className="goal-metric">
                <span className="metric-label-small">Meta</span>
                <span className="metric-value-small">{goal.meta}</span>
              </div>
              <div className="goal-metric">
                <span className="metric-label-small">Prazo</span>
                <span className="metric-value-small">{goal.prazo}</span>
              </div>
            </div>

            <div className="goal-footer">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11Z" stroke="#95a5a6" strokeWidth="1.5"/>
                <path d="M3 18C3 15.8783 3.84285 13.8434 5.34315 12.3431C6.84344 10.8429 8.87827 10 11 10C13.1217 10 15.1566 10.8429 16.6569 12.3431C18.1571 13.8434 19 15.8783 19 18" stroke="#95a5a6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>Responsável: {goal.responsavel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Insights e Top Users Row */}
      <div className="bottom-row-exec">
        {/* Insights */}
        <div className="insights-section-exec">
          <div className="section-header-small">
            <h3>💡 Insights e Recomendações</h3>
            <p>Análises automatizadas do sistema</p>
          </div>

          <div className="insights-list">
            {insights.map((insight, index) => (
              <div key={index} className="insight-card">
                <div className="insight-header">
                  <span 
                    className="insight-icon"
                    style={{ color: getInsightColor(insight.tipo) }}
                  >
                    {getInsightIcon(insight.tipo)}
                  </span>
                  <div className="insight-title-section">
                    <h4>{insight.titulo}</h4>
                    <span 
                      className="priority-badge"
                      style={{ 
                        background: `${getPriorityBadge(insight.prioridade).color}15`,
                        color: getPriorityBadge(insight.prioridade).color
                      }}
                    >
                      {getPriorityBadge(insight.prioridade).label}
                    </span>
                  </div>
                </div>
                <p className="insight-description">{insight.descricao}</p>
                <div className="insight-action">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 10H12.5M10 7.5V12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#667eea" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <strong>Ação recomendada:</strong> {insight.acao}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Usuários */}
        <div className="top-users-section-exec">
          <div className="section-header-small">
            <h3>🏆 Top Usuários</h3>
            <p>Maiores engajamentos do período</p>
          </div>

          <div className="top-users-list">
            {topUsers.map((user, index) => (
              <div key={index} className="top-user-card">
                <div className="user-rank" style={{ 
                  background: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "#e9ecef",
                  color: index < 3 ? "white" : "#636e72"
                }}>
                  {index + 1}
                </div>
                <div className="user-avatar">{user.avatar}</div>
                <div className="user-info-exec">
                  <div className="user-name-exec">{user.nome}</div>
                  <div className="user-dept-exec">{user.departamento}</div>
                </div>
                <div className="user-stats-exec">
                  <div className="user-stat">
                    <span className="stat-value-user">{user.acessos}</span>
                    <span className="stat-label-user">acessos</span>
                  </div>
                  <div className="user-score-badge" style={{ 
                    background: user.score >= 95 ? "#00b89415" : "#667eea15",
                    color: user.score >= 95 ? "#00b894" : "#667eea"
                  }}>
                    {user.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
