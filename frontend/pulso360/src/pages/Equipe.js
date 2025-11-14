import React, { useState } from 'react';

const Equipe = () => {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const [searchTerm, setSearchTerm] = useState('');

  // Dados da equipe - exemplo
  const teamData = {
    totalMembers: 8,
    departments: ['Tecnologia', 'Design', 'Marketing'],
    members: [
      {
        id: 1,
        name: 'Ana Silva',
        role: 'Desenvolvedora Frontend',
        department: 'Tecnologia',
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
        name: 'Carlos Mendes',
        role: 'Analista de Marketing',
        department: 'Marketing',
        status: 'ativo',
        performance: 78,
        avatar: '👨‍💼'
      },
      {
        id: 4,
        name: 'Diana Santos',
        role: 'Desenvolvedora Backend',
        department: 'Tecnologia',
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
    <div className="team-page">
      {/* Header */}
      <div className="team-header">
        <h1>🏢 Gestão de Equipe</h1>
        <p>Gerencie sua equipe de forma simples e eficiente</p>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="team-stats">
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <h3>{teamData.totalMembers}</h3>
            <p>Total de Membros</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <h3>{teamData.members.filter(m => m.status === 'ativo').length}</h3>
            <p>Membros Ativos</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏢</span>
          <div className="stat-info">
            <h3>{teamData.departments.length}</h3>
            <p>Departamentos</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <h3>{Math.round(teamData.members.reduce((acc, m) => acc + m.performance, 0) / teamData.members.length)}%</h3>
            <p>Performance Média</p>
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="team-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="team-content">
        {/* Aba Visão Geral */}
        {activeTab === 'visao-geral' && (
          <div className="tab-content">
            <h2>📋 Resumo da Equipe</h2>
            
            <div className="overview-grid">
              {/* Distribuição por Departamento */}
              <div className="overview-card">
                <h3>🏢 Departamentos</h3>
                {teamData.departments.map(dept => {
                  const count = teamData.members.filter(m => m.department === dept).length;
                  const percentage = Math.round((count / teamData.totalMembers) * 100);
                  return (
                    <div key={dept} className="dept-item">
                      <span className="dept-name">{dept}</span>
                      <div className="dept-bar">
                        <div 
                          className="dept-fill" 
                          style={{width: `${percentage}%`}}
                        ></div>
                      </div>
                      <span className="dept-count">{count} pessoas ({percentage}%)</span>
                    </div>
                  );
                })}
              </div>

              {/* Status da Equipe */}
              <div className="overview-card">
                <h3>📊 Status da Equipe</h3>
                <div className="status-summary">
                  <div className="status-item">
                    <span className="status-dot active"></span>
                    <span>Ativos: {teamData.members.filter(m => m.status === 'ativo').length}</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot inactive"></span>
                    <span>Inativos: {teamData.members.filter(m => m.status === 'inativo').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Membros */}
        {activeTab === 'membros' && (
          <div className="tab-content">
            {/* Barra de Busca */}
            <div className="search-section">
              <h2>👥 Membros da Equipe</h2>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="🔍 Buscar por nome, cargo ou departamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Lista de Membros */}
            <div className="members-grid">
              {filteredMembers.map(member => (
                <div key={member.id} className="member-card">
                  <div className="member-header">
                    <div className="member-avatar">{member.avatar}</div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                      <span className="member-dept">{member.department}</span>
                    </div>
                    <div className={`member-status ${member.status}`}>
                      {member.status === 'ativo' ? '🟢' : '🔴'}
                    </div>
                  </div>
                  
                  <div className="member-performance">
                    <div className="performance-label">
                      <span>Performance</span>
                      <span>{member.performance}%</span>
                    </div>
                    <div className="performance-bar">
                      <div 
                        className="performance-fill" 
                        style={{width: `${member.performance}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="member-actions">
                    <button className="btn-action primary">
                      👁️ Ver Perfil
                    </button>
                    <button className="btn-action secondary">
                      ✏️ Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aba Performance */}
        {activeTab === 'performance' && (
          <div className="tab-content">
            <h2>📈 Performance da Equipe</h2>
            
            <div className="performance-overview">
              <div className="performance-summary">
                <div className="summary-card excellent">
                  <h4>Excelente (90%+)</h4>
                  <p>{teamData.members.filter(m => m.performance >= 90).length} membros</p>
                </div>
                <div className="summary-card good">
                  <h4>Bom (80-89%)</h4>
                  <p>{teamData.members.filter(m => m.performance >= 80 && m.performance < 90).length} membros</p>
                </div>
                <div className="summary-card regular">
                  <h4>Regular (70-79%)</h4>
                  <p>{teamData.members.filter(m => m.performance >= 70 && m.performance < 80).length} membros</p>
                </div>
                <div className="summary-card needs-improvement">
                  <h4>Precisa Melhorar (&lt;70%)</h4>
                  <p>{teamData.members.filter(m => m.performance < 70).length} membros</p>
                </div>
              </div>

              <div className="performance-ranking">
                <h3>🏆 Ranking de Performance</h3>
                {teamData.members
                  .sort((a, b) => b.performance - a.performance)
                  .map((member, index) => (
                    <div key={member.id} className="ranking-item">
                      <div className="rank-position">#{index + 1}</div>
                      <div className="rank-member">
                        <span className="rank-avatar">{member.avatar}</span>
                        <div>
                          <div className="rank-name">{member.name}</div>
                          <div className="rank-role">{member.role}</div>
                        </div>
                      </div>
                      <div className="rank-score">{member.performance}%</div>
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

export default Equipe;