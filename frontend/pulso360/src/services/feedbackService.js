import apiClient from './apiClient';

/**
 * Serviço para gerenciamento de Feedbacks
 * Endpoints: /api/v1/feedbacks
 */

/**
 * Lista todos os feedbacks com filtros opcionais
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.de_usuario_id - ID do usuário que enviou
 * @param {string} params.para_usuario_id - ID do usuário que recebeu
 * @param {string} params.avaliacao_id - ID da avaliação relacionada
 * @param {string} params.tipo - Tipo de feedback (positivo, construtivo, reconhecimento)
 * @param {number} params.page - Número da página (padrão: 1)
 * @param {number} params.size - Tamanho da página (padrão: 50)
 * @returns {Promise<Object>} Lista paginada de feedbacks
 */
const list = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.de_usuario_id) queryParams.append('de_usuario_id', params.de_usuario_id);
  if (params.para_usuario_id) queryParams.append('para_usuario_id', params.para_usuario_id);
  if (params.avaliacao_id) queryParams.append('avaliacao_id', params.avaliacao_id);
  if (params.tipo) queryParams.append('tipo', params.tipo);
  if (params.page) queryParams.append('page', params.page);
  if (params.size) queryParams.append('size', params.size);

  const query = queryParams.toString();
  const url = query ? `/feedbacks?${query}` : '/feedbacks';
  
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Busca um feedback específico por ID
 * @param {string} id - ID do feedback
 * @returns {Promise<Object>} Dados do feedback
 */
const getById = async (id) => {
  const response = await apiClient.get(`/feedbacks/${id}`);
  return response.data;
};

/**
 * Cria um novo feedback
 * @param {Object} feedbackData - Dados do feedback
 * @param {string} feedbackData.de_usuario_id - ID do usuário que envia (UUID)
 * @param {string} feedbackData.para_usuario_id - ID do usuário que recebe (UUID)
 * @param {string} feedbackData.avaliacao_id - ID da avaliação (opcional, UUID)
 * @param {string} feedbackData.tipo - Tipo: "positivo", "construtivo", "reconhecimento"
 * @param {string} feedbackData.texto - Conteúdo do feedback
 * @param {boolean} feedbackData.visivel_para_avaliado - Se o avaliado pode ver (padrão: true)
 * @returns {Promise<Object>} Feedback criado
 */
const create = async (feedbackData) => {
  const response = await apiClient.post('/feedbacks', feedbackData);
  return response.data;
};

/**
 * Atualiza um feedback existente
 * @param {string} id - ID do feedback
 * @param {Object} feedbackData - Dados para atualização (parcial)
 * @returns {Promise<Object>} Feedback atualizado
 */
const update = async (id, feedbackData) => {
  const response = await apiClient.put(`/feedbacks/${id}`, feedbackData);
  return response.data;
};

/**
 * Remove um feedback
 * @param {string} id - ID do feedback
 * @returns {Promise<void>}
 */
const deleteFeedback = async (id) => {
  await apiClient.delete(`/feedbacks/${id}`);
};

/**
 * Busca feedbacks recebidos por um usuário
 * @param {string} usuarioId - ID do usuário
 * @param {Object} options - Opções adicionais
 * @returns {Promise<Object>} Lista de feedbacks recebidos
 */
const getRecebidos = async (usuarioId, options = {}) => {
  return await list({
    para_usuario_id: usuarioId,
    ...options
  });
};

/**
 * Busca feedbacks enviados por um usuário
 * @param {string} usuarioId - ID do usuário
 * @param {Object} options - Opções adicionais
 * @returns {Promise<Object>} Lista de feedbacks enviados
 */
const getEnviados = async (usuarioId, options = {}) => {
  return await list({
    de_usuario_id: usuarioId,
    ...options
  });
};

/**
 * Busca feedbacks relacionados a uma avaliação específica
 * @param {string} avaliacaoId - ID da avaliação
 * @param {Object} options - Opções adicionais
 * @returns {Promise<Object>} Lista de feedbacks da avaliação
 */
const getByAvaliacao = async (avaliacaoId, options = {}) => {
  return await list({
    avaliacao_id: avaliacaoId,
    ...options
  });
};

/**
 * Calcula estatísticas de feedbacks de um usuário
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Estatísticas (total, por tipo, enviados, recebidos)
 */
const getStats = async (usuarioId) => {
  try {
    // Busca feedbacks recebidos e enviados
    const [recebidos, enviados] = await Promise.all([
      getRecebidos(usuarioId, { size: 1000 }),
      getEnviados(usuarioId, { size: 1000 })
    ]);

    const feedbacksRecebidos = recebidos.items || [];
    const feedbacksEnviados = enviados.items || [];

    // Conta por tipo (recebidos)
    const tiposRecebidos = feedbacksRecebidos.reduce((acc, f) => {
      acc[f.tipo] = (acc[f.tipo] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRecebidos: feedbacksRecebidos.length,
      totalEnviados: feedbacksEnviados.length,
      recebidosPorTipo: {
        positivo: tiposRecebidos.positivo || 0,
        construtivo: tiposRecebidos.construtivo || 0,
        reconhecimento: tiposRecebidos.reconhecimento || 0
      },
      recentes: feedbacksRecebidos
        .sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao))
        .slice(0, 5)
    };
  } catch (error) {
    console.error('Erro ao calcular estatísticas de feedbacks:', error);
    throw error;
  }
};

const feedbackService = {
  list,
  getById,
  create,
  update,
  delete: deleteFeedback,
  getRecebidos,
  getEnviados,
  getByAvaliacao,
  getStats
};

export default feedbackService;
