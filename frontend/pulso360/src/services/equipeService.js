/**
 * Service para gerenciamento de equipes
 * Consome endpoints da API de equipes conforme OpenAPI
 */

import apiClient from './apiClient';

const equipeService = {
  /**
   * Criar nova equipe
   * @param {Object} equipeData - Dados da equipe (nome, descricao, lider_id)
   * @returns {Promise}
   */
  async criar(equipeData) {
    const response = await apiClient.post('/equipes', equipeData);
    return response.data;
  },

  /**
   * Listar equipes com paginação e filtros
   * @param {Object} filtros - Filtros opcionais
   * @param {number} page - Número da página
   * @param {number} size - Tamanho da página
   * @returns {Promise}
   */
  async listar(filtros = {}, page = 1, size = 50) {
    const params = {
      ...filtros,
      page,
      size,
    };
    const response = await apiClient.get('/equipes', { params });
    return response.data;
  },

  /**
   * Obter equipe por ID
   * @param {string} id - ID da equipe
   * @returns {Promise}
   */
  async obterPorId(id) {
    const response = await apiClient.get(`/equipes/${id}`);
    return response.data;
  },

  /**
   * Atualizar equipe
   * @param {string} id - ID da equipe
   * @param {Object} equipeData - Dados para atualizar
   * @returns {Promise}
   */
  async atualizar(id, equipeData) {
    const response = await apiClient.put(`/equipes/${id}`, equipeData);
    return response.data;
  },

  /**
   * Remover equipe
   * @param {string} id - ID da equipe
   * @returns {Promise}
   */
  async remover(id) {
    await apiClient.delete(`/equipes/${id}`);
  },

  /**
   * Adicionar membro à equipe
   * @param {Object} membroData - Dados do membro (equipe_id, usuario_id, papel)
   * @returns {Promise}
   */
  async adicionarMembro(membroData) {
    const response = await apiClient.post('/membros_equipe', membroData);
    return response.data;
  },

  /**
   * Remover membro da equipe
   * @param {string} equipeId - ID da equipe
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise}
   */
  async removerMembro(equipeId, usuarioId) {
    await apiClient.delete(`/membros_equipe/${equipeId}/${usuarioId}`);
  },

  /**
   * Listar membros de uma equipe
   * @param {Object} filtros - Filtros (equipe_id obrigatório)
   * @returns {Promise}
   */
  async listarMembros(filtros = {}) {
    const response = await apiClient.get('/membros_equipe', { params: filtros });
    return response.data;
  },
};

export default equipeService;
