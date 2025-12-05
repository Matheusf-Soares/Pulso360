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
  async create(equipeData) {
    const response = await apiClient.post('/equipes', equipeData);
    return response.data;
  },

  /**
   * Listar equipes com paginação e filtros
   * @param {Object} filtros - Filtros opcionais (lider_id, nome, etc)
   * @param {number} page - Número da página
   * @param {number} size - Tamanho da página
   * @returns {Promise}
   */
  async list(filtros = {}, page = 1, size = 50) {
    const queryParams = new URLSearchParams();
    
    // Adicionar filtros
    if (filtros.lider_id) queryParams.append('lider_id', filtros.lider_id);
    if (filtros.nome) queryParams.append('nome', filtros.nome);
    if (filtros.ativo !== undefined) queryParams.append('ativo', filtros.ativo);
    
    // Paginação
    queryParams.append('page', page);
    queryParams.append('size', size);

    const query = queryParams.toString();
    const url = query ? `/equipes?${query}` : '/equipes';
    
    const response = await apiClient.get(url);
    return response.data;
  },

  /**
   * Obter equipe por ID
   * @param {string} id - ID da equipe
   * @returns {Promise}
   */
  async getById(id) {
    const response = await apiClient.get(`/equipes/${id}`);
    return response.data;
  },

  /**
   * Atualizar equipe
   * @param {string} id - ID da equipe
   * @param {Object} equipeData - Dados para atualizar
   * @returns {Promise}
   */
  async update(id, equipeData) {
    const response = await apiClient.put(`/equipes/${id}`, equipeData);
    return response.data;
  },

  /**
   * Remover equipe
   * @param {string} id - ID da equipe
   * @returns {Promise}
   */
  async delete(id) {
    await apiClient.delete(`/equipes/${id}`);
  },
};

export default equipeService;
