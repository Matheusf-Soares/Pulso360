import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Notificacoes = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('todos');
  const [filterType, setFilterType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  // Informações do usuário logado
  const currentUser = user ? {
    name: user.nome || 'Usuário',
    manager: user.gestor || 'Gestor'
  } : {
    name: 'Usuário',
    manager: 'Gestor'
  };

  // Dados simulados de notificações (personalizadas para o usuário)
  const mockNotifications = [
    {
      id: 1,
      title: "Nova avaliação disponível",
      message: `${currentUser.name}, sua avaliação de performance do 4º trimestre está disponível para visualização.`,
      type: "info",
      date: new Date(2025, 10, 13, 9, 30),
      read: false,
      category: "avaliacao",
      priority: "medium",
      sender: "Sistema de RH"
    },
    {
      id: 2,
      title: "Meta concluída com sucesso!",
      message: `Parabéns ${currentUser.name}! Você concluiu a meta 'Implementar Dashboard Analytics' com 95% de qualidade.`,
      type: "success",
      date: new Date(2025, 10, 12, 14, 45),
      read: false,
      category: "meta",
      priority: "high",
      sender: "Sistema de Metas"
    },
    {
      id: 3,
      title: "Reunião de PDI agendada",
      message: `Sua reunião de revisão do PDI foi agendada para 15/11/2025 às 14h30 com seu gestor ${currentUser.manager}.`,
      type: "warning",
      date: new Date(2025, 10, 11, 16, 20),
      read: true,
      category: "reuniao",
      priority: "high",
      sender: currentUser.manager
    },
    {
      id: 4,
      title: "Novo curso disponível",
      message: "O curso 'React Advanced Patterns' foi adicionado ao seu plano de desenvolvimento.",
      type: "info",
      date: new Date(2025, 10, 10, 10, 15),
      read: true,
      category: "treinamento",
      priority: "low",
      sender: "Academia Digital"
    },
    {
      id: 5,
      title: "Prazo de entrega próximo",
      message: "A entrega do projeto 'Refatoração do Sistema de Login' vence em 2 dias.",
      type: "warning",
      date: new Date(2025, 10, 9, 11, 0),
      read: false,
      category: "projeto",
      priority: "high",
      sender: "Sistema de Projetos"
    },
    {
      id: 6,
      title: "Feedback recebido",
      message: "Ana Silva deixou um feedback positivo sobre sua colaboração no projeto de UX.",
      type: "success",
      date: new Date(2025, 10, 8, 15, 30),
      read: true,
      category: "feedback",
      priority: "medium",
      sender: "Ana Silva"
    },
    {
      id: 7,
      title: "Atualização de perfil necessária",
      message: "Alguns dados do seu perfil estão desatualizados. Por favor, atualize suas informações.",
      type: "warning",
      date: new Date(2025, 10, 7, 9, 0),
      read: false,
      category: "sistema",
      priority: "medium",
      sender: "Sistema"
    },
    {
      id: 8,
      title: "Nova funcionalidade disponível",
      message: "O Pulso360 agora possui um novo módulo de relatórios avançados. Confira!",
      type: "info",
      date: new Date(2025, 10, 6, 13, 45),
      read: true,
      category: "sistema",
      priority: "low",
      sender: "Equipe de Desenvolvimento"
    },
    {
      id: 9,
      title: "Resultado da avaliação 360º",
      message: "Os resultados da sua avaliação 360º estão disponíveis. Pontuação geral: 4.7/5.0",
      type: "success",
      date: new Date(2025, 9, 25, 16, 0),
      read: true,
      category: "avaliacao",
      priority: "high",
      sender: "Sistema de RH"
    },
    {
      id: 10,
      title: "Lembrete: One-on-One semanal",
      message: "Não se esqueça da sua reunião one-on-one com Carlos Mendes hoje às 16h.",
      type: "info",
      date: new Date(2025, 9, 20, 8, 0),
      read: true,
      category: "reuniao",
      priority: "medium",
      sender: "Sistema de Agenda"
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtrar notificações por período
  useEffect(() => {
    let filtered = notifications;
    const now = new Date();

    // Filtrar por período
    if (filterPeriod !== 'todos') {
      filtered = filtered.filter(notification => {
        const notifDate = notification.date;
        const diffTime = Math.abs(now - notifDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (filterPeriod) {
          case 'hoje':
            return diffDays <= 1;
          case 'semana':
            return diffDays <= 7;
          case 'mes':
            return diffDays <= 30;
          case 'ano':
            return diffDays <= 365;
          default:
            return true;
        }
      });
    }

    // Filtrar por tipo
    if (filterType !== 'todos') {
      filtered = filtered.filter(notification => notification.type === filterType);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [filterPeriod, filterType, searchTerm, notifications]);

  // Estatísticas das notificações
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    today: notifications.filter(n => {
      const today = new Date();
      const notifDate = n.date;
      return notifDate.toDateString() === today.toDateString();
    }).length,
    priority: notifications.filter(n => n.priority === 'high').length
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
    
    if (window.showNotification) {
      window.showNotification("Notificação marcada como lida", "success", 2000);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    
    if (window.showNotification) {
      window.showNotification("Todas as notificações foram marcadas como lidas", "success", 3000);
    }
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    
    if (window.showNotification) {
      window.showNotification("Notificação excluída", "info", 2000);
    }
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedNotifications = () => {
    setNotifications(prev => prev.filter(notif => !selectedNotifications.includes(notif.id)));
    setSelectedNotifications([]);
    
    if (window.showNotification) {
      window.showNotification(`${selectedNotifications.length} notificações excluídas`, "info", 3000);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'primary';
      default: return 'muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '📊';
      case 'low': return '📝';
      default: return '📋';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} min atrás`;
    } else if (diffHours < 24) {
      return `${diffHours}h atrás`;
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return `${diffDays} dias atrás`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  return (
    <div className="notifications-container">
      {/* Header Profissional */}
      <div className="notifications-header-modern">
        <div className="header-background-pattern"></div>
        
        <div className="header-main-content">
          <div className="header-left-section">
            <div className="header-icon-wrapper-notif">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white"/>
              </svg>
            </div>
            
            <div className="header-text-content">
              <h1 className="header-title-modern">Central de Notificações</h1>
              <p className="header-subtitle-modern">Acompanhe atualizações, lembretes e eventos importantes em tempo real</p>
            </div>
          </div>
          
          <div className="header-right-section">
            <button className="btn-header-secondary" onClick={markAllAsRead}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.75 11.25L3.75 8.25L2.6925 9.3075L6.75 13.365L15.75 4.365L14.6925 3.3075L6.75 11.25Z" fill="currentColor"/>
                <path d="M6.75 8.25L9.75 5.25L8.6925 4.1925L5.6925 7.1925L6.75 8.25Z" fill="currentColor"/>
              </svg>
              Marcar Todas como Lidas
            </button>
            
            {selectedNotifications.length > 0 && (
              <button className="btn-header-danger" onClick={deleteSelectedNotifications}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25H4.5V14.25ZM6 6.75H12V14.25H6V6.75ZM11.625 3L10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625Z" fill="currentColor"/>
                </svg>
                Excluir ({selectedNotifications.length})
              </button>
            )}
          </div>
        </div>
        
        {/* Stats Cards Integradas no Header */}
        <div className="header-stats-cards">
          <div className="stat-card-header total">
            <div className="stat-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM6 10H18V12H6V10ZM6 14H14V16H6V14Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total de Notificações</span>
            </div>
            <div className="stat-trend">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3L12 7H9V13H7V7H4L8 3Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <div className={`stat-card-header unread ${stats.unread > 0 ? 'has-unread' : ''}`}>
            <div className="stat-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.unread}</span>
              <span className="stat-label">Não Lidas</span>
            </div>
            {stats.unread > 0 && (
              <div className="stat-badge-pulse">
                <span className="pulse-dot"></span>
              </div>
            )}
          </div>
          
          <div className="stat-card-header today">
            <div className="stat-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM19 7H5V5H19V7ZM7 11H17V13H7V11Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.today}</span>
              <span className="stat-label">Recebidas Hoje</span>
            </div>
            <div className="stat-trend success">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L2 8L3.4 6.6L6 9.2L12.6 2.6L14 4L6 12Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <div className={`stat-card-header priority ${stats.priority > 0 ? 'has-priority' : ''}`}>
            <div className="stat-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V17C2 20.87 5.84 24 12 24C18.16 24 22 20.87 22 17V7L12 2ZM12 5.5L18.16 9L12 12.5L5.84 9L12 5.5ZM12 22C7.03 22 4 19.45 4 17V10.61L12 15.11L20 10.61V17C20 19.45 16.97 22 12 22ZM11 13H13V15H11V13ZM11 9H13V11H11V9Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.priority}</span>
              <span className="stat-label">Alta Prioridade</span>
            </div>
            {stats.priority > 0 && (
              <div className="stat-badge-fire">🔥</div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros e controles */}
      <div className="notifications-controls">
        <div className="controls-left">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Buscar notificações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="filter-select"
          >
            <option value="todos">📅 Todos os períodos</option>
            <option value="hoje">📅 Hoje</option>
            <option value="semana">📅 Esta semana</option>
            <option value="mes">📅 Este mês</option>
            <option value="ano">📅 Este ano</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="todos">🏷️ Todos os tipos</option>
            <option value="success">✅ Sucesso</option>
            <option value="warning">⚠️ Aviso</option>
            <option value="info">ℹ️ Informação</option>
            <option value="error">❌ Erro</option>
          </select>
        </div>
        
        <div className="controls-right">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋
            </button>
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
          </div>
        </div>
      </div>

      {/* Lista de notificações */}
      <div className="notifications-content">
        <div className="notifications-list-header">
          <h3>📋 Notificações ({filteredNotifications.length})</h3>
        </div>
        
        <div className={`notifications-list ${viewMode}`}>
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>Nenhuma notificação encontrada</h3>
              <p>Tente ajustar os filtros ou aguarde novas notificações</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'} ${getNotificationColor(notification.type)}`}
              >
                <div className="notification-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelectNotification(notification.id)}
                  />
                </div>
                
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <div className="notification-meta">
                      <span className="priority-badge">
                        {getPriorityIcon(notification.priority)}
                      </span>
                      <span className="notification-time">
                        {formatDate(notification.date)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="notification-message">{notification.message}</p>
                  
                  <div className="notification-footer">
                    <span className="notification-sender">
                      👤 {notification.sender}
                    </span>
                    <span className="notification-category">
                      🏷️ {notification.category}
                    </span>
                  </div>
                </div>
                
                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      className="action-btn"
                      onClick={() => markAsRead(notification.id)}
                      title="Marcar como lida"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    className="action-btn danger"
                    onClick={() => deleteNotification(notification.id)}
                    title="Excluir notificação"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notificacoes;