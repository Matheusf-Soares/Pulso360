import React, { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dados');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Inicializar dados do usuário a partir do contexto
  const getInitialUserData = () => {
    if (!user) {
      return {
        nome: 'Usuário',
        sobrenome: '',
        email: 'usuario@empresa.com',
        telefone: '',
        cargo: 'Cargo',
        departamento: 'Departamento',
        gestor: '',
        dataAdmissao: '',
        salario: '',
        endereco: {
          cep: '',
          rua: '',
          bairro: '',
          cidade: '',
          estado: ''
        },
        configuracoes: {
          notificacaoEmail: true,
          notificacaoSistema: true,
          tema: 'claro',
          idioma: 'pt-br'
        }
      };
    }

    // Separar nome completo em nome e sobrenome
    const nomeCompleto = user.nome || 'Usuário';
    const partesNome = nomeCompleto.split(' ');
    const nome = partesNome[0];
    const sobrenome = partesNome.slice(1).join(' ');

    return {
      nome: nome,
      sobrenome: sobrenome,
      email: user.email || 'usuario@empresa.com',
      telefone: user.telefone || '',
      cargo: user.cargo || 'Cargo',
      departamento: user.departamento || 'Departamento',
      gestor: user.gestor || '',
      dataAdmissao: user.data_admissao || user.dataAdmissao || '',
      salario: user.salario || '',
      endereco: user.endereco || {
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
      },
      configuracoes: user.configuracoes || {
        notificacaoEmail: true,
        notificacaoSistema: true,
        tema: 'claro',
        idioma: 'pt-br'
      }
    };
  };

  // Dados do usuário
  const [userData, setUserData] = useState(getInitialUserData());

  // Atualizar quando o usuário do contexto mudar
  useEffect(() => {
    const userData = getInitialUserData();
    setUserData(userData);
    setFormData(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  // Função para simular erro (útil para testes, mas não usada no momento)
  // eslint-disable-next-line no-unused-vars
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
    
    console.log('💾 Salvando dados do perfil:', formData);
    
    // Simular salvamento com delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Atualizar dados locais
      setUserData({ ...formData });
      
      // Atualizar contexto de autenticação com os novos dados
      if (updateUser) {
        const updatedUserData = {
          ...user,
          nome: `${formData.nome} ${formData.sobrenome}`.trim(),
          email: formData.email,
          telefone: formData.telefone,
          cargo: formData.cargo,
          departamento: formData.departamento,
          gestor: formData.gestor,
          data_admissao: formData.dataAdmissao,
          salario: formData.salario,
          endereco: formData.endereco,
          configuracoes: formData.configuracoes
        };
        updateUser(updatedUserData);
        console.log('✅ Contexto de autenticação atualizado:', updatedUserData);
      }
      
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
      console.error('❌ Erro ao salvar perfil:', error);
      
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

  // Funções para gerenciar alteração de senha
  const handleOpenPasswordModal = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({});
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Mínimo de 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Pelo menos uma letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Pelo menos uma letra minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Pelo menos um número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Pelo menos um caractere especial');
    }
    
    return errors;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: '', color: '' };
    
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    if (strength <= 2) return { level: 1, label: 'Fraca', color: '#ff7675' };
    if (strength <= 4) return { level: 2, label: 'Média', color: '#fdcb6e' };
    if (strength <= 5) return { level: 3, label: 'Boa', color: '#74b9ff' };
    return { level: 4, label: 'Forte', color: '#00b894' };
  };

  const handleChangePassword = async () => {
    // Validar campos
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Campo obrigatório';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'Campo obrigatório';
    } else {
      const validationErrors = validatePassword(passwordData.newPassword);
      if (validationErrors.length > 0) {
        errors.newPassword = validationErrors[0];
      }
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Campo obrigatório';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'A nova senha deve ser diferente da atual';
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    // Simular alteração de senha
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular verificação de senha atual (em produção, isso seria feito no backend)
      const currentPasswordCorrect = true; // Simular sucesso
      
      if (!currentPasswordCorrect) {
        setPasswordErrors({
          currentPassword: 'Senha atual incorreta'
        });
        setIsSaving(false);
        return;
      }
      
      // Fechar modal
      handleClosePasswordModal();
      
      // Mostrar modal de sucesso
      setModalConfig({
        title: "Senha Alterada com Sucesso!",
        message: "Sua senha foi atualizada com segurança. Use a nova senha no próximo login.",
        icon: "🔐",
        type: "success",
        confirmText: "Entendi"
      });
      setShowModal(true);
      
      // Mostrar notificação
      if (window.showNotification) {
        window.showNotification(
          "Senha alterada com sucesso! 🔒", 
          "success", 
          3000
        );
      }
      
      console.log('✅ Senha alterada com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao alterar senha:', error);
      
      setModalConfig({
        title: "Erro ao Alterar Senha",
        message: "Não foi possível alterar sua senha. Tente novamente mais tarde.",
        icon: "❌",
        type: "error",
        confirmText: "OK"
      });
      setShowModal(true);
      
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className={`perfil-container ${isSaving ? 'saving-state' : ''}`}>
        {/* Header Profissional Moderno */}
        <div className="perfil-header-modern">
        <div className="header-background-gradient"></div>
        <div className="header-decoration-circles">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
        
        <div className="header-main-section">
          <div className="profile-info-section-modern">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large-modern">
                <div className="avatar-content">
                  <span className="avatar-initials">{userData.nome.charAt(0)}{userData.sobrenome.charAt(0)}</span>
                </div>
                <div className="avatar-ring"></div>
                <button className="avatar-upload-btn-modern" title="Alterar foto do perfil">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="currentColor"/>
                  </svg>
                </button>
                <div className="online-status-badge">
                  <span className="status-dot"></span>
                </div>
              </div>
            </div>
            
            <div className="profile-details-modern">
              <div className="profile-name-section">
                <h1 className="profile-name">{userData.nome} {userData.sobrenome}</h1>
                <button className="verification-badge" title="Perfil Verificado">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L12.2451 3.45492L16.1803 4.1459L13.3607 7.29508L13.8197 11.3541L10 9.5L6.18034 11.3541L6.63934 7.29508L3.81966 4.1459L7.75486 3.45492L10 0Z" fill="currentColor"/>
                    <path d="M10 6L11 8H13L11.5 9.5L12 11.5L10 10.5L8 11.5L8.5 9.5L7 8H9L10 6Z" fill="white"/>
                  </svg>
                </button>
              </div>
              
              <div className="profile-role-info">
                <span className="role-title">{userData.cargo}</span>
                <span className="role-separator">•</span>
                <span className="department-title">{userData.departamento}</span>
              </div>
              
              <div className="profile-meta-badges">
                <div className="meta-badge status-active">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="currentColor"/>
                  </svg>
                  <span>Ativo</span>
                </div>
                <div className="meta-badge level-senior">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 0L9 5H14L10 8L11.5 14L7 10.5L2.5 14L4 8L0 5H5L7 0Z" fill="currentColor"/>
                  </svg>
                  <span>Sênior</span>
                </div>
                <div className="meta-badge performance-excellent">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L5 5L8 9L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Performance: 94%</span>
                </div>
              </div>
              
              <div className="profile-quick-stats">
                <div className="quick-stat-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM8 14.4C4.46 14.4 1.6 11.54 1.6 8C1.6 4.46 4.46 1.6 8 1.6C11.54 1.6 14.4 4.46 14.4 8C14.4 11.54 11.54 14.4 8 14.4Z" fill="currentColor"/>
                    <path d="M8.4 4H7.2V8.8L11.2 11.2L11.8 10.24L8.4 8.2V4Z" fill="currentColor"/>
                  </svg>
                  <span>Na empresa há <strong>2 anos</strong></span>
                </div>
                <div className="quick-stat-item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 2H12V0H10V2H6V0H4V2H2C0.89 2 0 2.9 0 4V14C0 15.1 0.89 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2ZM14 14H2V7H14V14Z" fill="currentColor"/>
                  </svg>
                  <span>Último login: <strong>Hoje, 09:30</strong></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="header-actions-modern">
            {!isEditing ? (
              <>
                <button className="btn-header-outline">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16Z" fill="currentColor"/>
                    <path d="M4 10H14V12H4V10ZM4 6H14V8H4V6ZM4 14H10V16H4V14Z" fill="currentColor"/>
                  </svg>
                  <span>Gerar Relatório</span>
                </button>
                <button className="btn-header-primary" onClick={() => setIsEditing(true)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M0 14.25V18H3.75L14.81 6.94L11.06 3.19L0 14.25ZM17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.29C14.98 -0.1 14.35 -0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04Z" fill="currentColor"/>
                  </svg>
                  <span>Editar Perfil</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn-header-cancel" 
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z" fill="currentColor"/>
                  </svg>
                  <span>Cancelar</span>
                </button>
                <button 
                  className={`btn-header-save ${isSaving ? 'loading' : ''}`} 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="loading-spinner-inline">
                        <div className="spinner-small"></div>
                      </div>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M14.25 0H1.5C0.675 0 0 0.675 0 1.5V16.5C0 17.325 0.675 18 1.5 18H16.5C17.325 18 18 17.325 18 16.5V3.75L14.25 0ZM9 16.5C7.755 16.5 6.75 15.495 6.75 14.25C6.75 13.005 7.755 12 9 12C10.245 12 11.25 13.005 11.25 14.25C11.25 15.495 10.245 16.5 9 16.5ZM12.75 6.75H1.5V1.5H12.75V6.75Z" fill="currentColor"/>
                      </svg>
                      <span>Salvar Alterações</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Stats Cards Integradas no Header */}
        <div className="header-stats-modern">
          {profileStats.map((stat, index) => (
            <div key={index} className="stat-card-profile">
              <div className="stat-icon-circle">
                <span>{stat.icon}</span>
              </div>
              <div className="stat-details">
                <div className="stat-value-large">{stat.value}</div>
                <div className="stat-label-small">{stat.title}</div>
              </div>
              <div className="stat-progress-mini">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4"/>
                  <circle 
                    cx="24" cy="24" r="20" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="4"
                    strokeDasharray={`${stat.percentage * 1.256} 125.6`}
                    strokeDashoffset="0"
                    transform="rotate(-90 24 24)"
                    strokeLinecap="round"
                  />
                </svg>
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
                  <button className="btn-outline" onClick={handleOpenPasswordModal}>
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

      {/* Modal de Alteração de Senha */}
      {showPasswordModal && (
        <div className="password-modal-overlay" onClick={handleClosePasswordModal}>
          <div className="password-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="password-modal-header">
              <div className="password-modal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2>Alterar Senha</h2>
              <p>Escolha uma senha forte para manter sua conta segura</p>
              <button 
                className="password-modal-close"
                onClick={handleClosePasswordModal}
                disabled={isSaving}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="password-modal-body">
              {/* Senha Atual */}
              <div className="password-field-group">
                <label>Senha Atual</label>
                <div className={`password-input-wrapper ${passwordErrors.currentPassword ? 'error' : ''}`}>
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="Digite sua senha atual"
                    disabled={isSaving}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('current')}
                    disabled={isSaving}
                  >
                    {showPasswords.current ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <span className="password-error">{passwordErrors.currentPassword}</span>
                )}
              </div>

              {/* Nova Senha */}
              <div className="password-field-group">
                <label>Nova Senha</label>
                <div className={`password-input-wrapper ${passwordErrors.newPassword ? 'error' : ''}`}>
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="Digite sua nova senha"
                    disabled={isSaving}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('new')}
                    disabled={isSaving}
                  >
                    {showPasswords.new ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <span className="password-error">{passwordErrors.newPassword}</span>
                )}
                
                {/* Indicador de Força da Senha */}
                {passwordData.newPassword && !passwordErrors.newPassword && (
                  <div className="password-strength">
                    <div className="password-strength-bars">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`password-strength-bar ${
                            level <= getPasswordStrength(passwordData.newPassword).level ? 'active' : ''
                          }`}
                          style={{
                            backgroundColor: level <= getPasswordStrength(passwordData.newPassword).level
                              ? getPasswordStrength(passwordData.newPassword).color
                              : '#e0e0e0'
                          }}
                        />
                      ))}
                    </div>
                    <span 
                      className="password-strength-label"
                      style={{ color: getPasswordStrength(passwordData.newPassword).color }}
                    >
                      {getPasswordStrength(passwordData.newPassword).label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirmar Nova Senha */}
              <div className="password-field-group">
                <label>Confirmar Nova Senha</label>
                <div className={`password-input-wrapper ${passwordErrors.confirmPassword ? 'error' : ''}`}>
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="Digite novamente sua nova senha"
                    disabled={isSaving}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('confirm')}
                    disabled={isSaving}
                  >
                    {showPasswords.confirm ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <span className="password-error">{passwordErrors.confirmPassword}</span>
                )}
                
                {/* Confirmação Visual */}
                {passwordData.confirmPassword && 
                 passwordData.newPassword === passwordData.confirmPassword && 
                 !passwordErrors.confirmPassword && (
                  <div className="password-match-indicator">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>As senhas coincidem</span>
                  </div>
                )}
              </div>

              {/* Requisitos de Senha */}
              <div className="password-requirements">
                <h4>Requisitos da senha:</h4>
                <ul>
                  <li className={passwordData.newPassword.length >= 8 ? 'valid' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Mínimo de 8 caracteres
                  </li>
                  <li className={/[A-Z]/.test(passwordData.newPassword) ? 'valid' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Pelo menos uma letra maiúscula
                  </li>
                  <li className={/[a-z]/.test(passwordData.newPassword) ? 'valid' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Pelo menos uma letra minúscula
                  </li>
                  <li className={/[0-9]/.test(passwordData.newPassword) ? 'valid' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Pelo menos um número
                  </li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword) ? 'valid' : ''}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Pelo menos um caractere especial
                  </li>
                </ul>
              </div>
            </div>

            <div className="password-modal-footer">
              <button
                className="password-modal-cancel"
                onClick={handleClosePasswordModal}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                className="password-modal-confirm"
                onClick={handleChangePassword}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="spinner-small"></div>
                    Alterando...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Alterar Senha
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Perfil;