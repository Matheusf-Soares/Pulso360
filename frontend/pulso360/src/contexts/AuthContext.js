/**
 * Context de Autenticação
 * Gerencia o estado de autenticação global da aplicação
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    console.log('🔐 AuthContext: Iniciando login para', email);
    
    try {
      setIsLoading(true);
      console.log('📞 AuthContext: Chamando authService.login...');
      
      const response = await authService.login(email, senha);
      
      console.log('✅ AuthContext: Login bem-sucedido', response);
      console.log('👤 AuthContext: Dados do usuário recebido:', response.user);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log('✅ AuthContext: Estado atualizado');
      console.log('👤 AuthContext: user state agora é:', response.user);
      
      if (window.showNotification) {
        window.showNotification(`Bem-vindo(a), ${response.user.nome}!`, 'success');
      }
      
      console.log('✅ AuthContext: Estado atualizado, retornando true');
      return true;
    } catch (error) {
      console.error('❌ AuthContext: Erro no login:', error);
      
      if (window.showNotification) {
        window.showNotification(
          error.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.',
          'error'
        );
      }
      
      console.log('❌ AuthContext: Retornando false');
      return false;
    } finally {
      setIsLoading(false);
      console.log('🏁 AuthContext: Login finalizado');
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

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
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
