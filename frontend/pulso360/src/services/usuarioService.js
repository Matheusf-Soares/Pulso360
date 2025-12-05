/**
 * Service para gerenciamento de usuários
 * Consome endpoints da API de usuários conforme OpenAPI
 */

import apiClient from './apiClient';

const usuarioService = {
  /**
   * Criar novo usuário
   * @param {Object} userData - Dados do usuário (nome, email, senha, cargo, senioridade)
   * @returns {Promise}
   */
  async criar(userData) {
    console.log('📝 Criando usuário:', userData.email);
    
    try {
      const response = await apiClient.post('/usuarios', userData);
      console.log('✅ Usuário criado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao criar usuário:', error);
      throw error;
    }
  },

  /**
   * Listar usuários com paginação e filtros
   * @param {Object} filtros - Filtros opcionais (nome, email, ativo, etc.)
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
    const response = await apiClient.get('/usuarios', { params });
    return response.data;
  },

  /**
   * Obter usuário por ID
   * @param {string} id - ID do usuário
   * @returns {Promise}
   */
  async obterPorId(id) {
    const response = await apiClient.get(`/usuarios/${id}`);
    return response.data;
  },

  /**
   * Atualizar usuário
   * @param {string} id - ID do usuário
   * @param {Object} userData - Dados para atualizar
   * @returns {Promise}
   */
  async atualizar(id, userData) {
    const response = await apiClient.put(`/usuarios/${id}`, userData);
    return response.data;
  },

  /**
   * Remover usuário
   * @param {string} id - ID do usuário
   * @returns {Promise}
   */
  async remover(id) {
    await apiClient.delete(`/usuarios/${id}`);
  },

  /**
   * Obter competências de um usuário
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<Array>} Lista de competências do usuário
   */
  async getCompetencias(usuarioId) {
    try {
      const response = await apiClient.get('/usuario-competencias', {
        params: {
          usuario_id: usuarioId,
          size: 100 // Busca todas as competências
        }
      });
      return response.data.items || response.data;
    } catch (error) {
      console.error('Erro ao buscar competências do usuário:', error);
      throw error;
    }
  },
};

export default usuarioService;
