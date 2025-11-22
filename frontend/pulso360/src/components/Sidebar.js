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
    </aside>
  );
}
