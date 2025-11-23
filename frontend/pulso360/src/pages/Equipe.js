import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Equipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    startDate: ''
  });

  // Informações do usuário logado
  const currentUser = user ? {
    name: user.nome || 'Usuário',
    role: user.cargo || 'Cargo',
    department: user.departamento || 'Departamento',
    manager: user.gestor || 'Não atribuído'
  } : {
    name: 'Usuário',
    role: 'Cargo',
    department: 'Departamento',
    manager: 'Não atribuído'
  };

  // Dados da equipe - exemplo (em produção virá do backend filtrado pelo departamento/equipe do usuário)
  const teamData = {
    totalMembers: 8,
    departments: [currentUser.department, 'Design', 'Marketing'],
    members: [
      {
        id: 1,
        name: 'Ana Silva',
        role: 'Desenvolvedora Frontend',
        department: currentUser.department,
        status: 'ativo',
        performance: 85,
        avatar: '👩‍💻'
      },
      {
        id: 2,
        name: 'Bruno Costa',
        role: 'Designer UX',
        department: 'Design',
        status: 'ativo',
        performance: 92,
        avatar: '👨‍🎨'
      },
      {
        id: 3,
        name: currentUser.manager,
        role: 'Gestor',
        department: currentUser.department,
        status: 'ativo',
        performance: 95,
        avatar: '👨‍💼',
        isManager: true
      },
      {
        id: 4,
        name: 'Diana Santos',
        role: 'Desenvolvedora Backend',
        department: currentUser.department,
        status: 'inativo',
        performance: 88,
        avatar: '👩‍💻'
      }
    ]
  };

  // Filtrar membros baseado na busca
  const filteredMembers = teamData.members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'visao-geral', label: 'Visão Geral', icon: '📊' },
    { id: 'membros', label: 'Membros', icon: '👥' },
    { id: 'performance', label: 'Performance', icon: '📈' }
  ];

  return (
    <div className="team-page-professional">
      {/* Header Moderno com Gradiente */}
      <div className="team-header-modern">
        <div className="header-content-wrapper">
          <div className="header-left">
            <div className="header-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
              </svg>
            </div>
            <div className="header-text">
              <h1>Gestão de Equipe</h1>
              <p>Gerencie e acompanhe sua equipe de forma eficiente</p>
            </div>
          </div>
          
          <div className="header-right">
            <button className="btn-header-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12Z" fill="currentColor"/>
                <path d="M0 14V16H16V14H0Z" fill="currentColor"/>
              </svg>
              Exportar
            </button>
            <button className="btn-header-primary" onClick={() => setShowAddModal(true)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 7V0H9V7H16V9H9V16H7V9H0V7H7Z" fill="currentColor"/>
              </svg>
              Novo Membro
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas Modernos */}
      <div className="team-stats-modern">
        <div className="modern-team-stat total-members">
          <div className="stat-icon-modern">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details">
            <span className="stat-value-modern">{teamData.totalMembers}</span>
            <span className="stat-label-modern">Total de Membros</span>
            <div className="stat-badge-modern success">+2 este mês</div>
          </div>
        </div>

        <div className="modern-team-stat active-members">
          <div className="stat-icon-modern">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details">
            <span className="stat-value-modern">{teamData.members.filter(m => m.status === 'ativo').length}</span>
            <span className="stat-label-modern">Membros Ativos</span>
            <div className="stat-badge-modern info">{Math.round((teamData.members.filter(m => m.status === 'ativo').length / teamData.totalMembers) * 100)}% ativos</div>
          </div>
        </div>

        <div className="modern-team-stat departments">
          <div className="stat-icon-modern">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details">
            <span className="stat-value-modern">{teamData.departments.length}</span>
            <span className="stat-label-modern">Departamentos</span>
            <div className="stat-badge-modern warning">3 áreas</div>
          </div>
        </div>

        <div className="modern-team-stat performance">
          <div className="stat-icon-modern">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-details">
            <span className="stat-value-modern">{Math.round(teamData.members.reduce((acc, m) => acc + m.performance, 0) / teamData.members.length)}%</span>
            <span className="stat-label-modern">Performance Média</span>
            <div className="stat-badge-modern success">↑ 5% vs mês anterior</div>
          </div>
        </div>
      </div>

      {/* Navegação por Abas Moderna */}
      <div className="team-tabs-modern">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`modern-tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon-modern">{tab.icon}</span>
            <span className="tab-label-modern">{tab.label}</span>
            {activeTab === tab.id && <span className="tab-indicator"></span>}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="team-content-modern">{/* Aba Visão Geral */}
        {activeTab === 'visao-geral' && (
          <div className="tab-content-wrapper">
            <div className="overview-grid-modern">
              {/* Card de Distribuição por Departamento */}
              <div className="overview-card-modern">
                <div className="card-header-modern">
                  <div className="card-icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Distribuição por Departamento</h3>
                </div>
                <div className="card-content-modern">
                  {teamData.departments.map(dept => {
                    const count = teamData.members.filter(m => m.department === dept).length;
                    const percentage = Math.round((count / teamData.totalMembers) * 100);
                    return (
                      <div key={dept} className="dept-item-modern">
                        <div className="dept-header">
                          <span className="dept-name-modern">{dept}</span>
                          <span className="dept-count-modern">{count} pessoas</span>
                        </div>
                        <div className="dept-progress-wrapper">
                          <div className="dept-bar-modern">
                            <div 
                              className="dept-fill-modern" 
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                          <span className="dept-percentage">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card de Status da Equipe */}
              <div className="overview-card-modern">
                <div className="card-header-modern">
                  <div className="card-icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Status da Equipe</h3>
                </div>
                <div className="card-content-modern">
                  <div className="status-grid-modern">
                    <div className="status-card-modern active-status">
                      <div className="status-icon-modern">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="status-info-modern">
                        <span className="status-count">{teamData.members.filter(m => m.status === 'ativo').length}</span>
                        <span className="status-text">Ativos</span>
                      </div>
                    </div>
                    
                    <div className="status-card-modern inactive-status">
                      <div className="status-icon-modern">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="status-info-modern">
                        <span className="status-count">{teamData.members.filter(m => m.status === 'inativo').length}</span>
                        <span className="status-text">Inativos</span>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Pizza Simplificado */}
                  <div className="status-chart">
                    <svg viewBox="0 0 100 100" className="donut-chart">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#fee"
                        strokeWidth="20"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#00b894"
                        strokeWidth="20"
                        strokeDasharray={`${(teamData.members.filter(m => m.status === 'ativo').length / teamData.totalMembers) * 251.2} 251.2`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      <text x="50" y="55" textAnchor="middle" className="donut-text">
                        {Math.round((teamData.members.filter(m => m.status === 'ativo').length / teamData.totalMembers) * 100)}%
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Membros */}
        {activeTab === 'membros' && (
          <div className="tab-content-wrapper">
            {/* Barra de Busca Moderna */}
            <div className="search-section-modern">
              <div className="search-wrapper-modern">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  className="search-input-modern"
                  placeholder="Buscar por nome, cargo ou departamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="clear-search" onClick={() => setSearchTerm('')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="search-results-info">
                {filteredMembers.length} {filteredMembers.length === 1 ? 'membro encontrado' : 'membros encontrados'}
              </div>
            </div>

            {/* Grid de Membros Moderno */}
            <div className="members-grid-modern">
              {filteredMembers.map(member => (
                <div key={member.id} className={`member-card-modern ${member.status}`}>
                  <div className="member-card-header">
                    <div className="member-avatar-modern">
                      <span className="avatar-emoji">{member.avatar}</span>
                      <div className={`status-indicator ${member.status}`}></div>
                    </div>
                    <div className="member-basic-info">
                      <h3 className="member-name-modern">{member.name}</h3>
                      <p className="member-role-modern">{member.role}</p>
                      <div className="member-department-badge">{member.department}</div>
                    </div>
                    {member.isManager && (
                      <div className="manager-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 0L10.4 5.6L16 6.4L11.6 10.4L12.8 16L8 13.2L3.2 16L4.4 10.4L0 6.4L5.6 5.6L8 0Z" fill="currentColor"/>
                        </svg>
                        Gestor
                      </div>
                    )}
                  </div>
                  
                  <div className="member-performance-section">
                    <div className="performance-header-modern">
                      <span className="performance-label-modern">Performance</span>
                      <span className="performance-value-modern">{member.performance}%</span>
                    </div>
                    <div className="performance-bar-modern">
                      <div 
                        className={`performance-fill-modern ${
                          member.performance >= 90 ? 'excellent' : 
                          member.performance >= 80 ? 'good' : 
                          member.performance >= 70 ? 'regular' : 'needs-improvement'
                        }`}
                        style={{width: `${member.performance}%`}}
                      >
                        <div className="performance-shimmer"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="member-actions-modern">
                    <button 
                      className="member-btn-modern primary"
                      onClick={() => navigate(`/membro/${member.id}`)}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM8 4C9.1 4 10 4.9 10 6C10 7.1 9.1 8 8 8C6.9 8 6 7.1 6 6C6 4.9 6.9 4 8 4ZM8 13C6.33 13 4.82 12.15 4 10.85C4.03 9.49 6.67 8.75 8 8.75C9.32 8.75 11.97 9.49 12 10.85C11.18 12.15 9.67 13 8 13Z" fill="currentColor"/>
                      </svg>
                      Ver Perfil
                    </button>
                    <button className="member-btn-modern secondary">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C11.9867 1.93333 11.5667 1.93333 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333Z" fill="currentColor"/>
                      </svg>
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="empty-state-modern">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#f5f6fa"/>
                  <path d="M32 20C25.4 20 20 25.4 20 32C20 38.6 25.4 44 32 44C38.6 44 44 38.6 44 32C44 25.4 38.6 20 32 20ZM32 26C34.2 26 36 27.8 36 30C36 32.2 34.2 34 32 34C29.8 34 28 32.2 28 30C28 27.8 29.8 26 32 26ZM32 42C28.8 42 25.94 40.34 24.2 37.78C24.24 35.16 29.4 33.7 32 33.7C34.6 33.7 39.76 35.16 39.8 37.78C38.06 40.34 35.2 42 32 42Z" fill="#b2bec3"/>
                </svg>
                <h3>Nenhum membro encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
              </div>
            )}
          </div>
        )}

        {/* Aba Performance */}
        {activeTab === 'performance' && (
          <div className="tab-content-wrapper">
            {/* Performance Summary Cards */}
            <div className="performance-summary-modern">
              <div className="performance-card excellent-card">
                <div className="perf-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="perf-card-content">
                  <span className="perf-card-value">{teamData.members.filter(m => m.performance >= 90).length}</span>
                  <span className="perf-card-label">Excelente (90%+)</span>
                  <div className="perf-card-badge excellent">Top Performance</div>
                </div>
              </div>

              <div className="performance-card good-card">
                <div className="perf-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="perf-card-content">
                  <span className="perf-card-value">{teamData.members.filter(m => m.performance >= 80 && m.performance < 90).length}</span>
                  <span className="perf-card-label">Bom (80-89%)</span>
                  <div className="perf-card-badge good">Bom Desempenho</div>
                </div>
              </div>

              <div className="performance-card regular-card">
                <div className="perf-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="perf-card-content">
                  <span className="perf-card-value">{teamData.members.filter(m => m.performance >= 70 && m.performance < 80).length}</span>
                  <span className="perf-card-label">Regular (70-79%)</span>
                  <div className="perf-card-badge regular">Atenção</div>
                </div>
              </div>

              <div className="performance-card needs-card">
                <div className="perf-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="perf-card-content">
                  <span className="perf-card-value">{teamData.members.filter(m => m.performance < 70).length}</span>
                  <span className="perf-card-label">Precisa Melhorar</span>
                  <div className="perf-card-badge needs">Necessita Suporte</div>
                </div>
              </div>
            </div>

            {/* Ranking de Performance */}
            <div className="performance-ranking-modern">
              <div className="ranking-header-modern">
                <h3>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  Ranking de Performance
                </h3>
                <span className="ranking-subtitle">Ordenado por desempenho</span>
              </div>

              <div className="ranking-list-modern">
                {teamData.members
                  .sort((a, b) => b.performance - a.performance)
                  .map((member, index) => (
                    <div key={member.id} className={`ranking-item-modern ${index < 3 ? 'top-performer' : ''}`}>
                      <div className="rank-position-modern">
                        {index === 0 && <span className="medal gold">🥇</span>}
                        {index === 1 && <span className="medal silver">🥈</span>}
                        {index === 2 && <span className="medal bronze">🥉</span>}
                        {index > 2 && <span className="rank-number">#{index + 1}</span>}
                      </div>
                      
                      <div className="rank-member-info">
                        <div className="rank-avatar">{member.avatar}</div>
                        <div className="rank-details">
                          <span className="rank-name">{member.name}</span>
                          <span className="rank-role">{member.role}</span>
                        </div>
                      </div>
                      
                      <div className="rank-performance">
                        <div className="rank-score-wrapper">
                          <span className="rank-score">{member.performance}%</span>
                          <div className="rank-bar-mini">
                            <div 
                              className={`rank-fill-mini ${
                                member.performance >= 90 ? 'excellent' : 
                                member.performance >= 80 ? 'good' : 'regular'
                              }`}
                              style={{width: `${member.performance}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Adicionar Novo Membro */}
      {showAddModal && (
        <div className="modal-overlay-modern" onClick={() => setShowAddModal(false)}>
          <div className="modal-content-modern new-member-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-modern">
              <div className="modal-header-left">
                <div className="modal-icon-wrapper">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM6 10V7H4V10H1V12H4V15H6V12H9V10H6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h2>Adicionar Novo Membro</h2>
                  <p>Preencha as informações do novo membro da equipe</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <div className="modal-body-modern">
              <div className="form-grid-modern">
                <div className="form-group-modern full-width">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                    </svg>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    className="form-input-modern"
                    placeholder="Digite o nome completo"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 2H2C0.9 2 0 2.9 0 4V12C0 13.1 0.9 14 2 14H14C15.1 14 16 13.1 16 12V4C16 2.9 15.1 2 14 2ZM14 12H2V6L8 9L14 6V12ZM8 7L2 4H14L8 7Z" fill="currentColor"/>
                    </svg>
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-input-modern"
                    placeholder="email@empresa.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12.5 7C13.88 7 14.99 5.88 14.99 4.5C14.99 3.12 13.88 2 12.5 2C11.12 2 10 3.12 10 4.5C10 5.88 11.12 7 12.5 7ZM5.5 7C6.88 7 7.99 5.88 7.99 4.5C7.99 3.12 6.88 2 5.5 2C4.12 2 3 3.12 3 4.5C3 5.88 4.12 7 5.5 7ZM5.5 9C3.67 9 0 9.92 0 11.75V14H11V11.75C11 9.92 7.33 9 5.5 9ZM12.5 9C12.25 9 11.96 9.02 11.67 9.05C12.61 9.75 13.25 10.62 13.25 11.75V14H18V11.75C18 9.92 14.33 9 12.5 9Z" fill="currentColor"/>
                    </svg>
                    Cargo *
                  </label>
                  <input
                    type="text"
                    className="form-input-modern"
                    placeholder="Ex: Desenvolvedor Frontend"
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 0H4C2.9 0 2 0.9 2 2V14C2 15.1 2.9 16 4 16H12C13.1 16 14 15.1 14 14V2C14 0.9 13.1 0 12 0ZM6 14H4V12H6V14ZM6 11H4V9H6V11ZM6 8H4V6H6V8ZM6 5H4V3H6V5ZM10 14H8V12H10V14ZM10 11H8V9H10V11ZM10 8H8V6H10V8ZM10 5H8V3H10V5ZM12 14H12V3H12V14Z" fill="currentColor"/>
                    </svg>
                    Departamento *
                  </label>
                  <select
                    className="form-input-modern"
                    value={newMember.department}
                    onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                    required
                  >
                    <option value="">Selecione um departamento</option>
                    {teamData.departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.2 8.8C4.6 11.6 7.4 13.4 10.4 13.8L12.6 11.6C12.9 11.3 13.3 11.2 13.6 11.3C14.6 11.6 15.7 11.8 16.8 11.8C17.5 11.8 18 12.3 18 13V16.8C18 17.5 17.5 18 16.8 18C7.5 18 0 10.5 0 1.2C0 0.5 0.5 0 1.2 0H5C5.7 0 6.2 0.5 6.2 1.2C6.2 2.3 6.4 3.4 6.7 4.4C6.8 4.7 6.7 5.1 6.4 5.4L4.2 7.6C4.6 8.4 4.9 9.1 3.2 8.8Z" fill="currentColor"/>
                    </svg>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className="form-input-modern"
                    placeholder="(00) 00000-0000"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  />
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13 2H12V0H10V2H6V0H4V2H3C1.89 2 1 2.9 1 4V16C1 17.1 1.89 18 3 18H13C14.1 18 15 17.1 15 16V4C15 2.9 14.1 2 13 2ZM13 16H3V7H13V16Z" fill="currentColor"/>
                    </svg>
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    className="form-input-modern"
                    value={newMember.startDate}
                    onChange={(e) => setNewMember({...newMember, startDate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-info-box">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z" fill="currentColor"/>
                </svg>
                <p>Os campos marcados com * são obrigatórios. Após cadastrar, um email de boas-vindas será enviado ao novo membro.</p>
              </div>
            </div>

            <div className="modal-footer-modern">
              <button className="btn-modal-secondary" onClick={() => setShowAddModal(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Cancelar
              </button>
              <button className="btn-modal-primary" onClick={() => {
                // Aqui você adicionaria a lógica para salvar o novo membro
                console.log('Novo membro:', newMember);
                alert('Membro adicionado com sucesso!');
                setShowAddModal(false);
                setNewMember({ name: '', email: '', role: '', department: '', phone: '', startDate: '' });
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5.6 10.4L2.2 7L0.8 8.4L5.6 13.2L16 2.8L14.6 1.4L5.6 10.4Z" fill="currentColor"/>
                </svg>
                Adicionar Membro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipe;