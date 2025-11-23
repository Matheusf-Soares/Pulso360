import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  // Atualizar relógio
  useEffect(() => {
    const timer = setInterval(() => {
      // Atualizar a cada minuto
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/perfil");
  };

  const handleNotificationsClick = () => {
    navigate("/notificacoes");
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    navigate("/login");
  };

  // Obter iniciais do nome
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Obter informações da página atual
  const getPageInfo = () => {
    const path = location.pathname;
    const pages = {
      '/': { icon: '🏠', name: 'Dashboard', color: '#667eea' },
      '/pdi': { icon: '🎯', name: 'PDI', color: '#00b894' },
      '/avaliacoes': { icon: '📊', name: 'Avaliações', color: '#fdcb6e' },
      '/equipe': { icon: '👥', name: 'Equipe', color: '#6c5ce7' },
      '/notificacoes': { icon: '🔔', name: 'Notificações', color: '#ff7675' },
      '/perfil': { icon: '👤', name: 'Perfil', color: '#74b9ff' },
      '/relatorios': { icon: '📈', name: 'Relatórios', color: '#a29bfe' },
      '/administracao': { icon: '⚙️', name: 'Administração', color: '#fd79a8' },
      '/ajuda': { icon: '❓', name: 'Ajuda', color: '#00cec9' }
    };
    return pages[path] || { icon: '📄', name: 'Pulso360', color: '#667eea' };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="topbar-premium">
      <div className="topbar-container">
        {/* Indicador de Página Atual */}
        <div className="page-indicator">
          <div className="page-icon" style={{ backgroundColor: `${pageInfo.color}20`, color: pageInfo.color }}>
            {pageInfo.icon}
          </div>
          <div className="page-info">
            <span className="page-name">{pageInfo.name}</span>
          </div>
        </div>

        {/* Barra de Ações Centrais */}
        <div className="topbar-actions-center">
          {/* Busca Rápida */}
          <div className="search-container-premium">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M14.5 13H13.71L13.43 12.73C14.41 11.59 15 10.11 15 8.5C15 4.91 12.09 2 8.5 2C4.91 2 2 4.91 2 8.5C2 12.09 4.91 15 8.5 15C10.11 15 11.59 14.41 12.73 13.43L13 13.71V14.5L18 19.49L19.49 18L14.5 13ZM8.5 13C6.01 13 4 10.99 4 8.5C4 6.01 6.01 4 8.5 4C10.99 4 13 6.01 13 8.5C13 10.99 10.99 13 8.5 13Z" fill="currentColor"/>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar informações..."
              className="search-input-premium"
            />
          </div>

          {/* Ações Rápidas */}
          <div className="quick-actions-premium">
            <button 
              className="action-btn-premium"
              onClick={() => navigate('/pdi')}
              title="Acessar PDI"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 2H14V0H12V2H8V0H6V2H4C2.9 2 2 2.9 2 4V18C2 19.1 2.9 20 4 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H4V7H16V18Z" fill="currentColor"/>
              </svg>
            </button>
            
            <button 
              className="action-btn-premium"
              onClick={() => navigate('/relatorios')}
              title="Relatórios"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H17C18.1 18 19 17.1 19 16V4C19 2.9 18.1 2 17 2ZM7 14H5V8H7V14ZM11 14H9V5H11V14ZM15 14H13V11H15V14Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Seção Direita */}
        <div className="topbar-right-premium">
          {/* Notificações */}
          <button 
            className="notification-btn-premium"
            onClick={handleNotificationsClick}
            title="Notificações"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 22C12.1 22 13 21.1 13 20H9C9 21.1 9.9 22 11 22ZM17 16V11C17 7.93 15.37 5.36 12.5 4.68V4C12.5 3.17 11.83 2.5 11 2.5C10.17 2.5 9.5 3.17 9.5 4V4.68C6.64 5.36 5 7.92 5 11V16L3 18V19H19V18L17 16Z" fill="currentColor"/>
            </svg>
            <span className="notification-count">3</span>
          </button>

          <div className="topbar-divider"></div>

          {/* Menu do Usuário */}
          <div className="user-menu-premium">
            <button 
              className="user-button-premium" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-avatar-premium">
                {getInitials(user?.nome)}
              </div>
              <div className="user-details-premium">
                <span className="user-name-premium">{user?.nome?.split(' ')[0] || 'Usuário'}</span>
                <span className="user-role-premium">Colaborador</span>
              </div>
              <svg className={`chevron-icon ${showDropdown ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {showDropdown && (
              <>
                <div 
                  className="dropdown-overlay" 
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="user-dropdown-premium">
                  <div className="dropdown-user-section">
                    <div className="dropdown-avatar-large">
                      {getInitials(user?.nome)}
                    </div>
                    <div className="dropdown-user-details">
                      <div className="dropdown-user-name">{user?.nome || 'Usuário'}</div>
                      <div className="dropdown-user-email">{user?.email || ''}</div>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider-premium"></div>
                  
                  <div className="dropdown-menu-section">
                    <button className="dropdown-menu-item" onClick={handleProfileClick}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 4.03 13.97 0 9 0ZM9 2.7C10.49 2.7 11.7 3.91 11.7 5.4C11.7 6.89 10.49 8.1 9 8.1C7.51 8.1 6.3 6.89 6.3 5.4C6.3 3.91 7.51 2.7 9 2.7ZM9 15.48C6.75 15.48 4.77 14.37 3.6 12.69C3.63 10.98 7.2 10.05 9 10.05C10.79 10.05 14.37 10.98 14.4 12.69C13.23 14.37 11.25 15.48 9 15.48Z" fill="currentColor"/>
                      </svg>
                      <span>Meu Perfil</span>
                    </button>
                    
                    <button className="dropdown-menu-item" onClick={() => {
                      setShowDropdown(false);
                      navigate('/');
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 3L1 9H3V16H7V11H11V16H15V9H17L9 3Z" fill="currentColor"/>
                      </svg>
                      <span>Dashboard</span>
                    </button>

                    <button className="dropdown-menu-item" onClick={() => {
                      setShowDropdown(false);
                      navigate('/ajuda');
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 4.03 13.97 0 9 0ZM10 15H8V13H10V15ZM11.17 8.83L10.35 9.67C9.72 10.31 9.45 10.73 9.45 12H8.55V11.55C8.55 10.58 8.82 9.73 9.45 9.09L10.53 7.98C10.85 7.67 11.05 7.23 11.05 6.75C11.05 5.78 10.27 5 9.3 5C8.33 5 7.55 5.78 7.55 6.75H6.65C6.65 5.28 7.83 4.1 9.3 4.1C10.77 4.1 11.95 5.28 11.95 6.75C11.95 7.53 11.62 8.24 11.17 8.83Z" fill="currentColor"/>
                      </svg>
                      <span>Central de Ajuda</span>
                    </button>
                  </div>
                  
                  <div className="dropdown-divider-premium"></div>
                  
                  <button className="dropdown-menu-item logout-item" onClick={handleLogout}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M6.3 14.4L7.65 13.05L5.1 10.5H13.5V8.5H5.1L7.65 5.95L6.3 4.6L1.4 9.5L6.3 14.4ZM15 0H3C1.9 0 1 0.9 1 2V6H3V2H15V17H3V13H1V17C1 18.1 1.9 19 3 19H15C16.1 19 17 18.1 17 17V2C17 0.9 16.1 0 15 0Z" fill="currentColor"/>
                    </svg>
                    <span>Sair da Conta</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
