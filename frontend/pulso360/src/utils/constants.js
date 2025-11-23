/**
 * Constantes globais da aplicação
 */

// API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = 30000; // 30 segundos

// Autenticação
export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'auth_user';
export const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 horas

// Paginação
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 25, 50, 100];

// Status
export const USER_STATUS = {
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
  SUSPENDED: 'suspenso'
};

export const EVALUATION_STATUS = {
  PENDING: 'pendente',
  IN_PROGRESS: 'em_andamento',
  COMPLETED: 'concluido',
  CANCELLED: 'cancelado'
};

export const PDI_STATUS = {
  NOT_STARTED: 'nao_iniciado',
  IN_PROGRESS: 'em_andamento',
  COMPLETED: 'concluido',
  CANCELLED: 'cancelado'
};

// Prioridades
export const PRIORITY_LEVELS = {
  LOW: 'baixa',
  MEDIUM: 'media',
  HIGH: 'alta',
  CRITICAL: 'critica'
};

export const PRIORITY_COLORS = {
  baixa: '#00b894',
  media: '#fdcb6e',
  alta: '#e17055',
  critica: '#d63031'
};

// Roles e Permissões
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'gestor',
  EMPLOYEE: 'colaborador'
};

export const PERMISSIONS = {
  READ: 'leitura',
  CREATE: 'criar',
  UPDATE: 'editar',
  DELETE: 'deletar'
};

// Mensagens
export const MESSAGES = {
  SUCCESS: 'Operação realizada com sucesso!',
  ERROR: 'Ocorreu um erro. Tente novamente.',
  LOADING: 'Carregando...',
  NO_DATA: 'Nenhum dado encontrado.',
  CONFIRM_DELETE: 'Tem certeza que deseja deletar?',
  CONFIRM_ACTION: 'Tem certeza que deseja continuar?'
};

// Validação
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500
};

// Cores
export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SUCCESS: '#00b894',
  WARNING: '#fdcb6e',
  DANGER: '#d63031',
  INFO: '#0984e3',
  LIGHT: '#f5f6fa',
  DARK: '#2d3436'
};

// Breakpoints responsivos
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440
};

// Timeouts
export const TIMEOUTS = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000
};

export default {
  API_BASE_URL,
  API_TIMEOUT,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  USER_STATUS,
  EVALUATION_STATUS,
  PRIORITY_LEVELS,
  USER_ROLES,
  PERMISSIONS,
  MESSAGES
};
