import apiClient from './apiClient';

/**
 * Serviço para gerenciar itens de avaliação
 */
const itemAvaliacaoService = {
  /**
   * Lista todos os itens de uma avaliação específica
   * @param {string} avaliacaoId - ID da avaliação
   * @returns {Promise<Array>} Lista de itens da avaliação
   */
  async listByAvaliacao(avaliacaoId) {
    try {
      const response = await apiClient.get(`/itens-avaliacao/avaliacao/${avaliacaoId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar itens da avaliação:', error);
      throw error;
    }
  },

  /**
   * Cria um novo item de avaliação
   * @param {Object} itemData - Dados do item
   * @param {string} itemData.avaliacao_id - ID da avaliação
   * @param {string} itemData.competencia_id - ID da competência
   * @param {number} itemData.nota - Nota (1-5)
   * @param {string} itemData.comentario - Comentário opcional
   * @returns {Promise<Object>} Item criado
   */
  async create(itemData) {
    try {
      const response = await apiClient.post('/itens-avaliacao', itemData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar item de avaliação:', error);
      throw error;
    }
  },

  /**
   * Atualiza um item de avaliação existente
   * @param {string} itemId - ID do item
   * @param {Object} itemData - Dados a atualizar
   * @returns {Promise<Object>} Item atualizado
   */
  async update(itemId, itemData) {
    try {
      const response = await apiClient.put(`/itens-avaliacao/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar item de avaliação:', error);
      throw error;
    }
  },

  /**
   * Obtém um item específico por ID
   * @param {string} itemId - ID do item
   * @returns {Promise<Object>} Item encontrado
   */
  async getById(itemId) {
    try {
      const response = await apiClient.get(`/itens-avaliacao/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar item de avaliação:', error);
      throw error;
    }
  },

  /**
   * Remove um item de avaliação
   * @param {string} itemId - ID do item
   * @returns {Promise<void>}
   */
  async delete(itemId) {
    try {
      await apiClient.delete(`/itens-avaliacao/${itemId}`);
    } catch (error) {
      console.error('Erro ao remover item de avaliação:', error);
      throw error;
    }
  },

  /**
   * Cria ou atualiza um item de avaliação
   * Se o item já existe (tem id), atualiza; caso contrário, cria
   * @param {Object} itemData - Dados do item
   * @returns {Promise<Object>} Item criado ou atualizado
   */
  async createOrUpdate(itemData) {
    if (itemData.id) {
      return await this.update(itemData.id, itemData);
    } else {
      return await this.create(itemData);
    }
  }
};

export default itemAvaliacaoService;
