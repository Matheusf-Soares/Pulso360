import apiClient from './apiClient';

/**
 * Service para gerenciamento de ações de meta
 */
const acaoMetaService = {
  /**
   * Lista todas as ações com filtros opcionais
   * @param {Object} params - Parâmetros de filtro (meta_id, status, etc.)
   * @returns {Promise<Array>} Lista de ações
   */
  async list(params = {}) {
    const res = await apiClient.get('/acoes-meta', { params });
    return res.data;
  },

  /**
   * Busca uma ação específica por ID
   * @param {string} id - ID da ação
   * @returns {Promise<Object>} Dados da ação
   */
  async getById(id) {
    const res = await apiClient.get(`/acoes-meta/${id}`);
    return res.data;
  },

  /**
   * Cria uma nova ação
   * @param {Object} data - Dados da ação
   * @param {string} data.meta_id - ID da meta
   * @param {string} data.titulo - Título da ação
   * @param {string} data.descricao - Descrição da ação
   * @param {string} data.prazo - Data limite (YYYY-MM-DD)
   * @param {string} data.status - Status (pendente, em_andamento, concluida, cancelada)
   * @param {string} data.responsavel - Responsável pela ação
   * @returns {Promise<Object>} Ação criada
   */
  async create(data) {
    const res = await apiClient.post('/acoes-meta', data);
    return res.data;
  },

  /**
   * Atualiza uma ação existente
   * @param {string} id - ID da ação
   * @param {Object} data - Dados para atualizar
   * @returns {Promise<Object>} Ação atualizada
   */
  async update(id, data) {
    const res = await apiClient.put(`/acoes-meta/${id}`, data);
    return res.data;
  },

  /**
   * Remove uma ação
   * @param {string} id - ID da ação
   * @returns {Promise<void>}
   */
  async delete(id) {
    await apiClient.delete(`/acoes-meta/${id}`);
  },

  /**
   * Busca ações de uma meta específica
   * @param {string} metaId - ID da meta
   * @returns {Promise<Array>} Lista de ações da meta
   */
  async getByMeta(metaId) {
    return this.list({ meta_id: metaId });
  },

  /**
   * Marca uma ação como concluída
   * @param {string} id - ID da ação
   * @returns {Promise<Object>} Ação atualizada
   */
  async marcarConcluida(id) {
    return this.update(id, { status: 'concluida' });
  },

  /**
   * Calcula o progresso de uma meta baseado nas ações
   * @param {Array} acoes - Lista de ações
   * @returns {number} Percentual de conclusão (0-100)
   */
  calculateProgress(acoes) {
    if (!acoes || acoes.length === 0) return 0;
    
    const concluidas = acoes.filter(a => a.status === 'concluida').length;
    return Math.round((concluidas / acoes.length) * 100);
  },

  /**
   * Verifica se há ações atrasadas
   * @param {Array} acoes - Lista de ações
   * @returns {Array} Lista de ações atrasadas
   */
  getAcoesAtrasadas(acoes) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    return acoes.filter(acao => {
      if (acao.status === 'concluida' || acao.status === 'cancelada') return false;
      
      const prazo = new Date(acao.prazo);
      return prazo < hoje;
    });
  }
};

export default acaoMetaService;
