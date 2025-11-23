import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Permissoes() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("gerente");
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [permissions, setPermissions] = useState({
    admin: {
      dashboard: { visualizar: true, editar: true, excluir: true, criar: true },
      usuarios: { visualizar: true, editar: true, excluir: true, criar: true },
      pdi: { visualizar: true, editar: true, excluir: true, criar: true },
      avaliacoes: { visualizar: true, editar: true, excluir: true, criar: true },
      equipe: { visualizar: true, editar: true, excluir: true, criar: true },
      relatorios: { visualizar: true, editar: true, excluir: true, criar: true },
      configuracoes: { visualizar: true, editar: true, excluir: true, criar: true },
      admin: { visualizar: true, editar: true, excluir: true, criar: true },
      feedbacks: { visualizar: true, editar: true, excluir: true, criar: true },
      metas: { visualizar: true, editar: true, excluir: true, criar: true },
    },
    gerente: {
      dashboard: { visualizar: true, editar: true, excluir: false, criar: true },
      usuarios: { visualizar: true, editar: true, excluir: false, criar: false },
      pdi: { visualizar: true, editar: true, excluir: true, criar: true },
      avaliacoes: { visualizar: true, editar: true, excluir: true, criar: true },
      equipe: { visualizar: true, editar: true, excluir: false, criar: true },
      relatorios: { visualizar: true, editar: true, excluir: false, criar: true },
      configuracoes: { visualizar: true, editar: false, excluir: false, criar: false },
      admin: { visualizar: false, editar: false, excluir: false, criar: false },
      feedbacks: { visualizar: true, editar: true, excluir: true, criar: true },
      metas: { visualizar: true, editar: true, excluir: true, criar: true },
    },
    coordenador: {
      dashboard: { visualizar: true, editar: true, excluir: false, criar: false },
      usuarios: { visualizar: true, editar: false, excluir: false, criar: false },
      pdi: { visualizar: true, editar: true, excluir: false, criar: true },
      avaliacoes: { visualizar: true, editar: true, excluir: false, criar: true },
      equipe: { visualizar: true, editar: true, excluir: false, criar: false },
      relatorios: { visualizar: true, editar: false, excluir: false, criar: false },
      configuracoes: { visualizar: false, editar: false, excluir: false, criar: false },
      admin: { visualizar: false, editar: false, excluir: false, criar: false },
      feedbacks: { visualizar: true, editar: true, excluir: false, criar: true },
      metas: { visualizar: true, editar: true, excluir: false, criar: true },
    },
    analista: {
      dashboard: { visualizar: true, editar: false, excluir: false, criar: false },
      usuarios: { visualizar: true, editar: false, excluir: false, criar: false },
      pdi: { visualizar: true, editar: true, excluir: false, criar: false },
      avaliacoes: { visualizar: true, editar: false, excluir: false, criar: false },
      equipe: { visualizar: true, editar: false, excluir: false, criar: false },
      relatorios: { visualizar: true, editar: false, excluir: false, criar: false },
      configuracoes: { visualizar: false, editar: false, excluir: false, criar: false },
      admin: { visualizar: false, editar: false, excluir: false, criar: false },
      feedbacks: { visualizar: true, editar: true, excluir: false, criar: true },
      metas: { visualizar: true, editar: false, excluir: false, criar: false },
    },
    colaborador: {
      dashboard: { visualizar: true, editar: false, excluir: false, criar: false },
      usuarios: { visualizar: false, editar: false, excluir: false, criar: false },
      pdi: { visualizar: true, editar: true, excluir: false, criar: false },
      avaliacoes: { visualizar: true, editar: false, excluir: false, criar: false },
      equipe: { visualizar: false, editar: false, excluir: false, criar: false },
      relatorios: { visualizar: false, editar: false, excluir: false, criar: false },
      configuracoes: { visualizar: false, editar: false, excluir: false, criar: false },
      admin: { visualizar: false, editar: false, excluir: false, criar: false },
      feedbacks: { visualizar: true, editar: false, excluir: false, criar: true },
      metas: { visualizar: true, editar: false, excluir: false, criar: false },
    },
  });

  const roles = [
    { 
      id: "admin", 
      nome: "Administrador", 
      usuarios: 5, 
      cor: "#e74c3c",
      descricao: "Acesso total ao sistema",
      icon: "👑"
    },
    { 
      id: "gerente", 
      nome: "Gerente", 
      usuarios: 23, 
      cor: "#667eea",
      descricao: "Gerenciar equipes e processos",
      icon: "👔"
    },
    { 
      id: "coordenador", 
      nome: "Coordenador", 
      usuarios: 45, 
      cor: "#00b894",
      descricao: "Coordenar atividades da equipe",
      icon: "📋"
    },
    { 
      id: "analista", 
      nome: "Analista", 
      usuarios: 89, 
      cor: "#fdcb6e",
      descricao: "Analisar dados e relatórios",
      icon: "📊"
    },
    { 
      id: "colaborador", 
      nome: "Colaborador", 
      usuarios: 85, 
      cor: "#636e72",
      descricao: "Acesso básico ao sistema",
      icon: "👤"
    },
  ];

  const modulos = [
    { id: "dashboard", nome: "Dashboard", icon: "📊", descricao: "Painel principal do sistema" },
    { id: "usuarios", nome: "Usuários", icon: "👥", descricao: "Gerenciamento de usuários" },
    { id: "pdi", nome: "PDI", icon: "🎯", descricao: "Plano de Desenvolvimento Individual" },
    { id: "avaliacoes", nome: "Avaliações", icon: "⭐", descricao: "Sistema de avaliações" },
    { id: "equipe", nome: "Equipe", icon: "👨‍👩‍👧‍👦", descricao: "Gerenciamento de equipes" },
    { id: "relatorios", nome: "Relatórios", icon: "📈", descricao: "Relatórios e análises" },
    { id: "configuracoes", nome: "Configurações", icon: "⚙️", descricao: "Configurações do sistema" },
    { id: "admin", nome: "Administração", icon: "🔐", descricao: "Painel administrativo" },
    { id: "feedbacks", nome: "Feedbacks", icon: "💬", descricao: "Sistema de feedbacks" },
    { id: "metas", nome: "Metas", icon: "🎯", descricao: "Gerenciamento de metas" },
  ];

  const filteredModulos = modulos.filter(modulo =>
    modulo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    modulo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePermissionChange = (modulo, acao) => {
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [modulo]: {
          ...prev[selectedRole][modulo],
          [acao]: !prev[selectedRole][modulo][acao]
        }
      }
    }));
  };

  const handleSelectAll = (acao) => {
    const allEnabled = filteredModulos.every(mod => 
      permissions[selectedRole][mod.id][acao]
    );
    
    setPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        ...Object.fromEntries(
          filteredModulos.map(mod => [
            mod.id,
            { ...prev[selectedRole][mod.id], [acao]: !allEnabled }
          ])
        )
      }
    }));
  };

  const handleDeleteRole = (role) => {
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log("Deletando role:", roleToDelete);
    setShowDeleteConfirm(false);
    setRoleToDelete(null);
  };

  const getPermissionCount = (roleId) => {
    const perms = permissions[roleId];
    if (!perms) return { total: 0, granted: 0 };
    
    let granted = 0;
    let total = 0;
    
    Object.values(perms).forEach(module => {
      Object.values(module).forEach(value => {
        total++;
        if (value) granted++;
      });
    });
    
    return { total, granted };
  };

  const selectedRoleData = roles.find(r => r.id === selectedRole);
  const permissionStats = getPermissionCount(selectedRole);

  return (
    <div className="admin-page-permissoes">
      {/* Header Profissional */}
      <header className="admin-header-professional">
        <div className="header-left">
          <button onClick={() => navigate("/administracao")} className="btn-back-professional">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar
          </button>
          <div className="page-title-block">
            <div className="icon-circle-professional" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="page-title">Gerenciar Permissões</h1>
              <p className="page-subtitle">Configure cargos e permissões de acesso ao sistema</p>
            </div>
          </div>
        </div>
        <div className="header-actions-professional">
          <button className="btn-add-professional" onClick={() => setShowAddRoleModal(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Novo Cargo
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="permissions-stats-grid">
        <div className="permission-stat-card">
          <div className="stat-icon-perm" style={{ background: "#667eea20", color: "#667eea" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info-perm">
            <p className="stat-label-perm">Total de Cargos</p>
            <h3 className="stat-value-perm">{roles.length}</h3>
            <span className="stat-desc">Configurados no sistema</span>
          </div>
        </div>
        
        <div className="permission-stat-card">
          <div className="stat-icon-perm" style={{ background: "#00b89420", color: "#00b894" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11L11 13L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info-perm">
            <p className="stat-label-perm">Módulos do Sistema</p>
            <h3 className="stat-value-perm">{modulos.length}</h3>
            <span className="stat-desc">Com controle de acesso</span>
          </div>
        </div>

        <div className="permission-stat-card">
          <div className="stat-icon-perm" style={{ background: "#fdcb6e20", color: "#fdcb6e" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10C3 9.46957 3.21071 8.96086 3.58579 8.58579C3.96086 8.21071 4.46957 8 5 8H8V21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8H19C19.5304 8 20.0391 8.21071 20.4142 8.58579C20.7893 8.96086 21 9.46957 21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info-perm">
            <p className="stat-label-perm">Permissões Ativas</p>
            <h3 className="stat-value-perm">{permissionStats.granted}/{permissionStats.total}</h3>
            <span className="stat-desc">Para {selectedRoleData?.nome}</span>
          </div>
        </div>

        <div className="permission-stat-card">
          <div className="stat-icon-perm" style={{ background: "#e74c3c20", color: "#e74c3c" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-info-perm">
            <p className="stat-label-perm">Usuários Afetados</p>
            <h3 className="stat-value-perm">{selectedRoleData?.usuarios || 0}</h3>
            <span className="stat-desc">Neste cargo</span>
          </div>
        </div>
      </div>

      {/* Layout de Permissões */}
      <div className="permissions-layout-professional">
        {/* Sidebar de Cargos */}
        <div className="roles-sidebar-professional">
          <div className="sidebar-header-perm">
            <h3>Cargos e Funções</h3>
            <span className="roles-count">{roles.length}</span>
          </div>
          
          <div className="roles-list-professional">
            {roles.map((role) => (
              <div 
                key={role.id}
                className={`role-card-professional ${selectedRole === role.id ? 'active' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="role-header-card">
                  <div className="role-icon-professional" style={{ background: `${role.cor}20`, color: role.cor }}>
                    <span style={{ fontSize: "24px" }}>{role.icon}</span>
                  </div>
                  <div className="role-color-indicator" style={{ background: role.cor }}></div>
                </div>
                
                <div className="role-content-card">
                  <h4 className="role-name-professional">{role.nome}</h4>
                  <p className="role-description">{role.descricao}</p>
                  <div className="role-users-badge">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11 12V10.6667C11 9.95942 10.719 9.28115 10.219 8.78105C9.71895 8.28095 9.04058 8 8.33333 8H5.66667C4.95942 8 4.28115 8.28095 3.78105 8.78105C3.28095 9.28115 3 9.95942 3 10.6667V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 5.66667C8.47276 5.66667 9.66667 4.47276 9.66667 3C9.66667 1.52724 8.47276 0.333333 7 0.333333C5.52724 0.333333 4.33333 1.52724 4.33333 3C4.33333 4.47276 5.52724 5.66667 7 5.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {role.usuarios} usuários
                  </div>
                </div>

                {selectedRole === role.id && role.id !== 'admin' && (
                  <button 
                    className="role-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRole(role);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1.75 3.5H12.25M5.25 6.125V9.625M8.75 6.125V9.625M2.625 3.5L3.5 11.375C3.5 11.6071 3.59219 11.8296 3.75628 11.9937C3.92038 12.1578 4.14294 12.25 4.375 12.25H9.625C9.85706 12.25 10.0796 12.1578 10.2437 11.9937C10.4078 11.8296 10.5 11.6071 10.5 11.375L11.375 3.5M5.25 3.5V2.625C5.25 2.39294 5.34219 2.17038 5.50628 2.00628C5.67038 1.84219 5.89294 1.75 6.125 1.75H7.875C8.10706 1.75 8.32962 1.84219 8.49372 2.00628C8.65781 2.17038 8.75 2.39294 8.75 2.625V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Área Principal de Permissões */}
        <div className="permissions-main-professional">
          {/* Header da tabela */}
          <div className="permissions-table-header">
            <div className="table-title-section">
              <div className="role-badge-large" style={{ background: `${selectedRoleData?.cor}20`, color: selectedRoleData?.cor }}>
                <span style={{ fontSize: "28px" }}>{selectedRoleData?.icon}</span>
              </div>
              <div>
                <h2 className="table-title">Permissões - {selectedRoleData?.nome}</h2>
                <p className="table-subtitle">{selectedRoleData?.descricao}</p>
              </div>
            </div>
            <button className="btn-save-permissions">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14.25 8.0625V14.25C14.25 14.6478 14.092 15.0294 13.8107 15.3107C13.5294 15.592 13.1478 15.75 12.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75H9.9375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 2.25L15.75 4.5L8.625 11.625L6.375 12L6.75 9.75L13.5 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Salvar Alterações
            </button>
          </div>

          {/* Busca de módulos */}
          <div className="module-search-container">
            <svg className="search-icon-module" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.125 11.625H12.3525L12.0825 11.3625C13.0575 10.2375 13.65 8.7825 13.65 7.2C13.65 3.5925 10.6575 0.6 7.05 0.6C3.4425 0.6 0.45 3.5925 0.45 7.2C0.45 10.8075 3.4425 13.8 7.05 13.8C8.6325 13.8 10.0875 13.2075 11.2125 12.2325L11.475 12.5025V13.275L16.65 18.4425L18.2925 16.8L13.125 11.625ZM7.05 11.625C4.635 11.625 2.625 9.615 2.625 7.2C2.625 4.785 4.635 2.775 7.05 2.775C9.465 2.775 11.475 4.785 11.475 7.2C11.475 9.615 9.465 11.625 7.05 11.625Z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              className="module-search-input"
              placeholder="Buscar módulos ou funcionalidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="search-clear-module" onClick={() => setSearchTerm("")}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Tabela de Permissões */}
          <div className="permissions-table-professional">
            <div className="permissions-table-scroll">
              <table className="table-permissions">
                <thead>
                  <tr>
                    <th className="module-column">Módulo</th>
                    <th className="action-column">
                      <div className="column-header-content">
                        <span>Visualizar</span>
                        <button 
                          className="select-all-btn"
                          onClick={() => handleSelectAll('visualizar')}
                          title="Selecionar todos"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12 4L5.5 10.5L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="action-column">
                      <div className="column-header-content">
                        <span>Criar</span>
                        <button 
                          className="select-all-btn"
                          onClick={() => handleSelectAll('criar')}
                          title="Selecionar todos"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12 4L5.5 10.5L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="action-column">
                      <div className="column-header-content">
                        <span>Editar</span>
                        <button 
                          className="select-all-btn"
                          onClick={() => handleSelectAll('editar')}
                          title="Selecionar todos"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12 4L5.5 10.5L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                    <th className="action-column">
                      <div className="column-header-content">
                        <span>Excluir</span>
                        <button 
                          className="select-all-btn"
                          onClick={() => handleSelectAll('excluir')}
                          title="Selecionar todos"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12 4L5.5 10.5L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModulos.map((modulo) => (
                    <tr key={modulo.id}>
                      <td className="module-cell">
                        <div className="module-info">
                          <span className="module-icon">{modulo.icon}</span>
                          <div>
                            <div className="module-name">{modulo.nome}</div>
                            <div className="module-desc">{modulo.descricao}</div>
                          </div>
                        </div>
                      </td>
                      <td className="action-cell">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={permissions[selectedRole]?.[modulo.id]?.visualizar || false}
                            onChange={() => handlePermissionChange(modulo.id, 'visualizar')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </td>
                      <td className="action-cell">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={permissions[selectedRole]?.[modulo.id]?.criar || false}
                            onChange={() => handlePermissionChange(modulo.id, 'criar')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </td>
                      <td className="action-cell">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={permissions[selectedRole]?.[modulo.id]?.editar || false}
                            onChange={() => handlePermissionChange(modulo.id, 'editar')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </td>
                      <td className="action-cell">
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={permissions[selectedRole]?.[modulo.id]?.excluir || false}
                            onChange={() => handlePermissionChange(modulo.id, 'excluir')}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredModulos.length === 0 && (
                <div className="empty-state-permissions">
                  <div className="empty-icon-permissions">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                      <path d="M32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58Z" stroke="#e0e0e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 23L41 41M23 41L41 23" stroke="#e0e0e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Nenhum módulo encontrado</h3>
                  <p>Não há módulos que correspondam à sua busca.</p>
                  <button className="btn-clear-search" onClick={() => setSearchTerm("")}>
                    Limpar Busca
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Adicionar Novo Cargo */}
      {showAddRoleModal && (
        <div className="modal-overlay-professional" onClick={() => setShowAddRoleModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Adicionar Novo Cargo</h2>
              <button className="modal-close-professional" onClick={() => setShowAddRoleModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <form className="modal-form-professional" onSubmit={(e) => { e.preventDefault(); setShowAddRoleModal(false); }}>
              <div className="form-group-professional">
                <label className="form-label-professional">
                  Nome do Cargo <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-input-professional"
                  placeholder="Ex: Supervisor, Diretor, etc." 
                  required
                />
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">
                  Descrição <span className="required">*</span>
                </label>
                <textarea 
                  className="form-textarea-professional"
                  placeholder="Descreva as responsabilidades deste cargo..." 
                  rows="3"
                  required
                />
              </div>
              <div className="form-row-professional">
                <div className="form-group-professional">
                  <label className="form-label-professional">
                    Cor de Identificação <span className="required">*</span>
                  </label>
                  <input 
                    type="color" 
                    className="form-color-professional"
                    defaultValue="#667eea"
                  />
                </div>
                <div className="form-group-professional">
                  <label className="form-label-professional">
                    Ícone (Emoji)
                  </label>
                  <input 
                    type="text" 
                    className="form-input-professional"
                    placeholder="🎯"
                    maxLength="2"
                  />
                </div>
              </div>
              <div className="modal-footer-professional">
                <button type="button" className="btn-cancel-professional" onClick={() => setShowAddRoleModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit-professional">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Criar Cargo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão de Cargo */}
      {showDeleteConfirm && roleToDelete && (
        <div className="modal-overlay-professional" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content-professional small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Confirmar Exclusão</h2>
              <button className="modal-close-professional" onClick={() => setShowDeleteConfirm(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <div className="warning-icon-professional">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#f39c12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 16V24" stroke="#f39c12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 32H24.02" stroke="#f39c12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="warning-text-professional">
                Tem certeza que deseja excluir o cargo <strong>{roleToDelete.nome}</strong>?
              </p>
              <p className="warning-subtext">
                Existem {roleToDelete.usuarios} usuários com este cargo. Eles precisarão ser reatribuídos antes da exclusão.
              </p>
            </div>
            <div className="modal-footer-professional">
              <button className="btn-cancel-professional" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </button>
              <button className="btn-danger-professional" onClick={confirmDelete}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4H14M6 4V2H10V4M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
