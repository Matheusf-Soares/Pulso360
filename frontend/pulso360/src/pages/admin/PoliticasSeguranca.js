import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PoliticasSeguranca() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("autenticacao");
  const [hasChanges, setHasChanges] = useState(false);

  // Estatísticas de segurança
  const stats = [
    { label: "Políticas Ativas", value: "12", icon: "🔒", color: "#667eea" },
    { label: "Violações (7 dias)", value: "3", icon: "⚠️", color: "#fdcb6e" },
    { label: "Usuários com 2FA", value: "87%", icon: "✓", color: "#00b894" },
    { label: "Última Auditoria", value: "2 dias", icon: "🔍", color: "#0984e3" },
  ];

  // Configurações de autenticação
  const [authSettings, setAuthSettings] = useState({
    twoFactor: true,
    passwordExpiry: true,
    accountLockout: false,
    ssoOnly: true,
    passwordComplexity: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
  });

  // Configurações de acesso
  const [accessSettings, setAccessSettings] = useState({
    ipWhitelist: "",
    ipBlacklist: "",
    startTime: "08:00",
    endTime: "18:00",
    allowWeekends: false,
    geoRestriction: false,
    vpnRequired: false,
  });

  // Configurações de dados
  const [dataSettings, setDataSettings] = useState({
    encryptAtRest: true,
    encryptInTransit: true,
    auditLogs: true,
    dataRetention: 90,
    anonymization: false,
    backupEncryption: true,
  });

  // Configurações de senha
  const [passwordSettings, setPasswordSettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventReuse: 5,
  });

  // Violações recentes
  const recentViolations = [
    { 
      id: 1, 
      type: "Tentativa de Login Suspeita", 
      user: "usuario@exemplo.com",
      timestamp: "Há 2 horas",
      severity: "high",
      ip: "192.168.1.100"
    },
    { 
      id: 2, 
      type: "Acesso Fora do Horário", 
      user: "admin@exemplo.com",
      timestamp: "Há 5 horas",
      severity: "medium",
      ip: "10.0.0.50"
    },
    { 
      id: 3, 
      type: "IP não Autorizado", 
      user: "teste@exemplo.com",
      timestamp: "Há 1 dia",
      severity: "high",
      ip: "203.0.113.45"
    },
  ];

  const tabs = [
    { id: "autenticacao", label: "Autenticação", icon: "🔐" },
    { id: "acesso", label: "Controle de Acesso", icon: "🚪" },
    { id: "dados", label: "Proteção de Dados", icon: "💾" },
    { id: "senha", label: "Políticas de Senha", icon: "🔑" },
    { id: "violacoes", label: "Violações", icon: "⚠️" },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "#d63031";
      case "medium": return "#fdcb6e";
      case "low": return "#0984e3";
      default: return "#95a5a6";
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case "high": return "Alta";
      case "medium": return "Média";
      case "low": return "Baixa";
      default: return "Desconhecida";
    }
  };

  const handleSave = () => {
    console.log("Salvando políticas...", { authSettings, accessSettings, dataSettings, passwordSettings });
    setHasChanges(false);
  };

  return (
    <div className="admin-page-politicas">
      {/* Header */}
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
              <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="white"/>
            </svg>
          </div>
          <div>
            <h1>Políticas de Segurança</h1>
            <p>Configuração avançada de regras e políticas de acesso</p>
          </div>
        </div>

        <button 
          className="btn-primary-admin" 
          onClick={handleSave}
          disabled={!hasChanges}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 0H2.5C1.12 0 0 1.12 0 2.5V13.5C0 14.88 1.12 16 2.5 16H13.5C14.88 16 16 14.88 16 13.5V2.5C16 1.12 14.88 0 13.5 0ZM5.5 13.5L1.5 9.5L2.91 8.09L5.5 10.67L13.09 3.09L14.5 4.5L5.5 13.5Z" fill="currentColor"/>
          </svg>
          Salvar Políticas
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-professional">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card-professional">
            <div className="stat-icon" style={{ background: stat.color }}>
              <span>{stat.icon}</span>
            </div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation-security">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button-security ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content-security">
        {/* Autenticação */}
        {activeTab === "autenticacao" && (
          <div className="policy-content">
            <h3 className="section-title">Configurações de Autenticação</h3>
            
            <div className="policy-grid">
              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Autenticação de Dois Fatores (2FA)</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={authSettings.twoFactor}
                      onChange={(e) => {
                        setAuthSettings({...authSettings, twoFactor: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Exige uma segunda forma de autenticação além da senha
                </p>
              </div>

              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Expiração de Senha</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={authSettings.passwordExpiry}
                      onChange={(e) => {
                        setAuthSettings({...authSettings, passwordExpiry: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Obriga os usuários a trocarem a senha periodicamente
                </p>
              </div>

              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Bloqueio de Conta</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={authSettings.accountLockout}
                      onChange={(e) => {
                        setAuthSettings({...authSettings, accountLockout: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Bloqueia conta após múltiplas tentativas falhas de login
                </p>
              </div>

              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Login Apenas via SSO</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={authSettings.ssoOnly}
                      onChange={(e) => {
                        setAuthSettings({...authSettings, ssoOnly: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Permite login apenas através de Single Sign-On
                </p>
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Tempo de Sessão (minutos)</label>
                <input 
                  type="number" 
                  className="setting-input"
                  value={authSettings.sessionTimeout}
                  onChange={(e) => {
                    setAuthSettings({...authSettings, sessionTimeout: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                />
              </div>

              <div className="setting-item">
                <label className="setting-label">Máximo de Tentativas de Login</label>
                <input 
                  type="number" 
                  className="setting-input"
                  value={authSettings.maxLoginAttempts}
                  onChange={(e) => {
                    setAuthSettings({...authSettings, maxLoginAttempts: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                />
              </div>

              <div className="setting-item">
                <label className="setting-label">Duração do Bloqueio (minutos)</label>
                <input 
                  type="number" 
                  className="setting-input"
                  value={authSettings.lockoutDuration}
                  onChange={(e) => {
                    setAuthSettings({...authSettings, lockoutDuration: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Controle de Acesso */}
        {activeTab === "acesso" && (
          <div className="policy-content">
            <h3 className="section-title">Controle de Acesso</h3>
            
            <div className="form-section-security">
              <label className="form-label-security">IPs Permitidos (Whitelist)</label>
              <textarea 
                className="form-textarea-security"
                rows="6"
                placeholder="Digite os endereços IP permitidos, um por linha&#10;Exemplo:&#10;192.168.1.0/24&#10;10.0.0.50"
                value={accessSettings.ipWhitelist}
                onChange={(e) => {
                  setAccessSettings({...accessSettings, ipWhitelist: e.target.value});
                  setHasChanges(true);
                }}
              />
              <span className="form-hint">Apenas IPs listados poderão acessar o sistema</span>
            </div>

            <div className="form-section-security">
              <label className="form-label-security">IPs Bloqueados (Blacklist)</label>
              <textarea 
                className="form-textarea-security"
                rows="6"
                placeholder="Digite os endereços IP bloqueados, um por linha"
                value={accessSettings.ipBlacklist}
                onChange={(e) => {
                  setAccessSettings({...accessSettings, ipBlacklist: e.target.value});
                  setHasChanges(true);
                }}
              />
              <span className="form-hint">IPs listados serão bloqueados automaticamente</span>
            </div>

            <div className="time-range-section">
              <label className="form-label-security">Horário de Acesso Permitido</label>
              <div className="time-range-inputs">
                <input 
                  type="time" 
                  className="time-input-security"
                  value={accessSettings.startTime}
                  onChange={(e) => {
                    setAccessSettings({...accessSettings, startTime: e.target.value});
                    setHasChanges(true);
                  }}
                />
                <span className="time-separator">até</span>
                <input 
                  type="time" 
                  className="time-input-security"
                  value={accessSettings.endTime}
                  onChange={(e) => {
                    setAccessSettings({...accessSettings, endTime: e.target.value});
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>

            <div className="checkbox-group-security">
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={accessSettings.allowWeekends}
                  onChange={(e) => {
                    setAccessSettings({...accessSettings, allowWeekends: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Permitir acesso nos finais de semana</span>
              </label>
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={accessSettings.geoRestriction}
                  onChange={(e) => {
                    setAccessSettings({...accessSettings, geoRestriction: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Ativar restrição geográfica</span>
              </label>
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={accessSettings.vpnRequired}
                  onChange={(e) => {
                    setAccessSettings({...accessSettings, vpnRequired: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Exigir conexão VPN</span>
              </label>
            </div>
          </div>
        )}

        {/* Proteção de Dados */}
        {activeTab === "dados" && (
          <div className="policy-content">
            <h3 className="section-title">Políticas de Proteção de Dados</h3>
            
            <div className="policy-grid">
              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Criptografia em Repouso</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={dataSettings.encryptAtRest}
                      onChange={(e) => {
                        setDataSettings({...dataSettings, encryptAtRest: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Criptografa dados armazenados no banco de dados
                </p>
              </div>

              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Criptografia em Trânsito</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={dataSettings.encryptInTransit}
                      onChange={(e) => {
                        setDataSettings({...dataSettings, encryptInTransit: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Força uso de HTTPS para todas as comunicações
                </p>
              </div>

              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Logs de Auditoria</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={dataSettings.auditLogs}
                      onChange={(e) => {
                        setDataSettings({...dataSettings, auditLogs: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Registra todas as ações dos usuários no sistema
                </p>
              </div>

              <div className="policy-card">
                <div className="policy-card-header">
                  <h4>Backup Criptografado</h4>
                  <label className="toggle-switch-policy">
                    <input 
                      type="checkbox" 
                      checked={dataSettings.backupEncryption}
                      onChange={(e) => {
                        setDataSettings({...dataSettings, backupEncryption: e.target.checked});
                        setHasChanges(true);
                      }}
                    />
                    <span className="toggle-slider-policy"></span>
                  </label>
                </div>
                <p className="policy-description">
                  Criptografa todos os arquivos de backup
                </p>
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Retenção de Dados (dias)</label>
                <input 
                  type="number" 
                  className="setting-input"
                  value={dataSettings.dataRetention}
                  onChange={(e) => {
                    setDataSettings({...dataSettings, dataRetention: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Políticas de Senha */}
        {activeTab === "senha" && (
          <div className="policy-content">
            <h3 className="section-title">Requisitos de Senha</h3>
            
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">Comprimento Mínimo</label>
                <input 
                  type="number" 
                  className="setting-input"
                  min="6"
                  max="32"
                  value={passwordSettings.minLength}
                  onChange={(e) => {
                    setPasswordSettings({...passwordSettings, minLength: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                />
              </div>

              <div className="setting-item">
                <label className="setting-label">Senhas Anteriores Bloqueadas</label>
                <input 
                  type="number" 
                  className="setting-input"
                  min="0"
                  max="10"
                  value={passwordSettings.preventReuse}
                  onChange={(e) => {
                    setPasswordSettings({...passwordSettings, preventReuse: parseInt(e.target.value)});
                    setHasChanges(true);
                  }}
                />
              </div>
            </div>

            <div className="checkbox-group-security">
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={passwordSettings.requireUppercase}
                  onChange={(e) => {
                    setPasswordSettings({...passwordSettings, requireUppercase: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Exigir letras maiúsculas (A-Z)</span>
              </label>
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={passwordSettings.requireLowercase}
                  onChange={(e) => {
                    setPasswordSettings({...passwordSettings, requireLowercase: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Exigir letras minúsculas (a-z)</span>
              </label>
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={passwordSettings.requireNumbers}
                  onChange={(e) => {
                    setPasswordSettings({...passwordSettings, requireNumbers: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Exigir números (0-9)</span>
              </label>
              <label className="checkbox-label-security">
                <input 
                  type="checkbox" 
                  checked={passwordSettings.requireSpecialChars}
                  onChange={(e) => {
                    setPasswordSettings({...passwordSettings, requireSpecialChars: e.target.checked});
                    setHasChanges(true);
                  }}
                />
                <span>Exigir caracteres especiais (!@#$%)</span>
              </label>
            </div>

            <div className="password-strength-preview">
              <h4>Exemplo de Senha Válida:</h4>
              <div className="password-example">
                <code>Pulso@2025!</code>
                <span className="strength-badge strong">Forte</span>
              </div>
            </div>
          </div>
        )}

        {/* Violações */}
        {activeTab === "violacoes" && (
          <div className="policy-content">
            <h3 className="section-title">Violações de Segurança Recentes</h3>
            
            <div className="violations-list">
              {recentViolations.map((violation) => (
                <div key={violation.id} className="violation-card">
                  <div className="violation-header">
                    <div className="violation-type">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7V12C2 16.55 5.84 20.74 10.5 21.93C11.15 22.03 11.85 22.03 12.5 21.93C17.16 20.74 21 16.55 21 12V7L12 2ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill={getSeverityColor(violation.severity)}/>
                      </svg>
                      <div>
                        <h4>{violation.type}</h4>
                        <span className="violation-user">{violation.user}</span>
                      </div>
                    </div>
                    <span 
                      className="severity-badge"
                      style={{ background: getSeverityColor(violation.severity) }}
                    >
                      {getSeverityLabel(violation.severity)}
                    </span>
                  </div>
                  
                  <div className="violation-details">
                    <div className="detail-item-violation">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0Z" fill="currentColor"/>
                      </svg>
                      <span>IP: {violation.ip}</span>
                    </div>
                    <div className="detail-item-violation">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0Z" fill="currentColor"/>
                      </svg>
                      <span>{violation.timestamp}</span>
                    </div>
                  </div>

                  <div className="violation-actions">
                    <button className="btn-violation-block">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.87 14 14 10.87 14 7C14 3.13 10.87 0 7 0ZM1.4 7C1.4 3.91 3.91 1.4 7 1.4L7 12.6C3.91 12.6 1.4 10.09 1.4 7Z" fill="currentColor"/>
                      </svg>
                      Bloquear IP
                    </button>
                    <button className="btn-violation-details">Ver Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
