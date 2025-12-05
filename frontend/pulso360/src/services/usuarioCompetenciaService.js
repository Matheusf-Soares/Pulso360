import apiClient from './apiClient';

/**
 * Serviço para gerenciamento de Competências de Usuário
 * Endpoints: /api/v1/usuario-competencias
 */

/**
 * Lista todas as competências de usuários com filtros opcionais
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.usuario_id - ID do usuário
 * @param {string} params.competencia - Nome da competência
 * @param {number} params.nivel_min - Nível mínimo
 * @param {number} params.nivel_max - Nível máximo
 * @param {number} params.page - Número da página (padrão: 1)
 * @param {number} params.size - Tamanho da página (padrão: 50)
 * @returns {Promise<Object>} Lista paginada de competências
 */
const list = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.usuario_id) queryParams.append('usuario_id', params.usuario_id);
  if (params.competencia) queryParams.append('competencia', params.competencia);
  if (params.nivel_min) queryParams.append('nivel_min', params.nivel_min);
  if (params.nivel_max) queryParams.append('nivel_max', params.nivel_max);
  if (params.page) queryParams.append('page', params.page);
  if (params.size) queryParams.append('size', params.size);

  const query = queryParams.toString();
  const url = query ? `/usuario-competencias?${query}` : '/usuario-competencias';
  
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Busca uma competência específica por ID
 * @param {string} id - ID da competência
 * @returns {Promise<Object>} Dados da competência
 */
const getById = async (id) => {
  const response = await apiClient.get(`/usuario-competencias/${id}`);
  return response.data;
};

/**
 * Cria uma nova competência para um usuário
 * @param {Object} competenciaData - Dados da competência
 * @param {string} competenciaData.usuario_id - ID do usuário (UUID)
 * @param {string} competenciaData.competencia - Nome da competência
 * @param {number} competenciaData.nivel_atual - Nível atual (1-5)
 * @param {number} competenciaData.nivel_desejado - Nível desejado (1-5)
 * @param {string} competenciaData.status - Status: "em_desenvolvimento", "alcancada", "nao_iniciada"
 * @returns {Promise<Object>} Competência criada
 */
const create = async (competenciaData) => {
  const response = await apiClient.post('/usuario-competencias', competenciaData);
  return response.data;
};

/**
 * Atualiza uma competência existente
 * @param {string} id - ID da competência
 * @param {Object} competenciaData - Dados para atualização
 * @returns {Promise<Object>} Competência atualizada
 */
const update = async (id, competenciaData) => {
  const response = await apiClient.put(`/usuario-competencias/${id}`, competenciaData);
  return response.data;
};

/**
 * Remove uma competência
 * @param {string} id - ID da competência
 * @returns {Promise<void>}
 */
const deleteCompetencia = async (id) => {
  await apiClient.delete(`/usuario-competencias/${id}`);
};

/**
 * Busca todas as competências de um usuário
 * @param {string} usuarioId - ID do usuário
 * @param {Object} options - Opções adicionais
 * @returns {Promise<Object>} Lista de competências do usuário
 */
const getByUsuario = async (usuarioId, options = {}) => {
  return await list({
    usuario_id: usuarioId,
    size: 100,
    ...options
  });
};

/**
 * Calcula estatísticas de competências de um usuário
 * @param {string} usuarioId - ID do usuário
 * @returns {Promise<Object>} Estatísticas (total, por nível, por status)
 */
const getStats = async (usuarioId) => {
  try {
    const result = await getByUsuario(usuarioId);
    const competencias = result.items || [];

    // Agrupa por status
    const porStatus = competencias.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});

    // Agrupa por nível atual
    const porNivel = competencias.reduce((acc, c) => {
      const nivel = `nivel_${c.nivel_atual}`;
      acc[nivel] = (acc[nivel] || 0) + 1;
      return acc;
    }, {});

    // Calcula gap (diferença entre desejado e atual)
    const totalGap = competencias.reduce((sum, c) => {
      return sum + (c.nivel_desejado - c.nivel_atual);
    }, 0);

    return {
      total: competencias.length,
      porStatus: {
        em_desenvolvimento: porStatus.em_desenvolvimento || 0,
        alcancada: porStatus.alcancada || 0,
        nao_iniciada: porStatus.nao_iniciada || 0
      },
      porNivel: {
        nivel_1: porNivel.nivel_1 || 0,
        nivel_2: porNivel.nivel_2 || 0,
        nivel_3: porNivel.nivel_3 || 0,
        nivel_4: porNivel.nivel_4 || 0,
        nivel_5: porNivel.nivel_5 || 0
      },
      gapMedio: competencias.length > 0 ? (totalGap / competencias.length).toFixed(2) : 0,
      competenciasRecentes: competencias
        .sort((a, b) => new Date(b.data_atualizacao || b.data_criacao) - new Date(a.data_atualizacao || a.data_criacao))
        .slice(0, 5)
    };
  } catch (error) {
    console.error('Erro ao calcular estatísticas de competências:', error);
    throw error;
  }
};

const usuarioCompetenciaService = {
  list,
  getById,
  create,
  update,
  delete: deleteCompetencia,
  getByUsuario,
  getStats
};

export default usuarioCompetenciaService;
