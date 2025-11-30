/**
 * Página de Login
 * Interface de autenticação com integração ao backend
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isAuthenticated, loginError } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Formulário de login submetido');
    
    // Validações básicas
    if (!email || !senha) {
      console.warn('⚠️ Email ou senha vazio');
      if (window.showNotification) {
        window.showNotification('Preencha email e senha', 'warning');
      } else {
        alert('Preencha email e senha');
      }
      return;
    }

    console.log('✅ Validação passou, iniciando login...');
    setIsLoading(true);
    
    try {
      console.log('📞 Chamando função login do AuthContext...');
      const success = await login(email, senha);
      
      console.log('🎯 Resultado do login:', success);
      
      if (success) {
        console.log('✅ Login bem-sucedido, redirecionando para home...');
        navigate('/');
      } else {
        console.log('❌ Login falhou');
      }
    } catch (error) {
      console.error('💥 Erro ao fazer login:', error);
      if (window.showNotification) {
        window.showNotification('Erro ao fazer login', 'error');
      } else {
        alert('Erro ao fazer login');
      }
    } finally {
      setIsLoading(false);
      console.log('🏁 Processo de login finalizado');
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          {/* Logo e Header */}
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">📊</div>
              <h1 className="logo-text">Pulso360</h1>
            </div>
            <p className="login-subtitle">
              Gestão de Pessoas e Desempenho
            </p>
          </div>

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="login-form">
            {loginError && (
              <div className="login-error" role="alert" style={{
                background:'#ffefef',
                border:'1px solid #e0b4b4',
                color:'#912d2b',
                padding:'8px 12px',
                borderRadius:'4px',
                marginBottom:'12px',
                fontSize:'0.9rem'
              }}>
                {loginError}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
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
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <Link to="/recuperar-senha" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Entrando...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Entrar
                </>
              )}
            </button>
          </form>

          {/* Informações adicionais */}
          <div className="login-footer">
            <p className="help-text">
              Não tem uma conta? <Link to="/cadastro">Criar conta</Link>
            </p>
            <div className="demo-info">
              <p className="demo-title">🎯 Demonstração:</p>
              <p className="demo-text">
                Use qualquer email válido para testar o sistema
              </p>
            </div>
          </div>
        </div>

        {/* Informações do Sistema */}
        <div className="login-info">
          <div className="info-card">
            <span className="info-icon">📊</span>
            <h3>Avaliações 360°</h3>
            <p>Sistema completo de avaliação de desempenho</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🎯</span>
            <h3>PDI Personalizado</h3>
            <p>Plano de desenvolvimento individual customizado</p>
          </div>
          <div className="info-card">
            <span className="info-icon">👥</span>
            <h3>Gestão de Equipes</h3>
            <p>Gerencie suas equipes de forma eficiente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
