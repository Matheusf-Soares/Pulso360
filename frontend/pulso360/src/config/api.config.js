/**
 * Configuração centralizada da API
 */

const API_CONFIG = {
  // URL base do backend - altere conforme seu ambiente
  // Em desenvolvimento, por padrão usamos caminho relativo ('') para permitir mocks via Service Worker.
  BASE_URL: process.env.REACT_APP_API_URL !== undefined
    ? process.env.REACT_APP_API_URL
    : (process.env.NODE_ENV === 'development' ? '' : 'http://localhost:8000'),
  
  // Versão da API configurável via .env
  API_VERSION: process.env.REACT_APP_API_VERSION || '/api/v1',
  
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
