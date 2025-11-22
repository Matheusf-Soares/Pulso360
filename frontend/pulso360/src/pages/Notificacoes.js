import React, { useState, useEffect } from 'react';

const Notificacoes = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('todos');
  const [filterType, setFilterType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  // Dados simulados de notificações
  const mockNotifications = [
    {
      id: 1,
      title: "Nova avaliação disponível",
      message: "Sua avaliação de performance do 4º trimestre está disponível para visualização.",
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
      message: "Parabéns! Você concluiu a meta 'Implementar Dashboard Analytics' com 95% de qualidade.",
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
      message: "Sua reunião de revisão do PDI foi agendada para 15/11/2025 às 14h30 com seu gestor Carlos Mendes.",
      type: "warning",
      date: new Date(2025, 10, 11, 16, 20),
      read: true,
      category: "reuniao",
      priority: "high",
      sender: "Carlos Mendes"
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
      {/* Header da página */}
      <div className="notifications-header">
        <div className="header-content">
          <div className="header-info">
            <h1>🔔 Notificações</h1>
            <p>Acompanhe todas as atualizações e lembretes importantes</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={markAllAsRead}>
            <span>✓</span>
            Marcar Todas como Lidas
          </button>
          {selectedNotifications.length > 0 && (
            <button className="btn-outline" onClick={deleteSelectedNotifications}>
              <span>🗑️</span>
              Excluir Selecionadas ({selectedNotifications.length})
            </button>
          )}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="notifications-stats">
        <h2>📊 Resumo das Notificações</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">📨</span>
              <span className="trend-indicator primary">↗️</span>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-title">Total</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">📬</span>
              <span className={`trend-indicator ${stats.unread > 0 ? 'warning' : 'success'}`}>
                {stats.unread > 0 ? '⚠️' : '✅'}
              </span>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.unread}</div>
              <div className="stat-title">Não Lidas</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">📅</span>
              <span className="trend-indicator success">📈</span>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.today}</div>
              <div className="stat-title">Hoje</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">🚨</span>
              <span className={`trend-indicator ${stats.priority > 0 ? 'error' : 'success'}`}>
                {stats.priority > 0 ? '🔥' : '✅'}
              </span>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.priority}</div>
              <div className="stat-title">Alta Prioridade</div>
            </div>
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