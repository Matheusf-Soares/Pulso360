/**
 * Context de Autenticação
 * Gerencia o estado de autenticação global da aplicação
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Adicionando hook para navegação
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState(null); // guarda última mensagem de erro de login

  // Verificar autenticação ao carregar a aplicação
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log('🔍 AuthContext: Verificando autenticação...');
        const authenticated = authService.isAuthenticated();
        const currentUser = authService.getCurrentUser();
        
        console.log('🔍 Autenticado:', authenticated);
        console.log('🔍 Usuário atual:', currentUser);
        
        setIsAuthenticated(authenticated);
        setUser(currentUser);
      } catch (error) {
        console.error('❌ Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Realizar login
   * @param {string} email 
   * @param {string} senha 
   * @returns {Promise<boolean>} Sucesso do login
   */
  const login = async (email, senha) => {
    console.log('🔐 Tentando login com:', { email, senha }); // Log das credenciais enviadas

    // Adicionando lógica para permitir login offline para o usuário admin
    if (email === 'admin@pulso360.local' && senha === 'admin') {
        console.log('✅ Login offline permitido para admin');
        setUser({
            id: 999,
            nome: 'Administrador Teste',
            email: 'admin@pulso360.local',
            cargo: 'Administrador',
            senioridade: 'Diretoria',
            foto_url: '',
            departamento: 'Administração',
            telefone: '11 90000-0000',
            data_admissao: '2019-01-01',
            salario: '0',
            endereco: { rua: 'Sede', cidade: 'Remoto' },
            configuracoes: { theme: 'dark', receiveEmails: true }
        });
        setIsAuthenticated(true);
        return true;
    }

    try {
      setIsLoading(true);
      console.log('📞 Enviando requisição para o serviço de autenticação...');

      const response = await authService.login(email, senha);

      console.log('✅ Resposta do serviço de autenticação:', response);
      console.log('👤 Usuário autenticado:', response.user);

      setUser(response.user);
      setIsAuthenticated(true);
      setLoginError(null); // limpa erro anterior

      if (window.showNotification) {
        window.showNotification(`Bem-vindo(a), ${response.user.nome}!`, 'success');
      }

      navigate('/'); // Redirecionar para a página inicial

      return true;
    } catch (error) {
      console.error('❌ Erro ao tentar login:', error);
      const detail = error.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.';
      setLoginError(detail);
      if (window.showNotification) {
        window.showNotification(detail, 'error');
      }
      return false;
    } finally {
      setIsLoading(false);
      console.log('🏁 Processo de login finalizado.');
    }
  };

  /**
   * Realizar logout
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    
    if (window.showNotification) {
      window.showNotification('Você saiu da aplicação', 'info');
    }
  };

  /**
   * Atualizar dados do usuário
   * @param {Object} updatedUser 
   */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * Função para lidar com o envio do formulário de login
   * @param {Event} event 
   */
  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário

    const email = event.target.email.value;
    const senha = event.target.senha.value;

    const success = await login(email, senha);
    if (!success) {
      console.error('❌ Falha no login');
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    handleLoginSubmit, // Adicionando handleLoginSubmit ao contexto
    loginError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar o contexto de autenticação
 * @returns {Object} Contexto de autenticação
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

export default AuthContext;
