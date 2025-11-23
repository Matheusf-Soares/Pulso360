/**
 * Página de Recuperação de Senha
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      if (window.showNotification) {
        window.showNotification('Por favor, informe seu email', 'warning');
      }
      return;
    }

    // Validar formato do email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (window.showNotification) {
        window.showNotification('Email inválido', 'error');
      }
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implementar endpoint de recuperação de senha no backend
      // await apiClient.post('/auth/recuperar-senha', { email });
      
      // Simulação de sucesso
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailEnviado(true);
      
      if (window.showNotification) {
        window.showNotification(
          'Instruções enviadas para seu email!', 
          'success'
        );
      }
      
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      
      if (window.showNotification) {
        window.showNotification(
          error.response?.data?.detail || 'Erro ao enviar email. Tente novamente.',
          'error'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="login-content single-card">
        <div className="login-card recuperar-senha-card">
          {/* Logo e Header */}
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">📊</div>
              <h1 className="logo-text">Pulso360</h1>
            </div>
            <h2 className="cadastro-title">
              {emailEnviado ? '✅ Email Enviado!' : '🔑 Recuperar Senha'}
            </h2>
            <p className="login-subtitle">
              {emailEnviado 
                ? 'Verifique sua caixa de entrada'
                : 'Informe seu email para recuperar o acesso'
              }
            </p>
          </div>

          {!emailEnviado ? (
            <>
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="login-form">
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
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span>📨</span>
                      Enviar Instruções
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="login-footer">
                <p className="help-text">
                  Lembrou a senha? <Link to="/login">Fazer login</Link>
                </p>
                <p className="help-text">
                  Não tem conta? <Link to="/cadastro">Criar conta</Link>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Mensagem de sucesso */}
              <div className="success-message-box">
                <div className="success-icon">📧</div>
                <h3>Verifique seu email</h3>
                <p>
                  Enviamos instruções de recuperação de senha para:
                </p>
                <p className="email-sent-to">
                  <strong>{email}</strong>
                </p>
                <div className="success-instructions">
                  <p>📝 Siga os passos enviados por email</p>
                  <p>⏱️ O link expira em 24 horas</p>
                  <p>📬 Verifique também a pasta de spam</p>
                </div>
              </div>

              <div className="success-actions">
                <Link to="/login" className="btn-login">
                  <span>🔐</span>
                  Voltar para Login
                </Link>
                
                <button 
                  className="btn-secondary-outline"
                  onClick={() => {
                    setEmailEnviado(false);
                    setEmail('');
                  }}
                >
                  <span>🔄</span>
                  Enviar Novamente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecuperarSenha;
