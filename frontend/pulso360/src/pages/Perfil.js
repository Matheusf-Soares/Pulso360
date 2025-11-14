import React, { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('dados');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  // Dados do usuário
  const [userData, setUserData] = useState({
    nome: 'Maria Silva',
    sobrenome: 'Santos',
    email: 'maria.silva@empresa.com',
    telefone: '(11) 99999-9999',
    cargo: 'Desenvolvedora Frontend Sênior',
    departamento: 'Tecnologia',
    gestor: 'Carlos Mendes',
    dataAdmissao: '2020-03-15',
    salario: 'R$ 12.000,00',
    endereco: {
      cep: '01234-567',
      rua: 'Rua das Flores, 123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP'
    },
    configuracoes: {
      notificacaoEmail: true,
      notificacaoSistema: true,
      tema: 'claro',
      idioma: 'pt-br'
    }
  });

  const [formData, setFormData] = useState({ ...userData });

  // Estatísticas do perfil
  const profileStats = [
    {
      icon: '🎯',
      title: 'Metas Concluídas',
      value: '12/15',
      percentage: 80,
      trend: 'success'
    },
    {
      icon: '📈',
      title: 'Performance',
      value: '94%',
      percentage: 94,
      trend: 'success'
    },
    {
      icon: '🏆',
      title: 'Avaliação',
      value: '4.8/5',
      percentage: 96,
      trend: 'success'
    },
    {
      icon: '📚',
      title: 'Cursos Realizados',
      value: '8',
      percentage: 100,
      trend: 'success'
    }
  ];

  const simulateError = () => {
    setModalConfig({
      title: "Demonstração de Erro",
      message: "Esta é uma demonstração de como seria exibido um erro de salvamento.",
      icon: "⚠️",
      type: "error",
      confirmText: "OK"
    });
    setShowModal(true);
    
    if (window.showNotification) {
      window.showNotification(
        "Exemplo de notificação de erro", 
        "error", 
        4000
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular salvamento com delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Atualizar dados
      setUserData({ ...formData });
      setIsEditing(false);
      
      // Adicionar animação de sucesso aos campos
      const formFields = document.querySelectorAll('.form-field input, .form-field select');
      formFields.forEach(field => {
        field.classList.add('pulse-success');
        setTimeout(() => field.classList.remove('pulse-success'), 600);
      });
      
      // Mostrar modal de sucesso
      setModalConfig({
        title: "Dados Salvos com Sucesso!",
        message: "Suas informações foram atualizadas com segurança. Todas as alterações já estão em vigor.",
        icon: "🎉",
        type: "success",
        confirmText: "Perfeito!"
      });
      setShowModal(true);
      
      // Mostrar notificação
      if (window.showNotification) {
        window.showNotification(
          "Perfil atualizado com sucesso! ✅", 
          "success", 
          3000
        );
      }
      
    } catch (error) {
      // Mostrar modal de erro
      setModalConfig({
        title: "Erro ao Salvar",
        message: "Não foi possível salvar suas alterações. Verifique sua conexão e tente novamente.",
        icon: "❌",
        type: "error",
        confirmText: "Tentar Novamente"
      });
      setShowModal(true);
      
      // Mostrar notificação de erro
      if (window.showNotification) {
        window.showNotification(
          "Erro ao salvar dados. Tente novamente.", 
          "error", 
          4000
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (JSON.stringify(formData) !== JSON.stringify(userData)) {
      // Se houver alterações, mostrar modal de confirmação
      setModalConfig({
        title: "Descartar Alterações?",
        message: "Você tem alterações não salvas. Tem certeza que deseja descartar essas modificações?",
        icon: "⚠️",
        type: "warning",
        confirmText: "Sim, Descartar",
        showCancel: true,
        cancelText: "Continuar Editando",
        onConfirm: () => {
          setFormData({ ...userData });
          setIsEditing(false);
          if (window.showNotification) {
            window.showNotification("Alterações descartadas", "info", 2000);
          }
        }
      });
      setShowModal(true);
    } else {
      setFormData({ ...userData });
      setIsEditing(false);
    }
  };

  const renderFormField = (label, name, type = 'text', placeholder = '', disabled = false) => (
    <div className="form-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={name.includes('.') ? 
          name.split('.').reduce((obj, key) => obj[key], formData) : 
          formData[name]
        }
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={!isEditing || disabled}
        className={!isEditing || disabled ? 'disabled' : ''}
      />
    </div>
  );

  const renderSelectField = (label, name, options, disabled = false) => (
    <div className="form-field">
      <label>{label}</label>
      <select
        name={name}
        value={name.includes('.') ? 
          name.split('.').reduce((obj, key) => obj[key], formData) : 
          formData[name]
        }
        onChange={handleInputChange}
        disabled={!isEditing || disabled}
        className={!isEditing || disabled ? 'disabled' : ''}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className={`perfil-container ${isSaving ? 'saving-state' : ''}`}>
      {/* Header do Perfil */}
      <div className="perfil-header">
        <div className="header-content">
          <div className="profile-info-section">
            <div className="profile-avatar-container">
              <div className="profile-avatar-large">
                <span>{userData.nome.charAt(0)}{userData.sobrenome.charAt(0)}</span>
                <button className="avatar-upload-btn" title="Alterar foto">
                  📷
                </button>
              </div>
            </div>
            <div className="profile-details">
              <h1>{userData.nome} {userData.sobrenome}</h1>
              <p className="role">{userData.cargo}</p>
              <p className="department">{userData.departamento}</p>
              <div className="profile-badges">
                <span className="badge success">Ativo</span>
                <span className="badge primary">Sênior</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <>
              <button className="btn-secondary">
                <span>📄</span>
                Gerar Relatório
              </button>
              <button className="btn-primary" onClick={() => setIsEditing(true)}>
                <span>✏️</span>
                Editar Perfil
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn-outline" 
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button 
                className={`btn-primary ${isSaving ? 'loading' : ''}`} 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <span>Salvando...</span>
                  </div>
                ) : (
                  <>
                    <span>💾</span>
                    Salvar Alterações
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Estatísticas do Perfil */}
      <div className="perfil-stats">
        <h2>📊 Visão Geral do Perfil</h2>
        <div className="stats-grid">
          {profileStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">{stat.icon}</span>
                <span className={`trend-indicator ${stat.trend}`}>
                  ↗️
                </span>
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="perfil-content">
        <div className="tab-navigation">
          {[
            { key: 'dados', label: '👤 Dados Pessoais', icon: '👤' },
            { key: 'contato', label: '📞 Contato', icon: '📞' },
            { key: 'trabalho', label: '💼 Trabalho', icon: '💼' },
            { key: 'configuracoes', label: '⚙️ Configurações', icon: '⚙️' },
            { key: 'seguranca', label: '🔒 Segurança', icon: '🔒' }
          ].map(tab => (
            <button
              key={tab.key}
              className={`nav-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo das Abas */}
        <div className="tab-content-area">
          {activeTab === 'dados' && (
            <div className="tab-content">
              <div className="content-header">
                <h3>👤 Dados Pessoais</h3>
                <p>Informações básicas do seu perfil</p>
              </div>
              
              <div className="form-section">
                <div className="form-grid">
                  {renderFormField('Nome', 'nome', 'text', 'Seu primeiro nome')}
                  {renderFormField('Sobrenome', 'sobrenome', 'text', 'Seu sobrenome')}
                  {renderFormField('CPF', 'cpf', 'text', '000.000.000-00', true)}
                  {renderFormField('Data de Nascimento', 'dataNascimento', 'date')}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contato' && (
            <div className="tab-content">
              <div className="content-header">
                <h3>📞 Informações de Contato</h3>
                <p>Dados para comunicação e localização</p>
              </div>
              
              <div className="form-section">
                <h4>Contato</h4>
                <div className="form-grid">
                  {renderFormField('Email', 'email', 'email', 'seu@email.com')}
                  {renderFormField('Telefone', 'telefone', 'tel', '(11) 99999-9999')}
                </div>
              </div>

              <div className="form-section">
                <h4>Endereço</h4>
                <div className="form-grid">
                  {renderFormField('CEP', 'endereco.cep', 'text', '00000-000')}
                  {renderFormField('Rua', 'endereco.rua', 'text', 'Rua, Número')}
                  {renderFormField('Bairro', 'endereco.bairro', 'text', 'Bairro')}
                  {renderFormField('Cidade', 'endereco.cidade', 'text', 'Cidade')}
                  {renderSelectField('Estado', 'endereco.estado', [
                    { value: 'SP', label: 'São Paulo' },
                    { value: 'RJ', label: 'Rio de Janeiro' },
                    { value: 'MG', label: 'Minas Gerais' },
                    { value: 'RS', label: 'Rio Grande do Sul' }
                  ])}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trabalho' && (
            <div className="tab-content">
              <div className="content-header">
                <h3>💼 Informações Profissionais</h3>
                <p>Dados relacionados ao seu trabalho e carreira</p>
              </div>
              
              <div className="form-section">
                <div className="form-grid">
                  {renderFormField('Cargo', 'cargo', 'text', 'Seu cargo atual')}
                  {renderFormField('Departamento', 'departamento', 'text', 'Departamento')}
                  {renderFormField('Gestor Direto', 'gestor', 'text', 'Nome do gestor', true)}
                  {renderFormField('Data de Admissão', 'dataAdmissao', 'date', '', true)}
                  {renderFormField('Salário', 'salario', 'text', 'R$ 0.000,00', true)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuracoes' && (
            <div className="tab-content">
              <div className="content-header">
                <h3>⚙️ Configurações da Conta</h3>
                <p>Personalize sua experiência no sistema</p>
              </div>
              
              <div className="form-section">
                <h4>Notificações</h4>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h5>Notificações por Email</h5>
                      <p>Receba atualizações importantes por email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="configuracoes.notificacaoEmail"
                        checked={formData.configuracoes.notificacaoEmail}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h5>Notificações do Sistema</h5>
                      <p>Receba alertas e lembretes do sistema</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        name="configuracoes.notificacaoSistema"
                        checked={formData.configuracoes.notificacaoSistema}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Preferências</h4>
                <div className="form-grid">
                  {renderSelectField('Tema', 'configuracoes.tema', [
                    { value: 'claro', label: '☀️ Claro' },
                    { value: 'escuro', label: '🌙 Escuro' },
                    { value: 'auto', label: '🔄 Automático' }
                  ])}
                  {renderSelectField('Idioma', 'configuracoes.idioma', [
                    { value: 'pt-br', label: '🇧🇷 Português (Brasil)' },
                    { value: 'en-us', label: '🇺🇸 English (US)' },
                    { value: 'es-es', label: '🇪🇸 Español' }
                  ])}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seguranca' && (
            <div className="tab-content">
              <div className="content-header">
                <h3>🔒 Segurança da Conta</h3>
                <p>Mantenha sua conta protegida e segura</p>
              </div>
              
              <div className="security-section">
                <div className="security-item">
                  <div className="security-icon">🔑</div>
                  <div className="security-info">
                    <h4>Alterar Senha</h4>
                    <p>Mantenha sua conta segura com uma senha forte</p>
                    <small className="muted">Última alteração: 15 dias atrás</small>
                  </div>
                  <button className="btn-outline">
                    Alterar Senha
                  </button>
                </div>

                <div className="security-item">
                  <div className="security-icon">📱</div>
                  <div className="security-info">
                    <h4>Autenticação em Duas Etapas</h4>
                    <p>Adicione uma camada extra de segurança</p>
                    <small className="text-success">✅ Ativo</small>
                  </div>
                  <button className="btn-outline">
                    Configurar
                  </button>
                </div>

                <div className="security-item">
                  <div className="security-icon">🖥️</div>
                  <div className="security-info">
                    <h4>Sessões Ativas</h4>
                    <p>Gerencie dispositivos conectados</p>
                    <small className="muted">3 dispositivos ativos</small>
                  </div>
                  <button className="btn-outline">
                    Ver Sessões
                  </button>
                </div>

                <div className="security-item">
                  <div className="security-icon">📋</div>
                  <div className="security-info">
                    <h4>Log de Atividades</h4>
                    <p>Visualize atividades recentes da conta</p>
                    <small className="muted">Último acesso: Hoje às 09:30</small>
                  </div>
                  <button className="btn-outline">
                    Ver Histórico
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        icon={modalConfig.icon}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
        showCancel={modalConfig.showCancel}
        cancelText={modalConfig.cancelText}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.onCancel}
      />
    </div>
  );
};

export default Perfil;