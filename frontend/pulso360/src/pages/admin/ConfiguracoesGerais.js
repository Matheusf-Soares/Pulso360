import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfiguracoesGerais() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("geral");
  const [hasChanges, setHasChanges] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    // Geral
    nomeEmpresa: "Pulso360 Analytics",
    emailContato: "contato@pulso360.com",
    telefone: "(11) 98765-4321",
    endereco: "Av. Paulista, 1578 - São Paulo, SP",
    timezone: "America/Sao_Paulo",
    idioma: "pt-BR",
    formatoData: "DD/MM/YYYY",
    formatoHora: "24h",
    modoManutencao: false,
    permitirRegistro: true,
    logsDetalhados: false,
    
    // Notificações
    notifNovosUsuarios: true,
    notifErrosSistema: true,
    notifRelatoriosDiarios: false,
    notifAlertasSeguranca: true,
    notifBackupCompleto: true,
    notifAtualizacoes: true,
    emailNotificacoes: "admin@pulso360.com",
    frequenciaRelatorios: "diaria",
    
    // Aparência
    tema: "light",
    corPrimaria: "#667eea",
    corSecundaria: "#764ba2",
    corSucesso: "#00b894",
    corErro: "#d63031",
    corAlerta: "#fdcb6e",
    fontePrincipal: "Inter",
    tamanhoFonte: "medium",
    animacoes: true,
    
    // Segurança
    senhaMinLength: 8,
    senhaRequerMaiusculas: true,
    senhaRequerNumeros: true,
    senhaRequerEspeciais: true,
    senhaExpiracaoDias: 90,
    tentativasLogin: 5,
    tempoExpiracao: 60,
    autenticacaoDoisFatores: false,
    ipsPermitidos: "",
    
    // Backup
    backupAutomatico: true,
    frequenciaBackup: "diaria",
    horaBackup: "03:00",
    retencaoBackupDias: 30,
    
    // Integrações
    apiKeyGoogle: "",
    apiKeySlack: "",
    webhookUrl: "",
  });

  const tabs = [
    { id: "geral", label: "Geral", icon: "⚙️", description: "Informações básicas do sistema" },
    { id: "notificacoes", label: "Notificações", icon: "🔔", description: "Alertas e comunicações" },
    { id: "aparencia", label: "Aparência", icon: "🎨", description: "Temas e personalização" },
    { id: "seguranca", label: "Segurança", icon: "🔐", description: "Políticas de acesso" },
    { id: "backup", label: "Backup", icon: "💾", description: "Configurações de backup" },
    { id: "integracoes", label: "Integrações", icon: "🔗", description: "APIs e webhooks" },
  ];

  const stats = [
    { label: "Configurações Ativas", value: "24", icon: "✓", color: "#00b894" },
    { label: "Última Modificação", value: "2h atrás", icon: "🕒", color: "#667eea" },
    { label: "Versão do Sistema", value: "2.5.1", icon: "📦", color: "#fdcb6e" },
    { label: "Ambiente", value: "Produção", icon: "🌐", color: "#e17055" },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log("Salvando configurações:", formData);
    setHasChanges(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    setHasChanges(false);
    // Resetar para valores originais
  };

  return (
    <div className="admin-page-configuracoes">
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
                <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="page-title">Configurações Gerais</h1>
              <p className="page-subtitle">Gerencie as configurações globais do sistema</p>
            </div>
          </div>
        </div>
        <div className="header-actions-professional">
          {hasChanges && (
            <>
              <button className="btn-discard-config" onClick={() => setShowDiscardModal(true)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Descartar
              </button>
              <button className="btn-save-config" onClick={handleSave}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13.5 15.75H4.5C4.10218 15.75 3.72064 15.592 3.43934 15.3107C3.15804 15.0294 3 14.6478 3 14.25V3.75C3 3.35218 3.15804 2.97064 3.43934 2.68934C3.72064 2.40804 4.10218 2.25 4.5 2.25H10.5L15 6.75V14.25C15 14.6478 14.842 15.0294 14.5607 15.3107C14.2794 15.592 13.8978 15.75 13.5 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.75 15.75V10.5H5.25V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.25 2.25V6.75H9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Salvar Alterações
              </button>
            </>
          )}
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
          </div>
        ))}
      </div>

      {/* Layout com Tabs */}
      <div className="settings-layout-professional">
        {/* Sidebar com Tabs */}
        <div className="settings-sidebar-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab-professional ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="tab-icon-container">
                <span className="tab-icon-emoji">{tab.icon}</span>
              </div>
              <div className="tab-content-info">
                <span className="tab-label-text">{tab.label}</span>
                <span className="tab-description">{tab.description}</span>
              </div>
              {activeTab === tab.id && <div className="active-indicator"></div>}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="settings-content-professional">
          {/* Tab: Geral */}
          {activeTab === "geral" && (
            <div className="settings-section-professional">
              <div className="section-header-config">
                <h2>Informações da Empresa</h2>
                <p>Configure as informações básicas da sua organização</p>
              </div>

              <div className="form-grid-config">
                <div className="form-group-config full-width">
                  <label className="form-label-config">
                    Nome da Empresa <span className="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-input-config"
                    value={formData.nomeEmpresa}
                    onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                  />
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Email de Contato</label>
                  <input 
                    type="email" 
                    className="form-input-config"
                    value={formData.emailContato}
                    onChange={(e) => handleInputChange('emailContato', e.target.value)}
                  />
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Telefone</label>
                  <input 
                    type="tel" 
                    className="form-input-config"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange('telefone', e.target.value)}
                  />
                </div>

                <div className="form-group-config full-width">
                  <label className="form-label-config">Endereço Completo</label>
                  <input 
                    type="text" 
                    className="form-input-config"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                  />
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Regionalização</h2>
                <p>Defina as preferências de idioma e formato</p>
              </div>

              <div className="form-grid-config">
                <div className="form-group-config">
                  <label className="form-label-config">Timezone</label>
                  <select 
                    className="form-select-config"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <option value="America/Sao_Paulo">America/São Paulo (GMT-3)</option>
                    <option value="America/New_York">America/New York (GMT-5)</option>
                    <option value="Europe/London">Europe/London (GMT+0)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                  </select>
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Idioma</label>
                  <select 
                    className="form-select-config"
                    value={formData.idioma}
                    onChange={(e) => handleInputChange('idioma', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Formato de Data</label>
                  <select 
                    className="form-select-config"
                    value={formData.formatoData}
                    onChange={(e) => handleInputChange('formatoData', e.target.value)}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Formato de Hora</label>
                  <select 
                    className="form-select-config"
                    value={formData.formatoHora}
                    onChange={(e) => handleInputChange('formatoHora', e.target.value)}
                  >
                    <option value="24h">24 horas</option>
                    <option value="12h">12 horas (AM/PM)</option>
                  </select>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Preferências do Sistema</h2>
                <p>Configure comportamentos gerais da plataforma</p>
              </div>

              <div className="toggles-grid-config">
                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Modo de Manutenção</span>
                    <span className="toggle-description">Desativa o acesso ao sistema temporariamente</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.modoManutencao}
                      onChange={(e) => handleInputChange('modoManutencao', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Permitir Registro de Usuários</span>
                    <span className="toggle-description">Habilita auto-cadastro de novos usuários</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.permitirRegistro}
                      onChange={(e) => handleInputChange('permitirRegistro', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Logs Detalhados</span>
                    <span className="toggle-description">Registra informações detalhadas de debug</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.logsDetalhados}
                      onChange={(e) => handleInputChange('logsDetalhados', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Notificações */}
          {activeTab === "notificacoes" && (
            <div className="settings-section-professional">
              <div className="section-header-config">
                <h2>Notificações por Email</h2>
                <p>Configure quais eventos devem gerar notificações</p>
              </div>

              <div className="form-group-config">
                <label className="form-label-config">Email para Notificações</label>
                <input 
                  type="email" 
                  className="form-input-config"
                  value={formData.emailNotificacoes}
                  onChange={(e) => handleInputChange('emailNotificacoes', e.target.value)}
                  placeholder="admin@empresa.com"
                />
              </div>

              <div className="section-divider"></div>

              <div className="toggles-grid-config">
                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Novos Usuários Cadastrados</span>
                    <span className="toggle-description">Receba email quando um novo usuário se registrar</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.notifNovosUsuarios}
                      onChange={(e) => handleInputChange('notifNovosUsuarios', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Erros do Sistema</span>
                    <span className="toggle-description">Alertas sobre falhas críticas</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.notifErrosSistema}
                      onChange={(e) => handleInputChange('notifErrosSistema', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Relatórios Periódicos</span>
                    <span className="toggle-description">Receba relatórios de uso e desempenho</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.notifRelatoriosDiarios}
                      onChange={(e) => handleInputChange('notifRelatoriosDiarios', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Alertas de Segurança</span>
                    <span className="toggle-description">Tentativas de login suspeitas e violações</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.notifAlertasSeguranca}
                      onChange={(e) => handleInputChange('notifAlertasSeguranca', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Backup Completo</span>
                    <span className="toggle-description">Confirmação de backups realizados</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.notifBackupCompleto}
                      onChange={(e) => handleInputChange('notifBackupCompleto', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Atualizações Disponíveis</span>
                    <span className="toggle-description">Novas versões do sistema</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.notifAtualizacoes}
                      onChange={(e) => handleInputChange('notifAtualizacoes', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Frequência de Relatórios</h2>
              </div>

              <div className="form-group-config">
                <label className="form-label-config">Enviar relatórios</label>
                <select 
                  className="form-select-config"
                  value={formData.frequenciaRelatorios}
                  onChange={(e) => handleInputChange('frequenciaRelatorios', e.target.value)}
                >
                  <option value="diaria">Diariamente</option>
                  <option value="semanal">Semanalmente</option>
                  <option value="mensal">Mensalmente</option>
                  <option value="nunca">Nunca</option>
                </select>
              </div>
            </div>
          )}

          {/* Tab: Aparência */}
          {activeTab === "aparencia" && (
            <div className="settings-section-professional">
              <div className="section-header-config">
                <h2>Tema da Interface</h2>
                <p>Escolha o tema visual do sistema</p>
              </div>

              <div className="theme-selector-grid">
                <div 
                  className={`theme-card-config ${formData.tema === 'light' ? 'active' : ''}`}
                  onClick={() => handleInputChange('tema', 'light')}
                >
                  <div className="theme-preview-config light">
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-sidebar"></div>
                      <div className="preview-main"></div>
                    </div>
                  </div>
                  <div className="theme-info">
                    <span className="theme-name">☀️ Claro</span>
                    <span className="theme-desc">Ideal para ambientes iluminados</span>
                  </div>
                  {formData.tema === 'light' && <div className="theme-check">✓</div>}
                </div>

                <div 
                  className={`theme-card-config ${formData.tema === 'dark' ? 'active' : ''}`}
                  onClick={() => handleInputChange('tema', 'dark')}
                >
                  <div className="theme-preview-config dark">
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-sidebar"></div>
                      <div className="preview-main"></div>
                    </div>
                  </div>
                  <div className="theme-info">
                    <span className="theme-name">🌙 Escuro</span>
                    <span className="theme-desc">Reduz fadiga visual</span>
                  </div>
                  {formData.tema === 'dark' && <div className="theme-check">✓</div>}
                </div>

                <div 
                  className={`theme-card-config ${formData.tema === 'auto' ? 'active' : ''}`}
                  onClick={() => handleInputChange('tema', 'auto')}
                >
                  <div className="theme-preview-config auto">
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-sidebar"></div>
                      <div className="preview-main"></div>
                    </div>
                  </div>
                  <div className="theme-info">
                    <span className="theme-name">🔄 Automático</span>
                    <span className="theme-desc">Segue preferência do sistema</span>
                  </div>
                  {formData.tema === 'auto' && <div className="theme-check">✓</div>}
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Paleta de Cores</h2>
                <p>Personalize as cores principais da interface</p>
              </div>

              <div className="colors-grid-config">
                <div className="color-picker-item-config">
                  <label className="form-label-config">Cor Primária</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      className="color-input-config"
                      value={formData.corPrimaria}
                      onChange={(e) => handleInputChange('corPrimaria', e.target.value)}
                    />
                    <span className="color-value">{formData.corPrimaria}</span>
                  </div>
                </div>

                <div className="color-picker-item-config">
                  <label className="form-label-config">Cor Secundária</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      className="color-input-config"
                      value={formData.corSecundaria}
                      onChange={(e) => handleInputChange('corSecundaria', e.target.value)}
                    />
                    <span className="color-value">{formData.corSecundaria}</span>
                  </div>
                </div>

                <div className="color-picker-item-config">
                  <label className="form-label-config">Cor de Sucesso</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      className="color-input-config"
                      value={formData.corSucesso}
                      onChange={(e) => handleInputChange('corSucesso', e.target.value)}
                    />
                    <span className="color-value">{formData.corSucesso}</span>
                  </div>
                </div>

                <div className="color-picker-item-config">
                  <label className="form-label-config">Cor de Erro</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      className="color-input-config"
                      value={formData.corErro}
                      onChange={(e) => handleInputChange('corErro', e.target.value)}
                    />
                    <span className="color-value">{formData.corErro}</span>
                  </div>
                </div>

                <div className="color-picker-item-config">
                  <label className="form-label-config">Cor de Alerta</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      className="color-input-config"
                      value={formData.corAlerta}
                      onChange={(e) => handleInputChange('corAlerta', e.target.value)}
                    />
                    <span className="color-value">{formData.corAlerta}</span>
                  </div>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Tipografia</h2>
              </div>

              <div className="form-grid-config">
                <div className="form-group-config">
                  <label className="form-label-config">Fonte Principal</label>
                  <select 
                    className="form-select-config"
                    value={formData.fontePrincipal}
                    onChange={(e) => handleInputChange('fontePrincipal', e.target.value)}
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Poppins">Poppins</option>
                  </select>
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Tamanho da Fonte</label>
                  <select 
                    className="form-select-config"
                    value={formData.tamanhoFonte}
                    onChange={(e) => handleInputChange('tamanhoFonte', e.target.value)}
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="toggles-grid-config">
                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Animações</span>
                    <span className="toggle-description">Efeitos visuais e transições suaves</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.animacoes}
                      onChange={(e) => handleInputChange('animacoes', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Segurança */}
          {activeTab === "seguranca" && (
            <div className="settings-section-professional">
              <div className="section-header-config">
                <h2>Políticas de Senha</h2>
                <p>Configure os requisitos mínimos para senhas de usuários</p>
              </div>

              <div className="form-grid-config">
                <div className="form-group-config">
                  <label className="form-label-config">Tamanho Mínimo da Senha</label>
                  <input 
                    type="number" 
                    className="form-input-config"
                    min="6"
                    max="20"
                    value={formData.senhaMinLength}
                    onChange={(e) => handleInputChange('senhaMinLength', parseInt(e.target.value))}
                  />
                  <span className="input-hint-config">Caracteres mínimos: 6 | Recomendado: 8+</span>
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Expiração da Senha (dias)</label>
                  <input 
                    type="number" 
                    className="form-input-config"
                    min="0"
                    max="365"
                    value={formData.senhaExpiracaoDias}
                    onChange={(e) => handleInputChange('senhaExpiracaoDias', parseInt(e.target.value))}
                  />
                  <span className="input-hint-config">0 = sem expiração</span>
                </div>
              </div>

              <div className="toggles-grid-config">
                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Exigir Letras Maiúsculas</span>
                    <span className="toggle-description">Pelo menos uma letra maiúscula (A-Z)</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.senhaRequerMaiusculas}
                      onChange={(e) => handleInputChange('senhaRequerMaiusculas', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Exigir Números</span>
                    <span className="toggle-description">Pelo menos um dígito (0-9)</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.senhaRequerNumeros}
                      onChange={(e) => handleInputChange('senhaRequerNumeros', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Exigir Caracteres Especiais</span>
                    <span className="toggle-description">Pelo menos um símbolo (!@#$%...)</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.senhaRequerEspeciais}
                      onChange={(e) => handleInputChange('senhaRequerEspeciais', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Controle de Acesso</h2>
                <p>Gerencie tentativas de login e sessões</p>
              </div>

              <div className="form-grid-config">
                <div className="form-group-config">
                  <label className="form-label-config">Máximo de Tentativas de Login</label>
                  <input 
                    type="number" 
                    className="form-input-config"
                    min="3"
                    max="10"
                    value={formData.tentativasLogin}
                    onChange={(e) => handleInputChange('tentativasLogin', parseInt(e.target.value))}
                  />
                  <span className="input-hint-config">Bloqueio temporário após este número</span>
                </div>

                <div className="form-group-config">
                  <label className="form-label-config">Tempo de Expiração da Sessão (minutos)</label>
                  <input 
                    type="number" 
                    className="form-input-config"
                    min="15"
                    max="480"
                    value={formData.tempoExpiracao}
                    onChange={(e) => handleInputChange('tempoExpiracao', parseInt(e.target.value))}
                  />
                  <span className="input-hint-config">Logout automático após inatividade</span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="toggles-grid-config">
                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Autenticação de Dois Fatores (2FA)</span>
                    <span className="toggle-description">Requer código adicional no login</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.autenticacaoDoisFatores}
                      onChange={(e) => handleInputChange('autenticacaoDoisFatores', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="section-header-config">
                <h2>Lista de IPs Permitidos</h2>
                <p>Restrinja acesso apenas a IPs específicos (opcional)</p>
              </div>

              <div className="form-group-config full-width">
                <label className="form-label-config">IPs Permitidos (um por linha)</label>
                <textarea 
                  className="form-textarea-config"
                  rows="4"
                  placeholder="192.168.1.1&#10;10.0.0.1&#10;172.16.0.1"
                  value={formData.ipsPermitidos}
                  onChange={(e) => handleInputChange('ipsPermitidos', e.target.value)}
                ></textarea>
                <span className="input-hint-config">Deixe vazio para permitir todos os IPs</span>
              </div>
            </div>
          )}

          {/* Tab: Backup */}
          {activeTab === "backup" && (
            <div className="settings-section-professional">
              <div className="section-header-config">
                <h2>Configurações de Backup</h2>
                <p>Configure backups automáticos do banco de dados</p>
              </div>

              <div className="toggles-grid-config">
                <div className="toggle-item-config">
                  <div className="toggle-info">
                    <span className="toggle-label">Backup Automático</span>
                    <span className="toggle-description">Realiza backups periodicamente</span>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={formData.backupAutomatico}
                      onChange={(e) => handleInputChange('backupAutomatico', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              {formData.backupAutomatico && (
                <>
                  <div className="section-divider"></div>

                  <div className="form-grid-config">
                    <div className="form-group-config">
                      <label className="form-label-config">Frequência</label>
                      <select 
                        className="form-select-config"
                        value={formData.frequenciaBackup}
                        onChange={(e) => handleInputChange('frequenciaBackup', e.target.value)}
                      >
                        <option value="diaria">Diária</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                      </select>
                    </div>

                    <div className="form-group-config">
                      <label className="form-label-config">Horário do Backup</label>
                      <input 
                        type="time" 
                        className="form-input-config"
                        value={formData.horaBackup}
                        onChange={(e) => handleInputChange('horaBackup', e.target.value)}
                      />
                      <span className="input-hint-config">Preferencialmente fora do horário de pico</span>
                    </div>

                    <div className="form-group-config">
                      <label className="form-label-config">Retenção (dias)</label>
                      <input 
                        type="number" 
                        className="form-input-config"
                        min="7"
                        max="365"
                        value={formData.retencaoBackupDias}
                        onChange={(e) => handleInputChange('retencaoBackupDias', parseInt(e.target.value))}
                      />
                      <span className="input-hint-config">Backups antigos serão excluídos automaticamente</span>
                    </div>
                  </div>

                  <div className="info-box-config">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 6V10" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14H10.01" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <strong>Último backup realizado:</strong> 23/11/2025 às 03:00
                      <br/>
                      <strong>Próximo backup agendado:</strong> 24/11/2025 às {formData.horaBackup}
                      <br/>
                      <strong>Espaço utilizado:</strong> 2.4 GB
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab: Integrações */}
          {activeTab === "integracoes" && (
            <div className="settings-section-professional">
              <div className="section-header-config">
                <h2>Integrações com Serviços Externos</h2>
                <p>Configure APIs e webhooks de terceiros</p>
              </div>

              <div className="integrations-grid">
                <div className="integration-card">
                  <div className="integration-header">
                    <div className="integration-icon google">G</div>
                    <div className="integration-info">
                      <h4>Google Analytics</h4>
                      <span className="integration-status inactive">Inativo</span>
                    </div>
                  </div>
                  <div className="form-group-config">
                    <label className="form-label-config">API Key</label>
                    <input 
                      type="text" 
                      className="form-input-config"
                      placeholder="UA-XXXXXXXXX-X"
                      value={formData.apiKeyGoogle}
                      onChange={(e) => handleInputChange('apiKeyGoogle', e.target.value)}
                    />
                  </div>
                </div>

                <div className="integration-card">
                  <div className="integration-header">
                    <div className="integration-icon slack">#</div>
                    <div className="integration-info">
                      <h4>Slack</h4>
                      <span className="integration-status inactive">Inativo</span>
                    </div>
                  </div>
                  <div className="form-group-config">
                    <label className="form-label-config">Webhook URL</label>
                    <input 
                      type="text" 
                      className="form-input-config"
                      placeholder="https://hooks.slack.com/services/..."
                      value={formData.apiKeySlack}
                      onChange={(e) => handleInputChange('apiKeySlack', e.target.value)}
                    />
                  </div>
                </div>

                <div className="integration-card full-width">
                  <div className="integration-header">
                    <div className="integration-icon webhook">🔗</div>
                    <div className="integration-info">
                      <h4>Webhook Personalizado</h4>
                      <span className="integration-status inactive">Inativo</span>
                    </div>
                  </div>
                  <div className="form-group-config">
                    <label className="form-label-config">URL do Webhook</label>
                    <input 
                      type="text" 
                      className="form-input-config"
                      placeholder="https://sua-api.com/webhook"
                      value={formData.webhookUrl}
                      onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
                    />
                    <span className="input-hint-config">Receba eventos do sistema em tempo real</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Descartar Alterações */}
      {showDiscardModal && (
        <div className="modal-overlay-professional" onClick={() => setShowDiscardModal(false)}>
          <div className="modal-content-professional" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-professional">
              <h2>Descartar Alterações?</h2>
              <button className="modal-close-professional" onClick={() => setShowDiscardModal(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body-professional">
              <p>Você possui alterações não salvas. Tem certeza que deseja descartá-las?</p>
            </div>
            <div className="modal-footer-professional">
              <button className="btn-cancel-professional" onClick={() => setShowDiscardModal(false)}>
                Cancelar
              </button>
              <button className="btn-delete-professional" onClick={handleDiscard}>
                Descartar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Sucesso */}
      {showSuccessModal && (
        <div className="modal-overlay-professional">
          <div className="modal-content-professional success">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#00b894" opacity="0.1"/>
                <path d="M20 32L28 40L44 24" stroke="#00b894" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Configurações Salvas!</h2>
            <p>Suas alterações foram aplicadas com sucesso.</p>
          </div>
        </div>
      )}
    </div>
  );
}
