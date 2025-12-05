import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import pdiService from '../services/pdiService';
import metaService from '../services/metaService';
import acaoMetaService from '../services/acaoMetaService';
import './PDI.css';

/**
 * Componente principal para gerenciamento do PDI (Plano de Desenvolvimento Individual)
 * Integrado com backend real usando pdiService, metaService e acaoMetaService
 */
function PDI() {
  const { user } = useAuth();
  
  // Estado principal
  const [pdiData, setPdiData] = useState(null);
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtros e navegação
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modais de Meta
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [goalModalType, setGoalModalType] = useState('add'); // 'add' ou 'edit'
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalForm, setGoalForm] = useState({
    titulo: '',
    descricao: '',
    data_inicio: '',
    data_fim: '',
    status: 'em_andamento'
  });
  
  // Modais de Ação
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalType, setActionModalType] = useState('add');
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionForm, setActionForm] = useState({
    descricao: '',
    data_inicio: '',
    data_fim: '',
    status: 'pendente',
    meta_id: null
  });

  /**
   * Carrega o PDI ativo do usuário e suas metas
   */
  useEffect(() => {
    loadPDI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadPDI = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.id) {
        setError('Usuário não autenticado');
        return;
      }

      // Busca PDI ativo do usuário
      const pdiResult = await pdiService.list({ usuario_id: user.id, status: 'ativo' });
      let pdi = pdiResult.items && pdiResult.items.length > 0 ? pdiResult.items[0] : null;
      
      if (pdi) {
        setPdiData(pdi);
        
        // Busca metas do PDI
        const metasResult = await metaService.list({ pdi_id: pdi.id });
        const metasData = metasResult.items || [];
        
        // Para cada meta, busca suas ações
        const metasComAcoes = await Promise.all(
          metasData.map(async (meta) => {
            try {
              const acoesResult = await acaoMetaService.list({ meta_id: meta.id });
              return {
                ...meta,
                acoes: acoesResult.items || []
              };
            } catch (err) {
              console.warn('Erro ao buscar ações da meta:', meta.id, err);
              return {
                ...meta,
                acoes: []
              };
            }
          })
        );
        
        setMetas(metasComAcoes);
      } else {
        // Sem PDI ativo - usuário precisa criar metas diretamente
        setError('Nenhum PDI ativo encontrado. Entre em contato com o administrador para criar um ciclo de avaliação.');
        setPdiData(null);
        setMetas([]);
      }
    } catch (err) {
      console.error('Erro ao carregar PDI:', err);
      setError(err.response?.data?.detail || err.message || 'Erro ao carregar PDI');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calcula estatísticas do PDI
   */
  const calculateStats = () => {
    if (!metas || metas.length === 0) {
      return {
        total: 0,
        concluidas: 0,
        emAndamento: 0,
        naoIniciadas: 0,
        atrasadas: 0,
        progressoGeral: 0
      };
    }

    const total = metas.length;
    const concluidas = metas.filter(m => m.status === 'concluida').length;
    const emAndamento = metas.filter(m => m.status === 'em_andamento').length;
    const naoIniciadas = metas.filter(m => m.status === 'nao_iniciada').length;
    
    // Verifica metas atrasadas
    const hoje = new Date();
    const atrasadas = metas.filter(m => {
      if (m.status === 'concluida') return false;
      if (!m.data_fim) return false;
      const prazo = new Date(m.data_fim);
      return prazo < hoje;
    }).length;

    // Calcula progresso geral baseado em todas as ações
    let totalAcoes = 0;
    let acoesConcluidas = 0;
    
    metas.forEach(meta => {
      if (meta.acoes && meta.acoes.length > 0) {
        totalAcoes += meta.acoes.length;
        acoesConcluidas += meta.acoes.filter(a => a.status === 'concluida').length;
      }
    });

    const progressoGeral = totalAcoes > 0 ? Math.round((acoesConcluidas / totalAcoes) * 100) : 0;

    return {
      total,
      concluidas,
      emAndamento,
      naoIniciadas,
      atrasadas,
      progressoGeral
    };
  };

  /**
   * Filtra metas baseado nos filtros ativos
   */
  const getFilteredMetas = () => {
    let filtered = [...metas];

    // Filtro de status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => m.status === filterStatus);
    }

    // Busca por texto
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.titulo.toLowerCase().includes(search) ||
        (m.descricao && m.descricao.toLowerCase().includes(search))
      );
    }

    return filtered;
  };

  // ===== HANDLERS DE META =====

  const handleOpenAddGoal = () => {
    const hoje = new Date().toISOString().split('T')[0];
    setGoalForm({
      titulo: '',
      descricao: '',
      data_inicio: hoje,
      data_fim: '',
      status: 'em_andamento'
    });
    setGoalModalType('add');
    setIsGoalModalOpen(true);
  };

  const handleOpenEditGoal = (meta) => {
    setSelectedGoal(meta);
    setGoalForm({
      titulo: meta.titulo,
      descricao: meta.descricao || '',
      data_inicio: meta.data_inicio ? meta.data_inicio.split('T')[0] : '',
      data_fim: meta.data_fim ? meta.data_fim.split('T')[0] : '',
      status: meta.status
    });
    setGoalModalType('edit');
    setIsGoalModalOpen(true);
  };

  const handleCloseGoalModal = () => {
    setIsGoalModalOpen(false);
    setSelectedGoal(null);
    setGoalForm({
      titulo: '',
      descricao: '',
      data_inicio: '',
      data_fim: '',
      status: 'em_andamento'
    });
  };

  const handleSaveGoal = async () => {
    try {
      if (!goalForm.titulo || !goalForm.data_fim) {
        alert('Título e data final são obrigatórios');
        return;
      }

      if (!pdiData?.id) {
        alert('PDI não encontrado. Atualize a página.');
        return;
      }

      const metaData = {
        titulo: goalForm.titulo,
        descricao: goalForm.descricao || null,
        data_inicio: goalForm.data_inicio || null,
        data_fim: goalForm.data_fim,
        status: goalForm.status,
        pdi_id: pdiData.id,
        usuario_id: user.id
      };

      if (goalModalType === 'add') {
        const novaMeta = await metaService.create(metaData);
        setMetas([...metas, { ...novaMeta, acoes: [] }]);
      } else {
        const metaAtualizada = await metaService.update(selectedGoal.id, metaData);
        setMetas(metas.map(m => m.id === selectedGoal.id ? { ...metaAtualizada, acoes: m.acoes } : m));
      }

      handleCloseGoalModal();
      if (window.showNotification) {
        window.showNotification(
          goalModalType === 'add' ? 'Meta criada com sucesso!' : 'Meta atualizada com sucesso!',
          'success',
          3000
        );
      }
    } catch (err) {
      console.error('Erro ao salvar meta:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Erro ao salvar meta';
      alert(errorMsg);
    }
  };

  const handleDeleteGoal = async (metaId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta meta?')) {
      return;
    }

    try {
      await metaService.delete(metaId);
      setMetas(metas.filter(m => m.id !== metaId));
    } catch (err) {
      console.error('Erro ao excluir meta:', err);
      alert(err.response?.data?.detail || 'Erro ao excluir meta');
    }
  };

  // ===== HANDLERS DE AÇÃO =====

  const handleOpenAddAction = (meta) => {
    setSelectedGoal(meta);
    const hoje = new Date().toISOString().split('T')[0];
    setActionForm({
      descricao: '',
      data_inicio: hoje,
      data_fim: '',
      status: 'pendente',
      meta_id: meta.id
    });
    setActionModalType('add');
    setIsActionModalOpen(true);
  };

  const handleOpenEditAction = (meta, acao) => {
    setSelectedGoal(meta);
    setSelectedAction(acao);
    setActionForm({
      descricao: acao.descricao,
      data_inicio: acao.data_inicio ? acao.data_inicio.split('T')[0] : '',
      data_fim: acao.data_fim ? acao.data_fim.split('T')[0] : '',
      status: acao.status,
      meta_id: meta.id
    });
    setActionModalType('edit');
    setIsActionModalOpen(true);
  };

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false);
    setSelectedGoal(null);
    setSelectedAction(null);
    setActionForm({
      descricao: '',
      data_inicio: '',
      data_fim: '',
      status: 'pendente',
      meta_id: null
    });
  };

  const handleSaveAction = async () => {
    try {
      if (!actionForm.descricao) {
        alert('Descrição é obrigatória');
        return;
      }

      if (actionModalType === 'add') {
        const novaAcao = await acaoMetaService.create(actionForm);
        setMetas(metas.map(m => 
          m.id === selectedGoal.id
            ? { ...m, acoes: [...(m.acoes || []), novaAcao] }
            : m
        ));
      } else {
        const acaoAtualizada = await acaoMetaService.update(selectedAction.id, actionForm);
        setMetas(metas.map(m =>
          m.id === selectedGoal.id
            ? {
                ...m,
                acoes: m.acoes.map(a => a.id === selectedAction.id ? acaoAtualizada : a)
              }
            : m
        ));
      }

      handleCloseActionModal();
    } catch (err) {
      console.error('Erro ao salvar ação:', err);
      alert(err.response?.data?.detail || 'Erro ao salvar ação');
    }
  };

  const handleDeleteAction = async (metaId, acaoId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta ação?')) {
      return;
    }

    try {
      await acaoMetaService.delete(acaoId);
      setMetas(metas.map(m =>
        m.id === metaId
          ? { ...m, acoes: m.acoes.filter(a => a.id !== acaoId) }
          : m
      ));
    } catch (err) {
      console.error('Erro ao excluir ação:', err);
      alert(err.response?.data?.detail || 'Erro ao excluir ação');
    }
  };

  const handleToggleAction = async (metaId, acaoId) => {
    try {
      const meta = metas.find(m => m.id === metaId);
      const acao = meta?.acoes?.find(a => a.id === acaoId);
      
      if (!acao) return;

      const novoStatus = acao.status === 'concluida' ? 'pendente' : 'concluida';
      const acaoAtualizada = await acaoMetaService.update(acaoId, {
        ...acao,
        status: novoStatus,
        data_conclusao: novoStatus === 'concluida' ? new Date().toISOString() : null
      });

      setMetas(metas.map(m =>
        m.id === metaId
          ? {
              ...m,
              acoes: m.acoes.map(a => a.id === acaoId ? acaoAtualizada : a)
            }
          : m
      ));
    } catch (err) {
      console.error('Erro ao atualizar ação:', err);
      alert(err.response?.data?.detail || 'Erro ao atualizar ação');
    }
  };

  // ===== FORMATAÇÃO =====

  const formatDate = (dateString) => {
    if (!dateString) return 'Sem prazo';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusLabel = (status) => {
    const labels = {
      'nao_iniciada': 'Não Iniciada',
      'em_andamento': 'Em Andamento',
      'concluida': 'Concluída',
      'cancelada': 'Cancelada'
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      'baixa': 'Baixa',
      'media': 'Média',
      'alta': 'Alta'
    };
    return labels[priority] || priority;
  };

  const getStatusColor = (status) => {
    const colors = {
      'nao_iniciada': '#6c757d',
      'em_andamento': '#0d6efd',
      'concluida': '#198754',
      'cancelada': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'baixa': '#28a745',
      'media': '#ffc107',
      'alta': '#dc3545'
    };
    return colors[priority] || '#6c757d';
  };

  // ===== RENDERIZAÇÃO =====

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando seu PDI...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-state">
          <h3>Erro ao carregar PDI</h3>
          <p>{error}</p>
          <button onClick={loadPDI} className="btn-primary">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const filteredMetas = getFilteredMetas();

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="user-avatar-large">🎯</div>
            <div className="welcome-text">
              <h1>Meu PDI {pdiData?.ano}</h1>
              <p className="welcome-subtitle">Plano de Desenvolvimento Individual</p>
            </div>
          </div>
          <div className="header-controls">
            <button onClick={handleOpenAddGoal} className="btn-header-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 7V0H9V7H16V9H9V16H7V9H0V7H7Z" fill="currentColor"/>
              </svg>
              Nova Meta
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="home-stats">
        <div className="stat-grid-home">
          <div className="stat-card-home">
            <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>
              <span style={{ color: '#1976d2' }}>📊</span>
            </div>
            <div className="stat-info">
              <span className="stat-label">Metas Totais</span>
              <span className="stat-value">{stats.total}</span>
            </div>
          </div>

          <div className="stat-card-home success">
            <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>
              <span style={{ color: '#388e3c' }}>✓</span>
            </div>
            <div className="stat-info">
              <span className="stat-label">Concluídas</span>
              <span className="stat-value">{stats.concluidas}</span>
            </div>
          </div>

          <div className="stat-card-home warning">
            <div className="stat-icon" style={{ backgroundColor: '#fff3e0' }}>
              <span style={{ color: '#f57c00' }}>⏳</span>
            </div>
            <div className="stat-info">
              <span className="stat-label">Em Andamento</span>
              <span className="stat-value">{stats.emAndamento}</span>
            </div>
          </div>

          <div className="stat-card-home error">
            <div className="stat-icon" style={{ backgroundColor: '#ffebee' }}>
              <span style={{ color: '#d32f2f' }}>⚠</span>
            </div>
            <div className="stat-info">
              <span className="stat-label">Atrasadas</span>
              <span className="stat-value">{stats.atrasadas}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="home-card">
        <div className="card-header">
          <h3>📈 Progresso Geral</h3>
          <span className="progress-percentage">{stats.progressoGeral}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${stats.progressoGeral}%`,
              backgroundColor: stats.progressoGeral === 100 ? '#28a745' : '#0d6efd'
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="home-card">
        <div className="card-header">
          <h3>🔍 Filtros</h3>
        </div>
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar metas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos os Status</option>
            <option value="nao_iniciada">Não Iniciada</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>
      </div>

      {/* Goals List */}
      <div className="goals-section">
        {filteredMetas.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma meta encontrada</p>
            <button onClick={handleOpenAddGoal} className="btn-secondary">
              Adicionar Primeira Meta
            </button>
          </div>
        ) : (
          filteredMetas.map((meta) => {
            const progresso = meta.acoes && meta.acoes.length > 0
              ? Math.round((meta.acoes.filter(a => a.status === 'concluida').length / meta.acoes.length) * 100)
              : 0;

            return (
              <div key={meta.id} className="goal-card">
                <div className="goal-header">
                  <div className="goal-title-section">
                    <h3>{meta.titulo}</h3>
                    <div className="goal-badges">
                      <span 
                        className="badge badge-status"
                        style={{ backgroundColor: getStatusColor(meta.status) }}
                      >
                        {getStatusLabel(meta.status)}
                      </span>
                      <span 
                        className="badge badge-priority"
                        style={{ backgroundColor: getPriorityColor(meta.prioridade) }}
                      >
                        {getPriorityLabel(meta.prioridade)}
                      </span>
                    </div>
                  </div>
                  <div className="goal-actions">
                    <button 
                      onClick={() => handleOpenEditGoal(meta)}
                      className="btn-icon"
                      title="Editar meta"
                    >
                      ✎
                    </button>
                    <button 
                      onClick={() => handleDeleteGoal(meta.id)}
                      className="btn-icon btn-danger"
                      title="Excluir meta"
                    >
                      🗑
                    </button>
                  </div>
                </div>

                {meta.descricao && (
                  <p className="goal-description">{meta.descricao}</p>
                )}

                <div className="goal-info">
                  <span className="goal-deadline">
                    📅 Prazo: {formatDate(meta.prazo)}
                  </span>
                  <span className="goal-progress">
                    {progresso}% concluído
                  </span>
                </div>

                <div className="goal-progress-bar">
                  <div 
                    className="goal-progress-fill"
                    style={{ 
                      width: `${progresso}%`,
                      backgroundColor: progresso === 100 ? '#28a745' : '#0d6efd'
                    }}
                  />
                </div>

                {/* Actions List */}
                <div className="actions-section">
                  <div className="actions-header">
                    <h4>Ações ({meta.acoes?.length || 0})</h4>
                    <button 
                      onClick={() => handleOpenAddAction(meta)}
                      className="btn-sm"
                    >
                      + Ação
                    </button>
                  </div>

                  {meta.acoes && meta.acoes.length > 0 ? (
                    <ul className="actions-list">
                      {meta.acoes.map((acao) => (
                        <li key={acao.id} className="action-item">
                          <input
                            type="checkbox"
                            checked={acao.status === 'concluida'}
                            onChange={() => handleToggleAction(meta.id, acao.id)}
                          />
                          <span className={acao.status === 'concluida' ? 'completed' : ''}>
                            {acao.descricao}
                          </span>
                          {acao.prazo && (
                            <span className="action-deadline">
                              {formatDate(acao.prazo)}
                            </span>
                          )}
                          <div className="action-buttons">
                            <button
                              onClick={() => handleOpenEditAction(meta, acao)}
                              className="btn-icon-sm"
                              title="Editar ação"
                            >
                              ✎
                            </button>
                            <button
                              onClick={() => handleDeleteAction(meta.id, acao.id)}
                              className="btn-icon-sm btn-danger"
                              title="Excluir ação"
                            >
                              ×
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-actions">Nenhuma ação cadastrada</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Meta */}
      {isGoalModalOpen && (
        <div className="modal-overlay" onClick={handleCloseGoalModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{goalModalType === 'add' ? 'Nova Meta' : 'Editar Meta'}</h2>
              <button onClick={handleCloseGoalModal} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  value={goalForm.titulo}
                  onChange={(e) => setGoalForm({ ...goalForm, titulo: e.target.value })}
                  placeholder="Ex: Melhorar habilidades de liderança"
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={goalForm.descricao}
                  onChange={(e) => setGoalForm({ ...goalForm, descricao: e.target.value })}
                  placeholder="Descreva sua meta..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prazo *</label>
                  <input
                    type="date"
                    value={goalForm.prazo}
                    onChange={(e) => setGoalForm({ ...goalForm, prazo: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Prioridade</label>
                  <select
                    value={goalForm.prioridade}
                    onChange={(e) => setGoalForm({ ...goalForm, prioridade: e.target.value })}
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>

              {goalModalType === 'edit' && (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={goalForm.status}
                    onChange={(e) => setGoalForm({ ...goalForm, status: e.target.value })}
                  >
                    <option value="nao_iniciada">Não Iniciada</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={handleCloseGoalModal} className="btn-secondary">
                Cancelar
              </button>
              <button onClick={handleSaveGoal} className="btn-primary">
                {goalModalType === 'add' ? 'Adicionar' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ação */}
      {isActionModalOpen && (
        <div className="modal-overlay" onClick={handleCloseActionModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{actionModalType === 'add' ? 'Nova Ação' : 'Editar Ação'}</h2>
              <button onClick={handleCloseActionModal} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Descrição *</label>
                <input
                  type="text"
                  value={actionForm.descricao}
                  onChange={(e) => setActionForm({ ...actionForm, descricao: e.target.value })}
                  placeholder="Ex: Participar de workshop de liderança"
                />
              </div>

              <div className="form-group">
                <label>Prazo</label>
                <input
                  type="date"
                  value={actionForm.prazo}
                  onChange={(e) => setActionForm({ ...actionForm, prazo: e.target.value })}
                />
              </div>

              {actionModalType === 'edit' && (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={actionForm.status}
                    onChange={(e) => setActionForm({ ...actionForm, status: e.target.value })}
                  >
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={handleCloseActionModal} className="btn-secondary">
                Cancelar
              </button>
              <button onClick={handleSaveAction} className="btn-primary">
                {actionModalType === 'add' ? 'Adicionar' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDI;
