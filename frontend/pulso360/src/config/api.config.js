/**
 * Configuração centralizada da API
 */

const API_CONFIG = {
  // URL base do backend - altere conforme seu ambiente
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  
  // Versão da API
  API_VERSION: '/api/v1',
  
  // Timeout padrão para requisições (30 segundos)
  TIMEOUT: 30000,
  
  // Headers padrão
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// URL completa da API
export const API_BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}`;

export default API_CONFIG;
