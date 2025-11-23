import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Comunicacao() {
  const navigate = useNavigate();
  const [tipoMensagem, setTipoMensagem] = useState("notificacao");
  // eslint-disable-next-line no-unused-vars
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [agendarEnvio, setAgendarEnvio] = useState(false);
  const [anexos, setAnexos] = useState([]);
  const [formData, setFormData] = useState({
    destinatarios: "todos",
    prioridade: "normal",
    titulo: "",
    conteudo: "",
    dataAgendamento: "",
    horaAgendamento: "",
  });

  const mensagensRecentes = [
    { 
      id: 1,
      titulo: "Atualização do Sistema v2.5", 
      data: "Hoje, 14:30", 
      tipo: "sistema",
      destinatarios: 247,
      lidas: 189,
      prioridade: "alta",
      icon: "🔔"
    },
    { 
      id: 2,
      titulo: "Reunião Geral de Alinhamento", 
      data: "Ontem, 10:00", 
      tipo: "comunicado",
      destinatarios: 89,
      lidas: 85,
      prioridade: "normal",
      icon: "📢"
    },
    { 
      id: 3,
      titulo: "Novo Curso de Liderança Disponível", 
      data: "2 dias atrás", 
      tipo: "notificacao",
      destinatarios: 156,
      lidas: 142,
      prioridade: "baixa",
      icon: "📚"
    },
    { 
      id: 4,
      titulo: "Prazo Final - Avaliações de Desempenho", 
      data: "3 dias atrás", 
      tipo: "email",
      destinatarios: 247,
      lidas: 231,
      prioridade: "urgente",
      icon: "⏰"
    },
    { 
      id: 5,
      titulo: "Feliz Aniversário da Empresa!", 
      data: "1 semana atrás", 
      tipo: "comunicado",
      destinatarios: 247,
      lidas: 247,
      prioridade: "normal",
      icon: "🎉"
    },
  ];

  const templates = [
    { id: 1, nome: "Boas-vindas", categoria: "Onboarding", icon: "👋" },
    { id: 2, nome: "Avaliação de Desempenho", categoria: "RH", icon: "⭐" },
    { id: 3, nome: "Atualização de Política", categoria: "Corporativo", icon: "📋" },
    { id: 4, nome: "Felicitações", categoria: "Celebração", icon: "🎉" },
    { id: 5, nome: "Comunicado Urgente", categoria: "Alerta", icon: "⚠️" },
    { id: 6, nome: "Newsletter Mensal", categoria: "Informativo", icon: "📰" },
  ];

  const stats = [
    { label: "Total Enviadas", value: "1,247", icon: "📧", color: "#667eea", change: "+12% este mês" },
    { label: "Taxa de Abertura", value: "94.3%", icon: "📊", color: "#00b894", change: "+3.2% vs anterior" },
    { label: "Agendadas", value: "8", icon: "⏰", color: "#fdcb6e", change: "Próximas 7 dias" },
    { label: "Rascunhos", value: "3", icon: "📝", color: "#636e72", change: "Não enviados" },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAnexos([...anexos, ...files]);
  };

  const removeAnexo = (index) => {
    setAnexos(anexos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando mensagem:", formData);
    // Lógica de envio
  };

  const handleSaveDraft = () => {
    console.log("Salvando rascunho:", formData);
    // Lógica para salvar rascunho
  };

  const getTipoIcon = (tipo) => {
    switch(tipo) {
      case 'notificacao': return '🔔';
      case 'email': return '📧';
      case 'comunicado': return '📢';
      case 'sistema': return '⚙️';
      default: return '📋';
    }
  };

  const getPrioridadeColor = (prioridade) => {
    switch(prioridade) {
      case 'urgente': return '#e74c3c';
      case 'alta': return '#f39c12';
      case 'normal': return '#3498db';
      case 'baixa': return '#95a5a6';
      default: return '#636e72';
    }
  };

  return (
    <div className="admin-page-comunicacao">
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
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="page-title">Centro de Comunicação</h1>
              <p className="page-subtitle">Envie notificações, emails e comunicados para os usuários</p>
            </div>
          </div>
        </div>
        <div className="header-actions-professional">
          <button className="btn-export-professional" onClick={() => setShowTemplatesModal(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 7.5H17.5M2.5 12.5H17.5M5.83333 2.5H14.1667C15.5 2.5 16.6667 3.66667 16.6667 5V15C16.6667 16.3333 15.5 17.5 14.1667 17.5H5.83333C4.5 17.5 3.33333 16.3333 3.33333 15V5C3.33333 3.66667 4.5 2.5 5.83333 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Templates
          </button>
        </div>
      </header>

      {/* Stats Cards */}
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
            <div className="stat-change-text">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Layout de Comunicação */}
      <div className="communication-layout-professional">
        {/* Sidebar com Histórico */}
        <div className="communication-sidebar-professional">
          <div className="sidebar-header-comm">
            <h3>Histórico de Mensagens</h3>
            <span className="messages-count">{mensagensRecentes.length}</span>
          </div>

          <div className="messages-list-professional">
            {mensagensRecentes.map((msg) => (
              <div key={msg.id} className="message-card-professional">
                <div className="message-header-card">
                  <div className="message-icon-badge" style={{ background: `${getPrioridadeColor(msg.prioridade)}20` }}>
                    <span style={{ fontSize: "20px" }}>{msg.icon}</span>
                  </div>
                  <span 
                    className="priority-badge-small" 
                    style={{ background: getPrioridadeColor(msg.prioridade) }}
                  >
                    {msg.prioridade}
                  </span>
                </div>
                
                <h4 className="message-title-card">{msg.titulo}</h4>
                
                <div className="message-stats-card">
                  <div className="stat-item-message">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.10051 9.8995 1.75 7 1.75C4.10051 1.75 1.75 4.10051 1.75 7C1.75 9.8995 4.10051 12.25 7 12.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 4.375V7L8.75 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {msg.data}
                  </div>
                  <div className="stat-item-message">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9.91667 12.25V11.0833C9.91667 10.4645 9.67083 9.871 9.23325 9.43342C8.79566 8.99583 8.20218 8.75 7.58333 8.75H3.5C2.88116 8.75 2.28767 8.99583 1.85009 9.43342C1.4125 9.871 1.16667 10.4645 1.16667 11.0833V12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.54167 6.41667C6.82738 6.41667 7.875 5.36905 7.875 4.08333C7.875 2.79762 6.82738 1.75 5.54167 1.75C4.25595 1.75 3.20833 2.79762 3.20833 4.08333C3.20833 5.36905 4.25595 6.41667 5.54167 6.41667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.8333 12.25V11.0833C12.8328 10.5721 12.6743 10.0736 12.3792 9.65723C12.0841 9.24084 11.6667 8.92686 11.1833 8.76001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.33333 1.76001C9.81823 1.92619 10.2373 2.24019 10.5337 2.65725C10.83 3.07432 10.9894 3.57403 10.9894 4.08668C10.9894 4.59932 10.83 5.09903 10.5337 5.5161C10.2373 5.93316 9.81823 6.24716 9.33333 6.41334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {msg.destinatarios}
                  </div>
                </div>

                <div className="message-progress">
                  <div className="progress-bar-message">
                    <div 
                      className="progress-fill-message" 
                      style={{ width: `${(msg.lidas / msg.destinatarios) * 100}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{msg.lidas}/{msg.destinatarios} lidas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área Principal - Formulário */}
        <div className="communication-main-professional">
          {/* Tipo de Mensagem */}
          <div className="message-type-selector">
            <button 
              className={`type-btn-professional ${tipoMensagem === 'notificacao' ? 'active' : ''}`}
              onClick={() => setTipoMensagem('notificacao')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 20C11.1 20 12 19.1 12 18H8C8 19.1 8.9 20 10 20ZM16 14V9C16 5.93 14.37 3.36 11.5 2.68V2C11.5 1.17 10.83 0.5 10 0.5C9.17 0.5 8.5 1.17 8.5 2V2.68C5.64 3.36 4 5.92 4 9V14L2 16V17H18V16L16 14Z" fill="currentColor"/>
              </svg>
              <span>Notificação Push</span>
            </button>
            <button 
              className={`type-btn-professional ${tipoMensagem === 'email' ? 'active' : ''}`}
              onClick={() => setTipoMensagem('email')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18 4H2C0.9 4 0.01 4.9 0.01 6L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V6C20 4.9 19.1 4 18 4ZM18 8L10 12L2 8V6L10 10L18 6V8Z" fill="currentColor"/>
              </svg>
              <span>Email</span>
            </button>
            <button 
              className={`type-btn-professional ${tipoMensagem === 'comunicado' ? 'active' : ''}`}
              onClick={() => setTipoMensagem('comunicado')}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18 2H2C0.9 2 0 2.9 0 4V16C0 17.1 0.9 18 2 18H18C19.1 18 20 17.1 20 16V4C20 2.9 19.1 2 18 2ZM18 16H2V8H18V16ZM18 6H2V4H18V6Z" fill="currentColor"/>
              </svg>
              <span>Comunicado Interno</span>
            </button>
          </div>

          {/* Formulário */}
          <form className="message-form-professional" onSubmit={handleSubmit}>
            <div className="form-row-comm">
              <div className="form-group-comm">
                <label className="form-label-comm">
                  Destinatários <span className="required">*</span>
                </label>
                <select 
                  className="form-select-comm"
                  value={formData.destinatarios}
                  onChange={(e) => setFormData({...formData, destinatarios: e.target.value})}
                  required
                >
                  <option value="todos">Todos os usuários (247)</option>
                  <option value="gerentes">Apenas Gerentes (23)</option>
                  <option value="coordenadores">Apenas Coordenadores (45)</option>
                  <option value="analistas">Apenas Analistas (89)</option>
                  <option value="colaboradores">Apenas Colaboradores (85)</option>
                  <option value="ti">Departamento TI (28)</option>
                  <option value="rh">Departamento RH (15)</option>
                  <option value="personalizado">Seleção Personalizada</option>
                </select>
              </div>

              <div className="form-group-comm">
                <label className="form-label-comm">
                  Prioridade <span className="required">*</span>
                </label>
                <select 
                  className="form-select-comm priority-select"
                  value={formData.prioridade}
                  onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
                  required
                >
                  <option value="baixa">⚪ Baixa</option>
                  <option value="normal">🔵 Normal</option>
                  <option value="alta">🟠 Alta</option>
                  <option value="urgente">🔴 Urgente</option>
                </select>
              </div>
            </div>

            <div className="form-group-comm">
              <label className="form-label-comm">
                Título da Mensagem <span className="required">*</span>
              </label>
              <input 
                type="text" 
                className="form-input-comm"
                placeholder="Digite um título claro e objetivo..." 
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                required
              />
              <span className="input-hint">{formData.titulo.length}/100 caracteres</span>
            </div>

            <div className="form-group-comm">
              <label className="form-label-comm">
                Conteúdo da Mensagem <span className="required">*</span>
              </label>
              <textarea 
                className="form-textarea-comm"
                rows="8" 
                placeholder="Digite o conteúdo completo da mensagem..."
                value={formData.conteudo}
                onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
                required
              ></textarea>
              <div className="textarea-footer">
                <span className="input-hint">{formData.conteudo.length}/2000 caracteres</span>
                <div className="formatting-tools">
                  <button type="button" className="tool-btn" title="Negrito">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 2H9C10.0609 2 11.0783 2.42143 11.8284 3.17157C12.5786 3.92172 13 4.93913 13 6C13 7.06087 12.5786 8.07828 11.8284 8.82843C11.0783 9.57857 10.0609 10 9 10H4V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 10H10C11.0609 10 12.0783 10.4214 12.8284 11.1716C13.5786 11.9217 14 12.9391 14 14C14 15.0609 13.5786 16.0783 12.8284 16.8284C12.0783 17.5786 11.0609 18 10 18H4V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button type="button" className="tool-btn" title="Itálico">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 2H8M8 14H4M10 2L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button type="button" className="tool-btn" title="Link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6.66667 8.66667C7.07121 9.20635 7.59364 9.64602 8.19072 9.95158C8.7878 10.2571 9.44343 10.4212 10.1094 10.4316C10.7754 10.442 11.4361 10.2984 12.0426 10.0111C12.649 9.72384 13.1863 9.30019 13.6133 8.77333L15.28 6.44C16.0936 5.45531 16.5242 4.18847 16.4835 2.89272C16.4428 1.59697 15.9337 0.363044 15.0611 -0.471939C14.1884 -1.30692 13.0191 -1.7744 11.8127 -1.7744C10.6063 -1.7744 9.43699 -1.30692 8.56433 -0.471939L7.33333 1.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.33333 7.33333C8.92879 6.79365 8.40636 6.35398 7.80928 6.04842C7.2122 5.74286 6.55657 5.57877 5.89059 5.56843C5.22462 5.55808 4.56386 5.70165 3.95744 5.98893C3.35102 6.27622 2.81366 6.69987 2.38667 7.22667L0.72 9.56C-0.093635 10.5447 -0.524242 11.8115 -0.483523 13.1073C-0.442805 14.403 0.0663148 15.637 0.938939 16.4719C1.81156 17.3069 2.98086 17.7744 4.18727 17.7744C5.39368 17.7744 6.56301 17.3069 7.43567 16.4719L8.66667 14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Anexos */}
            <div className="form-group-comm">
              <label className="form-label-comm">Anexos</label>
              <div className="file-upload-area">
                <input 
                  type="file" 
                  id="file-upload" 
                  multiple 
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Clique para adicionar arquivos ou arraste aqui</span>
                  <small>PDF, DOC, DOCX, XLS, XLSX, PNG, JPG (Máx. 10MB)</small>
                </label>
              </div>

              {anexos.length > 0 && (
                <div className="anexos-list">
                  {anexos.map((file, index) => (
                    <div key={index} className="anexo-item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M9.33333 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V6.66667L9.33333 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.33333 2V6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{file.name}</span>
                      <button type="button" onClick={() => removeAnexo(index)} className="remove-anexo">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Opções de Agendamento */}
            <div className="form-group-comm">
              <label className="checkbox-label-comm">
                <input 
                  type="checkbox" 
                  checked={agendarEnvio}
                  onChange={(e) => setAgendarEnvio(e.target.checked)}
                />
                <span>Agendar envio para data/hora específica</span>
              </label>
            </div>

            {agendarEnvio && (
              <div className="form-row-comm">
                <div className="form-group-comm">
                  <label className="form-label-comm">Data</label>
                  <input 
                    type="date" 
                    className="form-input-comm"
                    value={formData.dataAgendamento}
                    onChange={(e) => setFormData({...formData, dataAgendamento: e.target.value})}
                  />
                </div>
                <div className="form-group-comm">
                  <label className="form-label-comm">Horário</label>
                  <input 
                    type="time" 
                    className="form-input-comm"
                    value={formData.horaAgendamento}
                    onChange={(e) => setFormData({...formData, horaAgendamento: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Ações do Formulário */}
            <div className="form-actions-comm">
              <div className="actions-left">
                <button type="button" className="btn-preview-comm" onClick={() => setShowPreviewModal(true)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 9C1.5 9 3.75 4.5 9 4.5C14.25 4.5 16.5 9 16.5 9C16.5 9 14.25 13.5 9 13.5C3.75 13.5 1.5 9 1.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Pré-visualizar
                </button>
              </div>
              <div className="actions-right">
                <button type="button" className="btn-draft-comm" onClick={handleSaveDraft}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13.5 15.75H4.5C4.10218 15.75 3.72064 15.592 3.43934 15.3107C3.15804 15.0294 3 14.6478 3 14.25V3.75C3 3.35218 3.15804 2.97064 3.43934 2.68934C3.72064 2.40804 4.10218 2.25 4.5 2.25H10.5L15 6.75V14.25C15 14.6478 14.842 15.0294 14.5607 15.3107C14.2794 15.592 13.8978 15.75 13.5 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.75 15.75V10.5H5.25V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.25 2.25V6.75H9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Salvar Rascunho
                </button>
                <button type="submit" className="btn-send-comm">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M16.5 1.5L8.25 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 1.5L11.25 16.5L8.25 9.75L1.5 6.75L16.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {agendarEnvio ? 'Agendar Envio' : 'Enviar Agora'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Templates */}
      {showTemplatesModal && (
        <div className="modal-overlay-professional" onClick={() => setShowTemplatesModal(false)}>
          <div className="modal-content-professional large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Selecionar Template</h2>
              <button className="modal-close-professional" onClick={() => setShowTemplatesModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <div className="templates-grid">
                {templates.map((template) => (
                  <div key={template.id} className="template-card" onClick={() => {
                    console.log("Template selecionado:", template);
                    setShowTemplatesModal(false);
                  }}>
                    <div className="template-icon">{template.icon}</div>
                    <h4>{template.nome}</h4>
                    <span className="template-category">{template.categoria}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Pré-visualização */}
      {showPreviewModal && (
        <div className="modal-overlay-professional" onClick={() => setShowPreviewModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Pré-visualização da Mensagem</h2>
              <button className="modal-close-professional" onClick={() => setShowPreviewModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <div className="preview-container">
                <div className="preview-header">
                  <div className="preview-type">
                    <span className="type-badge">{getTipoIcon(tipoMensagem)} {tipoMensagem}</span>
                    <span 
                      className="priority-badge" 
                      style={{ background: getPrioridadeColor(formData.prioridade) }}
                    >
                      {formData.prioridade}
                    </span>
                  </div>
                  <div className="preview-meta">
                    <span>Para: {formData.destinatarios}</span>
                  </div>
                </div>
                <div className="preview-content">
                  <h3>{formData.titulo || "Sem título"}</h3>
                  <p>{formData.conteudo || "Sem conteúdo"}</p>
                  {anexos.length > 0 && (
                    <div className="preview-anexos">
                      <h4>Anexos ({anexos.length})</h4>
                      {anexos.map((file, index) => (
                        <div key={index} className="preview-anexo">{file.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer-professional">
              <button className="btn-cancel-professional" onClick={() => setShowPreviewModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
