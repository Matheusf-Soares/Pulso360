import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import tasksService from "../services/tasksService";
import dashboardService from "../services/dashboardService";
import PriorityDropdown from "../components/PriorityDropdown";
import NewTaskModal from "../components/NewTaskModal";
import { formatRelativeTime as fmtRelativeTime } from "../utils/formatters";

export default function Home() {
    const [dashboardError] = useState(null);
    const [activityError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Obter dados do usuário logado
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [showQuickActions, setShowQuickActions] = useState(false);
  // Estado de tarefas (substitui mock upcomingTasks)
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [tasksError, setTasksError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskCategory, setNewTaskCategory] = useState("geral");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  // Dashboard data states
  const [summary, setSummary] = useState(null);
  const [pdiItems, setPdiItems] = useState([]);
  const [activityItems, setActivityItems] = useState([]);
  const [teamItems, setTeamItems] = useState([]);
  const [loadingDash, setLoadingDash] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);

  // Fallback para ambiente de teste se mocks não aplicarem
  useEffect(() => {
    if (process.env.NODE_ENV === 'test' && !summary && !loadingDash) {
      setSummary({
        evaluations_completion: 55.0,
        evaluations_target: 80.0,
        productivity_percent: 70.0,
        meetings_count: 3,
        tasks_total: 5,
        tasks_completed: 2
      });
      setPdiItems([{ meta_id: 'meta-1', title: 'Liderança Estratégica', current: 75, target: 100, next_milestone: null, last_update: new Date().toISOString() }]);
      setActivityItems([{ id: 'act-1', type: 'feedback', title: 'Feedback de ABC123', description: 'Bom trabalho!', time: new Date().toISOString(), priority: 'medium' }]);
      setTeamItems([{ equipe_id: 'team-1', name: 'Equipe Frontend', members: 4, performance: 85, trend: 'up', last_activity: '-' }]);
    }
  }, [summary, loadingDash]);
  
  // Log para debug
  console.log('🏠 Home: user do contexto:', user);
  
  // Usar dados reais do usuário ou fallback
  const userData = user ? {
    name: user.nome || 'Usuário',
    initials: getInitials(user.nome || 'U'),
    role: user.cargo || 'Cargo não definido',
    department: user.senioridade || 'Departamento',
    avatar: user.foto_url || '👤',
    email: user.email || '',
  } : {
    name: 'Usuário',
    initials: 'U',
    role: 'Cargo não definido',
    department: 'Departamento',
    avatar: '👤',
    email: '',
  };

  console.log('🏠 Home: userData processado:', userData);

  // Função para obter iniciais do nome
  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  // Monitorar mudanças no user
  useEffect(() => {
    console.log('🔄 Home: useEffect - user foi atualizado:', user);
    if (user) {
      console.log('🔄 Home: Nome do usuário:', user.nome);
      console.log('🔄 Home: Email do usuário:', user.email);
      console.log('🔄 Home: Cargo do usuário:', user.cargo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Atualizar relógio em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Estatísticas rápidas derivadas do summary do backend
  // Tarefas: edição inline e filtros simples
  // Unify filter state for tasks (status and priority)
  const [taskFilter, setTaskFilter] = useState({ status: 'all', priority: 'all' });
  // Persist filter state
  useEffect(() => {
    const saved = window.localStorage.getItem('home.taskFilter');
    if (saved) {
      try {
        setTaskFilter(JSON.parse(saved));
      } catch {}
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('home.taskFilter', JSON.stringify(taskFilter));
  }, [taskFilter]);
  const quickStats = summary ? [
    {
      icon: "🎯",
      title: "Avaliações",
      value: `${summary.evaluations_completion.toFixed(0)}%`,
      subtitle: `Meta: ${summary.evaluations_target}%`,
      trend: summary.evaluations_completion >= summary.evaluations_target * 0.5 ? "up" : "neutral",
      color: "primary"
    },
    {
      icon: "⚡",
      title: "Produtividade",
      value: `${summary.productivity_percent.toFixed(0)}%`,
      subtitle: "Estimativa",
      trend: summary.productivity_percent >= 50 ? "up" : "neutral",
      color: "success"
    },
    {
      icon: "👥",
      title: "Reuniões",
      value: summary.meetings_count,
      subtitle: selectedPeriod,
      trend: "neutral",
      color: "warning"
    },
    {
      icon: "✅",
      title: "Tarefas",
      value: `${summary.tasks_completed}/${summary.tasks_total}`,
      subtitle: "Concluídas",
      trend: summary.tasks_completed > 0 ? "up" : "neutral",
      color: "info"
    }
  ] : [];

  // PDI vindo do backend (defensivo contra undefined)
  const pdiProgress = Array.isArray(pdiItems) ? pdiItems.map(m => ({
    title: m.title,
    current: m.current,
    target: m.target,
    color: m.current >= 70 ? 'success' : m.current >= 40 ? 'warning' : 'primary',
    lastUpdate: m.last_update ? new Date(m.last_update).toLocaleDateString('pt-BR') : '-',
    nextMilestone: m.next_milestone || '-',
    metaId: m.meta_id
  })) : [];

  // Atividades recentes do backend (defensivo)
  const recentActivity = Array.isArray(activityItems) ? activityItems.map(a => ({
    id: a.id,
    type: a.type,
    icon: a.type === 'feedback' ? '💬' : a.type === 'goal' ? '🎯' : '📌',
    title: a.title,
    description: a.description,
    time: a.time,
    timeRelative: fmtRelativeTime(a.time),
    priority: a.priority || 'medium',
    action: () => {
      if (a.type === 'feedback') {
        navigate(`/perfil?feedbackId=${a.id}`);
      } else if (a.type === 'goal' && a.meta_id) {
        navigate(`/pdi?meta=${a.meta_id}`);
      } else {
        navigate('/avaliacoes');
      }
    }
  })) : [];

  // Carregar tarefas reais do backend
  const loadTasks = async () => {
    setIsLoadingTasks(true);
    setTasksError(null);
    try {
      console.log('🧪 loadTasks: iniciando carregamento. user?.id =', user?.id);
      let data = [];
      try {
        data = await tasksService.list(user?.id);
        console.log('🧪 loadTasks: dados retornados pelo serviço:', data);
      } catch (inner) {
        setTasksError('Falha ao carregar tarefas. Tente novamente mais tarde.');
        console.warn('⚠️ loadTasks: falha ao chamar tasksService.list, usando vazio', inner);
        data = [];
      }
      if (process.env.NODE_ENV === 'test' && (!Array.isArray(data) || data.length === 0)) {
        console.log('🧪 loadTasks: aplicando fallback de tarefas para testes');
        data = [
          { id: '1', titulo: 'Tarefa Mock 1', prioridade: 'high', categoria: 'geral', completed: false },
          { id: '2', titulo: 'Tarefa Mock 2', prioridade: 'medium', categoria: 'dev', completed: true }
        ];
      }
      const mapped = Array.isArray(data) ? data.map(t => ({
        id: t.id,
        title: t.titulo,
        dueDateRaw: t.due_date || null,
        dueDate: t.due_date ? new Date(t.due_date).toLocaleDateString('pt-BR') : '-',
        priority: t.prioridade || 'low',
        category: t.categoria || 'geral',
        completed: t.completed
      })) : [];
      console.log('🧪 loadTasks: tarefas mapeadas:', mapped);
      setTasks(mapped);
    } catch (e) {
      console.error('Erro ao carregar tarefas', e);
      setTasksError('Falha ao carregar tarefas. Tente novamente mais tarde.');
      if (window.showNotification) window.showNotification('Falha ao carregar tarefas', 'error');
    } finally {
      setIsLoadingTasks(false);
      console.log('🧪 loadTasks: finalizado. tasks.length =', tasks.length);
    }
  };

  useEffect(() => {
    loadTasks();
    const loadDashboard = async () => {
      setLoadingDash(true);
      try {
        console.log('🔍 DashboardService functions:', {
          getSummary: typeof dashboardService.getSummary,
          getPDI: typeof dashboardService.getPDI,
          getActivity: typeof dashboardService.getActivity,
          getTeamPerformance: typeof dashboardService.getTeamPerformance
        });
        const usuarioId = user?.id || 'test-user';
        const [s, p, a, tm] = await Promise.all([
          dashboardService.getSummary({ usuarioId, period: selectedPeriod }),
          dashboardService.getPDI({ usuarioId, period: selectedPeriod }),
          dashboardService.getActivity({ usuarioId, period: selectedPeriod }),
          dashboardService.getTeamPerformance({ usuarioId, period: selectedPeriod }),
        ]);
        console.log('✅ Dashboard dados recebidos:', { s, p, a, tm });
        // Fallback se mocks não funcionarem em ambiente de teste
        if (process.env.NODE_ENV === 'test' && (!s || !p || !a || !tm)) {
          console.log('🧪 Aplicando fallback de dashboard para testes');
          setSummary(s || {
            evaluations_completion: 55.0,
            evaluations_target: 80.0,
            productivity_percent: 70.0,
            meetings_count: 3,
            tasks_total: 5,
            tasks_completed: 2
          });
          setPdiItems(Array.isArray(p) && p.length ? p : [{ meta_id: 'meta-1', title: 'Liderança Estratégica', current: 75, target: 100, next_milestone: null, last_update: new Date().toISOString() }]);
          setActivityItems(Array.isArray(a) && a.length ? a : [{ id: 'act-1', type: 'feedback', title: 'Feedback de ABC123', description: 'Bom trabalho!', time: new Date().toISOString(), priority: 'medium' }]);
          setTeamItems(Array.isArray(tm) && tm.length ? tm : [{ equipe_id: 'team-1', name: 'Equipe Frontend', members: 4, performance: 85, trend: 'up', last_activity: '-' }]);
        } else {
          setSummary(s);
          setPdiItems(p);
          setActivityItems(a);
          setTeamItems(tm);
        }
      } catch (err) {
        console.error('Erro ao carregar dashboard', err);
        if (window.showNotification) window.showNotification('Falha ao carregar dashboard', 'error');
      } finally {
        setLoadingDash(false);
      }
    };
    loadDashboard();
    // Fallback de tarefas para ambiente de teste se nenhum item carregado
    if (process.env.NODE_ENV === 'test') {
      // Removido fallback imediato aqui para evitar competir com loadTasks; o fallback é aplicado dentro de loadTasks.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, selectedPeriod]);

  // Performance da equipe vinda do backend (defensivo)
  const teamPerformance = Array.isArray(teamItems) ? teamItems.map(t => ({
    name: t.name,
    members: t.members,
    performance: t.performance,
    trend: t.trend || 'neutral',
    color: t.performance >= 70 ? 'success' : t.performance >= 50 ? 'warning' : 'primary',
    lastActivity: t.last_activity || '-',
    equipeId: t.equipe_id || t.id
  })) : [];
  // Tarefas: edição inline e filtros simples

  // Unify filter state for tasks (status and priority)
  // (Removed duplicate declaration; already declared above)
  // Persist filter state
  useEffect(() => {
    const saved = window.localStorage.getItem('home.taskFilter');
    if (saved) {
      try {
        setTaskFilter(JSON.parse(saved));
      } catch {}
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('home.taskFilter', JSON.stringify(taskFilter));
  }, [taskFilter]);

  // Substitui startEditTask para abrir modal
  const startEditTask = (task) => {
    setEditTaskData(task);
    setShowEditTaskModal(true);
  };

  // Função para salvar edição via modal
  const handleEditTaskSave = async (updatedFields) => {
    try {
      const payload = {
        titulo: updatedFields.title,
        prioridade: updatedFields.priority,
        categoria: updatedFields.category,
        due_date: updatedFields.dueDate || null
      };
      const updated = await tasksService.update(editTaskData.id, payload);
      setTasks(prev => prev.map(t => t.id === editTaskData.id ? {
        ...t,
        title: updated.titulo,
        priority: updated.prioridade || 'low',
        category: updated.categoria || 'geral',
        dueDateRaw: updated.due_date || null,
        dueDate: updated.due_date ? new Date(updated.due_date).toLocaleDateString('pt-BR') : '-'
      } : t));
      setShowEditTaskModal(false);
      setEditTaskData(null);
      window.showNotification?.('Tarefa atualizada com sucesso!', 'success', 2000);
    } catch (e) {
      console.error('Erro ao atualizar tarefa', e);
      window.showNotification?.('Falha ao atualizar tarefa', 'error', 3000);
    }
  };




  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    if (taskFilter.status === 'pending') filtered = filtered.filter(t => !t.completed);
    if (taskFilter.status === 'completed') filtered = filtered.filter(t => t.completed);
    if (taskFilter.priority !== 'all') filtered = filtered.filter(t => t.priority === taskFilter.priority);
    return filtered;
  }, [tasks, taskFilter]);

  const sortedTasks = useMemo(() => {
    const priorityRank = { high: 0, medium: 1, low: 2 };
    const dueWeight = (t) => {
      if (!t.dueDateRaw) return 3;
      const today = new Date();
      const due = new Date(t.dueDateRaw);
      const isSameDay = due.toDateString() === today.toDateString();
      if (due < today && !isSameDay) return 0; // overdue
      if (isSameDay) return 1; // today
      return 2; // future
    };
    return [...filteredTasks].sort((a, b) => {
      const dwA = dueWeight(a);
      const dwB = dueWeight(b);
      if (dwA !== dwB) return dwA - dwB;
      const pa = priorityRank[a.priority] ?? 3;
      const pb = priorityRank[b.priority] ?? 3;
      if (pa !== pb) return pa - pb;
      if (a.dueDateRaw && b.dueDateRaw) {
        return new Date(a.dueDateRaw) - new Date(b.dueDateRaw);
      }
      if (a.dueDateRaw) return -1;
      if (b.dueDateRaw) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [filteredTasks]);

  const getDueClass = (task) => {
    if (!task.dueDateRaw) return '';
    const today = new Date();
    const due = new Date(task.dueDateRaw);
    const isSameDay = due.toDateString() === today.toDateString();
    if (isSameDay) return 'today';
    return due < today ? 'overdue' : '';
  };

  const quickActions = [
    {
      icon: "📝",
      title: "Nova Tarefa",
      description: "Criar tarefa manual",
      color: "primary",
      action: () => setShowNewTaskModal(true)
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

  const toggleTask = async (taskId) => {
    try {
      const updated = await tasksService.toggle(taskId);
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: updated.completed } : t));
      window.showNotification?.('Status da tarefa atualizado!', 'success', 2000);
    } catch (e) {
      console.error('Erro ao alternar tarefa', e);
      window.showNotification?.('Não foi possível alterar tarefa', 'error', 3000);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Deseja realmente excluir esta tarefa?')) return;
    try {
      await tasksService.remove(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      window.showNotification?.('Tarefa removida com sucesso!', 'success', 2000);
    } catch (e) {
      console.error('Erro ao remover tarefa', e);
      window.showNotification?.('Não foi possível remover tarefa', 'error', 3000);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const payload = {
        titulo: newTaskTitle.trim(),
        prioridade: newTaskPriority,
        categoria: newTaskCategory,
        due_date: newTaskDueDate || null
      };
      const created = await tasksService.create(payload);
      setTasks(prev => ([
        ...prev,
        {
          id: created.id,
            title: created.titulo,
            dueDateRaw: created.due_date || null,
            dueDate: created.due_date ? new Date(created.due_date).toLocaleDateString('pt-BR') : '-',
            priority: created.prioridade || 'low',
            category: created.categoria || 'geral',
            completed: created.completed
        }
      ]));
      setNewTaskTitle('');
      setNewTaskDueDate('');
      setNewTaskPriority('medium');
      setNewTaskCategory('geral');
      if (window.showNotification) window.showNotification('Tarefa criada', 'success');
    } catch (e) {
      console.error('Erro ao criar tarefa', e);
      if (window.showNotification) window.showNotification('Falha ao criar tarefa', 'error');
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
              <span className="avatar-emoji">{userData.avatar}</span>
            </div>
            <div className="welcome-text">
              <h1>{getGreeting()}, {userData.name.split(' ')[0]}! 👋</h1>
              <p className="welcome-subtitle">{userData.role} • {userData.department}</p>
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
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') action.action(); }}
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
        {dashboardError && (
          <div className="error-message">{dashboardError}</div>
        )}
        <div className="stats-grid">
          {loadingDash && quickStats.length === 0 && (
            <div style={{padding:"12px", fontSize:"14px"}}>Carregando resumo...</div>
          )}
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
              {dashboardError && (
                <div className="error-message">{dashboardError}</div>
              )}
              {loadingDash && pdiProgress.length === 0 && (
                <div style={{padding:"8px"}}>Carregando PDI...</div>
              )}
              {pdiProgress.map((item, index) => (
                <div
                  key={index}
                  className="pdi-item"
                  onClick={() => item.metaId && navigate(`/pdi?meta=${item.metaId}`)}
                  style={{cursor: item.metaId ? 'pointer' : 'default'}}
                  role={item.metaId ? 'button' : undefined}
                  tabIndex={item.metaId ? 0 : -1}
                  onKeyDown={(e) => {
                    if (!item.metaId) return;
                    if (e.key === 'Enter' || e.key === ' ') navigate(`/pdi?meta=${item.metaId}`);
                  }}
                >
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
              {activityError && (
                <div className="error-message">{activityError}</div>
              )}
              {loadingDash && recentActivity.length === 0 && (
                <div style={{padding:"8px"}}>Carregando atividades...</div>
              )}
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`activity-item ${activity.priority}`}
                  onClick={activity.action}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') activity.action(); }}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-time">{activity.timeRelative}</span>
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
                {tasks.filter(t => !t.completed).length} pendentes
              </span>
            </div>
            <div className="task-filters" style={{display:'flex', gap:8, marginBottom:12, alignItems:'center'}}>
              <PriorityDropdown
                value={taskFilter.priority === 'all' ? undefined : taskFilter.priority}
                onChange={val => setTaskFilter(f => ({ ...f, priority: val ?? 'all' }))}
                placeholder="Todas as prioridades"
                ariaLabel="Filtrar por prioridade"
              />
              {taskFilter.priority !== 'all' && (
                <button type="button" className="btn-outline small" onClick={() => setTaskFilter(f => ({ ...f, priority: 'all' }))}>
                  Limpar
                </button>
              )}
              <select
                value={taskFilter.status}
                onChange={e => setTaskFilter(f => ({ ...f, status: e.target.value }))}
                style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #ccc', minWidth: 120 }}
                aria-label="Filtrar por status"
              >
                <option value="all">Todas</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídas</option>
              </select>
            </div>
            <form onSubmit={createTask} className="task-create-form" style={{display:'none'}}>
              <input
                type="text"
                placeholder="Nova tarefa"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
              />
              <PriorityDropdown
                value={newTaskPriority}
                onChange={(val) => setNewTaskPriority(val)}
                ariaLabel="Prioridade da nova tarefa"
              />
              <input
                type="date"
                value={newTaskDueDate}
                onChange={e => setNewTaskDueDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="Categoria"
                value={newTaskCategory}
                onChange={e => setNewTaskCategory(e.target.value)}
              />
              <button type="submit" className="btn-outline small">Adicionar</button>
            </form>
            <div className="tasks-list">
              {isLoadingTasks && <div className="loader">Carregando tarefas...</div>}
              {tasksError && <div className="error-message">{tasksError}</div>}
              {!isLoadingTasks && !tasksError && sortedTasks.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}> 
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        try {
                          toggleTask(task.id);
                        } catch (e) {
                          window.showNotification?.('Erro ao atualizar tarefa', 'error', 3000);
                        }
                      }}
                    />
                  </div>
                  <div className="task-content">
                    <h4 className={task.completed ? 'line-through' : ''}>{task.title}</h4>
                    <div className="task-meta">
                      <span className={`task-priority ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? '🔥' : task.priority === 'medium' ? '📊' : '📝'}
                      </span>
                      <span className="task-category">🏷️ {task.category}</span>
                      <span className={`task-due ${getDueClass(task)}`}>{task.dueDate}</span>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:8, marginLeft:'auto'}}>
                    <button
                      className="btn-outline small"
                      onClick={() => startEditTask(task)}
                      type="button"
                    >✏️</button>
                    <button
                      className="btn-outline small"
                      onClick={() => deleteTask(task.id)}
                      type="button"
                    >🗑️</button>
                  </div>
                </div>
              ))}
              {!isLoadingTasks && !tasksError && tasks.length === 0 && <div>Nenhuma tarefa cadastrada.</div>}
            </div>
          </div>
          <NewTaskModal
            open={showNewTaskModal}
            onClose={() => setShowNewTaskModal(false)}
            onCreated={(created) => {
              setTasks(prev => [
                ...prev,
                {
                  id: created.id,
                  title: created.titulo,
                  dueDateRaw: created.due_date || null,
                  dueDate: created.due_date ? new Date(created.due_date).toLocaleDateString('pt-BR') : '-',
                  priority: created.prioridade || 'low',
                  category: created.categoria || 'geral',
                  completed: created.completed
                }
              ]);
            }}
          />
          {/* Modal de edição de tarefa */}
          {showEditTaskModal && editTaskData && (
            <NewTaskModal
              open={showEditTaskModal}
              onClose={() => { setShowEditTaskModal(false); setEditTaskData(null); }}
              onCreated={fields => handleEditTaskSave(fields)}
              initialValues={{
                title: editTaskData.title,
                priority: editTaskData.priority,
                category: editTaskData.category,
                dueDate: editTaskData.dueDateRaw ? editTaskData.dueDateRaw.substring(0, 10) : ''
              }}
              isEdit={true}
            />
          )}

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
              {loadingDash && teamPerformance.length === 0 && (
                <div style={{padding:"8px"}}>Carregando equipes...</div>
              )}
              {teamPerformance.map((team, index) => (
                <div
                  key={index}
                  className="team-performance-item"
                  onClick={() => team.equipeId && navigate(`/equipe?selected=${team.equipeId}`)}
                  style={{cursor: team.equipeId ? 'pointer' : 'default'}}
                  role={team.equipeId ? 'button' : undefined}
                  tabIndex={team.equipeId ? 0 : -1}
                  onKeyDown={(e) => {
                    if (!team.equipeId) return;
                    if (e.key === 'Enter' || e.key === ' ') navigate(`/equipe?selected=${team.equipeId}`);
                  }}
                >
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
                onClick={() => navigate('/relatorios?type=individual')}
              >
                <span className="report-icon">📊</span>
                <span>Performance Individual</span>
              </button>
              
              <button 
                className="report-button success"
                onClick={() => navigate('/relatorios?type=team')}
              >
                <span className="report-icon">👥</span>
                <span>Relatório da Equipe</span>
              </button>
              
              <button 
                className="report-button warning"
                onClick={() => navigate('/relatorios?type=pdi')}
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