/**
 * Página de Cadastro de Novo Usuário
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usuarioService } from '../services';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cargo: '',
    senioridade: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const senioridades = [
    { value: '', label: 'Selecione...' },
    { value: 'Estagiário', label: 'Estagiário' },
    { value: 'Júnior', label: 'Júnior' },
    { value: 'Pleno', label: 'Pleno' },
    { value: 'Sênior', label: 'Sênior' },
    { value: 'Especialista', label: 'Especialista' },
    { value: 'Líder', label: 'Líder' },
    { value: 'Gerente', label: 'Gerente' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validar confirmação de senha
    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirme sua senha';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    // Validar cargo
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'Cargo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Formulário de cadastro submetido');
    
    if (!validateForm()) {
      console.warn('⚠️ Validação do formulário falhou');
      if (window.showNotification) {
        window.showNotification('Por favor, corrija os erros no formulário', 'warning');
      } else {
        alert('Por favor, corrija os erros no formulário');
      }
      return;
    }

    console.log('✅ Validação passou, criando usuário...');
    setIsLoading(true);
    
    try {
      // Preparar dados para envio (sem confirmarSenha)
      const { confirmarSenha, ...userData } = formData;
      
      console.log('📞 Chamando usuarioService.criar...');
      const novoUsuario = await usuarioService.criar(userData);
      
      console.log('✅ Usuário criado com sucesso:', novoUsuario);
      
      if (window.showNotification) {
        window.showNotification('Cadastro realizado com sucesso! Faça login para continuar.', 'success');
      } else {
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
      }
      
      // Redirecionar para login após 1.5 segundos
      console.log('⏳ Redirecionando para login em 1.5s...');
      setTimeout(() => {
        console.log('🔀 Redirecionando para /login');
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error);
      console.error('📋 Detalhes do erro:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });
      
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      // Verificar se é erro de rede (backend offline)
      if (error.code === 'ERR_NETWORK' || !error.response) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
      } else if (error.response?.data?.detail) {
        // Erro retornado pelo backend
        if (Array.isArray(error.response.data.detail)) {
          // Erros de validação do Pydantic
          const erros = error.response.data.detail.map(e => e.msg).join(', ');
          errorMessage = `Erro de validação: ${erros}`;
        } else {
          errorMessage = error.response.data.detail;
        }
      } else if (error.response?.status === 400) {
        errorMessage = 'Email já cadastrado ou dados inválidos';
      } else if (error.response?.status === 422) {
        errorMessage = 'Dados inválidos. Verifique todos os campos.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Contate o administrador.';
      }
      
      console.error('💬 Mensagem de erro para usuário:', errorMessage);
      
      if (window.showNotification) {
        window.showNotification(errorMessage, 'error');
      } else {
        alert(errorMessage);
      }
    } finally {
      setIsLoading(false);
      console.log('🏁 Processo de cadastro finalizado');
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="login-content">
        <div className="login-card cadastro-card">
          {/* Logo e Header */}
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">📊</div>
              <h1 className="logo-text">Pulso360</h1>
            </div>
            <h2 className="cadastro-title">Criar Conta</h2>
            <p className="login-subtitle">
              Preencha seus dados para começar
            </p>
          </div>

          {/* Formulário de Cadastro */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo *</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={errors.nome ? 'input-error' : ''}
                />
              </div>
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Corporativo *</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="email"
                  className={errors.email ? 'input-error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cargo">Cargo *</label>
                <div className="input-wrapper">
                  <span className="input-icon">💼</span>
                  <input
                    id="cargo"
                    name="cargo"
                    type="text"
                    placeholder="Ex: Desenvolvedor"
                    value={formData.cargo}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={errors.cargo ? 'input-error' : ''}
                  />
                </div>
                {errors.cargo && <span className="error-message">{errors.cargo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="senioridade">Senioridade</label>
                <div className="input-wrapper">
                  <span className="input-icon">📊</span>
                  <select
                    id="senioridade"
                    name="senioridade"
                    value={formData.senioridade}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    {senioridades.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha *</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className={errors.senha ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.senha && <span className="error-message">{errors.senha}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha *</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Digite a senha novamente"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className={errors.confirmarSenha ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha}</span>}
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Criando conta...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Criar Conta
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="help-text">
              Já tem uma conta? <Link to="/login">Fazer login</Link>
            </p>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="login-info">
          <div className="info-card">
            <span className="info-icon">🎯</span>
            <h3>Bem-vindo ao Pulso360</h3>
            <p>Sistema completo de gestão de pessoas e desempenho</p>
          </div>
          <div className="info-card">
            <span className="info-icon">✨</span>
            <h3>Rápido e Fácil</h3>
            <p>Cadastro simples em menos de 2 minutos</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🔒</span>
            <h3>Seguro e Confiável</h3>
            <p>Seus dados protegidos com criptografia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
