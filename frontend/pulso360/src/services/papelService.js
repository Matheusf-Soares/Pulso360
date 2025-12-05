import apiClient from './apiClient';

/**
 * Serviço para gerenciamento de Papéis (Roles)
 * Endpoints: /api/v1/papeis
 */

/**
 * Lista todos os papéis com filtros opcionais
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.nome - Nome do papel
 * @param {number} params.page - Número da página (padrão: 1)
 * @param {number} params.size - Tamanho da página (padrão: 50)
 * @returns {Promise<Object>} Lista paginada de papéis
 */
const list = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.nome) queryParams.append('nome', params.nome);
  if (params.page) queryParams.append('page', params.page);
  if (params.size) queryParams.append('size', params.size);

  const query = queryParams.toString();
  const url = query ? `/papeis?${query}` : '/papeis';
  
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Busca um papel específico por ID
 * @param {string} id - ID do papel
 * @returns {Promise<Object>} Dados do papel
 */
const getById = async (id) => {
  const response = await apiClient.get(`/papeis/${id}`);
  return response.data;
};

/**
 * Cria um novo papel
 * @param {Object} papelData - Dados do papel
 * @param {string} papelData.nome - Nome do papel
 * @param {string} papelData.descricao - Descrição do papel
 * @returns {Promise<Object>} Papel criado
 */
const create = async (papelData) => {
  const response = await apiClient.post('/papeis', papelData);
  return response.data;
};

/**
 * Atualiza um papel existente
 * @param {string} id - ID do papel
 * @param {Object} papelData - Dados para atualização
 * @returns {Promise<Object>} Papel atualizado
 */
const update = async (id, papelData) => {
  const response = await apiClient.put(`/papeis/${id}`, papelData);
  return response.data;
};

/**
 * Remove um papel
 * @param {string} id - ID do papel
 * @returns {Promise<void>}
 */
const deletePapel = async (id) => {
  await apiClient.delete(`/papeis/${id}`);
};

const papelService = {
  list,
  getById,
  create,
  update,
  delete: deletePapel
};

export default papelService;
