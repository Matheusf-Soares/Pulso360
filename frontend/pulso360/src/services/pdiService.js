// pdiService.js - Service para integração do PDI com backend
import api from './api';

const pdiService = {
  async getPDI() {
    // Busca dados completos do PDI do usuário
    const res = await api.get('/pdi');
    return res.data;
  },
  async addGoal(goal) {
    const res = await api.post('/pdi/goals', goal);
    return res.data;
  },
  async updateGoal(id, goal) {
    const res = await api.put(`/pdi/goals/${id}`, goal);
    return res.data;
  },
  async deleteGoal(id) {
    await api.delete(`/pdi/goals/${id}`);
  },
  async toggleMilestone(goalId, milestoneId) {
    const res = await api.patch(`/pdi/goals/${goalId}/milestones/${milestoneId}/toggle`);
    return res.data;
  },
  async exportPDI() {
    const res = await api.get('/pdi/export', { responseType: 'blob' });
    return res.data;
  },
  async enrollResource(resourceId) {
    const res = await api.post(`/pdi/resources/${resourceId}/enroll`);
    return res.data;
  },
  async continueResource(resourceId) {
    const res = await api.post(`/pdi/resources/${resourceId}/continue`);
    return res.data;
  },
  async getResourceDetails(resourceId) {
    const res = await api.get(`/pdi/resources/${resourceId}`);
    return res.data;
  }
};

export default pdiService;
