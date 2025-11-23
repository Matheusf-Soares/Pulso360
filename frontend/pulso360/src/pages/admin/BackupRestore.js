import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BackupRestore() {
  const navigate = useNavigate();
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const backups = [
    { id: 1, nome: "Backup Automático", data: "22/11/2025 03:00", tamanho: "2.3 GB", tipo: "Completo" },
    { id: 2, nome: "Backup Manual", data: "21/11/2025 18:30", tamanho: "2.1 GB", tipo: "Completo" },
    { id: 3, nome: "Backup Incremental", data: "20/11/2025 03:00", tamanho: "450 MB", tipo: "Incremental" },
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
              <path d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Backup & Restore</h1>
            <p>Gerenciar backups e restaurações</p>
          </div>
        </div>

        <button className="btn-primary-admin">Criar Backup</button>
      </div>

      <div className="backup-list">
        {backups.map((backup) => (
          <div key={backup.id} className="backup-item">
            <div className="backup-info">
              <h3>{backup.nome}</h3>
              <div className="backup-details">
                <span>📅 {backup.data}</span>
                <span>💾 {backup.tamanho}</span>
                <span className="backup-type">{backup.tipo}</span>
              </div>
            </div>
            <div className="backup-actions">
              <button className="btn-secondary-admin" onClick={() => setShowRestoreModal(true)}>
                Restaurar
              </button>
              <button className="btn-outline-admin">Download</button>
              <button className="btn-icon-danger">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 15C5 16.1 5.9 17 7 17H13C14.1 17 15 16.1 15 15V5H5V15Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showRestoreModal && (
        <div className="modal-overlay" onClick={() => setShowRestoreModal(false)}>
          <div className="modal-content-admin" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-admin">
              <h2>Confirmar Restauração</h2>
              <button className="modal-close" onClick={() => setShowRestoreModal(false)}>×</button>
            </div>
            <div className="modal-body-admin">
              <p>⚠️ Atenção: Esta ação irá substituir todos os dados atuais. Certifique-se de que deseja continuar.</p>
            </div>
            <div className="modal-footer-admin">
              <button className="btn-secondary-admin" onClick={() => setShowRestoreModal(false)}>Cancelar</button>
              <button className="btn-danger-admin">Confirmar Restauração</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
