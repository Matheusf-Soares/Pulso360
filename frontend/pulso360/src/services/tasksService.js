import apiClient from './apiClient';

const tasksService = {
  async list(usuarioId) {
    const params = usuarioId ? { usuario_id: usuarioId } : {};
    const res = await apiClient.get('/tarefas/', { params });
    return res.data;
  },

  async create(data) {
    const res = await apiClient.post('/tarefas/', data);
    return res.data;
  },

  async update(id, data) {
    const res = await apiClient.put(`/tarefas/${id}`, data);
    return res.data;
  },

  async remove(id) {
    await apiClient.delete(`/tarefas/${id}`);
  },

  async toggle(id) {
    const res = await apiClient.patch(`/tarefas/${id}/toggle`);
    return res.data;
  }
};

export default tasksService;