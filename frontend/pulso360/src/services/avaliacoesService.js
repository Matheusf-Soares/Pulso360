import apiClient from './apiClient';

const avaliacoesService = {
  async list(params = {}) {
    const res = await apiClient.get('/avaliacoes/', { params });
    return res.data;
  },
  async stats() {
    const res = await apiClient.get('/avaliacoes/stats');
    return res.data;
  },
  async export(params = {}) {
    const res = await apiClient.get('/avaliacoes/export', { params, responseType: 'blob' });
    return res.data;
  },
  async historico(params = {}) {
    const res = await apiClient.get('/avaliacoes/historico', { params });
    return res.data;
  }
};

export default avaliacoesService;
