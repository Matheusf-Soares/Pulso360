import React, { useState } from 'react';

const PDI = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const pdiData = {
    profile: {
      name: 'Ana Silva',
      role: 'Desenvolvedora Frontend Sênior',
      department: 'Tecnologia',
      manager: 'Carlos Mendes',
      period: '2024',
      lastUpdate: '2024-01-15'
    },
    stats: {
      overallProgress: 73,
      goalsCompleted: 4,
      goalsInProgress: 6,
      goalsPending: 2,
      skillsImproved: 8
    },
    goals: [
      {
        id: 1,
        title: 'Liderança Técnica',
        category: 'Liderança',
        description: 'Desenvolver habilidades de mentoria e liderança técnica',
        progress: 85,
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-06-30',
        milestones: [
          { id: 1, title: 'Mentorar 2 desenvolvedores júnior', completed: true },
          { id: 2, title: 'Liderar projeto de arquitetura', completed: true },
          { id: 3, title: 'Apresentar tech talks', completed: false },
          { id: 4, title: 'Conduzir code reviews', completed: true }
        ]
      },
      {
        id: 2,
        title: 'Certificação AWS',
        category: 'Técnico',
        description: 'Obter certificação AWS Solutions Architect',
        progress: 45,
        status: 'in-progress',
        priority: 'medium',
        dueDate: '2024-08-30',
        milestones: [
          { id: 1, title: 'Completar curso preparatório', completed: true },
          { id: 2, title: 'Estudar casos práticos', completed: false },
          { id: 3, title: 'Fazer simulados', completed: false },
          { id: 4, title: 'Agendar prova', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Soft Skills',
        category: 'Comportamental',
        description: 'Aprimorar comunicação e trabalho em equipe',
        progress: 92,
        status: 'completed',
        priority: 'medium',
        dueDate: '2024-03-30',
        milestones: [
          { id: 1, title: 'Workshop de comunicação', completed: true },
          { id: 2, title: 'Feedback 360°', completed: true },
          { id: 3, title: 'Apresentações para equipe', completed: true },
          { id: 4, title: 'Curso de negociação', completed: true }
        ]
      }
    ],
    skills: [
      { name: 'React/Next.js', current: 9, target: 10, category: 'Frontend' },
      { name: 'TypeScript', current: 8, target: 9, category: 'Frontend' },
      { name: 'AWS', current: 6, target: 8, category: 'Cloud' },
      { name: 'Liderança', current: 7, target: 9, category: 'Soft Skills' },
      { name: 'Arquitetura', current: 7, target: 8, category: 'Técnico' },
      { name: 'Mentoria', current: 6, target: 8, category: 'Liderança' }
    ]
  };

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

  return (
    <div className="pdi-container">
        {/* PDI Header */}
        <div className="pdi-header">
          <div className="header-content">
            <h1>🎯 Meu PDI - Plano de Desenvolvimento Individual</h1>
            <p>Acompanhe seu crescimento profissional e objetivos de carreira</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">
              <span>📤</span>
              Exportar PDI
            </button>
            <button className="btn-primary">
              <span>➕</span>
              Nova Meta
            </button>
          </div>
        </div>

        {/* PDI Stats Overview */}
        <div className="pdi-stats">
          <div className="profile-card">
            <div className="profile-avatar">👩‍💻</div>
            <div className="profile-info">
              <h2>{pdiData.profile.name}</h2>
              <p className="role">{pdiData.profile.role}</p>
              <p className="department">{pdiData.profile.department}</p>
            </div>
            <div className="profile-meta">
              <div className="meta-item">
                <span className="label">Gestor:</span>
                <span className="value">{pdiData.profile.manager}</span>
              </div>
              <div className="meta-item">
                <span className="label">Período:</span>
                <span className="value">{pdiData.profile.period}</span>
              </div>
              <div className="meta-item">
                <span className="label">Última atualização:</span>
                <span className="value">{pdiData.profile.lastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="progress-overview">
            <div className="overall-progress">
              <div className="progress-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    strokeDasharray={`${pdiData.stats.overallProgress * 2.827} 282.7`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="progress-text">
                  <span className="percentage">{pdiData.stats.overallProgress}%</span>
                  <span className="label">Progresso Geral</span>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-icon">✅</span>
                <div className="stat-content">
                  <span className="stat-value">{pdiData.stats.goalsCompleted}</span>
                  <span className="stat-label">Metas Concluídas</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🚀</span>
                <div className="stat-content">
                  <span className="stat-value">{pdiData.stats.goalsInProgress}</span>
                  <span className="stat-label">Em Progresso</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⏳</span>
                <div className="stat-content">
                  <span className="stat-value">{pdiData.stats.goalsPending}</span>
                  <span className="stat-label">Pendentes</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📈</span>
                <div className="stat-content">
                  <span className="stat-value">{pdiData.stats.skillsImproved}</span>
                  <span className="stat-label">Skills Melhoradas</span>
                </div>
              </div>
            </div>
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
              <div className="goals-list">
                {pdiData.goals.map(goal => (
                  <div key={goal.id} className="goal-card">
                    <div className="goal-card-header">
                      <div className="goal-title-section">
                        <h3>{goal.title}</h3>
                        <p className="goal-description">{goal.description}</p>
                      </div>
                      <div className="goal-meta-section">
                        <span className={`status-badge ${getStatusColor(goal.status)}`}>
                          {goal.status === 'completed' ? 'Concluída' :
                           goal.status === 'in-progress' ? 'Em Progresso' :
                           'Pendente'}
                        </span>
                        <span className={`priority-badge ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </div>
                    </div>

                    <div className="goal-progress">
                      <div className="progress-info">
                        <span>Progresso: {goal.progress}%</span>
                        <span>Prazo: {goal.dueDate}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${getStatusColor(goal.status)}`}
                          style={{width: `${goal.progress}%`}}
                        ></div>
                      </div>
                    </div>

                    <div className="goal-milestones">
                      <h4>Milestones</h4>
                      <div className="milestones-list">
                        {goal.milestones.map(milestone => (
                          <div key={milestone.id} className={`milestone-item ${milestone.completed ? 'completed' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={milestone.completed}
                              readOnly 
                            />
                            <span>{milestone.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="goal-actions">
                      <button 
                        className="btn-outline small"
                        onClick={() => setSelectedGoal(goal)}
                      >
                        👁️ Detalhes
                      </button>
                      <button className="btn-outline small">
                        ✏️ Editar
                      </button>
                      <button className="btn-primary small">
                        📝 Atualizar
                      </button>
                    </div>
                  </div>
                ))}
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
                      <div className="resource-item">
                        <div className="resource-icon">🎯</div>
                        <div className="resource-content">
                          <div className="resource-title">AWS Solutions Architect Associate</div>
                          <div className="resource-description">Curso preparatório para certificação</div>
                          <div className="resource-provider">Cloud Guru • 40h</div>
                        </div>
                        <button className="btn-primary small">Acessar</button>
                      </div>
                      <div className="resource-item">
                        <div className="resource-icon">👥</div>
                        <div className="resource-content">
                          <div className="resource-title">Liderança para Desenvolvedores</div>
                          <div className="resource-description">Habilidades de gestão e mentoria</div>
                          <div className="resource-provider">Coursera • 25h</div>
                        </div>
                        <button className="btn-primary small">Acessar</button>
                      </div>
                    </div>
                  </div>

                  <div className="category-section">
                    <h4>📖 Livros Sugeridos</h4>
                    <div className="resource-list">
                      <div className="resource-item">
                        <div className="resource-icon">📚</div>
                        <div className="resource-content">
                          <div className="resource-title">Clean Architecture</div>
                          <div className="resource-description">Robert C. Martin</div>
                          <div className="resource-provider">Arquitetura de Software</div>
                        </div>
                        <button className="btn-outline small">Ver Detalhes</button>
                      </div>
                    </div>
                  </div>

                  <div className="category-section">
                    <h4>🎤 Eventos e Conferências</h4>
                    <div className="resource-list">
                      <div className="resource-item">
                        <div className="resource-icon">🎪</div>
                        <div className="resource-content">
                          <div className="resource-title">AWS re:Invent 2024</div>
                          <div className="resource-description">Conferência anual da AWS</div>
                          <div className="resource-provider">Las Vegas • Nov 2024</div>
                        </div>
                        <button className="btn-outline small">Interessado</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default PDI;