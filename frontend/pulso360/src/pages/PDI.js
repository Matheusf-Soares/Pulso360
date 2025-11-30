import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import pdiService from '../services/pdiService';

const PDI = () => {
      // Modal handlers for Add Goal
      const handleOpenAddGoalModal = () => setShowAddGoalModal(true);
      const handleCloseAddGoalModal = () => setShowAddGoalModal(false);
      const handleNewGoalChange = (field, value) => {
        setNewGoal(prev => ({ ...prev, [field]: value }));
      };
      const handleMilestoneChange = (index, value) => {
        setNewGoal(prev => {
          const updated = [...prev.milestones];
          updated[index] = value;
          return { ...prev, milestones: updated };
        });
      };
      // Modal handler for Goal Details
      const handleCloseGoalDetails = () => {
        setShowGoalDetails(false);
        setCurrentGoalDetails(null);
      };
    // Estados para modais e curso
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [courseModalType, setCourseModalType] = useState('details');
  const { user } = useAuth(); // Obter dados do usuário logado
  // eslint-disable-next-line no-unused-vars
  const [pdiData, setPdiData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', category: 'Técnico', priority: 'high', dueDate: '', description: '', milestones: ["", "", "", ""] });
  const [showGoalDetails, setShowGoalDetails] = useState(false);
  const [currentGoalDetails, setCurrentGoalDetails] = useState(null);
  
  useEffect(() => {
    async function fetchPDI() {
      try {
        const data = await pdiService.getPDI();
        setPdiData(data);
      } catch (e) {
        // erro ao carregar PDI
      }
    }
    fetchPDI();
  }, []);
  
  // Funções CRUD/metas
  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.dueDate || !newGoal.description) {
      // erro: campos obrigatórios
      return;
    }
    try {
      await pdiService.addGoal(newGoal);
      setShowAddGoalModal(false);
      setNewGoal({ title: '', category: 'Técnico', priority: 'high', dueDate: '', description: '', milestones: ["", "", "", ""] });
      const data = await pdiService.getPDI();
      setPdiData(data);
    } catch {
      // erro ao adicionar meta
    }
  };
  
  const handleDeleteGoal = async (goalId) => {
    try {
      await pdiService.deleteGoal(goalId);
      setShowGoalDetails(false);
      const data = await pdiService.getPDI();
      setPdiData(data);
    } catch {
      // erro ao excluir meta
    }
  };
  
  const handleToggleMilestone = async (goalId, milestoneId) => {
    try {
      await pdiService.toggleMilestone(goalId, milestoneId);
      const data = await pdiService.getPDI();
      setPdiData(data);
    } catch {
      // erro ao atualizar milestone
    }
  };
  
  const handleExportPDI = async () => {
    try {
      const blob = await pdiService.exportPDI();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'meu_pdi.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch {
      // erro ao exportar PDI
    }
  };
  
  // Navegação para detalhes de meta
  const handleViewGoalDetails = (goal) => {
    setCurrentGoalDetails(goal);
    setShowGoalDetails(true);
  };
  
  
  // ...existing code...

  // Dados dos cursos de desenvolvimento

  // Formulário para nova meta
  // All newGoal and pdiData state is now handled by backend integration and top-level useState hooks only
  // ...existing code...

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'error';
      default: return 'muted';
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

  // Funções para gerenciar nova meta
  // All goal-related state and logic is now handled by backend integration (see above CRUD functions)
  // Modal open/close and field change handlers remain, but only use the single setNewGoal and setShowAddGoalModal from above

  // Funções para modal de cursos
  const handleOpenCourseDetails = (course) => {
    setCurrentCourse(course);
    setCourseModalType('details');
    setShowCourseModal(true);
  };

  const handleOpenCourseAccess = (course) => {
    setCurrentCourse(course);
    setCourseModalType('access');
    setShowCourseModal(true);
  };

  const handleCloseCourseModal = () => {
    setShowCourseModal(false);
    setCurrentCourse(null);
    setCourseModalType('details');
  };

  const handleEnrollCourse = (courseId) => {
    // Simular inscrição no curso
    if (window.showNotification) {
      window.showNotification('Inscrição realizada com sucesso! 🎓', 'success');
    }
    handleCloseCourseModal();
  };

  const handleContinueCourse = (courseId) => {
    // Simular continuação do curso
    if (window.showNotification) {
      window.showNotification('Redirecionando para o curso... 📚', 'info');
    }
    setTimeout(() => {
      window.open(currentCourse?.url, '_blank');
    }, 500);
  };

  const getCourseIcon = (type) => {
    switch(type) {
      case 'course': return '🎓';
      case 'book': return '📚';
      case 'event': return '🎪';
      default: return '📖';
    }
  };

  const getCourseTypeLabel = (type) => {
    switch(type) {
      case 'course': return 'Curso Online';
      case 'book': return 'Livro';
      case 'event': return 'Evento';
      default: return 'Recurso';
    }
  };

  if (!pdiData) {
    return null;
  }
  return (
    <div className="pdi-container">
        {/* ...existing code... */}
        {/* PDI Header Profissional */}
        <div className="pdi-header-professional">
          {/* Informações do Perfil Integradas */}
          <div className="pdi-profile-section">
            <div className="profile-avatar-large">
              {user?.nome ? user.nome.charAt(0).toUpperCase() : '👤'}
            </div>
            <div className="profile-details">
              <h1>{pdiData.profile.name}</h1>
              <p className="profile-role">{pdiData.profile.role}</p>
              <p className="profile-department">{pdiData.profile.department}</p>
              <div className="profile-meta-inline">
                <span className="meta-badge">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7 12.6C3.9 12.6 1.4 10.1 1.4 7C1.4 3.9 3.9 1.4 7 1.4C10.1 1.4 12.6 3.9 12.6 7C12.6 10.1 10.1 12.6 7 12.6ZM7.35 3.5H6.3V7.7L9.8 9.73L10.325 8.89L7.35 7.175V3.5Z" fill="currentColor"/>
                  </svg>
                  Período: {pdiData.profile.period}
                </span>
                <span className="meta-badge">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11.6667 2.33333H11V1.16667C11 0.525 10.475 0 9.83333 0C9.19167 0 8.66667 0.525 8.66667 1.16667V2.33333H5.33333V1.16667C5.33333 0.525 4.80833 0 4.16667 0C3.525 0 3 0.525 3 1.16667V2.33333H2.33333C1.04167 2.33333 0 3.375 0 4.66667V12.25C0 13.5417 1.04167 14.5833 2.33333 14.5833H11.6667C12.9583 14.5833 14 13.5417 14 12.25V4.66667C14 3.375 12.9583 2.33333 11.6667 2.33333ZM11.6667 12.25H2.33333V5.83333H11.6667V12.25Z" fill="currentColor"/>
                  </svg>
                  Atualizado: {new Date(pdiData.profile.lastUpdate).toLocaleDateString('pt-BR')}
                </span>
                <span className="meta-badge">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM7 4.2C7.98 4.2 8.75 4.97 8.75 5.95C8.75 6.93 7.98 7.7 7 7.7C6.02 7.7 5.25 6.93 5.25 5.95C5.25 4.97 6.02 4.2 7 4.2ZM7 12.32C5.6 12.32 4.09 11.62 3.15 10.57C4.06 9.73 5.49 9.1 7 9.1C8.51 9.1 9.94 9.73 10.85 10.57C9.91 11.62 8.4 12.32 7 12.32Z" fill="currentColor"/>
                  </svg>
                  Gestor: {pdiData.profile.manager}
                </span>
              </div>
            </div>
          </div>

          {/* Círculo de Progresso Redesenhado */}
          <div className="progress-circle-container">
            <svg className="progress-ring" width="180" height="180" viewBox="0 0 180 180">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
              <circle
                className="progress-ring-bg"
                cx="90" cy="90" r="75"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="12"
              />
              <circle
                className="progress-ring-fill"
                cx="90" cy="90" r="75"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="12"
                strokeDasharray={`${pdiData.stats.overallProgress * 4.71} 471`}
                strokeDashoffset="0"
                transform="rotate(-90 90 90)"
                strokeLinecap="round"
              />
              <text x="90" y="80" textAnchor="middle" className="progress-percentage">
                {pdiData.stats.overallProgress}%
              </text>
              <text x="90" y="105" textAnchor="middle" className="progress-label">
                Progresso Geral
              </text>
            </svg>
          </div>

          {/* Stats Cards Modernos */}
          <div className="pdi-stats-modern">
            <div className="modern-stat-card completed">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{pdiData.stats.goalsCompleted}</span>
                <span className="stat-text">Metas Concluídas</span>
              </div>
            </div>
            
            <div className="modern-stat-card inprogress">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{pdiData.stats.goalsInProgress}</span>
                <span className="stat-text">Em Progresso</span>
              </div>
            </div>
            
            <div className="modern-stat-card pending">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{pdiData.stats.goalsPending}</span>
                <span className="stat-text">Pendentes</span>
              </div>
            </div>
            
            <div className="modern-stat-card skills">
              <div className="stat-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-number">{pdiData.stats.skillsImproved}</span>
                <span className="stat-text">Skills Melhoradas</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pdi-header-actions">
            <button className="pdi-btn pdi-btn-secondary" onClick={handleExportPDI}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12Z" fill="currentColor"/>
                <path d="M0 14V16H16V14H0Z" fill="currentColor"/>
              </svg>
              <span>Exportar PDI</span>
            </button>
            <button className="pdi-btn pdi-btn-primary" onClick={handleOpenAddGoalModal}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 7V0H9V7H16V9H9V16H7V9H0V7H7Z" fill="currentColor"/>
              </svg>
              <span>Nova Meta</span>
            </button>
          </div>
        </div>

        {/* PDI Navigation Tabs */}
        <div className="pdi-navigation">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span>
            <span className="tab-text">Visão Geral</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'goals' ? 'active' : ''}`}
            onClick={() => setActiveTab('goals')}
          >
            <span className="tab-icon">🎯</span>
            <span className="tab-text">Metas e Objetivos</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <span className="tab-icon">💡</span>
            <span className="tab-text">Competências</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'development' ? 'active' : ''}`}
            onClick={() => setActiveTab('development')}
          >
            <span className="tab-icon">📚</span>
            <span className="tab-text">Desenvolvimento</span>
          </button>
        </div>

        <div className="pdi-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="recent-activity">
                <h3>🔄 Atividades Recentes</h3>
                <div className="activity-timeline">
                  <div className="activity-item">
                    <div className="activity-dot success"></div>
                    <div className="activity-content">
                      <div className="activity-title">Meta "Soft Skills" concluída</div>
                      <div className="activity-date">15 de Janeiro, 2024</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot warning"></div>
                    <div className="activity-content">
                      <div className="activity-title">Progresso em "Certificação AWS" - 45%</div>
                      <div className="activity-date">10 de Janeiro, 2024</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot success"></div>
                    <div className="activity-content">
                      <div className="activity-title">Nova milestone em "Liderança Técnica"</div>
                      <div className="activity-date">05 de Janeiro, 2024</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="goals-summary">
                <h3>🎯 Resumo das Metas</h3>
                <div className="goals-grid">
                  {pdiData.goals.map(goal => (
                    <div key={goal.id} className="goal-summary-card">
                      <div className="goal-header">
                        <div className="goal-info">
                          <h4>{goal.title}</h4>
                          <span className={`category-badge ${goal.category.toLowerCase()}`}>
                            {goal.category}
                          </span>
                        </div>
                        <span className={`priority-badge ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </div>
                      <div className="goal-progress-bar">
                        <div 
                          className={`progress-fill ${getStatusColor(goal.status)}`}
                          style={{width: `${goal.progress}%`}}
                        ></div>
                        <span className="progress-text">{goal.progress}%</span>
                      </div>
                      <div className="goal-due">
                        Prazo: {goal.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div className="tab-content">
              {/* Filtros */}
              <div className="goals-filters">
                <div className="filters-group">
                  <label>Filtrar por Status:</label>
                  <div className="filter-buttons">
                    <button 
                      className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('all')}
                    >
                      Todos ({pdiData.goals.length})
                    </button>
                    <button 
                      className={`filter-btn ${filterStatus === 'in-progress' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('in-progress')}
                    >
                      Em Progresso ({pdiData.stats.goalsInProgress})
                    </button>
                    <button 
                      className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('completed')}
                    >
                      Concluídas ({pdiData.stats.goalsCompleted})
                    </button>
                    <button 
                      className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('pending')}
                    >
                      Pendentes ({pdiData.stats.goalsPending})
                    </button>
                  </div>
                </div>
                
                <div className="filters-group">
                  <label>Prioridade:</label>
                  <select 
                    value={filterPriority} 
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">Todas</option>
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                  </select>
                </div>
              </div>

              <div className="goals-list">
                {pdiData.goals
                  .filter(goal => filterStatus === 'all' || goal.status === filterStatus)
                  .filter(goal => filterPriority === 'all' || goal.priority === filterPriority)
                  .map(goal => (
                  <div key={goal.id} className="goal-card">
                    <div className="goal-card-header">
                      <div className="goal-title-section">
                        <h3>{goal.title}</h3>
                        <p className="goal-description">{goal.description}</p>
                        <div className="goal-badges">
                          <span className={`category-badge ${goal.category.toLowerCase()}`}>
                            {goal.category}
                          </span>
                        </div>
                      </div>
                      <div className="goal-meta-section">
                        <span className={`status-badge ${getStatusColor(goal.status)}`}>
                          {goal.status === 'completed' ? '✅ Concluída' :
                           goal.status === 'in-progress' ? '🚀 Em Progresso' :
                           '⏳ Pendente'}
                        </span>
                        <span className={`priority-badge ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? '🔴 Alta' : 
                           goal.priority === 'medium' ? '🟡 Média' : '🟢 Baixa'}
                        </span>
                      </div>
                    </div>

                    <div className="goal-progress">
                      <div className="progress-info">
                        <span className="progress-label">Progresso: <strong>{goal.progress}%</strong></span>
                        <span className="progress-date">📅 Prazo: {new Date(goal.dueDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${getStatusColor(goal.status)}`}
                          style={{width: `${goal.progress}%`}}
                        ></div>
                      </div>
                    </div>

                    <div className="goal-milestones">
                      <div className="milestones-header">
                        <span className="milestones-title">📋 Marcos ({goal.milestones.filter(m => m.completed).length}/{goal.milestones.length})</span>
                      </div>
                      <div className="milestones-list">
                        {goal.milestones.map(milestone => (
                          <div 
                            key={milestone.id} 
                            className={`milestone-item ${milestone.completed ? 'completed' : ''}`}
                            onClick={() => handleToggleMilestone(goal.id, milestone.id)}
                          >
                            <div className="milestone-checkbox">
                              {milestone.completed ? '✅' : '⬜'}
                            </div>
                            <span className="milestone-text">{milestone.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="goal-actions">
                      <button 
                        className="btn-outline small"
                        onClick={() => handleViewGoalDetails(goal)}
                      >
                        <span>👁️</span>
                        Ver Detalhes
                      </button>
                      <button 
                        className="btn-outline small error"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <span>🗑️</span>
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
                
                {pdiData.goals
                  .filter(goal => filterStatus === 'all' || goal.status === filterStatus)
                  .filter(goal => filterPriority === 'all' || goal.priority === filterPriority)
                  .length === 0 && (
                  <div className="empty-state">
                    <div className="empty-icon">🎯</div>
                    <h3>Nenhuma meta encontrada</h3>
                    <p>Ajuste os filtros ou adicione uma nova meta para começar</p>
                    <button className="btn-primary" onClick={handleOpenAddGoalModal}>
                      <span>➕</span>
                      Adicionar Meta
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="tab-content">
              <div className="skills-section">
                <h3>💡 Mapa de Competências</h3>
                <div className="skills-grid">
                  {pdiData.skills.map((skill, index) => (
                    <div key={index} className="skill-card">
                      <div className="skill-header">
                        <div className="skill-info">
                          <h4>{skill.name}</h4>
                          <span className="skill-category">{skill.category}</span>
                        </div>
                        <div className="skill-rating">
                          <span className="current">{skill.current}</span>
                          <span className="separator">→</span>
                          <span className="target">{skill.target}</span>
                        </div>
                      </div>
                      
                      <div className="skill-progress">
                        <div className="skill-bar">
                          <div className="skill-current" style={{width: `${skill.current * 10}%`}}></div>
                          <div className="skill-target-mark" style={{left: `${skill.target * 10}%`}}></div>
                        </div>
                        <div className="skill-labels">
                          <span>Atual</span>
                          <span>Meta</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Development Tab */}
          {activeTab === 'development' && (
            <div className="tab-content">
              <div className="development-section">
                <h3>📚 Recursos de Desenvolvimento</h3>
                
                <div className="development-categories">
                  <div className="category-section">
                    <h4>🎓 Cursos Recomendados</h4>
                    <div className="resource-list">
                        {pdiData.resources.filter(r => r.type === 'course').map(course => (
                          <div key={course.id} className="resource-item">
                            <div className="resource-icon">{getCourseIcon(course.type)}</div>
                            <div className="resource-content">
                              <div className="resource-title">{course.title}</div>
                              <div className="resource-description">{course.description}</div>
                              <div className="resource-provider">{course.provider} • {course.duration}</div>
                              {course.enrolled && (
                                <div className="resource-progress-mini">
                                  <div className="progress-bar-mini">
                                    <div 
                                      className="progress-fill-mini" 
                                      style={{width: `${course.progress}%`}}
                                    ></div>
                                  </div>
                                  <span className="progress-text-mini">{course.progress}% concluído</span>
                                </div>
                              )}
                            </div>
                            <div className="resource-actions">
                              <button 
                                className="btn-outline small"
                                onClick={() => handleOpenCourseDetails(course)}
                              >
                                Ver Detalhes
                              </button>
                              <button 
                                className={`btn-primary small ${course.enrolled ? 'enrolled' : ''}`}
                                onClick={() => handleOpenCourseAccess(course)}
                              >
                                {course.enrolled ? 'Continuar' : 'Acessar'}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="category-section">
                    <h4>📖 Livros Sugeridos</h4>
                    <div className="resource-list">
                        {pdiData.resources.filter(r => r.type === 'book').map(book => (
                          <div key={book.id} className="resource-item">
                            <div className="resource-icon">{getCourseIcon(book.type)}</div>
                            <div className="resource-content">
                              <div className="resource-title">{book.title}</div>
                              <div className="resource-description">{book.description}</div>
                              <div className="resource-provider">{book.provider}</div>
                            </div>
                            <div className="resource-actions">
                              <button 
                                className="btn-outline small"
                                onClick={() => handleOpenCourseDetails(book)}
                              >
                                Ver Detalhes
                              </button>
                              <button 
                                className="btn-primary small"
                                onClick={() => handleOpenCourseAccess(book)}
                              >
                                Acessar
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="category-section">
                    <h4>🎤 Eventos e Conferências</h4>
                    <div className="resource-list">
                        {pdiData.resources.filter(r => r.type === 'event').map(event => (
                          <div key={event.id} className="resource-item">
                            <div className="resource-icon">{getCourseIcon(event.type)}</div>
                            <div className="resource-content">
                              <div className="resource-title">{event.title}</div>
                              <div className="resource-description">{event.description}</div>
                              <div className="resource-provider">{event.location} • {event.date}</div>
                            </div>
                            <div className="resource-actions">
                              <button 
                                className="btn-outline small"
                                onClick={() => handleOpenCourseDetails(event)}
                              >
                                Ver Detalhes
                              </button>
                              <button 
                                className="btn-primary small"
                                onClick={() => handleOpenCourseAccess(event)}
                              >
                                Interessado
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal para Adicionar Nova Meta */}
        {showAddGoalModal && (
          <div className="modal-overlay" onClick={handleCloseAddGoalModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>🎯 Adicionar Nova Meta</h2>
                <button className="modal-close" onClick={handleCloseAddGoalModal}>✕</button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="goal-title">Título da Meta *</label>
                  <input
                    id="goal-title"
                    type="text"
                    placeholder="Ex: Certificação em Cloud Computing"
                    value={newGoal.title}
                    onChange={(e) => handleNewGoalChange('title', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="goal-category">Categoria</label>
                    <select
                      id="goal-category"
                      value={newGoal.category}
                      onChange={(e) => handleNewGoalChange('category', e.target.value)}
                      className="form-select"
                    >
                      <option value="Técnico">Técnico</option>
                      <option value="Liderança">Liderança</option>
                      <option value="Comportamental">Comportamental</option>
                      <option value="Idiomas">Idiomas</option>
                      <option value="Gestão">Gestão</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="goal-priority">Prioridade</label>
                    <select
                      id="goal-priority"
                      value={newGoal.priority}
                      onChange={(e) => handleNewGoalChange('priority', e.target.value)}
                      className="form-select"
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Média</option>
                      <option value="low">Baixa</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="goal-dueDate">Data de Conclusão *</label>
                    <input
                      id="goal-dueDate"
                      type="date"
                      value={newGoal.dueDate}
                      onChange={(e) => handleNewGoalChange('dueDate', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="goal-description">Descrição *</label>
                  <textarea
                    id="goal-description"
                    placeholder="Descreva o objetivo desta meta e como ela contribui para seu desenvolvimento..."
                    value={newGoal.description}
                    onChange={(e) => handleNewGoalChange('description', e.target.value)}
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Marcos (Milestones)</label>
                  <p className="form-hint">Defina até 4 etapas para acompanhar o progresso desta meta</p>
                  {newGoal.milestones.map((milestone, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Marco ${index + 1} (opcional)`}
                      value={milestone}
                      onChange={(e) => handleMilestoneChange(index, e.target.value)}
                      className="form-input"
                      style={{ marginBottom: '8px' }}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-outline" onClick={handleCloseAddGoalModal}>
                  Cancelar
                </button>
                <button className="btn-primary" onClick={handleAddGoal}>
                  <span>✅</span>
                  Adicionar Meta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalhes da Meta */}
        {showGoalDetails && currentGoalDetails && (
          <div className="modal-overlay" onClick={handleCloseGoalDetails}>
            <div className="modal-content goal-details-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>🎯 Detalhes da Meta</h2>
                <button className="modal-close" onClick={handleCloseGoalDetails}>✕</button>
              </div>

              <div className="modal-body">
                <div className="goal-details-section">
                  <h3>{currentGoalDetails.title}</h3>
                  <div className="goal-details-badges">
                    <span className={`category-badge ${currentGoalDetails.category.toLowerCase()}`}>
                      {currentGoalDetails.category}
                    </span>
                    <span className={`status-badge ${getStatusColor(currentGoalDetails.status)}`}>
                      {currentGoalDetails.status === 'completed' ? '✅ Concluída' :
                       currentGoalDetails.status === 'in-progress' ? '🚀 Em Progresso' :
                       '⏳ Pendente'}
                    </span>
                    <span className={`priority-badge ${getPriorityColor(currentGoalDetails.priority)}`}>
                      {currentGoalDetails.priority === 'high' ? '🔴 Alta' : 
                       currentGoalDetails.priority === 'medium' ? '🟡 Média' : '🟢 Baixa'}
                    </span>
                  </div>
                  <p className="goal-details-description">{currentGoalDetails.description}</p>
                </div>

                <div className="goal-details-stats">
                  <div className="detail-stat">
                    <span className="detail-stat-label">Progresso</span>
                    <div className="detail-stat-bar">
                      <div 
                        className={`detail-stat-fill ${getStatusColor(currentGoalDetails.status)}`}
                        style={{width: `${currentGoalDetails.progress}%`}}
                      ></div>
                      <span className="detail-stat-value">{currentGoalDetails.progress}%</span>
                    </div>
                  </div>
                  <div className="detail-stat">
                    <span className="detail-stat-label">📅 Prazo</span>
                    <span className="detail-stat-text">{new Date(currentGoalDetails.dueDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <div className="goal-details-milestones">
                  <h4>📋 Marcos de Progresso</h4>
                  <div className="milestones-progress-bar">
                    <div className="milestones-progress-fill" 
                         style={{width: `${(currentGoalDetails.milestones.filter(m => m.completed).length / currentGoalDetails.milestones.length) * 100}%`}}>
                    </div>
                    <span className="milestones-progress-text">
                      {currentGoalDetails.milestones.filter(m => m.completed).length} de {currentGoalDetails.milestones.length} concluídos
                    </span>
                  </div>
                  <div className="milestones-details-list">
                    {currentGoalDetails.milestones.map(milestone => (
                      <div 
                        key={milestone.id} 
                        className={`milestone-detail-item ${milestone.completed ? 'completed' : ''}`}
                        onClick={() => handleToggleMilestone(currentGoalDetails.id, milestone.id)}
                      >
                        <div className="milestone-detail-checkbox">
                          {milestone.completed ? '✅' : '⬜'}
                        </div>
                        <span className="milestone-detail-text">{milestone.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-outline error" onClick={() => {
                  handleDeleteGoal(currentGoalDetails.id);
                  handleCloseGoalDetails();
                }}>
                  <span>🗑️</span>
                  Excluir Meta
                </button>
                <button className="btn-primary" onClick={handleCloseGoalDetails}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Cursos - Detalhes */}
        {showCourseModal && currentCourse && courseModalType === 'details' && (
          <div className="modal-overlay" onClick={handleCloseCourseModal}>
            <div className="modal-content course-details-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header course-header">
                <div className="course-header-content">
                  <div className="course-type-badge">
                    <span className="course-icon-large">{getCourseIcon(currentCourse.type)}</span>
                    <span className="course-type-label">{getCourseTypeLabel(currentCourse.type)}</span>
                  </div>
                  <h2>{currentCourse.title}</h2>
                  <p className="course-provider-info">
                    {currentCourse.type === 'event' 
                      ? `${currentCourse.location} • ${currentCourse.date}`
                      : `${currentCourse.provider} • ${currentCourse.duration}`
                    }
                  </p>
                </div>
                <button className="modal-close" onClick={handleCloseCourseModal}>✕</button>
              </div>

              <div className="modal-body course-body">
                {/* Rating e Reviews */}
                <div className="course-rating-section">
                  <div className="rating-display">
                    <span className="rating-star">⭐</span>
                    <span className="rating-number">{currentCourse.rating}</span>
                    <span className="rating-reviews">({currentCourse.reviews.toLocaleString('pt-BR')} avaliações)</span>
                  </div>
                  <div className="course-level-badge">{currentCourse.level}</div>
                </div>

                {/* Progresso (se inscrito) */}
                {currentCourse.enrolled && (
                  <div className="course-progress-section">
                    <div className="progress-header-course">
                      <span className="progress-label-course">Seu Progresso</span>
                      <span className="progress-percentage-course">{currentCourse.progress}%</span>
                    </div>
                    <div className="progress-bar-course">
                      <div 
                        className="progress-fill-course" 
                        style={{width: `${currentCourse.progress}%`}}
                      >
                        <div className="progress-shimmer"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Descrição */}
                <div className="course-section">
                  <h3>📝 Sobre {currentCourse.type === 'book' ? 'o Livro' : currentCourse.type === 'event' ? 'o Evento' : 'o Curso'}</h3>
                  <p className="course-description-full">{currentCourse.description}</p>
                </div>

                {/* Instrutor/Autor */}
                {(currentCourse.instructor || currentCourse.author) && (
                  <div className="course-section">
                    <h3>👨‍🏫 {currentCourse.type === 'book' ? 'Autor' : 'Instrutor'}</h3>
                    <div className="instructor-info">
                      <div className="instructor-avatar">
                        {(currentCourse.instructor || currentCourse.author).charAt(0)}
                      </div>
                      <div className="instructor-details">
                        <div className="instructor-name">{currentCourse.instructor || currentCourse.author}</div>
                        <div className="instructor-role">Expert em {currentCourse.category}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tópicos abordados */}
                <div className="course-section">
                  <h3>📚 {currentCourse.type === 'event' ? 'Programação' : 'O que você vai aprender'}</h3>
                  <div className="topics-grid">
                    {currentCourse.topics.map((topic, index) => (
                      <div key={index} className="topic-item">
                        <span className="topic-check">✓</span>
                        <span className="topic-text">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requisitos */}
                <div className="course-section">
                  <h3>✅ Requisitos</h3>
                  <ul className="requirements-list">
                    {currentCourse.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Certificado */}
                {currentCourse.certificate && (
                  <div className="certificate-badge-section">
                    <div className="certificate-icon">🏆</div>
                    <div className="certificate-text">
                      <strong>Certificado de Conclusão</strong>
                      <p>Receba um certificado ao concluir {currentCourse.type === 'book' ? 'a leitura' : currentCourse.type === 'event' ? 'o evento' : 'o curso'}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn-outline" onClick={handleCloseCourseModal}>
                  Fechar
                </button>
                {currentCourse.enrolled ? (
                  <button 
                    className="btn-primary"
                    onClick={() => handleContinueCourse(currentCourse.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5 3L11 8L5 13V3Z" fill="currentColor"/>
                    </svg>
                    Continuar {currentCourse.type === 'book' ? 'Leitura' : currentCourse.type === 'event' ? 'Participação' : 'Curso'}
                  </button>
                ) : (
                  <button 
                    className="btn-primary"
                    onClick={() => handleEnrollCourse(currentCourse.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7 7V0H9V7H16V9H9V16H7V9H0V7H7Z" fill="currentColor"/>
                    </svg>
                    {currentCourse.type === 'event' ? 'Manifestar Interesse' : 'Inscrever-se'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Cursos - Acesso Rápido */}
        {showCourseModal && currentCourse && courseModalType === 'access' && (
          <div className="modal-overlay" onClick={handleCloseCourseModal}>
            <div className="modal-content course-access-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header access-header">
                <h2>
                  {currentCourse.enrolled 
                    ? `🚀 Continuar ${currentCourse.type === 'book' ? 'Leitura' : currentCourse.type === 'event' ? 'Participação' : 'Curso'}` 
                    : `✨ Acessar ${getCourseTypeLabel(currentCourse.type)}`
                  }
                </h2>
                <button className="modal-close" onClick={handleCloseCourseModal}>✕</button>
              </div>

              <div className="modal-body access-body">
                <div className="course-quick-info">
                  <div className="quick-icon">{getCourseIcon(currentCourse.type)}</div>
                  <div className="quick-details">
                    <h3>{currentCourse.title}</h3>
                    <p className="quick-provider">{currentCourse.provider}</p>
                  </div>
                </div>

                {currentCourse.enrolled ? (
                  <div className="enrolled-section">
                    <div className="enrolled-badge">
                      <span className="enrolled-icon">✓</span>
                      <span className="enrolled-text">Você já está inscrito</span>
                    </div>

                    <div className="progress-summary">
                      <div className="progress-circle-small">
                        <svg width="80" height="80" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="35" fill="none" stroke="#e0e7ff" strokeWidth="6"/>
                          <circle 
                            cx="40" cy="40" r="35" 
                            fill="none" 
                            stroke="#667eea" 
                            strokeWidth="6"
                            strokeDasharray={`${currentCourse.progress * 2.2} 220`}
                            strokeDashoffset="0"
                            transform="rotate(-90 40 40)"
                            strokeLinecap="round"
                          />
                          <text x="40" y="45" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2d3748">
                            {currentCourse.progress}%
                          </text>
                        </svg>
                      </div>
                      <div className="progress-info-access">
                        <p className="progress-title">Progresso Atual</p>
                        <p className="progress-description">
                          Continue de onde parou e complete os {100 - currentCourse.progress}% restantes
                        </p>
                      </div>
                    </div>

                    <div className="quick-stats">
                      <div className="quick-stat">
                        <span className="stat-icon">⏱️</span>
                        <div className="stat-details">
                          <span className="stat-value">{currentCourse.duration}</span>
                          <span className="stat-label">Duração total</span>
                        </div>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-icon">⭐</span>
                        <div className="stat-details">
                          <span className="stat-value">{currentCourse.rating}/5.0</span>
                          <span className="stat-label">Avaliação</span>
                        </div>
                      </div>
                    </div>

                    <div className="access-actions-primary">
                      <button 
                        className="btn-access-primary"
                        onClick={() => handleContinueCourse(currentCourse.id)}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M6 4L14 10L6 16V4Z" fill="currentColor"/>
                        </svg>
                        Continuar Agora
                      </button>
                      <button 
                        className="btn-access-secondary"
                        onClick={() => {
                          setCourseModalType('details');
                        }}
                      >
                        Ver Detalhes Completos
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="enroll-section">
                    <div className="course-highlights">
                      <div className="highlight-item">
                        <span className="highlight-icon">⏱️</span>
                        <div className="highlight-text">
                          <strong>{currentCourse.duration}</strong>
                          <span>de conteúdo</span>
                        </div>
                      </div>
                      <div className="highlight-item">
                        <span className="highlight-icon">📊</span>
                        <div className="highlight-text">
                          <strong>{currentCourse.level}</strong>
                          <span>Nível</span>
                        </div>
                      </div>
                      <div className="highlight-item">
                        <span className="highlight-icon">⭐</span>
                        <div className="highlight-text">
                          <strong>{currentCourse.rating}/5.0</strong>
                          <span>{currentCourse.reviews.toLocaleString('pt-BR')} avaliações</span>
                        </div>
                      </div>
                      {currentCourse.certificate && (
                        <div className="highlight-item">
                          <span className="highlight-icon">🏆</span>
                          <div className="highlight-text">
                            <strong>Certificado</strong>
                            <span>Ao concluir</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="enroll-description">
                      <h4>Sobre {currentCourse.type === 'book' ? 'o Livro' : currentCourse.type === 'event' ? 'o Evento' : 'o Curso'}</h4>
                      <p>{currentCourse.description}</p>
                    </div>

                    <div className="topics-preview">
                      <h4>📚 Principais tópicos:</h4>
                      <div className="topics-compact">
                        {currentCourse.topics.slice(0, 4).map((topic, index) => (
                          <div key={index} className="topic-compact">
                            <span className="topic-check-small">✓</span>
                            {topic}
                          </div>
                        ))}
                        {currentCourse.topics.length > 4 && (
                          <div className="topic-compact more">
                            +{currentCourse.topics.length - 4} outros tópicos
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="access-actions-primary">
                      <button 
                        className="btn-access-primary"
                        onClick={() => handleEnrollCourse(currentCourse.id)}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M9 9V2H11V9H18V11H11V18H9V11H2V9H9Z" fill="currentColor"/>
                        </svg>
                        {currentCourse.type === 'event' ? 'Manifestar Interesse' : 'Inscrever-se Agora'}
                      </button>
                      <button 
                        className="btn-access-secondary"
                        onClick={() => {
                          setCourseModalType('details');
                        }}
                      >
                        Ver Detalhes Completos
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
export default PDI;