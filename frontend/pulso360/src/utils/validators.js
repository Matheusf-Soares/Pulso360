/**
 * Validadores para formulários
 */

/**
 * Validar email
 * @param {String} email
 * @returns {String} - Mensagem de erro ou vazio se válido
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email é obrigatório';
  if (!regex.test(email)) return 'Email inválido';
  return '';
};

/**
 * Validar senha
 * @param {String} password
 * @returns {String} - Mensagem de erro ou vazio se válido
 */
export const validatePassword = (password) => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 6) return 'Senha deve ter no mínimo 6 caracteres';
  if (!/[A-Z]/.test(password)) return 'Senha deve conter pelo menos uma letra maiúscula';
  if (!/[0-9]/.test(password)) return 'Senha deve conter pelo menos um número';
  return '';
};

/**
 * Validar nome
 * @param {String} name
 * @returns {String} - Mensagem de erro ou vazio se válido
 */
export const validateName = (name) => {
  if (!name) return 'Nome é obrigatório';
  if (name.length < 3) return 'Nome deve ter no mínimo 3 caracteres';
  if (name.length > 100) return 'Nome deve ter no máximo 100 caracteres';
  return '';
};

/**
 * Validar URL
 * @param {String} url
 * @returns {String} - Mensagem de erro ou vazio se válido
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return '';
  } catch {
    return 'URL inválida';
  }
};

/**
 * Validar número de telefone
 * @param {String} phone
 * @returns {String} - Mensagem de erro ou vazio se válido
 */
export const validatePhone = (phone) => {
  const regex = /^\(?([0-9]{2})\)?[\s-]?([0-9]{4,5})[\s-]?([0-9]{4})$/;
  if (!phone) return 'Telefone é obrigatório';
  if (!regex.test(phone.replace(/\D/g, ''))) return 'Telefone inválido';
  return '';
};

/**
 * Validar CPF
 * @param {String} cpf
 * @returns {String} - Mensagem de erro ou vazio se válido
 */
export const validateCPF = (cpf) => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (!cleanCPF) return 'CPF é obrigatório';
  if (cleanCPF.length !== 11) return 'CPF deve ter 11 dígitos';
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return 'CPF inválido';
  
  // Validar dígitos verificadores
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return 'CPF inválido';
  
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return 'CPF inválido';
  
  return '';
};

/**
 * Validar objeto de formulário
 * @param {Object} values - Valores do formulário
 * @param {Object} rules - Regras de validação {campo: validador}
 * @returns {Object} - Objeto com erros
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const validator = rules[field];
    if (validator) {
      const error = validator(values[field]);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return errors;
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validateUrl,
  validatePhone,
  validateCPF,
  validateForm
};
