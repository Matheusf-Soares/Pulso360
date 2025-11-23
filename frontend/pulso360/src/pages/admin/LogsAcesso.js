import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogsAcesso() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("todos");

  const logs = [
    { id: 1, usuario: "João Silva", acao: "Login", ip: "192.168.1.10", data: "22/11/2025 14:30", status: "Sucesso" },
    { id: 2, usuario: "Maria Santos", acao: "Logout", ip: "192.168.1.15", data: "22/11/2025 14:25", status: "Sucesso" },
    { id: 3, usuario: "Sistema", acao: "Backup Automático", ip: "127.0.0.1", data: "22/11/2025 03:00", status: "Sucesso" },
    { id: 4, usuario: "Pedro Costa", acao: "Login Falho", ip: "192.168.1.20", data: "22/11/2025 10:15", status: "Erro" },
    { id: 5, usuario: "Admin", acao: "Alteração de Permissão", ip: "192.168.1.5", data: "22/11/2025 09:00", status: "Sucesso" },
  ];

  return (
    <div className="admin-page">
      <div className="page-header-admin">
        <button className="back-button" onClick={() => navigate("/administracao")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 16.25L6.25 10L12.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar
        </button>
        
        <div className="header-content">
          <div className="header-icon-circle" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H17V17H7V15Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Logs de Acesso</h1>
            <p>Visualizar histórico de atividades</p>
          </div>
        </div>

        <button className="btn-secondary-admin">Exportar Logs</button>
      </div>

      <div className="filters-section">
        <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="todos">Todos os eventos</option>
          <option value="login">Apenas Logins</option>
          <option value="erro">Apenas Erros</option>
          <option value="sistema">Sistema</option>
        </select>
        <input type="date" className="filter-date" />
        <input type="date" className="filter-date" />
      </div>

      <div className="table-container-admin">
        <table className="table-admin">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Ação</th>
              <th>IP</th>
              <th>Data/Hora</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.usuario}</td>
                <td>{log.acao}</td>
                <td className="text-muted">{log.ip}</td>
                <td>{log.data}</td>
                <td>
                  <span className={`badge-status ${log.status.toLowerCase()}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
