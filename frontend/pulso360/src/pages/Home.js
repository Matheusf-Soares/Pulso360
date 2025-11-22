import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const user = { 
    name: "Maria Silva", 
    initials: "MS",
    role: "Desenvolvedora Frontend Sênior",
    department: "Tecnologia",
    avatar: "👩‍💻"
  };

  // Atualizar relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dados dinâmicos baseados no período selecionado
  const getDynamicData = (period) => {
    const data = {
      semana: {
        evaluations: { completion: 45, target: 60, status: "Pendente" },
        productivity: 78,
        meetings: 12,
        tasks: 23
      },
      mes: {
        evaluations: { completion: 68, target: 80, status: "Em andamento" },
        productivity: 85,
        meetings: 34,
        tasks: 67
      },
      trimestre: {
        evaluations: { completion: 89, target: 90, status: "Quase concluído" },
        productivity: 92,
        meetings: 98,
        tasks: 156
      }
    };
    return data[period];
  };

  const currentData = getDynamicData(selectedPeriod);

  const quickStats = [
    {
      icon: "🎯",
      title: "Avaliações",
      value: `${currentData.evaluations.completion}%`,
      subtitle: `Meta: ${currentData.evaluations.target}%`,
      trend: "up",
      color: "primary"
    },
    {
      icon: "⚡",
      title: "Produtividade",
      value: `${currentData.productivity}%`,
      subtitle: "Acima da média",
      trend: "up",
      color: "success"
    },
    {
      icon: "👥",
      title: "Reuniões",
      value: currentData.meetings,
      subtitle: `${selectedPeriod}`,
      trend: "neutral",
      color: "warning"
    },
    {
      icon: "✅",
      title: "Tarefas",
      value: currentData.tasks,
      subtitle: "Concluídas",
      trend: "up",
      color: "info"
    }
  ];

  const pdiProgress = [
    { 
      title: "Liderança Estratégica", 
      current: 75, 
      target: 85, 
      color: "primary",
      lastUpdate: "Há 2 dias",
      nextMilestone: "Curso de gestão - 18/11"
    },
    { 
      title: "Comunicação Assertiva", 
      current: 45, 
      target: 70, 
      color: "warning",
      lastUpdate: "Há 5 dias",
      nextMilestone: "Workshop prático - 25/11"
    },
    { 
      title: "Gestão de Equipes", 
      current: 90, 
      target: 95, 
      color: "success",
      lastUpdate: "Ontem",
      nextMilestone: "Mentorias individuais - 20/11"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "feedback",
      icon: "💬",
      title: "Feedback recebido de João Santos",
      description: "Excelente trabalho no projeto de dashboard analytics",
      time: "2 horas atrás",
      priority: "medium",
      action: () => navigate('/avaliacoes')
    },
    {
      id: 2,
      type: "goal",
      icon: "🎯",
      title: "Meta 'Aumentar NPS' 75% concluída",
      description: "Você está no caminho certo para atingir a meta!",
      time: "4 horas atrás",
      priority: "high",
      action: () => navigate('/pdi')
    },
    {
      id: 3,
      type: "meeting",
      icon: "📅",
      title: "Reunião de PDI agendada",
      description: "15/11/2025 às 14h30 com Carlos Mendes",
      time: "1 dia atrás",
      priority: "high",
      action: () => navigate('/pdi')
    },
    {
      id: 4,
      type: "training",
      icon: "📚",
      title: "Novo curso disponível",
      description: "React Advanced Patterns adicionado ao seu PDI",
      time: "2 dias atrás",
      priority: "low",
      action: () => navigate('/pdi')
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Completar autoavaliação Q4",
      dueDate: "Hoje",
      priority: "high",
      category: "avaliacao",
      completed: false
    },
    {
      id: 2,
      title: "Revisar metas do PDI",
      dueDate: "Amanhã",
      priority: "medium",
      category: "desenvolvimento",
      completed: false
    },
    {
      id: 3,
      title: "Preparar apresentação trimestral",
      dueDate: "15 Nov",
      priority: "high",
      category: "projeto",
      completed: false
    },
    {
      id: 4,
      title: "Feedback da equipe de design",
      dueDate: "18 Nov",
      priority: "medium",
      category: "feedback",
      completed: true
    }
  ];

  const teamPerformance = [
    {
      name: "Equipe Frontend",
      members: 6,
      performance: 92,
      trend: "up",
      color: "success",
      lastActivity: "2 horas atrás"
    },
    {
      name: "Equipe Design",
      members: 4,
      performance: 78,
      trend: "up",
      color: "primary",
      lastActivity: "1 dia atrás"
    },
    {
      name: "Equipe Backend",
      members: 8,
      performance: 85,
      trend: "neutral",
      color: "warning",
      lastActivity: "3 horas atrás"
    }
  ];

  const quickActions = [
    {
      icon: "📝",
      title: "Nova Avaliação",
      description: "Iniciar autoavaliação",
      color: "primary",
      action: () => navigate('/avaliacoes')
    },
    {
      icon: "🎯",
      title: "Ver PDI",
      description: "Acompanhar progresso",
      color: "success",
      action: () => navigate('/pdi')
    },
    {
      icon: "👥",
      title: "Minha Equipe",
      description: "Gerenciar time",
      color: "info",
      action: () => navigate('/equipe')
    },
    {
      icon: "📊",
      title: "Relatórios",
      description: "Gerar análises",
      color: "warning",
      action: () => navigate('/relatorios')
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const toggleTask = (taskId) => {
    // Simular toggle de task
    if (window.showNotification) {
      window.showNotification("Status da tarefa atualizado!", "success", 2000);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'muted';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'neutral': return '➡️';
      default: return '📊';
    }
  };

  return (
    <div className="home-container">
      {/* Header Dinâmico */}
      <div className="home-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="user-avatar-large">
              <span className="avatar-emoji">{user.avatar}</span>
            </div>
            <div className="welcome-text">
              <h1>{getGreeting()}, {user.name.split(' ')[0]}! 👋</h1>
              <p className="welcome-subtitle">{user.role} • {user.department}</p>
              <div className="date-time">
                <span className="current-date">{formatDate(currentTime)}</span>
                <span className="current-time">{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
          
          <div className="header-controls">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-selector"
            >
              <option value="semana">📅 Esta Semana</option>
              <option value="mes">📅 Este Mês</option>
              <option value="trimestre">📅 Este Trimestre</option>
            </select>
            
            <button 
              className="btn-primary"
              onClick={() => setShowQuickActions(!showQuickActions)}
            >
              <span>⚡</span>
              Ações Rápidas
            </button>
          </div>
        </div>

        {/* Ações Rápidas */}
        {showQuickActions && (
          <div className="quick-actions-panel">
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  className={`quick-action-card ${action.color}`}
                  onClick={action.action}
                >
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas Rápidas */}
      <div className="home-stats">
        <h2>📊 Resumo do {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}</h2>
        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                <div className="trend-indicator">{getTrendIcon(stat.trend)}</div>
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-subtitle">{stat.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Principal */}
      <div className="home-main">
        {/* Coluna Esquerda */}
        <div className="home-left">
          {/* Progresso do PDI */}
          <div className="home-card">
            <div className="card-header">
              <h3>🎯 Meu PDI - Progresso Atual</h3>
              <button 
                className="btn-outline small"
                onClick={() => navigate('/pdi')}
              >
                Ver Completo
              </button>
            </div>
            
            <div className="pdi-progress-list">
              {pdiProgress.map((item, index) => (
                <div key={index} className="pdi-item">
                  <div className="pdi-header">
                    <div className="pdi-info">
                      <h4>{item.title}</h4>
                      <span className="pdi-meta">
                        {item.current}% de {item.target}% • {item.lastUpdate}
                      </span>
                    </div>
                    <span className={`pdi-percentage ${item.color}`}>
                      {item.current}%
                    </span>
                  </div>
                  
                  <div className="progress-bar-container">
                    <div className={`progress-bar ${item.color}`}>
                      <div 
                        className="progress-fill"
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pdi-next">
                    <span className="next-milestone">
                      🎯 Próximo: {item.nextMilestone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atividades Recentes */}
          <div className="home-card">
            <div className="card-header">
              <h3>📋 Atividades Recentes</h3>
              <span className="activity-count">{recentActivity.length} atividades</span>
            </div>
            
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`activity-item ${activity.priority}`}
                  onClick={activity.action}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <div className={`priority-indicator ${activity.priority}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="home-right">
          {/* Tarefas Pendentes */}
          <div className="home-card">
            <div className="card-header">
              <h3>✅ Próximas Tarefas</h3>
              <span className="task-count">
                {upcomingTasks.filter(t => !t.completed).length} pendentes
              </span>
            </div>
            
            <div className="tasks-list">
              {upcomingTasks.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                  </div>
                  <div className="task-content">
                    <h4 className={task.completed ? 'line-through' : ''}>{task.title}</h4>
                    <div className="task-meta">
                      <span className={`task-priority ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? '🔥' : task.priority === 'medium' ? '📊' : '📝'}
                      </span>
                      <span className="task-category">🏷️ {task.category}</span>
                      <span className="task-due">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance da Equipe */}
          <div className="home-card">
            <div className="card-header">
              <h3>👥 Performance da Equipe</h3>
              <button 
                className="btn-outline small"
                onClick={() => navigate('/equipe')}
              >
                Ver Detalhes
              </button>
            </div>
            
            <div className="team-performance-list">
              {teamPerformance.map((team, index) => (
                <div key={index} className="team-performance-item">
                  <div className="team-info">
                    <h4>{team.name}</h4>
                    <span className="team-meta">
                      {team.members} membros • {team.lastActivity}
                    </span>
                  </div>
                  
                  <div className="team-performance">
                    <div className="performance-value">
                      <span className={`performance-number ${team.color}`}>
                        {team.performance}%
                      </span>
                      <span className="performance-trend">
                        {getTrendIcon(team.trend)}
                      </span>
                    </div>
                    
                    <div className={`performance-bar ${team.color}`}>
                      <div 
                        className="performance-fill"
                        style={{ width: `${team.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Widget de Relatórios Rápidos */}
          <div className="home-card">
            <div className="card-header">
              <h3>📈 Relatórios Rápidos</h3>
            </div>
            
            <div className="quick-reports">
              <button 
                className="report-button primary"
                onClick={() => navigate('/relatorios')}
              >
                <span className="report-icon">📊</span>
                <span>Performance Individual</span>
              </button>
              
              <button 
                className="report-button success"
                onClick={() => navigate('/relatorios')}
              >
                <span className="report-icon">👥</span>
                <span>Relatório da Equipe</span>
              </button>
              
              <button 
                className="report-button warning"
                onClick={() => navigate('/relatorios')}
              >
                <span className="report-icon">📈</span>
                <span>Análise de PDI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}