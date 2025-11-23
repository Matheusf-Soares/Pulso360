import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Performance() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Estatísticas principais
  const mainStats = [
    { 
      label: "Uso de CPU", 
      value: "45%", 
      change: "+5%",
      trend: "up",
      status: "normal",
      icon: "⚡",
      color: "#667eea",
      max: 100
    },
    { 
      label: "Memória RAM", 
      value: "62%", 
      change: "+2%",
      trend: "up",
      status: "normal",
      icon: "💾",
      color: "#00b894",
      max: 100
    },
    { 
      label: "Disco", 
      value: "78%", 
      change: "+1%",
      trend: "up",
      status: "warning",
      icon: "💿",
      color: "#fdcb6e",
      max: 100
    },
    { 
      label: "Tráfego de Rede", 
      value: "23 MB/s", 
      change: "-8%",
      trend: "down",
      status: "normal",
      icon: "🌐",
      color: "#0984e3",
      max: 100
    },
  ];

  // Dados de performance do servidor
  const serverMetrics = [
    { 
      name: "Servidor Principal", 
      cpu: 45, 
      memory: 62, 
      disk: 78, 
      status: "online",
      uptime: "15d 7h",
      requests: "1.2k/min"
    },
    { 
      name: "Servidor Backup", 
      cpu: 28, 
      memory: 41, 
      disk: 65, 
      status: "online",
      uptime: "15d 7h",
      requests: "340/min"
    },
    { 
      name: "Servidor BD", 
      cpu: 72, 
      memory: 85, 
      disk: 58, 
      status: "warning",
      uptime: "15d 7h",
      requests: "5.3k/min"
    },
  ];

  // Processos ativos
  const activeProcesses = [
    { id: 1, name: "Node.js API Server", cpu: 18.5, memory: 24.3, pid: 12456, status: "running" },
    { id: 2, name: "PostgreSQL Database", cpu: 42.1, memory: 38.7, pid: 8923, status: "running" },
    { id: 3, name: "Redis Cache", cpu: 5.2, memory: 8.4, pid: 15234, status: "running" },
    { id: 4, name: "Nginx Web Server", cpu: 8.7, memory: 4.2, pid: 3456, status: "running" },
    { id: 5, name: "PM2 Process Manager", cpu: 2.1, memory: 3.8, pid: 7891, status: "running" },
  ];

  // Alertas de sistema
  const systemAlerts = [
    { 
      id: 1, 
      type: "warning", 
      message: "Uso de disco acima de 75% no Servidor Principal",
      timestamp: "Há 15 minutos",
      severity: "medium"
    },
    { 
      id: 2, 
      type: "warning", 
      message: "Uso de memória elevado no Servidor BD (85%)",
      timestamp: "Há 32 minutos",
      severity: "medium"
    },
    { 
      id: 3, 
      type: "info", 
      message: "Backup automático concluído com sucesso",
      timestamp: "Há 2 horas",
      severity: "low"
    },
  ];

  // Dados para gráfico de CPU (simulado)
  const cpuData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.floor(Math.random() * 40) + 30
  }));

  // Dados para gráfico de requisições (simulado)
  const requestsData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.floor(Math.random() * 3000) + 500
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "#00b894";
      case "warning": return "#fdcb6e";
      case "error": return "#d63031";
      case "offline": return "#636e72";
      default: return "#95a5a6";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "warning": return "⚠️";
      case "error": return "🚨";
      case "info": return "ℹ️";
      default: return "📋";
    }
  };

  const handleRefresh = () => {
    console.log("Atualizando métricas...");
  };

  return (
    <div className="admin-page-performance">
      {/* Header */}
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
              <path d="M23 8C23 9.1 22.1 10 21 10C20.82 10 20.65 9.98 20.49 9.93L16.93 13.48C16.98 13.64 17 13.82 17 14C17 15.1 16.1 16 15 16C13.9 16 13 15.1 13 14C13 13.82 13.02 13.65 13.07 13.52L10.52 10.93C10.36 10.98 10.18 11 10 11C9.82 11 9.64 10.98 9.48 10.93L4.93 15.49C4.98 15.65 5 15.82 5 16C5 17.1 4.1 18 3 18C1.9 18 1 17.1 1 16C1 14.9 1.9 14 3 14C3.18 14 3.35 14.02 3.51 14.07L8.07 9.52C8.02 9.36 8 9.18 8 9C8 7.9 8.9 7 10 7C11.1 7 12 7.9 12 9C12 9.18 11.98 9.36 11.93 9.48L14.48 12.07C14.64 12.02 14.82 12 15 12C15.18 12 15.36 12.02 15.52 12.07L19.07 8.49C19.02 8.35 19 8.18 19 8C19 6.9 19.9 6 21 6C22.1 6 23 6.9 23 8Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Monitoramento de Performance</h1>
            <p>Monitoramento em tempo real dos recursos do sistema</p>
          </div>
        </div>

        <div className="header-actions-performance">
          <label className="auto-refresh-toggle">
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <span>Atualização automática</span>
          </label>
          <button className="btn-primary-admin" onClick={handleRefresh}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0.01 3.58 0.01 8C0.01 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z" fill="currentColor"/>
            </svg>
            Atualizar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-professional">
        {mainStats.map((stat, index) => (
          <div key={index} className="stat-card-professional">
            <div className="stat-icon" style={{ background: stat.color }}>
              <span>{stat.icon}</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.trend}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  {stat.trend === "up" ? (
                    <path d="M6 2L10 6L8.5 6L8.5 10L3.5 10L3.5 6L2 6L6 2Z" fill="currentColor"/>
                  ) : (
                    <path d="M6 10L2 6L3.5 6L3.5 2L8.5 2L8.5 6L10 6L6 10Z" fill="currentColor"/>
                  )}
                </svg>
                {stat.change} nas últimas 24h
              </div>
            </div>
            <div className="stat-progress-bar">
              <div 
                className={`stat-progress-fill ${stat.status}`}
                style={{ width: stat.value }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Range Selector */}
      <div className="time-range-selector">
        <button 
          className={timeRange === "1h" ? "active" : ""} 
          onClick={() => setTimeRange("1h")}
        >
          1 Hora
        </button>
        <button 
          className={timeRange === "6h" ? "active" : ""} 
          onClick={() => setTimeRange("6h")}
        >
          6 Horas
        </button>
        <button 
          className={timeRange === "24h" ? "active" : ""} 
          onClick={() => setTimeRange("24h")}
        >
          24 Horas
        </button>
        <button 
          className={timeRange === "7d" ? "active" : ""} 
          onClick={() => setTimeRange("7d")}
        >
          7 Dias
        </button>
      </div>

      {/* Charts */}
      <div className="performance-charts-grid">
        <div className="chart-card-professional">
          <div className="chart-header">
            <h3>Uso de CPU</h3>
            <span className="chart-subtitle">Últimas {timeRange === "24h" ? "24 horas" : timeRange}</span>
          </div>
          <div className="chart-container">
            <div className="line-chart-professional">
              {cpuData.map((point, i) => (
                <div 
                  key={i} 
                  className="line-bar"
                  style={{ height: `${point.value}%` }}
                  title={`${point.hour}:00 - ${point.value}%`}
                ></div>
              ))}
            </div>
            <div className="chart-labels">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h</span>
            </div>
          </div>
        </div>

        <div className="chart-card-professional">
          <div className="chart-header">
            <h3>Requisições por Minuto</h3>
            <span className="chart-subtitle">Últimas {timeRange === "24h" ? "24 horas" : timeRange}</span>
          </div>
          <div className="chart-container">
            <div className="line-chart-professional requests">
              {requestsData.map((point, i) => (
                <div 
                  key={i} 
                  className="line-bar"
                  style={{ height: `${(point.value / 3500) * 100}%` }}
                  title={`${point.hour}:00 - ${point.value} req/min`}
                ></div>
              ))}
            </div>
            <div className="chart-labels">
              <span>0h</span>
              <span>6h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Server Metrics */}
      <div className="servers-section">
        <h3 className="section-title">Servidores</h3>
        <div className="servers-grid">
          {serverMetrics.map((server, index) => (
            <div key={index} className="server-card">
              <div className="server-header">
                <div className="server-info">
                  <h4>{server.name}</h4>
                  <span 
                    className="server-status-badge"
                    style={{ background: getStatusColor(server.status) }}
                  >
                    {server.status === "online" ? "Online" : server.status === "warning" ? "Atenção" : "Offline"}
                  </span>
                </div>
                <div className="server-meta">
                  <span>Uptime: {server.uptime}</span>
                  <span>{server.requests}</span>
                </div>
              </div>
              
              <div className="server-metrics">
                <div className="metric-item">
                  <div className="metric-label">
                    <span>CPU</span>
                    <span className="metric-value">{server.cpu}%</span>
                  </div>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill"
                      style={{ 
                        width: `${server.cpu}%`,
                        background: server.cpu > 70 ? "#d63031" : server.cpu > 50 ? "#fdcb6e" : "#00b894"
                      }}
                    ></div>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">
                    <span>Memória</span>
                    <span className="metric-value">{server.memory}%</span>
                  </div>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill"
                      style={{ 
                        width: `${server.memory}%`,
                        background: server.memory > 80 ? "#d63031" : server.memory > 60 ? "#fdcb6e" : "#00b894"
                      }}
                    ></div>
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">
                    <span>Disco</span>
                    <span className="metric-value">{server.disk}%</span>
                  </div>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill"
                      style={{ 
                        width: `${server.disk}%`,
                        background: server.disk > 75 ? "#d63031" : server.disk > 60 ? "#fdcb6e" : "#00b894"
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="performance-two-column">
        {/* Active Processes */}
        <div className="processes-section">
          <h3 className="section-title">Processos Ativos</h3>
          <div className="processes-table-container">
            <table className="processes-table">
              <thead>
                <tr>
                  <th>Processo</th>
                  <th>PID</th>
                  <th>CPU</th>
                  <th>Memória</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeProcesses.map((process) => (
                  <tr key={process.id}>
                    <td className="process-name">{process.name}</td>
                    <td className="process-pid">{process.pid}</td>
                    <td className="process-cpu">
                      <div className="inline-metric">
                        <span>{process.cpu}%</span>
                        <div className="mini-bar">
                          <div 
                            className="mini-fill"
                            style={{ 
                              width: `${process.cpu}%`,
                              background: process.cpu > 40 ? "#d63031" : "#667eea"
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="process-memory">
                      <div className="inline-metric">
                        <span>{process.memory}%</span>
                        <div className="mini-bar">
                          <div 
                            className="mini-fill"
                            style={{ 
                              width: `${process.memory}%`,
                              background: process.memory > 40 ? "#d63031" : "#00b894"
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge running">Rodando</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="alerts-section">
          <h3 className="section-title">Alertas do Sistema</h3>
          <div className="alerts-list">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                <div className="alert-icon">{getAlertIcon(alert.type)}</div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <span className="alert-timestamp">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Details */}
      <div className="system-details-professional">
        <h3 className="section-title">Informações do Sistema</h3>
        <div className="details-grid-professional">
          <div className="detail-card">
            <div className="detail-icon">🖥️</div>
            <div className="detail-content">
              <span className="detail-label">Servidor</span>
              <span className="detail-value">AWS EC2 - t3.large</span>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-icon">⏱️</div>
            <div className="detail-content">
              <span className="detail-label">Uptime</span>
              <span className="detail-value">15 dias, 7 horas</span>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-icon">🔄</div>
            <div className="detail-content">
              <span className="detail-label">Última Reinicialização</span>
              <span className="detail-value">07/11/2025 às 03:00</span>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-icon">📦</div>
            <div className="detail-content">
              <span className="detail-label">Versão do Sistema</span>
              <span className="detail-value">v2.1.4</span>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-icon">🌍</div>
            <div className="detail-content">
              <span className="detail-label">Região</span>
              <span className="detail-value">us-east-1 (N. Virginia)</span>
            </div>
          </div>
          <div className="detail-card">
            <div className="detail-icon">🔐</div>
            <div className="detail-content">
              <span className="detail-label">SSL/TLS</span>
              <span className="detail-value">Ativo - Let's Encrypt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
