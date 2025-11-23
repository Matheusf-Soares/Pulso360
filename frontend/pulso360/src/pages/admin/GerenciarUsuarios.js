import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GerenciarUsuarios() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    departamento: "",
    telefone: "",
    permissoes: []
  });

  const usuarios = [
    { id: 1, nome: "João Silva", email: "joao@pulso360.com", cargo: "Gerente", departamento: "TI", telefone: "(11) 98765-4321", status: "Ativo", ultimoAcesso: "Hoje, 14:30", avatar: "JS" },
    { id: 2, nome: "Maria Santos", email: "maria@pulso360.com", cargo: "Analista", departamento: "RH", telefone: "(11) 98765-4322", status: "Ativo", ultimoAcesso: "Hoje, 12:15", avatar: "MS" },
    { id: 3, nome: "Pedro Costa", email: "pedro@pulso360.com", cargo: "Coordenador", departamento: "Comercial", telefone: "(11) 98765-4323", status: "Ativo", ultimoAcesso: "Ontem, 18:45", avatar: "PC" },
    { id: 4, nome: "Ana Oliveira", email: "ana@pulso360.com", cargo: "Colaborador", departamento: "Financeiro", telefone: "(11) 98765-4324", status: "Inativo", ultimoAcesso: "3 dias atrás", avatar: "AO" },
    { id: 5, nome: "Carlos Mendes", email: "carlos@pulso360.com", cargo: "Gerente", departamento: "TI", telefone: "(11) 98765-4325", status: "Ativo", ultimoAcesso: "Hoje, 09:45", avatar: "CM" },
    { id: 6, nome: "Julia Rodrigues", email: "julia@pulso360.com", cargo: "Analista", departamento: "RH", telefone: "(11) 98765-4326", status: "Ativo", ultimoAcesso: "Hoje, 15:20", avatar: "JR" },
    { id: 7, nome: "Roberto Alves", email: "roberto@pulso360.com", cargo: "Colaborador", departamento: "Comercial", telefone: "(11) 98765-4327", status: "Ativo", ultimoAcesso: "Hoje, 11:00", avatar: "RA" },
    { id: 8, nome: "Fernanda Lima", email: "fernanda@pulso360.com", cargo: "Coordenador", departamento: "Marketing", telefone: "(11) 98765-4328", status: "Ativo", ultimoAcesso: "Ontem, 16:30", avatar: "FL" },
  ];

  const stats = [
    { label: "Total de Usuários", value: "247", icon: "👥", color: "#667eea", change: "+12 este mês", trend: "up" },
    { label: "Usuários Ativos", value: "234", icon: "✅", color: "#00b894", change: "94.7% taxa", trend: "up" },
    { label: "Novos (30 dias)", value: "18", icon: "🆕", color: "#fdcb6e", change: "+5 vs mês anterior", trend: "up" },
    { label: "Inativos", value: "13", icon: "⏸️", color: "#636e72", change: "5.3% do total", trend: "neutral" },
  ];

  const permissoesDisponiveis = [
    { id: "pdi", nome: "Acesso ao PDI" },
    { id: "avaliacoes", nome: "Acesso a Avaliações" },
    { id: "relatorios", nome: "Acesso a Relatórios" },
    { id: "equipe", nome: "Gerenciar Equipe" },
    { id: "admin", nome: "Painel Administrativo" },
  ];

  // Filtrar usuários
  const filteredUsers = usuarios.filter(user => {
    const matchSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === "todos" || user.cargo.toLowerCase() === filterRole.toLowerCase();
    const matchStatus = filterStatus === "todos" || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchRole && matchStatus;
  });

  // Paginação
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      nome: user.nome,
      email: user.email,
      cargo: user.cargo,
      departamento: user.departamento,
      telefone: user.telefone,
      permissoes: []
    });
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
    setShowDropdown(null);
  };

  const confirmDelete = () => {
    console.log("Deletando usuário:", selectedUser);
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteConfirm(true);
  };

  const confirmBulkDelete = () => {
    console.log("Deletando usuários:", selectedUsers);
    setShowBulkDeleteConfirm(false);
    setSelectedUsers([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    setShowAddModal(false);
    setShowEditModal(false);
    setFormData({ nome: "", email: "", cargo: "", departamento: "", telefone: "", permissoes: [] });
  };

  const togglePermission = (permId) => {
    setFormData(prev => ({
      ...prev,
      permissoes: prev.permissoes.includes(permId)
        ? prev.permissoes.filter(p => p !== permId)
        : [...prev.permissoes, permId]
    }));
  };

  const getAvatarColor = (index) => {
    const colors = ['#667eea', '#00b894', '#fdcb6e', '#e17055', '#74b9ff', '#a29bfe'];
    return colors[index % colors.length];
  };

  const handleExport = () => {
    console.log("Exportando usuários...");
    // TODO: Implementar lógica de exportação
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterRole("todos");
    setFilterStatus("todos");
  };

  const hasActiveFilters = searchTerm || filterRole !== "todos" || filterStatus !== "todos";

  return (
    <div className="admin-page-gerenciar-usuarios">
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
            <div className="icon-circle-professional">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="page-title">Gerenciar Usuários</h1>
              <p className="page-subtitle">Adicione, edite e gerencie os usuários do sistema</p>
            </div>
          </div>
        </div>
        <div className="header-actions-professional">
          <button className="btn-export-professional" onClick={handleExport}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 14V16H16V14H4ZM16 6L14.59 7.41L11 3.83V14H9V3.83L5.41 7.41L4 6L10 0L16 6Z" fill="currentColor"/>
            </svg>
            Exportar
          </button>
          <button className="btn-add-professional" onClick={() => setShowAddModal(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Adicionar Usuário
          </button>
        </div>
      </header>

      {/* Stats Cards com Tendências */}
      <div className="stats-grid-professional">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-professional" style={{ borderTop: `3px solid ${stat.color}` }}>
            <div className="stat-header">
              <div className="stat-icon-professional" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <span style={{ fontSize: "28px" }}>{stat.icon}</span>
              </div>
              <div className="stat-info">
                <p className="stat-label-professional">{stat.label}</p>
                <h3 className="stat-value-professional">{stat.value}</h3>
              </div>
            </div>
            <div className={`stat-trend ${stat.trend}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                {stat.trend === 'up' ? (
                  <path d="M3 11L8 6L13 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <path d="M3 5L8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros Aprimorados */}
      <div className="filters-section-professional">
        <div className="search-container-professional">
          <svg className="search-icon-professional" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M14.5 13H13.71L13.43 12.73C14.41 11.59 15 10.11 15 8.5C15 4.91 12.09 2 8.5 2C4.91 2 2 4.91 2 8.5C2 12.09 4.91 15 8.5 15C10.11 15 11.59 14.41 12.73 13.43L13 13.71V14.5L18 19.49L19.49 18L14.5 13ZM8.5 13C6.01 13 4 10.99 4 8.5C4 6.01 6.01 4 8.5 4C10.99 4 13 6.01 13 8.5C13 10.99 10.99 13 8.5 13Z" fill="currentColor"/>
          </svg>
          <input
            type="text"
            className="search-input-professional"
            placeholder="Buscar por nome, email, cargo ou departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm("")}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
        <select 
          className="filter-select-professional" 
          value={filterRole} 
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="todos">Todos os Cargos</option>
          <option value="gerente">Gerente</option>
          <option value="analista">Analista</option>
          <option value="coordenador">Coordenador</option>
          <option value="colaborador">Colaborador</option>
        </select>
        <select 
          className="filter-select-professional" 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="todos">Todos os Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        {hasActiveFilters && (
          <button className="btn-clear-filters-professional" onClick={clearFilters}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedUsers.length > 0 && (
        <div className="bulk-actions-bar-professional">
          <div className="bulk-info-professional">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10L9 12L13 8M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{selectedUsers.length} usuário{selectedUsers.length > 1 ? 's' : ''} selecionado{selectedUsers.length > 1 ? 's' : ''}</span>
          </div>
          <div className="bulk-actions-professional">
            <button className="bulk-btn export" onClick={handleExport}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 11V13H13V11H3ZM13 5L11.59 6.41L9 3.83V11H7V3.83L4.41 6.41L3 5L8 0L13 5Z" fill="currentColor"/>
              </svg>
              Exportar Selecionados
            </button>
            <button className="bulk-btn status">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 3L6 11L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Alterar Status
            </button>
            <button className="bulk-btn delete" onClick={handleBulkDelete}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14M6 4V2H10V4M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Excluir Selecionados
            </button>
          </div>
          <button className="bulk-close-professional" onClick={() => setSelectedUsers([])}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Tabela Profissional */}
      <div className="table-wrapper-professional">
        {filteredUsers.length > 0 ? (
          <table className="table-professional">
            <thead>
              <tr>
                <th style={{ width: "48px" }}>
                  <input 
                    type="checkbox" 
                    className="checkbox-professional"
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Usuário</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Último Acesso</th>
                <th style={{ width: "140px", textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((usuario, index) => (
                <tr 
                  key={usuario.id} 
                  className={selectedUsers.includes(usuario.id) ? 'row-selected' : ''}
                >
                  <td>
                    <input 
                      type="checkbox" 
                      className="checkbox-professional"
                      checked={selectedUsers.includes(usuario.id)}
                      onChange={() => handleSelectUser(usuario.id)}
                    />
                  </td>
                  <td>
                    <div className="user-info-cell">
                      <div className="user-avatar-professional" style={{ backgroundColor: getAvatarColor(index) }}>
                        {usuario.avatar}
                      </div>
                      <div className="user-details">
                        <span className="user-name-professional">{usuario.nome}</span>
                      </div>
                    </div>
                  </td>
                  <td className="email-cell-professional">{usuario.email}</td>
                  <td>
                    <span className="badge-role-professional">{usuario.cargo}</span>
                  </td>
                  <td className="department-cell">{usuario.departamento}</td>
                  <td className="phone-cell-professional">{usuario.telefone}</td>
                  <td>
                    <span className={`badge-status-professional ${usuario.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {usuario.status}
                    </span>
                  </td>
                  <td className="last-access-professional">{usuario.ultimoAcesso}</td>
                  <td>
                    <div className="action-buttons-professional">
                      <button className="btn-action edit" title="Editar" onClick={() => handleEdit(usuario)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6666 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.383 14.4088 2.61182C14.5035 2.84064 14.5523 3.08584 14.5523 3.33337C14.5523 3.58091 14.5035 3.82611 14.4088 4.05493C14.314 4.28375 14.1751 4.49162 14 4.66671L5.00001 13.6667L1.33334 14.6667L2.33334 11L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="btn-action delete" title="Excluir" onClick={() => handleDelete(usuario)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 4H14M6 4V2H10V4M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="dropdown-wrapper">
                        <button 
                          className="btn-action more" 
                          title="Mais opções"
                          onClick={() => setShowDropdown(showDropdown === usuario.id ? null : usuario.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z" fill="currentColor"/>
                            <path d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z" fill="currentColor"/>
                            <path d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z" fill="currentColor"/>
                          </svg>
                        </button>
                        {showDropdown === usuario.id && (
                          <div className="dropdown-menu-professional">
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3.5C10.76 3.5 13 5.74 13 8.5V10.5H15L12 13.5L9 10.5H11V8.5C11 6.84 9.66 5.5 8 5.5C6.34 5.5 5 6.84 5 8.5V10.5H7L4 13.5L1 10.5H3V8.5C3 5.74 5.24 3.5 8 3.5Z" fill="currentColor"/>
                              </svg>
                              Ver Detalhes
                            </button>
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12.667 7.33333V4.66667C12.667 4.31304 12.5265 3.97391 12.2765 3.72386C12.0264 3.47381 11.6873 3.33333 11.3337 3.33333H4.66699C4.31337 3.33333 3.97423 3.47381 3.72418 3.72386C3.47413 3.97391 3.33366 4.31304 3.33366 4.66667V11.3333C3.33366 11.687 3.47413 12.0261 3.72418 12.2761C3.97423 12.5262 4.31337 12.6667 4.66699 12.6667H11.3337C11.6873 12.6667 12.0264 12.5262 12.2765 12.2761C12.5265 12.0261 12.667 11.687 12.667 11.3333V8.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Resetar Senha
                            </button>
                            <button className="dropdown-item">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2.66699 2.66667H13.3337V11.3333H2.66699V2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2.66699 5.33333L8.00033 8.66667L13.3337 5.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Enviar Email
                            </button>
                            <button className="dropdown-item danger">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M10 6L6 10M6 6L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                              Desativar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state-professional">
            <div className="empty-icon-professional">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58Z" stroke="#e0e0e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 23L41 41M23 41L41 23" stroke="#e0e0e0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Nenhum usuário encontrado</h3>
            <p>Não há usuários que correspondam aos filtros aplicados.</p>
            <button className="btn-clear-filters-professional" onClick={clearFilters}>
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Paginação */}
      {filteredUsers.length > 0 && (
        <div className="pagination-professional">
          <div className="pagination-info-professional">
            Mostrando <strong>{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</strong> de <strong>{filteredUsers.length}</strong> usuários
          </div>
          <div className="pagination-controls-professional">
            <button 
              className="page-btn-professional" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={i}
                  className={`page-btn-professional ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="pagination-ellipsis">...</span>
                <button className="page-btn-professional" onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}
            <button 
              className="page-btn-professional" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal: Adicionar Usuário */}
      {showAddModal && (
        <div className="modal-overlay-professional" onClick={() => setShowAddModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Adicionar Novo Usuário</h2>
              <button className="modal-close-professional" onClick={() => setShowAddModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <form className="modal-form-professional" onSubmit={handleSubmit}>
              <div className="form-group-professional">
                <label className="form-label-professional">
                  Nome Completo <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-input-professional"
                  placeholder="Digite o nome completo" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">
                  Email <span className="required">*</span>
                </label>
                <input 
                  type="email" 
                  className="form-input-professional"
                  placeholder="usuario@pulso360.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-row-professional">
                <div className="form-group-professional">
                  <label className="form-label-professional">
                    Cargo <span className="required">*</span>
                  </label>
                  <select 
                    className="form-select-professional"
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Analista">Analista</option>
                    <option value="Coordenador">Coordenador</option>
                    <option value="Colaborador">Colaborador</option>
                  </select>
                </div>
                <div className="form-group-professional">
                  <label className="form-label-professional">
                    Departamento <span className="required">*</span>
                  </label>
                  <select 
                    className="form-select-professional"
                    value={formData.departamento}
                    onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="TI">TI</option>
                    <option value="RH">RH</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">Telefone</label>
                <input 
                  type="tel" 
                  className="form-input-professional"
                  placeholder="(11) 98765-4321" 
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">Permissões</label>
                <div className="checkbox-grid-professional">
                  {permissoesDisponiveis.map(perm => (
                    <label key={perm.id} className="checkbox-label-professional">
                      <input 
                        type="checkbox" 
                        className="checkbox-professional"
                        checked={formData.permissoes.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                      />
                      <span>{perm.nome}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-footer-professional">
                <button type="button" className="btn-cancel-professional" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit-professional">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Adicionar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Editar Usuário */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay-professional" onClick={() => setShowEditModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Editar Usuário</h2>
              <button className="modal-close-professional" onClick={() => setShowEditModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <form className="modal-form-professional" onSubmit={handleSubmit}>
              <div className="form-group-professional">
                <label className="form-label-professional">
                  Nome Completo <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-input-professional"
                  placeholder="Digite o nome completo" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">
                  Email <span className="required">*</span>
                </label>
                <input 
                  type="email" 
                  className="form-input-professional"
                  placeholder="usuario@pulso360.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-row-professional">
                <div className="form-group-professional">
                  <label className="form-label-professional">
                    Cargo <span className="required">*</span>
                  </label>
                  <select 
                    className="form-select-professional"
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Analista">Analista</option>
                    <option value="Coordenador">Coordenador</option>
                    <option value="Colaborador">Colaborador</option>
                  </select>
                </div>
                <div className="form-group-professional">
                  <label className="form-label-professional">
                    Departamento <span className="required">*</span>
                  </label>
                  <select 
                    className="form-select-professional"
                    value={formData.departamento}
                    onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="TI">TI</option>
                    <option value="RH">RH</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">Telefone</label>
                <input 
                  type="tel" 
                  className="form-input-professional"
                  placeholder="(11) 98765-4321" 
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
              <div className="form-group-professional">
                <label className="form-label-professional">Permissões</label>
                <div className="checkbox-grid-professional">
                  {permissoesDisponiveis.map(perm => (
                    <label key={perm.id} className="checkbox-label-professional">
                      <input 
                        type="checkbox" 
                        className="checkbox-professional"
                        checked={formData.permissoes.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                      />
                      <span>{perm.nome}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-footer-professional">
                <button type="button" className="btn-cancel-professional" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit-professional">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmar Exclusão */}
      {showDeleteConfirm && selectedUser && (
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
                Tem certeza que deseja excluir o usuário <strong>{selectedUser.nome}</strong>?
              </p>
              <p className="warning-subtext">Esta ação não pode ser desfeita e todos os dados do usuário serão permanentemente removidos.</p>
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

      {/* Modal: Confirmar Exclusão em Massa */}
      {showBulkDeleteConfirm && (
        <div className="modal-overlay-professional" onClick={() => setShowBulkDeleteConfirm(false)}>
          <div className="modal-content-professional small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Confirmar Exclusão em Massa</h2>
              <button className="modal-close-professional" onClick={() => setShowBulkDeleteConfirm(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <div className="warning-icon-professional">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 16V24" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 32H24.02" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="warning-text-professional">
                Tem certeza que deseja excluir <strong>{selectedUsers.length} usuário{selectedUsers.length > 1 ? 's' : ''}</strong>?
              </p>
              <p className="warning-subtext">Esta ação não pode ser desfeita e todos os dados dos usuários selecionados serão permanentemente removidos.</p>
            </div>
            <div className="modal-footer-professional">
              <button className="btn-cancel-professional" onClick={() => setShowBulkDeleteConfirm(false)}>
                Cancelar
              </button>
              <button className="btn-danger-professional" onClick={confirmBulkDelete}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4H14M6 4V2H10V4M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sim, Excluir Todos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
