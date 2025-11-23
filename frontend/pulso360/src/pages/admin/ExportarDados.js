import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExportarDados() {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState([]);
  const [exportFormat, setExportFormat] = useState("csv");

  const dataTypes = [
    { id: "usuarios", nome: "Usuários", registros: 247, icone: "👥" },
    { id: "avaliacoes", nome: "Avaliações", registros: 1543, icone: "📋" },
    { id: "pdis", nome: "PDIs", registros: 189, icone: "🎯" },
    { id: "metas", nome: "Metas", registros: 456, icone: "🎯" },
    { id: "feedbacks", nome: "Feedbacks", registros: 892, icone: "💬" },
    { id: "equipes", nome: "Equipes", registros: 34, icone: "👥" },
  ];

  const toggleSelection = (id) => {
    setSelectedData(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
            <h1>Exportar Dados</h1>
            <p>Exporte dados do sistema em diversos formatos</p>
          </div>
        </div>
      </div>

      <div className="export-layout">
        <div className="export-selection">
          <h3>Selecione os Dados para Exportar</h3>
          <div className="data-types-grid">
            {dataTypes.map((type) => (
              <div 
                key={type.id}
                className={`data-type-card ${selectedData.includes(type.id) ? 'selected' : ''}`}
                onClick={() => toggleSelection(type.id)}
              >
                <div className="type-icon">{type.icone}</div>
                <h4>{type.nome}</h4>
                <p>{type.registros} registros</p>
                <div className="check-indicator">
                  {selectedData.includes(type.id) && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7 10L9 12L13 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="export-options-panel">
          <h3>Opções de Exportação</h3>
          
          <div className="form-group">
            <label>Formato do Arquivo</label>
            <div className="radio-group">
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="format" 
                  value="csv" 
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="radio-content">
                  <span className="format-icon">📄</span>
                  <span>CSV</span>
                </div>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="format" 
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="radio-content">
                  <span className="format-icon">📊</span>
                  <span>Excel</span>
                </div>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="format" 
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="radio-content">
                  <span className="format-icon">🔧</span>
                  <span>JSON</span>
                </div>
              </label>
              <label className="radio-card">
                <input 
                  type="radio" 
                  name="format" 
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="radio-content">
                  <span className="format-icon">📕</span>
                  <span>PDF</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Período</label>
            <select>
              <option>Todos os dados</option>
              <option>Últimos 30 dias</option>
              <option>Últimos 90 dias</option>
              <option>Este ano</option>
              <option>Personalizado</option>
            </select>
          </div>

          <div className="checkbox-group-vertical">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Incluir campos ocultos</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Comprimir arquivo (ZIP)</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Criptografar exportação</span>
            </label>
          </div>

          <div className="export-summary">
            <h4>Resumo da Exportação</h4>
            <p>Itens selecionados: <strong>{selectedData.length}</strong></p>
            <p>Formato: <strong>{exportFormat.toUpperCase()}</strong></p>
            <p>Tamanho estimado: <strong>~12 MB</strong></p>
          </div>

          <button 
            className="btn-primary-admin btn-large"
            disabled={selectedData.length === 0}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16 12V16H4V12H2V16C2 17.1 2.9 18 4 18H16C17.1 18 18 17.1 18 16V12H16ZM10 13.67L13.59 10.09L15 11.5L10 16.5L5 11.5L6.41 10.09L9 12.67V2H11V13.67H10Z" fill="currentColor"/>
            </svg>
            Exportar Dados
          </button>
        </div>
      </div>
    </div>
  );
}
