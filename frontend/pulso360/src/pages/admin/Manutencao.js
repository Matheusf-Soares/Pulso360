import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Manutencao() {
  const navigate = useNavigate();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [runningTasks, setRunningTasks] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Estatísticas de manutenção
  const stats = [
    { label: "Tarefas Agendadas", value: "8", icon: "📅", color: "#667eea" },
    { label: "Executadas Hoje", value: "4", icon: "✓", color: "#00b894" },
    { label: "Espaço Liberado", value: "2.4 GB", icon: "💾", color: "#fdcb6e" },
    { label: "Última Execução", value: "2h atrás", icon: "⏱️", color: "#0984e3" },
  ];

  // Tarefas de manutenção
  const tarefas = [
    { 
      id: 1,
      nome: "Limpar Cache do Sistema", 
      descricao: "Remove arquivos temporários e cache acumulado", 
      frequencia: "Diária", 
      ultimaExecucao: "Hoje, 03:00",
      status: "completo",
      duracao: "2 min",
      espacoLiberado: "450 MB",
      icon: "🗑️",
      color: "#667eea",
      automatico: true
    },
    { 
      id: 2,
      nome: "Otimizar Banco de Dados", 
      descricao: "Reorganiza índices, tabelas e executa VACUUM", 
      frequencia: "Semanal", 
      ultimaExecucao: "3 dias atrás",
      status: "agendado",
      duracao: "15 min",
      espacoLiberado: "1.2 GB",
      icon: "🔧",
      color: "#00b894",
      automatico: true
    },
    { 
      id: 3,
      nome: "Verificar Integridade de Arquivos", 
      descricao: "Valida checksums e detecta corrupção", 
      frequencia: "Mensal", 
      ultimaExecucao: "10 dias atrás",
      status: "pendente",
      duracao: "30 min",
      espacoLiberado: "N/A",
      icon: "🔍",
      color: "#fdcb6e",
      automatico: false
    },
    { 
      id: 4,
      nome: "Atualizar Dependências", 
      descricao: "Verifica e instala atualizações de segurança", 
      frequencia: "Semanal", 
      ultimaExecucao: "Hoje, 01:00",
      status: "completo",
      duracao: "5 min",
      espacoLiberado: "N/A",
      icon: "📦",
      color: "#e17055",
      automatico: true
    },
    { 
      id: 5,
      nome: "Rotação de Logs", 
      descricao: "Arquiva e compacta logs antigos", 
      frequencia: "Diária", 
      ultimaExecucao: "Hoje, 00:00",
      status: "completo",
      duracao: "3 min",
      espacoLiberado: "340 MB",
      icon: "📋",
      color: "#6c5ce7",
      automatico: true
    },
    { 
      id: 6,
      nome: "Backup Incremental", 
      descricao: "Cria backup incremental dos dados", 
      frequencia: "Diária", 
      ultimaExecucao: "Hoje, 02:00",
      status: "completo",
      duracao: "8 min",
      espacoLiberado: "N/A",
      icon: "💼",
      color: "#00b894",
      automatico: true
    },
    { 
      id: 7,
      nome: "Limpar Sessões Expiradas", 
      descricao: "Remove sessões de usuários inativas", 
      frequencia: "Diária", 
      ultimaExecucao: "Hoje, 04:00",
      status: "completo",
      duracao: "1 min",
      espacoLiberado: "125 MB",
      icon: "🔐",
      color: "#a29bfe",
      automatico: true
    },
    { 
      id: 8,
      nome: "Analisar Segurança", 
      descricao: "Verifica vulnerabilidades e portas abertas", 
      frequencia: "Semanal", 
      ultimaExecucao: "5 dias atrás",
      status: "agendado",
      duracao: "20 min",
      espacoLiberado: "N/A",
      icon: "🛡️",
      color: "#d63031",
      automatico: false
    },
  ];

  // Ações rápidas
  const quickActions = [
    { 
      id: 1,
      name: "Limpar Todos os Logs", 
      description: "Remove todos os arquivos de log",
      icon: "🗑️",
      color: "#d63031",
      type: "danger"
    },
    { 
      id: 2,
      name: "Reiniciar Serviços", 
      description: "Reinicia todos os serviços do sistema",
      icon: "🔄",
      color: "#fdcb6e",
      type: "warning"
    },
    { 
      id: 3,
      name: "Executar Todas as Tarefas", 
      description: "Executa todas as tarefas pendentes",
      icon: "⚡",
      color: "#667eea",
      type: "primary"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completo": return "#00b894";
      case "pendente": return "#fdcb6e";
      case "agendado": return "#0984e3";
      case "executando": return "#667eea";
      case "erro": return "#d63031";
      default: return "#95a5a6";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completo": return "Completo";
      case "pendente": return "Pendente";
      case "agendado": return "Agendado";
      case "executando": return "Executando...";
      case "erro": return "Erro";
      default: return "Desconhecido";
    }
  };

  const handleRunTask = (taskId) => {
    setRunningTasks(prev => ({ ...prev, [taskId]: true }));
    setTimeout(() => {
      setRunningTasks(prev => ({ ...prev, [taskId]: false }));
      console.log(`Tarefa ${taskId} executada com sucesso`);
    }, 3000);
  };

  const handleScheduleTask = (task) => {
    setSelectedTask(task);
    setShowScheduleModal(true);
  };

  const handleToggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  return (
    <div className="admin-page-manutencao">
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
              <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C9.6 0.5 5.7 0.5 3.2 3C0.7 5.5 0.7 9.4 3.2 11.9C5.1 13.8 7.8 14.3 10.1 13.4L19.2 22.5L22.7 19ZM7.5 10C6.1 10 5 8.9 5 7.5C5 6.1 6.1 5 7.5 5C8.9 5 10 6.1 10 7.5C10 8.9 8.9 10 7.5 10Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Manutenção do Sistema</h1>
            <p>Gerenciamento de tarefas de limpeza e otimização</p>
          </div>
        </div>

        <div className="maintenance-mode-toggle">
          <label className="toggle-switch-maintenance">
            <input 
              type="checkbox" 
              checked={maintenanceMode} 
              onChange={handleToggleMaintenanceMode}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-label">
            {maintenanceMode ? "Modo Manutenção Ativo" : "Modo Manutenção Inativo"}
          </span>
        </div>
      </div>

      {/* Maintenance Mode Alert */}
      {maintenanceMode && (
        <div className="maintenance-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <strong>Modo de Manutenção Ativado</strong>
            <p>O sistema está em modo de manutenção. Apenas administradores podem acessar.</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid-professional">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-professional">
            <div className="stat-icon" style={{ background: stat.color }}>
              <span>{stat.icon}</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3 className="section-title">Ações Rápidas</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <button 
              key={action.id} 
              className={`quick-action-card ${action.type}`}
              onClick={() => console.log(`Executando: ${action.name}`)}
            >
              <div className="action-icon" style={{ background: action.color }}>
                {action.icon}
              </div>
              <div className="action-content">
                <h4>{action.name}</h4>
                <p>{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="maintenance-tasks-section">
        <h3 className="section-title">Tarefas de Manutenção</h3>
        <div className="maintenance-tasks-grid">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="maintenance-card-professional">
              <div className="task-header">
                <div className="task-icon" style={{ background: tarefa.color }}>
                  {tarefa.icon}
                </div>
                <div className="task-status-badges">
                  <span 
                    className="task-status-badge"
                    style={{ background: getStatusColor(runningTasks[tarefa.id] ? "executando" : tarefa.status) }}
                  >
                    {runningTasks[tarefa.id] ? "Executando..." : getStatusLabel(tarefa.status)}
                  </span>
                  {tarefa.automatico && (
                    <span className="task-auto-badge">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="currentColor"/>
                      </svg>
                      Automático
                    </span>
                  )}
                </div>
              </div>

              <div className="task-body">
                <h4 className="task-name">{tarefa.nome}</h4>
                <p className="task-description">{tarefa.descricao}</p>

                <div className="task-info-grid">
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7 12.6C3.91 12.6 1.4 10.09 1.4 7C1.4 3.91 3.91 1.4 7 1.4C10.09 1.4 12.6 3.91 12.6 7C12.6 10.09 10.09 12.6 7 12.6Z" fill="currentColor"/>
                      <path d="M7.35 3.5H6.3V7.7L9.8 9.8L10.5 8.96L7.35 7.14V3.5Z" fill="currentColor"/>
                    </svg>
                    <span>Frequência: {tarefa.frequencia}</span>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM9.1 9.8L6.3 7V3.5H7.7V6.44L10.15 8.89L9.1 9.8Z" fill="currentColor"/>
                    </svg>
                    <span>Duração: {tarefa.duracao}</span>
                  </div>
                  <div className="info-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12.6 3.5H11.2V2.1C11.2 1.26 10.54 0.6 9.7 0.6H4.3C3.46 0.6 2.8 1.26 2.8 2.1V3.5H1.4C0.63 3.5 0 4.13 0 4.9V12.6C0 13.37 0.63 14 1.4 14H12.6C13.37 14 14 13.37 14 12.6V4.9C14 4.13 13.37 3.5 12.6 3.5ZM4.2 2.1H9.8V3.5H4.2V2.1Z" fill="currentColor"/>
                    </svg>
                    <span>Última: {tarefa.ultimaExecucao}</span>
                  </div>
                  {tarefa.espacoLiberado !== "N/A" && (
                    <div className="info-item">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.6 0H1.4C0.63 0 0 0.63 0 1.4V12.6C0 13.37 0.63 14 1.4 14H12.6C13.37 14 14 13.37 14 12.6V1.4C14 0.63 13.37 0 12.6 0ZM12.6 12.6H1.4V1.4H12.6V12.6Z" fill="currentColor"/>
                      </svg>
                      <span>Liberado: {tarefa.espacoLiberado}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="task-actions">
                <button 
                  className="btn-task-run"
                  onClick={() => handleRunTask(tarefa.id)}
                  disabled={runningTasks[tarefa.id]}
                >
                  {runningTasks[tarefa.id] ? (
                    <>
                      <div className="spinner-small"></div>
                      Executando...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 2L13 8L3 14V2Z" fill="currentColor"/>
                      </svg>
                      Executar Agora
                    </>
                  )}
                </button>
                <button 
                  className="btn-task-schedule"
                  onClick={() => handleScheduleTask(tarefa)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 2H12V0H10V2H6V0H4V2H3C2.45 2 2 2.45 2 3V14C2 14.55 2.45 15 3 15H13C13.55 15 14 14.55 14 14V3C14 2.45 13.55 2 13 2ZM13 14H3V6H13V14Z" fill="currentColor"/>
                  </svg>
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Agendar Tarefa</h2>
              <button className="modal-close" onClick={() => setShowScheduleModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="task-info-modal">
                <div className="task-icon" style={{ background: selectedTask.color }}>
                  {selectedTask.icon}
                </div>
                <div>
                  <h3>{selectedTask.nome}</h3>
                  <p>{selectedTask.descricao}</p>
                </div>
              </div>

              <div className="form-group-modal">
                <label className="form-label-modal">Frequência</label>
                <select className="form-input-modal">
                  <option>Diária</option>
                  <option>Semanal</option>
                  <option>Mensal</option>
                  <option>Personalizada</option>
                </select>
              </div>

              <div className="form-group-modal">
                <label className="form-label-modal">Horário de Execução</label>
                <input type="time" className="form-input-modal" defaultValue="03:00" />
              </div>

              <div className="checkbox-group-modal">
                <label className="checkbox-label-modal">
                  <input type="checkbox" defaultChecked />
                  <span>Executar automaticamente</span>
                </label>
                <label className="checkbox-label-modal">
                  <input type="checkbox" />
                  <span>Notificar ao completar</span>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary-modal" onClick={() => setShowScheduleModal(false)}>
                Cancelar
              </button>
              <button className="btn-primary-modal" onClick={() => setShowScheduleModal(false)}>
                Salvar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
