import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import tasksService from '../services/tasksService';
import PriorityDropdown from '../components/PriorityDropdown';
import '../styles/Tarefas.css';

export default function Tarefas() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Estados
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed
  const [filterPriority, setFilterPriority] = useState('all'); // all, high, medium, low
  const [sortBy, setSortBy] = useState('date'); // date, priority, title
  
  // Modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    titulo: '',
    prioridade: 'medium',
    categoria: 'geral',
    due_date: ''
  });

  // Carregar tarefas
  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadTasks = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await tasksService.list(user.id);
      setTasks(Array.isArray(data) ? data : []);
      console.log('✅ Tarefas carregadas:', data);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
      setError('Não foi possível carregar as tarefas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Deletar tarefa
  const handleDelete = async (taskId) => {
    if (!window.confirm('Deseja realmente excluir esta tarefa?')) return;
    
    try {
      await tasksService.remove(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
      if (window.showNotification) {
        window.showNotification('Tarefa excluída com sucesso!', 'success', 3000);
      }
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err);
      if (window.showNotification) {
        window.showNotification('Erro ao excluir tarefa', 'error', 3000);
      }
    }
  };

  // Toggle concluída
  const handleToggle = async (taskId) => {
    try {
      const updated = await tasksService.toggle(taskId);
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: updated.completed } : t));
      if (window.showNotification) {
        window.showNotification(
          updated.completed ? 'Tarefa concluída! ✅' : 'Tarefa reaberta',
          'success',
          2000
        );
      }
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      if (window.showNotification) {
        window.showNotification('Erro ao atualizar tarefa', 'error', 3000);
      }
    }
  };

  // Abrir modal de edição
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditForm({
      titulo: task.titulo || '',
      prioridade: task.prioridade || 'medium',
      categoria: task.categoria || 'geral',
      due_date: task.due_date ? task.due_date.split('T')[0] : ''
    });
    setShowEditModal(true);
  };

  // Salvar edição
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editForm.titulo.trim() || !editingTask) return;

    try {
      const updated = await tasksService.update(editingTask.id, editForm);
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...updated } : t));
      setShowEditModal(false);
      setEditingTask(null);
      if (window.showNotification) {
        window.showNotification('Tarefa atualizada com sucesso!', 'success', 3000);
      }
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      if (window.showNotification) {
        window.showNotification('Erro ao atualizar tarefa', 'error', 3000);
      }
    }
  };

  // Filtrar e ordenar tarefas
  const filteredTasks = tasks
    .filter(task => {
      // Filtro de busca
      if (searchTerm && !task.titulo.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtro de status
      if (filterStatus === 'pending' && task.completed) return false;
      if (filterStatus === 'completed' && !task.completed) return false;
      
      // Filtro de prioridade
      if (filterPriority !== 'all' && task.prioridade !== filterPriority) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.prioridade] - priorityOrder[b.prioridade];
        case 'title':
          return a.titulo.localeCompare(b.titulo);
        case 'date':
        default:
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
    });

  // Estatísticas
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.prioridade === 'high' && !t.completed).length,
  };

  // Limpar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterPriority('all');
    setSortBy('date');
  };

  // Contar filtros ativos
  const activeFiltersCount = 
    (searchTerm ? 1 : 0) +
    (filterStatus !== 'all' ? 1 : 0) +
    (filterPriority !== 'all' ? 1 : 0) +
    (sortBy !== 'date' ? 1 : 0);

  // Ícone de prioridade
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  // Label de prioridade
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="user-avatar-large">📋</div>
            <div className="welcome-text">
              <h1>Minhas Tarefas</h1>
              <p className="welcome-subtitle">Gerencie todas as suas tarefas e pendências</p>
            </div>
          </div>
          <div className="header-controls">
            <button 
              className="btn-header-primary"
              onClick={() => navigate('/tarefas/nova')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Nova Tarefa
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="home-stats">
        <div className="stat-grid-home">
          <div className="stat-card-home">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-label">Total</span>
              <span className="stat-value">{stats.total}</span>
            </div>
          </div>
          <div className="stat-card-home success">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-label">Concluídas</span>
              <span className="stat-value">{stats.completed}</span>
            </div>
          </div>
          <div className="stat-card-home warning">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <span className="stat-label">Pendentes</span>
              <span className="stat-value">{stats.pending}</span>
            </div>
          </div>
          <div className="stat-card-home error">
            <div className="stat-icon">🔴</div>
            <div className="stat-info">
              <span className="stat-label">Alta Prioridade</span>
              <span className="stat-value">{stats.high}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="home-card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h3>🔍 Filtros e Busca</h3>
            {activeFiltersCount > 0 && (
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                boxShadow: '0 2px 4px rgba(102, 126, 234, 0.3)'
              }}>
                {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro ativo' : 'filtros ativos'}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                color: '#6b7280',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fee2e2';
                e.currentTarget.style.borderColor = '#fca5a5';
                e.currentTarget.style.color = '#991b1b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM4.5 7.5l3-3 1 1-3 3 3 3-1 1-3-3-1-1 1-1zm7 1l-3 3-1-1 3-3-3-3 1-1 3 3 1 1-1 1z"/>
              </svg>
              Limpar Filtros
            </button>
          )}
        </div>
        <div className="tasks-filters" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          padding: '1.5rem'
        }}>
          <div className="filter-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M7 13L7 3M7 3L4 6M7 3L10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11.5" cy="11.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.5 13.5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Buscar
            </label>
            <input
              type="text"
              className="search-input"
              placeholder="Digite para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: searchTerm ? '2px solid #667eea' : '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                background: searchTerm ? '#f5f7ff' : 'white'
              }}
            />
          </div>

          <div className="filter-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4a1 1 0 011-1h3a1 1 0 110 2H9a1 1 0 01-1-1zM5 7a1 1 0 011-1h5a1 1 0 110 2H6a1 1 0 01-1-1zM3 10a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
              Status
            </label>
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: filterStatus !== 'all' ? '2px solid #667eea' : '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: filterStatus !== 'all' ? '#f5f7ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <option value="all">📋 Todas</option>
              <option value="pending">⏳ Pendentes</option>
              <option value="completed">✅ Concluídas</option>
            </select>
          </div>

          <div className="filter-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L10 5L16 6L11 10L13 16L8 13L3 16L5 10L0 6L6 5L8 0Z"/>
              </svg>
              Prioridade
            </label>
            <select 
              className="filter-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: filterPriority !== 'all' ? '2px solid #667eea' : '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: filterPriority !== 'all' ? '#f5f7ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <option value="all">⚡ Todas</option>
              <option value="high">🔴 Alta</option>
              <option value="medium">🟡 Média</option>
              <option value="low">🟢 Baixa</option>
            </select>
          </div>

          <div className="filter-group" style={{ marginBottom: 0 }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem',
              fontWeight: '600',
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 4h12v2H2V4zm0 4h12v2H2V8zm0 4h8v2H2v-2z"/>
              </svg>
              Ordenar por
            </label>
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: sortBy !== 'date' ? '2px solid #667eea' : '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: sortBy !== 'date' ? '#f5f7ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <option value="date">📅 Data</option>
              <option value="priority">⭐ Prioridade</option>
              <option value="title">🔤 Título</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="home-card">
        <div className="card-header">
          <h3>📋 Lista de Tarefas</h3>
        </div>
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando tarefas...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#fee"/>
              <path d="M32 20V36M32 44H32.02" stroke="#dc2626" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <h3>Erro ao carregar tarefas</h3>
            <p>{error}</p>
            <button className="btn-primary" onClick={loadTasks}>
              Tentar Novamente
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#f5f6fa"/>
              <path d="M32 16C23.2 16 16 23.2 16 32C16 40.8 23.2 48 32 48C40.8 48 48 40.8 48 32C48 23.2 40.8 16 32 16ZM36 36H28V28H36V36Z" fill="#b2bec3"/>
            </svg>
            <h3>
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                ? 'Nenhuma tarefa encontrada' 
                : 'Nenhuma tarefa cadastrada'}
            </h3>
            <p>
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece criando sua primeira tarefa'}
            </p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/tarefas/nova')}
            >
              Criar Primeira Tarefa
            </button>
          </div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-card ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed || false}
                    onChange={() => handleToggle(task.id)}
                  />
                </div>
                
                <div className="task-content">
                  <div className="task-header">
                    <h4 className={task.completed ? 'line-through' : ''}>
                      {task.titulo}
                    </h4>
                    <div className="task-badges">
                      <span className={`priority-badge priority-${task.prioridade}`}>
                        {getPriorityIcon(task.prioridade)} {getPriorityLabel(task.prioridade)}
                      </span>
                      {task.categoria && task.categoria !== 'geral' && (
                        <span className="category-badge">
                          🏷️ {task.categoria}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="task-meta">
                    {task.due_date && (
                      <span className="task-date">
                        📅 {new Date(task.due_date).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                    {task.created_at && (
                      <span className="task-created">
                        Criada em {new Date(task.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="task-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => openEditModal(task)}
                    title="Editar tarefa"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M11.5 2L14 4.5L5 13.5H2.5V11L11.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(task.id)}
                    title="Excluir tarefa"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4H14M6 4V2H10V4M3 4V14C3 14.5 3.5 15 4 15H12C12.5 15 13 14.5 13 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Edição */}
      {showEditModal && editingTask && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Editar Tarefa</h2>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="modal-body">
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  className="form-control"
                  value={editForm.titulo}
                  onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Prioridade</label>
                <PriorityDropdown
                  value={editForm.prioridade}
                  onChange={(value) => setEditForm({ ...editForm, prioridade: value })}
                  ariaLabel="Prioridade"
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="geral, dev, suporte..."
                  value={editForm.categoria}
                  onChange={(e) => setEditForm({ ...editForm, categoria: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Data de Vencimento</label>
                <input
                  type="date"
                  className="form-control"
                  value={editForm.due_date}
                  onChange={(e) => setEditForm({ ...editForm, due_date: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button 
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                  disabled={!editForm.titulo.trim()}
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
