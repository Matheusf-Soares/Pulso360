import apiClient from './apiClient';

const avaliacoesService = {
  async list(params = {}) {
    const res = await apiClient.get('/avaliacoes/', { params });
    return res.data;
  },
  
  async getById(id) {
    const res = await apiClient.get(`/avaliacoes/${id}`);
    return res.data;
  },
  
  async create(data) {
    const res = await apiClient.post('/avaliacoes/', data);
    return res.data;
  },
  
  async update(id, data) {
    const res = await apiClient.put(`/avaliacoes/${id}`, data);
    return res.data;
  },
  
  async delete(id) {
    const res = await apiClient.delete(`/avaliacoes/${id}`);
    return res.data;
  },
  
  async concluir(id) {
    const res = await apiClient.post(`/avaliacoes/${id}/concluir`);
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
