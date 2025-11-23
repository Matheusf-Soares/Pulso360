import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MembroPerfil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('informacoes');
  const [isEditing, setIsEditing] = useState(false);

  // Dados do membro (em produção virá do backend via API)
  const memberData = {
    id: id,
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    role: 'Desenvolvedora Frontend',
    department: 'Tecnologia',
    status: 'ativo',
    performance: 85,
    avatar: '👩‍💻',
    phone: '(11) 98765-4321',
    startDate: '2023-01-15',
    manager: 'Carlos Oliveira',
    workHours: '40h/semana',
    location: 'São Paulo, SP',
    bio: 'Desenvolvedora apaixonada por criar experiências de usuário excepcionais. Especializada em React e design responsivo.',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'CSS/SASS', level: 88 },
      { name: 'TypeScript', level: 80 },
      { name: 'Git', level: 85 }
    ],
    recentActivities: [
      { id: 1, type: 'project', title: 'Concluiu refatoração do Dashboard', date: '2024-11-20', icon: '✅' },
      { id: 2, type: 'meeting', title: 'Participou da reunião de planejamento', date: '2024-11-18', icon: '📅' },
      { id: 3, type: 'code', title: 'Realizou code review de 5 PRs', date: '2024-11-15', icon: '👁️' },
      { id: 4, type: 'achievement', title: 'Recebeu reconhecimento da equipe', date: '2024-11-12', icon: '🏆' }
    ],
    goals: [
      { id: 1, title: 'Melhorar conhecimento em TypeScript', progress: 80, deadline: '2024-12-31', status: 'em-andamento' },
      { id: 2, title: 'Completar certificação React Advanced', progress: 60, deadline: '2025-01-31', status: 'em-andamento' },
      { id: 3, title: 'Mentorar 2 desenvolvedores júnior', progress: 100, deadline: '2024-11-30', status: 'concluida' }
    ],
    statistics: {
      projectsCompleted: 24,
      tasksCompleted: 156,
      codeReviews: 89,
      teamRating: 4.8
    }
  };

  const tabs = [
    { id: 'informacoes', label: 'Informações', icon: '👤' },
    { id: 'performance', label: 'Performance', icon: '📊' },
    { id: 'atividades', label: 'Atividades', icon: '📝' },
    { id: 'metas', label: 'Metas', icon: '🎯' }
  ];

  return (
    <div className="member-profile-page">
      {/* Header do Perfil */}
      <div className="member-profile-header">
        <button className="back-button-modern" onClick={() => navigate('/equipe')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar para Equipe
        </button>

        <div className="profile-header-content">
          <div className="profile-header-left">
            <div className="profile-avatar-large">
              <span className="avatar-emoji-large">{memberData.avatar}</span>
              <div className={`status-badge-large ${memberData.status}`}>
                <span className="status-dot"></span>
                {memberData.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </div>
            </div>

            <div className="profile-header-info">
              <div className="profile-name-section">
                <h1 className="profile-name">{memberData.name}</h1>
                <div className="profile-badges">
                  <span className="role-badge">{memberData.role}</span>
                  <span className="dept-badge">{memberData.department}</span>
                </div>
              </div>
              
              <div className="profile-meta-info">
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2H12V0H10V2H6V0H4V2H2C0.89 2 0 2.9 0 4V14C0 15.1 0.89 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z" fill="currentColor"/>
                  </svg>
                  Desde {new Date(memberData.startDate).toLocaleDateString('pt-BR')}
                </div>
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                  </svg>
                  Gestor: {memberData.manager}
                </div>
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14ZM8.5 4H7V9L11.2 11.5L12 10.2L8.5 8.2V4Z" fill="currentColor"/>
                  </svg>
                  {memberData.workHours}
                </div>
              </div>
            </div>
          </div>

          <div className="profile-header-right">
            <div className="performance-circle-large">
              <svg viewBox="0 0 120 120" className="circle-chart">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#performanceGradient)"
                  strokeWidth="10"
                  strokeDasharray={`${(memberData.performance / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="circle-content">
                <span className="circle-value">{memberData.performance}%</span>
                <span className="circle-label">Performance</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-profile-action secondary" onClick={() => setIsEditing(!isEditing)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C11.9867 1.93333 11.5667 1.93333 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333Z" fill="currentColor"/>
                </svg>
                {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
              </button>
              <button className="btn-profile-action primary">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16 2H14V0H12V2H6V0H4V2H2C0.89 2 0 2.9 0 4V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2ZM16 16H2V7H16V16Z" fill="currentColor"/>
                </svg>
                Agendar 1:1
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas Rápidas */}
      <div className="member-stats-quick">
        <div className="stat-card-quick projects">
          <div className="stat-icon-quick">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-quick">
            <span className="stat-value-quick">{memberData.statistics.projectsCompleted}</span>
            <span className="stat-label-quick">Projetos Concluídos</span>
          </div>
        </div>

        <div className="stat-card-quick tasks">
          <div className="stat-icon-quick">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-quick">
            <span className="stat-value-quick">{memberData.statistics.tasksCompleted}</span>
            <span className="stat-label-quick">Tarefas Completadas</span>
          </div>
        </div>

        <div className="stat-card-quick reviews">
          <div className="stat-icon-quick">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-quick">
            <span className="stat-value-quick">{memberData.statistics.codeReviews}</span>
            <span className="stat-label-quick">Code Reviews</span>
          </div>
        </div>

        <div className="stat-card-quick rating">
          <div className="stat-icon-quick">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details-quick">
            <span className="stat-value-quick">{memberData.statistics.teamRating}</span>
            <span className="stat-label-quick">Avaliação da Equipe</span>
          </div>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className="member-tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`member-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-text">{tab.label}</span>
            {activeTab === tab.id && <span className="tab-active-indicator"></span>}
          </button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      <div className="member-tab-content">
        {/* Tab Informações */}
        {activeTab === 'informacoes' && (
          <div className="tab-pane-modern">
            <div className="info-grid-modern">
              {/* Card de Informações Pessoais */}
              <div className="info-card-modern">
                <div className="info-card-header">
                  <h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 10C12.21 10 14 8.21 14 6C14 3.79 12.21 2 10 2C7.79 2 6 3.79 6 6C6 8.21 7.79 10 10 10ZM10 12C7.33 12 2 13.34 2 16V18H18V16C18 13.34 12.67 12 10 12Z" fill="currentColor"/>
                    </svg>
                    Informações Pessoais
                  </h3>
                </div>
                <div className="info-card-body">
                  <div className="info-item-modern">
                    <span className="info-label">Email</span>
                    <span className="info-value">{memberData.email}</span>
                  </div>
                  <div className="info-item-modern">
                    <span className="info-label">Telefone</span>
                    <span className="info-value">{memberData.phone}</span>
                  </div>
                  <div className="info-item-modern">
                    <span className="info-label">Localização</span>
                    <span className="info-value">{memberData.location}</span>
                  </div>
                  <div className="info-item-modern full-width">
                    <span className="info-label">Bio</span>
                    <p className="info-bio">{memberData.bio}</p>
                  </div>
                </div>
              </div>

              {/* Card de Habilidades */}
              <div className="info-card-modern">
                <div className="info-card-header">
                  <h3>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9 1L11.09 7.26L18 8.27L13 13.14L14.18 20.02L9 16.77L3.82 20.02L5 13.14L0 8.27L6.91 7.26L9 1Z" fill="currentColor"/>
                    </svg>
                    Habilidades Técnicas
                  </h3>
                </div>
                <div className="info-card-body">
                  {memberData.skills.map((skill, index) => (
                    <div key={index} className="skill-item-modern">
                      <div className="skill-header-modern">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-modern">
                        <div 
                          className="skill-fill-modern" 
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Performance */}
        {activeTab === 'performance' && (
          <div className="tab-pane-modern">
            <div className="performance-grid-modern">
              <div className="performance-chart-card">
                <h3>Histórico de Performance</h3>
                <div className="chart-placeholder">
                  <svg width="100%" height="200" viewBox="0 0 400 200">
                    <path
                      d="M 20 180 L 60 120 L 100 140 L 140 80 L 180 100 L 220 60 L 260 90 L 300 40 L 340 70 L 380 30"
                      fill="none"
                      stroke="url(#chartGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <p className="chart-label">Últimos 6 meses</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Atividades */}
        {activeTab === 'atividades' && (
          <div className="tab-pane-modern">
            <div className="activities-timeline">
              <h3 className="timeline-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="currentColor"/>
                </svg>
                Atividades Recentes
              </h3>
              {memberData.recentActivities.map(activity => (
                <div key={activity.id} className="timeline-item-modern">
                  <div className="timeline-icon-wrapper">
                    <span className="timeline-icon">{activity.icon}</span>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-event">{activity.title}</h4>
                    <p className="timeline-date">
                      {new Date(activity.date).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Metas */}
        {activeTab === 'metas' && (
          <div className="tab-pane-modern">
            <div className="goals-container-modern">
              <div className="goals-header-modern">
                <h3>Metas de Desenvolvimento</h3>
                <span className="goals-count">{memberData.goals.length} metas</span>
              </div>
              <div className="goals-list-modern">
                {memberData.goals.map(goal => (
                  <div key={goal.id} className={`goal-card-modern ${goal.status}`}>
                    <div className="goal-header-modern">
                      <div className="goal-title-section">
                        <h4>{goal.title}</h4>
                        <span className={`goal-status-badge ${goal.status}`}>
                          {goal.status === 'concluida' ? '✓ Concluída' : '⏳ Em andamento'}
                        </span>
                      </div>
                      <span className="goal-deadline">
                        Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="goal-progress-section">
                      <div className="goal-progress-header">
                        <span>Progresso</span>
                        <span className="goal-progress-value">{goal.progress}%</span>
                      </div>
                      <div className="goal-progress-bar">
                        <div 
                          className={`goal-progress-fill ${goal.status}`}
                          style={{width: `${goal.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembroPerfil;
