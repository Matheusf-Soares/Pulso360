import apiClient from './apiClient';

/**
 * Serviço para gerenciamento de Membros de Equipe
 * Endpoints: /api/v1/membros-equipe
 */

/**
 * Lista todos os membros de equipe com filtros opcionais
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.equipe_id - ID da equipe
 * @param {string} params.usuario_id - ID do usuário
 * @param {number} params.page - Número da página (padrão: 1)
 * @param {number} params.size - Tamanho da página (padrão: 50)
 * @returns {Promise<Object>} Lista paginada de membros
 */
const list = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.equipe_id) queryParams.append('equipe_id', params.equipe_id);
  if (params.usuario_id) queryParams.append('usuario_id', params.usuario_id);
  if (params.page) queryParams.append('page', params.page);
  if (params.size) queryParams.append('size', params.size);

  const query = queryParams.toString();
  const url = query ? `/membros-equipe?${query}` : '/membros-equipe';
  
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Busca um membro específico por IDs de equipe e usuário
 * @param {string} equipeId - ID da equipe
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Dados do membro
 */
const getById = async (equipeId, usuarioId) => {
  const response = await apiClient.get(`/membros-equipe/${equipeId}/${usuarioId}`);
  return response.data;
};

/**
 * Adiciona um membro a uma equipe
 * @param {Object} membroData - Dados do membro
 * @param {string} membroData.equipe_id - ID da equipe (UUID)
 * @param {string} membroData.usuario_id - ID do usuário (UUID)
 * @param {boolean} membroData.e_lider - Se é líder da equipe (padrão: false)
 * @returns {Promise<Object>} Membro criado
 */
const create = async (membroData) => {
  const response = await apiClient.post('/membros-equipe', membroData);
  return response.data;
};

/**
 * Atualiza um membro existente
 * @param {string} equipeId - ID da equipe
 * @param {string} usuarioId - ID do usuário
 * @param {Object} membroData - Dados para atualização
 * @returns {Promise<Object>} Membro atualizado
 */
const update = async (equipeId, usuarioId, membroData) => {
  const response = await apiClient.put(`/membros-equipe/${equipeId}/${usuarioId}`, membroData);
  return response.data;
};

/**
 * Remove um membro de uma equipe
 * @param {string} equipeId - ID da equipe
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<void>}
 */
const deleteMembro = async (equipeId, usuarioId) => {
  await apiClient.delete(`/membros-equipe/${equipeId}/${usuarioId}`);
};

/**
 * Busca todos os membros de uma equipe
 * @param {string} equipeId - ID da equipe
 * @returns {Promise<Object>} Lista de membros da equipe
 */
const getByEquipe = async (equipeId) => {
  return await list({ equipe_id: equipeId, size: 100 });
};

/**
 * Busca todas as equipes de um usuário
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Lista de equipes do usuário
 */
const getByUsuario = async (usuarioId) => {
  return await list({ usuario_id: usuarioId, size: 100 });
};

/**
 * Promove um membro a líder da equipe
 * @param {string} equipeId - ID da equipe
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Membro atualizado
 */
const promoverLider = async (equipeId, usuarioId) => {
  return await update(equipeId, usuarioId, { e_lider: true });
};

/**
 * Remove a liderança de um membro
 * @param {string} equipeId - ID da equipe
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Membro atualizado
 */
const removerLider = async (equipeId, usuarioId) => {
  return await update(equipeId, usuarioId, { e_lider: false });
};

const membroEquipeService = {
  list,
  getById,
  create,
  update,
  delete: deleteMembro,
  getByEquipe,
  getByUsuario,
  promoverLider,
  removerLider
};

export default membroEquipeService;
