import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: "🏠", label: "Home" },
    { path: "/avaliacoes", icon: "📋", label: "Minhas avaliações" },
    { path: "/pdi", icon: "🎯", label: "Meu PDI" },
    { path: "/equipe", icon: "👥", label: "Minha equipe" },
    { path: "/relatorios", icon: "📊", label: "Relatórios" },
    { path: "/administracao", icon: "⚙", label: "Administração" },
    { path: "/ajuda", icon: "❓", label: "Ajuda" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">PL</div>
        <div className="brand-text">Pulso360</div>
      </div>

      <nav className="nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>

      {/* Período no rodapé do sidebar */}
      <div className="sidebar-footer">
        <div className="period-badge-sidebar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 2H12V0H10V2H6V0H4V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V6H14V14Z" fill="currentColor"/>
          </svg>
          <span>IT 2025</span>
        </div>
      </div>
    </aside>
  );
}
