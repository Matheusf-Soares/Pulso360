import apiClient from './apiClient';

/**
 * Service para gerenciamento de metas do PDI
 */
const metaService = {
  /**
   * Lista todas as metas com filtros opcionais
   * @param {Object} params - Parâmetros de filtro (pdi_id, status, etc.)
   * @returns {Promise<Array>} Lista de metas
   */
  async list(params = {}) {
    const res = await apiClient.get('/metas', { params });
    return res.data;
  },

  /**
   * Busca uma meta específica por ID
   * @param {string} id - ID da meta
   * @returns {Promise<Object>} Dados da meta
   */
  async getById(id) {
    const res = await apiClient.get(`/metas/${id}`);
    return res.data;
  },

  /**
   * Cria uma nova meta
   * @param {Object} data - Dados da meta
   * @param {string} data.pdi_id - ID do PDI
   * @param {string} data.titulo - Título da meta
   * @param {string} data.descricao - Descrição da meta
   * @param {string} data.prazo - Data limite (YYYY-MM-DD)
   * @param {string} data.status - Status (pendente, em_andamento, concluida, cancelada)
   * @returns {Promise<Object>} Meta criada
   */
  async create(data) {
    const res = await apiClient.post('/metas', data);
    return res.data;
  },

  /**
   * Atualiza uma meta existente
   * @param {string} id - ID da meta
   * @param {Object} data - Dados para atualizar
   * @returns {Promise<Object>} Meta atualizada
   */
  async update(id, data) {
    const res = await apiClient.put(`/metas/${id}`, data);
    return res.data;
  },

  /**
   * Remove uma meta
   * @param {string} id - ID da meta
   * @returns {Promise<void>}
   */
  async delete(id) {
    await apiClient.delete(`/metas/${id}`);
  },

  /**
   * Busca metas de um PDI específico
   * @param {string} pdiId - ID do PDI
   * @returns {Promise<Array>} Lista de metas do PDI
   */
  async getByPdi(pdiId) {
    return this.list({ pdi_id: pdiId });
  },

  /**
   * Calcula o progresso geral das metas de um PDI
   * @param {Array} metas - Lista de metas
   * @returns {number} Percentual de conclusão (0-100)
   */
  calculateProgress(metas) {
    if (!metas || metas.length === 0) return 0;
    
    const concluidas = metas.filter(m => m.status === 'concluida').length;
    return Math.round((concluidas / metas.length) * 100);
  }
};

export default metaService;
