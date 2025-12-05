import apiClient from './apiClient';

/**
 * Service para gerenciamento de PDI (Plano de Desenvolvimento Individual)
 */
const pdiService = {
  /**
   * Lista todos os PDIs com filtros opcionais
   * @param {Object} params - Parâmetros de filtro (usuario_id, status, etc.)
   * @returns {Promise<Array>} Lista de PDIs
   */
  async list(params = {}) {
    const res = await apiClient.get('/pdis', { params });
    return res.data;
  },

  /**
   * Busca um PDI específico por ID
   * @param {string} id - ID do PDI
   * @returns {Promise<Object>} Dados do PDI
   */
  async getById(id) {
    const res = await apiClient.get(`/pdis/${id}`);
    return res.data;
  },

  /**
   * Cria um novo PDI
   * @param {Object} data - Dados do PDI
   * @param {string} data.usuario_id - ID do usuário
   * @param {string} data.titulo - Título do PDI
   * @param {string} data.descricao - Descrição do PDI
   * @param {string} data.data_inicio - Data de início (YYYY-MM-DD)
   * @param {string} data.data_fim - Data de término (YYYY-MM-DD)
   * @param {string} data.status - Status (ativo, concluido, cancelado)
   * @returns {Promise<Object>} PDI criado
   */
  async create(data) {
    const res = await apiClient.post('/pdis', data);
    return res.data;
  },

  /**
   * Atualiza um PDI existente
   * @param {string} id - ID do PDI
   * @param {Object} data - Dados para atualizar
   * @returns {Promise<Object>} PDI atualizado
   */
  async update(id, data) {
    const res = await apiClient.put(`/pdis/${id}`, data);
    return res.data;
  },

  /**
   * Remove um PDI
   * @param {string} id - ID do PDI
   * @returns {Promise<void>}
   */
  async delete(id) {
    await apiClient.delete(`/pdis/${id}`);
  },

  /**
   * Busca PDI ativo do usuário
   * @param {string} usuarioId - ID do usuário
   * @returns {Promise<Object|null>} PDI ativo ou null
   */
  async getAtivoByUsuario(usuarioId) {
    const result = await this.list({ usuario_id: usuarioId, status: 'ativo' });
    return result.items && result.items.length > 0 ? result.items[0] : null;
  },

  /**
   * Busca PDI do usuário atual (via dashboard endpoint)
   * @param {string} usuarioId - ID do usuário
   * @param {string} period - Período (mes, trimestre, ano)
   * @returns {Promise<Object>} Dados do PDI do dashboard
   */
  async getPDIDashboard(usuarioId, period = 'mes') {
    const res = await apiClient.get('/dashboard/pdi', {
      params: { usuario_id: usuarioId, period }
    });
    return res.data;
  },

  /**
   * Exporta PDI em formato específico
   * @param {string} id - ID do PDI
   * @param {string} format - Formato (pdf, csv, etc.)
   * @returns {Promise<Blob>} Arquivo exportado
   */
  async export(id, format = 'pdf') {
    const res = await apiClient.get(`/pdis/${id}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return res.data;
  },

  /**
   * Calcula progresso geral do PDI baseado nas metas
   * @param {Array} metas - Lista de metas do PDI
   * @returns {number} Percentual de conclusão (0-100)
   */
  calculateProgress(metas) {
    if (!metas || metas.length === 0) return 0;
    
    const totalMetas = metas.length;
    const metasConcluidas = metas.filter(m => m.status === 'concluida').length;
    
    return Math.round((metasConcluidas / totalMetas) * 100);
  },

  /**
   * Calcula estatísticas do PDI
   * @param {Object} pdi - Objeto PDI
   * @param {Array} metas - Lista de metas
   * @returns {Object} Estatísticas calculadas
   */
  calculateStats(pdi, metas = []) {
    const total = metas.length;
    const concluidas = metas.filter(m => m.status === 'concluida').length;
    const emAndamento = metas.filter(m => m.status === 'em_andamento').length;
    const pendentes = metas.filter(m => m.status === 'pendente').length;
    const atrasadas = metas.filter(m => {
      if (m.status === 'concluida' || m.status === 'cancelada') return false;
      const prazo = new Date(m.prazo);
      const hoje = new Date();
      return prazo < hoje;
    }).length;
    
    return {
      total,
      concluidas,
      emAndamento,
      pendentes,
      atrasadas,
      progresso: this.calculateProgress(metas),
      taxaConclusao: total > 0 ? Math.round((concluidas / total) * 100) : 0
    };
  }
};

export default pdiService;
