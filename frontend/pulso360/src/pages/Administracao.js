import React, { useState } from "react";

export default function Administracao() {
  const [activeSection, setActiveSection] = useState("usuarios");
  
  const stats = [
    { label: "Usuários Ativos", value: "247", icon: "👥", trend: "+12%", color: "success" },
    { label: "Avaliações Pendentes", value: "34", icon: "📋", trend: "-8%", color: "warning" },
    { label: "Relatórios Gerados", value: "89", icon: "📊", trend: "+23%", color: "info" },
    { label: "Storage Usado", value: "67%", icon: "💾", trend: "+5%", color: "error" }
  ];

  const recentActivities = [
    { action: "Novo usuário cadastrado", user: "João Silva", time: "2 min atrás", type: "user" },
    { action: "Backup realizado", user: "Sistema", time: "15 min atrás", type: "system" },
    { action: "Relatório gerado", user: "Maria Santos", time: "1h atrás", type: "report" },
    { action: "Configuração alterada", user: "Admin", time: "2h atrás", type: "config" }
  ];

  const sections = [
    { id: "usuarios", label: "Usuários", icon: "👥" },
    { id: "sistema", label: "Sistema", icon: "⚙️" },
    { id: "seguranca", label: "Segurança", icon: "🔐" },
    { id: "relatorios", label: "Relatórios", icon: "📊" }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case "user": return "👤";
      case "system": return "⚙️";
      case "report": return "📄";
      case "config": return "🔧";
      default: return "📌";
    }
  };

  const renderSectionContent = () => {
    switch(activeSection) {
      case "usuarios":
        return (
          <div className="admin-content">
            <div className="admin-actions-grid">
              <div className="admin-action-card">
                <div className="action-icon">👥</div>
                <h3>Gerenciar Usuários</h3>
                <p>Adicionar, editar ou remover usuários do sistema</p>
                <button 
                  className="btn-primary"
                  onClick={() => window.showNotification && window.showNotification("Abrindo gerenciamento de usuários...", "info")}
                >
                  Acessar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">🔑</div>
                <h3>Permissões</h3>
                <p>Configurar roles e permissões de acesso</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Configurações de permissão carregadas", "success")}
                >
                  Configurar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">📊</div>
                <h3>Analytics de Usuários</h3>
                <p>Visualizar estatísticas de uso e atividade</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Gerando relatório de analytics...", "info")}
                >
                  Ver Analytics
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">📧</div>
                <h3>Comunicação</h3>
                <p>Enviar notificações e comunicados</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Centro de comunicação aberto", "info")}
                >
                  Abrir
                </button>
              </div>
            </div>
          </div>
        );
      
      case "sistema":
        return (
          <div className="admin-content">
            <div className="admin-actions-grid">
              <div className="admin-action-card">
                <div className="action-icon">⚙️</div>
                <h3>Configurações Gerais</h3>
                <p>Personalizar configurações do sistema</p>
                <button 
                  className="btn-primary"
                  onClick={() => window.showNotification && window.showNotification("Configurações do sistema abertas", "info")}
                >
                  Configurar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">🔌</div>
                <h3>Integrações</h3>
                <p>Gerenciar APIs e integrações externas</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Painel de integrações carregado", "success")}
                >
                  Gerenciar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">📊</div>
                <h3>Performance</h3>
                <p>Monitorar performance e recursos do sistema</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Dashboard de performance aberto", "info")}
                >
                  Monitorar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">🔄</div>
                <h3>Manutenção</h3>
                <p>Executar tarefas de manutenção e limpeza</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Manutenção agendada com sucesso", "success")}
                >
                  Executar
                </button>
              </div>
            </div>
          </div>
        );
      
      case "seguranca":
        return (
          <div className="admin-content">
            <div className="admin-actions-grid">
              <div className="admin-action-card">
                <div className="action-icon">🔐</div>
                <h3>Backup & Restore</h3>
                <p>Gerenciar backups automáticos e restauração</p>
                <button 
                  className="btn-primary"
                  onClick={() => window.showNotification && window.showNotification("Backup iniciado com sucesso", "success")}
                >
                  Fazer Backup
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">🔍</div>
                <h3>Logs de Acesso</h3>
                <p>Visualizar logs de atividade e segurança</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Logs de acesso carregados", "info")}
                >
                  Ver Logs
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">🛡️</div>
                <h3>Políticas de Segurança</h3>
                <p>Configurar regras e políticas de acesso</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Políticas de segurança abertas", "info")}
                >
                  Configurar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">🔔</div>
                <h3>Alertas</h3>
                <p>Configurar alertas de segurança e monitoramento</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Central de alertas configurada", "success")}
                >
                  Configurar
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="admin-content">
            <div className="admin-actions-grid">
              <div className="admin-action-card">
                <div className="action-icon">📈</div>
                <h3>Dashboard Executivo</h3>
                <p>Relatórios gerenciais e indicadores estratégicos</p>
                <button 
                  className="btn-primary"
                  onClick={() => window.showNotification && window.showNotification("Dashboard executivo carregado", "info")}
                >
                  Acessar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">📊</div>
                <h3>Relatórios Customizados</h3>
                <p>Criar e personalizar relatórios específicos</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Editor de relatórios aberto", "info")}
                >
                  Criar Relatório
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">📅</div>
                <h3>Relatórios Agendados</h3>
                <p>Programar envio automático de relatórios</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Agendamentos configurados", "success")}
                >
                  Agendar
                </button>
              </div>

              <div className="admin-action-card">
                <div className="action-icon">💾</div>
                <h3>Exportar Dados</h3>
                <p>Exportar dados do sistema em diversos formatos</p>
                <button 
                  className="btn-outline"
                  onClick={() => window.showNotification && window.showNotification("Exportação iniciada", "info")}
                >
                  Exportar
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Administração do Sistema</h1>
        <p className="muted">Gerencie usuários, configurações e monitore o sistema</p>
      </div>

      <div className="admin-dashboard">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-trend ${stat.color}`}>{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-layout">
          {/* Navigation Tabs */}
          <div className="admin-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`admin-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-label">{section.label}</span>
              </button>
            ))}
          </div>

          <div className="admin-main">
            {renderSectionContent()}
          </div>

          {/* Activity Sidebar */}
          <div className="admin-sidebar">
            <div className="card">
              <h3>Atividades Recentes</h3>
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                    <div className="activity-content">
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-meta">{activity.user} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3>Sistema</h3>
              <div className="system-info">
                <div className="info-item">
                  <span className="info-label">Versão:</span>
                  <span className="info-value">v2.1.4</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Uptime:</span>
                  <span className="info-value">15 dias</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status:</span>
                  <span className="info-value success">Operacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}