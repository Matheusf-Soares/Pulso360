import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import feedbackService from '../services/feedbackService';
import usuarioService from '../services/usuarioService';
import './Feedbacks.css';

/**
 * Componente para gerenciamento de Feedbacks
 * Permite visualizar feedbacks recebidos/enviados e criar novos feedbacks
 */
function Feedbacks() {
  const { user } = useAuth();
  
  // Estado principal
  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([]);
  const [feedbacksEnviados, setFeedbacksEnviados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navegação e filtros
  const [activeTab, setActiveTab] = useState('recebidos'); // 'recebidos' ou 'enviados'
  const [filterTipo, setFilterTipo] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal de novo feedback
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    para_usuario_id: '',
    tipo: 'positivo',
    texto: '',
    visivel_para_avaliado: true
  });
  
  // Estatísticas
  const [stats, setStats] = useState({
    totalRecebidos: 0,
    totalEnviados: 0,
    recebidosPorTipo: {
      positivo: 0,
      construtivo: 0,
      reconhecimento: 0
    }
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        setError('Usuário não autenticado');
        return;
      }

      // Carrega feedbacks e usuários em paralelo
      const [recebidos, enviados, usuariosData, statsData] = await Promise.all([
        feedbackService.getRecebidos(user.id, { size: 100 }),
        feedbackService.getEnviados(user.id, { size: 100 }),
        usuarioService.list({ size: 100 }),
        feedbackService.getStats(user.id)
      ]);

      setFeedbacksRecebidos(recebidos.items || []);
      setFeedbacksEnviados(enviados.items || []);
      setUsuarios(usuariosData.items || []);
      setStats(statsData);
    } catch (err) {
      console.error('Erro ao carregar feedbacks:', err);
      setError(err.response?.data?.detail || 'Erro ao carregar feedbacks');
    } finally {
      setLoading(false);
    }
  };

  // Funções de filtro
  const getFilteredFeedbacks = (feedbacks) => {
    let filtered = [...feedbacks];

    // Filtro por tipo
    if (filterTipo !== 'all') {
      filtered = filtered.filter(f => f.tipo === filterTipo);
    }

    // Busca por texto
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(f =>
        f.texto.toLowerCase().includes(search) ||
        getNomeUsuario(activeTab === 'recebidos' ? f.de_usuario_id : f.para_usuario_id)
          .toLowerCase()
          .includes(search)
      );
    }

    return filtered;
  };

  const getNomeUsuario = (usuarioId) => {
    const usuario = usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nome : 'Usuário não encontrado';
  };

  // Handlers do modal
  const handleOpenModal = () => {
    setFeedbackForm({
      para_usuario_id: '',
      tipo: 'positivo',
      texto: '',
      visivel_para_avaliado: true
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFeedbackForm({
      para_usuario_id: '',
      tipo: 'positivo',
      texto: '',
      visivel_para_avaliado: true
    });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    
    try {
      if (!feedbackForm.para_usuario_id || !feedbackForm.texto) {
        alert('Destinatário e texto são obrigatórios');
        return;
      }

      await feedbackService.create({
        ...feedbackForm,
        de_usuario_id: user.id
      });

      handleCloseModal();
      loadData(); // Recarrega os dados
    } catch (err) {
      console.error('Erro ao enviar feedback:', err);
      alert(err.response?.data?.detail || 'Erro ao enviar feedback');
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (!window.confirm('Tem certeza que deseja excluir este feedback?')) {
      return;
    }

    try {
      await feedbackService.delete(feedbackId);
      loadData();
    } catch (err) {
      console.error('Erro ao excluir feedback:', err);
      alert(err.response?.data?.detail || 'Erro ao excluir feedback');
    }
  };

  // Formatação
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTipoLabel = (tipo) => {
    const labels = {
      'positivo': 'Positivo',
      'construtivo': 'Construtivo',
      'reconhecimento': 'Reconhecimento'
    };
    return labels[tipo] || tipo;
  };

  const getTipoIcon = (tipo) => {
    const icons = {
      'positivo': '👍',
      'construtivo': '💡',
      'reconhecimento': '⭐'
    };
    return icons[tipo] || '📝';
  };

  const getTipoColor = (tipo) => {
    const colors = {
      'positivo': '#28a745',
      'construtivo': '#ffc107',
      'reconhecimento': '#17a2b8'
    };
    return colors[tipo] || '#6c757d';
  };

  // Renderização
  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando feedbacks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-state">
          <h3>Erro ao carregar feedbacks</h3>
          <p>{error}</p>
          <button onClick={loadData} className="btn-primary">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const feedbacksAtivos = activeTab === 'recebidos' ? feedbacksRecebidos : feedbacksEnviados;
  const filteredFeedbacks = getFilteredFeedbacks(feedbacksAtivos);

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="user-avatar-large">💬</div>
            <div className="welcome-text">
              <h1>Feedbacks</h1>
              <p className="welcome-subtitle">Gerencie seus feedbacks recebidos e enviados</p>
            </div>
          </div>
          <div className="header-controls">
            <button onClick={handleOpenModal} className="btn-header-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 7V0H9V7H16V9H9V16H7V9H0V7H7Z" fill="currentColor"/>
              </svg>
              Novo Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
            <span style={{ color: '#1976d2' }}>📥</span>
          </div>
          <div className="stat-content">
            <h3>{stats.totalRecebidos}</h3>
            <p>Recebidos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
            <span style={{ color: '#388e3c' }}>📤</span>
          </div>
          <div className="stat-content">
            <h3>{stats.totalEnviados}</h3>
            <p>Enviados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
            <span style={{ color: '#388e3c' }}>👍</span>
          </div>
          <div className="stat-content">
            <h3>{stats.recebidosPorTipo.positivo}</h3>
            <p>Positivos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff3e0' }}>
            <span style={{ color: '#f57c00' }}>💡</span>
          </div>
          <div className="stat-content">
            <h3>{stats.recebidosPorTipo.construtivo}</h3>
            <p>Construtivos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e1f5fe' }}>
            <span style={{ color: '#0288d1' }}>⭐</span>
          </div>
          <div className="stat-content">
            <h3>{stats.recebidosPorTipo.reconhecimento}</h3>
            <p>Reconhecimentos</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'recebidos' ? 'active' : ''}`}
          onClick={() => setActiveTab('recebidos')}
        >
          📥 Recebidos ({feedbacksRecebidos.length})
        </button>
        <button
          className={`tab ${activeTab === 'enviados' ? 'active' : ''}`}
          onClick={() => setActiveTab('enviados')}
        >
          📤 Enviados ({feedbacksEnviados.length})
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar feedbacks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
          className="filter-select"
        >
          <option value="all">Todos os Tipos</option>
          <option value="positivo">Positivo</option>
          <option value="construtivo">Construtivo</option>
          <option value="reconhecimento">Reconhecimento</option>
        </select>
      </div>

      {/* Feedbacks List */}
      <div className="feedbacks-list">
        {filteredFeedbacks.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum feedback encontrado</p>
            {activeTab === 'enviados' && (
              <button onClick={handleOpenModal} className="btn-secondary">
                Enviar Primeiro Feedback
              </button>
            )}
          </div>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-header">
                <div className="feedback-user">
                  <div className="user-avatar">
                    {activeTab === 'recebidos'
                      ? getNomeUsuario(feedback.de_usuario_id).charAt(0).toUpperCase()
                      : getNomeUsuario(feedback.para_usuario_id).charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h4>
                      {activeTab === 'recebidos' ? 'De: ' : 'Para: '}
                      {activeTab === 'recebidos'
                        ? getNomeUsuario(feedback.de_usuario_id)
                        : getNomeUsuario(feedback.para_usuario_id)}
                    </h4>
                    <span className="feedback-date">{formatDate(feedback.data_criacao)}</span>
                  </div>
                </div>
                <div className="feedback-actions">
                  <span
                    className="badge badge-tipo"
                    style={{ backgroundColor: getTipoColor(feedback.tipo) }}
                  >
                    {getTipoIcon(feedback.tipo)} {getTipoLabel(feedback.tipo)}
                  </span>
                  {activeTab === 'enviados' && (
                    <button
                      onClick={() => handleDeleteFeedback(feedback.id)}
                      className="btn-icon btn-danger"
                      title="Excluir feedback"
                    >
                      🗑
                    </button>
                  )}
                </div>
              </div>
              <div className="feedback-body">
                <p>{feedback.texto}</p>
              </div>
              {!feedback.visivel_para_avaliado && (
                <div className="feedback-footer">
                  <span className="privacy-badge">🔒 Privado</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal Novo Feedback */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Novo Feedback</h2>
              <button onClick={handleCloseModal} className="modal-close">×</button>
            </div>
            <form onSubmit={handleSubmitFeedback}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Para *</label>
                  <select
                    value={feedbackForm.para_usuario_id}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, para_usuario_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione um usuário</option>
                    {usuarios
                      .filter(u => u.id !== user.id) // Remove o próprio usuário
                      .map(u => (
                        <option key={u.id} value={u.id}>
                          {u.nome}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tipo *</label>
                  <select
                    value={feedbackForm.tipo}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, tipo: e.target.value })}
                    required
                  >
                    <option value="positivo">👍 Positivo</option>
                    <option value="construtivo">💡 Construtivo</option>
                    <option value="reconhecimento">⭐ Reconhecimento</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Mensagem *</label>
                  <textarea
                    value={feedbackForm.texto}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, texto: e.target.value })}
                    placeholder="Escreva seu feedback..."
                    rows="5"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={feedbackForm.visivel_para_avaliado}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, visivel_para_avaliado: e.target.checked })}
                    />
                    Visível para o destinatário
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Enviar Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedbacks;
