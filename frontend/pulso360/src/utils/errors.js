/**
 * Funções de erro e tratamento de exceções
 */

/**
 * Classe de erro personalizado
 */
export class AppError extends Error {
  constructor(message, code = 'ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Classe para erros de validação
 */
export class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Classe para erros de autenticação
 */
export class AuthenticationError extends AppError {
  constructor(message = 'Autenticação falhou') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Classe para erros de autorização
 */
export class AuthorizationError extends AppError {
  constructor(message = 'Acesso negado') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Classe para erros de requisição não encontrada
 */
export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Tratador de erro global
 * @param {Error} error
 * @returns {Object} - Objeto com informações do erro
 */
export const handleError = (error) => {
  let errorObj = {
    message: 'Ocorreu um erro desconhecido',
    code: 'UNKNOWN_ERROR',
    statusCode: 500
  };

  if (error instanceof AppError) {
    errorObj = {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      field: error.field
    };
  } else if (error instanceof TypeError) {
    errorObj = {
      message: 'Erro de tipo de dados',
      code: 'TYPE_ERROR',
      statusCode: 400
    };
  } else if (error instanceof ReferenceError) {
    errorObj = {
      message: 'Referência inválida',
      code: 'REFERENCE_ERROR',
      statusCode: 400
    };
  } else if (error.response) {
    // Erro de resposta HTTP
    errorObj = {
      message: error.response.data?.message || error.message,
      code: error.response.data?.code || 'HTTP_ERROR',
      statusCode: error.response.status
    };
  } else if (error.request) {
    // Erro na requisição
    errorObj = {
      message: 'Erro de conexão com o servidor',
      code: 'CONNECTION_ERROR',
      statusCode: 0
    };
  } else {
    // Outro tipo de erro
    errorObj.message = error.message || errorObj.message;
  }

  console.error('Erro tratado:', errorObj);
  return errorObj;
};

/**
 * Verificar se é erro de rede
 * @param {Error} error
 * @returns {Boolean}
 */
export const isNetworkError = (error) => {
  return error.request && !error.response;
};

/**
 * Verificar se é erro de validação
 * @param {Error} error
 * @returns {Boolean}
 */
export const isValidationError = (error) => {
  return error instanceof ValidationError || error.statusCode === 400;
};

/**
 * Verificar se é erro de autenticação
 * @param {Error} error
 * @returns {Boolean}
 */
export const isAuthenticationError = (error) => {
  return error instanceof AuthenticationError || error.statusCode === 401;
};

export default {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  handleError,
  isNetworkError,
  isValidationError,
  isAuthenticationError
};
