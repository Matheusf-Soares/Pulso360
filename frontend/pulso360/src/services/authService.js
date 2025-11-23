/**
 * Service para autenticação de usuários
 */

import apiClient from './apiClient';

const authService = {
  /**
   * Realizar login
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise} Token de acesso e informações do usuário
   */
  async login(email, senha) {
    console.log('🔐 Tentando fazer login com:', email);
    
    try {
      // Autenticar no backend
      const response = await apiClient.post('/auth/login', { email, senha });
      
      console.log('✅ Login bem-sucedido:', response.data);
      
      // Salvar token no localStorage
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao fazer login:', error);
      
      // Propagar erro para o componente tratar
      throw error;
    }
  },

  /**
   * Realizar logout
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  /**
   * Verificar se usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Obter usuário atual do localStorage
   * @returns {Object|null}
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Obter token de acesso
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('access_token');
  },
};

export default authService;
