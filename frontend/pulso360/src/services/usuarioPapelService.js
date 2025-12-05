import apiClient from './apiClient';

/**
 * Serviço para gerenciamento de Usuário-Papéis (Atribuição de Roles)
 * Endpoints: /api/v1/usuario-papeis
 */

/**
 * Lista todas as atribuições de papéis com filtros opcionais
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.usuario_id - ID do usuário
 * @param {string} params.papel_id - ID do papel
 * @param {number} params.page - Número da página (padrão: 1)
 * @param {number} params.size - Tamanho da página (padrão: 50)
 * @returns {Promise<Object>} Lista paginada de atribuições
 */
const list = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.usuario_id) queryParams.append('usuario_id', params.usuario_id);
  if (params.papel_id) queryParams.append('papel_id', params.papel_id);
  if (params.page) queryParams.append('page', params.page);
  if (params.size) queryParams.append('size', params.size);

  const query = queryParams.toString();
  const url = query ? `/usuario-papeis?${query}` : '/usuario-papeis';
  
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Busca uma atribuição específica por ID
 * @param {string} id - ID da atribuição
 * @returns {Promise<Object>} Dados da atribuição
 */
const getById = async (id) => {
  const response = await apiClient.get(`/usuario-papeis/${id}`);
  return response.data;
};

/**
 * Atribui um papel a um usuário
 * @param {Object} atribuicaoData - Dados da atribuição
 * @param {string} atribuicaoData.usuario_id - ID do usuário (UUID)
 * @param {string} atribuicaoData.papel_id - ID do papel (UUID)
 * @returns {Promise<Object>} Atribuição criada
 */
const create = async (atribuicaoData) => {
  const response = await apiClient.post('/usuario-papeis', atribuicaoData);
  return response.data;
};

/**
 * Remove um papel de um usuário
 * @param {string} id - ID da atribuição
 * @returns {Promise<void>}
 */
const deleteAtribuicao = async (id) => {
  await apiClient.delete(`/usuario-papeis/${id}`);
};

/**
 * Busca todos os papéis de um usuário
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Lista de papéis do usuário
 */
const getByUsuario = async (usuarioId) => {
  return await list({ usuario_id: usuarioId, size: 100 });
};

/**
 * Busca todos os usuários com um determinado papel
 * @param {string} papelId - ID do papel
 * @returns {Promise<Object>} Lista de usuários com o papel
 */
const getByPapel = async (papelId) => {
  return await list({ papel_id: papelId, size: 100 });
};

const usuarioPapelService = {
  list,
  getById,
  create,
  delete: deleteAtribuicao,
  getByUsuario,
  getByPapel
};

export default usuarioPapelService;
