/**
 * Cliente HTTP configurado com Axios
 * Centraliza todas as requisições para o backend
 */

import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

// Criar instância do axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição - adiciona token JWT automaticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta - trata erros globalmente
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('🔴 Erro na requisição:', error.message, error.code);
    
    // Se o token expirou (401), limpar localStorage e redirecionar para login
    if (error.response?.status === 401) {
      console.log('🔒 Token expirado ou inválido, fazendo logout');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Redirecionar para login apenas se não estiver já na página de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Se o backend não está disponível, não mostrar erro
    if (error.code === 'ERR_NETWORK' || !error.response) {
      console.warn('⚠️ Backend não disponível - modo offline');
      // Não mostrar notificação de erro para facilitar desenvolvimento
      return Promise.reject(error);
    }

    // Tratar outros erros
    const errorMessage = error.response?.data?.detail || error.message || 'Erro desconhecido';
    
    // Exibir notificação apenas para erros reais do servidor
    if (error.response && error.response.status !== 404) {
      if (window.showNotification) {
        window.showNotification(errorMessage, 'error');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
