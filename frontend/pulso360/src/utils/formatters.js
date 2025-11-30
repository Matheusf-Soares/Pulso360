/**
 * Funções auxiliares de formatação e manipulação de dados
 */

/**
 * Formatar data para formato brasileiro
 * @param {Date|String} date
 * @returns {String} - Data formatada (DD/MM/YYYY)
 */
export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatar data e hora
 * @param {Date|String} date
 * @returns {String} - Data e hora formatada (DD/MM/YYYY HH:MM)
 */
export const formatDateTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Formatar moeda
 * @param {Number} value
 * @param {String} currency - Código da moeda (padrão: BRL)
 * @returns {String} - Valor formatado
 */
export const formatCurrency = (value, currency = 'BRL') => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(value);
};

/**
 * Formatar número
 * @param {Number} value
 * @param {Number} decimals - Casas decimais
 * @returns {String}
 */
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

/**
 * Formatar percentual
 * @param {Number} value
 * @param {Number} decimals - Casas decimais
 * @returns {String}
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined) return '-';
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Formatar nome completo (capitalizar)
 * @param {String} name
 * @returns {String}
 */
export const formatName = (name) => {
  if (!name) return '-';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formatar telefone
 * @param {String} phone
 * @returns {String} - Telefone formatado (XX) XXXXX-XXXX
 */
export const formatPhone = (phone) => {
  if (!phone) return '-';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};

/**
 * Formatar CPF
 * @param {String} cpf
 * @returns {String} - CPF formatado (XXX.XXX.XXX-XX)
 */
export const formatCPF = (cpf) => {
  if (!cpf) return '-';
  const cleaned = cpf.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  return match ? `${match[1]}.${match[2]}.${match[3]}-${match[4]}` : cpf;
};

/**
 * Truncar texto
 * @param {String} text
 * @param {Number} maxLength
 * @param {String} suffix - Sufixo (padrão: '...')
 * @returns {String}
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};

/**
 * Capitalizar primeira letra
 * @param {String} text
 * @returns {String}
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Converter para slug
 * @param {String} text
 * @returns {String}
 */
export const toSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Tempo relativo simples (ex.: "há 2h", "há 3d")
 * @param {Date|String} date
 * @returns {String}
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'agora';
  const min = Math.floor(sec / 60);
  if (min < 60) return `há ${min}m`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `há ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `há ${days}d`;
};

export default {
  formatDate,
  formatDateTime,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatName,
  formatPhone,
  formatCPF,
  truncateText,
  capitalize,
  toSlug
};
