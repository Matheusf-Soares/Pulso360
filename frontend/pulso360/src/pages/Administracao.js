import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function Administracao() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("usuarios");
  
  // Informações do administrador logado
  const adminUser = user ? {
    name: user.nome || 'Administrador',
    role: user.cargo || 'Admin'
  } : {
    name: 'Administrador',
    role: 'Admin'
  };
  
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
    { action: "Configuração alterada", user: adminUser.name, time: "2h atrás", type: "config" }
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
                  onClick={() => navigate("/admin/gerenciar-usuarios")}
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
                  onClick={() => navigate("/admin/permissoes")}
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
                  onClick={() => navigate("/admin/analytics")}
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
                  onClick={() => navigate("/admin/comunicacao")}
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
                  onClick={() => navigate("/admin/configuracoes-gerais")}
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
                  onClick={() => navigate("/admin/integracoes")}
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
                  onClick={() => navigate("/admin/performance")}
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
                  onClick={() => navigate("/admin/manutencao")}
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
                  onClick={() => navigate("/admin/backup-restore")}
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
                  onClick={() => navigate("/admin/logs-acesso")}
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
                  onClick={() => navigate("/admin/politicas-seguranca")}
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
                  onClick={() => navigate("/admin/alertas")}
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
                  onClick={() => navigate("/admin/dashboard-executivo")}
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
                  onClick={() => navigate("/admin/relatorios-customizados")}
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
                  onClick={() => navigate("/admin/relatorios-agendados")}
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
                  onClick={() => navigate("/admin/exportar-dados")}
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
      {/* Header Profissional Moderno */}
      <div className="admin-header-modern">
        <div className="header-content-wrapper-admin">
          <div className="header-left-section-admin">
            <div className="header-icon-wrapper-admin">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="white"/>
              </svg>
            </div>
            <div className="header-text-section-admin">
              <h1>Administração do Sistema</h1>
              <p>Painel de controle completo para gerenciar usuários, configurações e monitorar o sistema</p>
            </div>
          </div>
          
          <div className="header-right-section-admin">
            <div className="admin-breadcrumb">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L2 6H3V12H7V9H9V12H13V6H14L8 2Z" fill="currentColor"/>
              </svg>
              <span>Dashboard</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="active">Administração</span>
            </div>
            <button className="btn-header-admin-secondary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 0C4.04 0 0 4.04 0 9C0 13.96 4.04 18 9 18C13.96 18 18 13.96 18 9C18 4.04 13.96 0 9 0ZM9 16.2C5.02 16.2 1.8 12.98 1.8 9C1.8 5.02 5.02 1.8 9 1.8C12.98 1.8 16.2 5.02 16.2 9C16.2 12.98 12.98 16.2 9 16.2ZM8.1 4.5H9.9V9.9H8.1V4.5ZM8.1 11.7H9.9V13.5H8.1V11.7Z" fill="currentColor"/>
              </svg>
              Logs do Sistema
            </button>
          </div>
        </div>
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