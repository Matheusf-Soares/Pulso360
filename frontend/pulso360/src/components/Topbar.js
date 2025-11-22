import React from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ user }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  const handleNotificationsClick = () => {
    navigate("/notificacoes");
  };

  return (
    <div className="topbar">
      <div>
        <div className="title">Bem-vindo(a), {user.name.split(' ')[0]}!</div>
        <div className="muted">Acompanhe seu progresso e próximas ações</div>
      </div>

      <div className="topbar-right">
        <div className="muted-xs">IT 2025</div>
        <div 
          className="icon notification-bell" 
          onClick={handleNotificationsClick}
          title="Ver notificações"
        >
          🔔
          <span className="notification-badge">3</span>
        </div>
        <div 
          className="avatar circle clickable" 
          onClick={handleProfileClick}
          title="Acessar perfil"
        >
          {user.initials}
        </div>
      </div>
    </div>
  );
}
