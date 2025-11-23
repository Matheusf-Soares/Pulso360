/**
 * Service para gerenciamento de ciclos de avaliação
 * Consome endpoints da API de ciclos conforme OpenAPI
 */

import apiClient from './apiClient';

const cicloAvaliacaoService = {
  /**
   * Criar novo ciclo de avaliação
   * @param {Object} cicloData - Dados do ciclo (nome, periodo_inicio, periodo_fim, status)
   * @returns {Promise}
   */
  async criar(cicloData) {
    const response = await apiClient.post('/ciclos_avaliacao', cicloData);
    return response.data;
  },

  /**
   * Listar ciclos de avaliação com paginação e filtros
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
    const response = await apiClient.get('/ciclos_avaliacao', { params });
    return response.data;
  },

  /**
   * Obter ciclo por ID
   * @param {string} id - ID do ciclo
   * @returns {Promise}
   */
  async obterPorId(id) {
    const response = await apiClient.get(`/ciclos_avaliacao/${id}`);
    return response.data;
  },

  /**
   * Atualizar ciclo
   * @param {string} id - ID do ciclo
   * @param {Object} cicloData - Dados para atualizar
   * @returns {Promise}
   */
  async atualizar(id, cicloData) {
    const response = await apiClient.put(`/ciclos_avaliacao/${id}`, cicloData);
    return response.data;
  },

  /**
   * Remover ciclo
   * @param {string} id - ID do ciclo
   * @returns {Promise}
   */
  async remover(id) {
    await apiClient.delete(`/ciclos_avaliacao/${id}`);
  },
};

export default cicloAvaliacaoService;
