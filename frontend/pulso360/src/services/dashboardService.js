import apiClient from './apiClient';

// Backward-compatible helpers: accept usuarioId or an options object
function buildParams(arg) {
  const opts = typeof arg === 'object' && arg !== null ? arg : { usuarioId: arg };
  const { usuarioId, period } = opts;
  const params = {};
  if (usuarioId) params.usuario_id = usuarioId;
  if (period) params.period = period;
  return params;
}

const dashboardService = {
  async getSummary(arg) {
    const params = buildParams(arg);
    const res = await apiClient.get('/dashboard/summary', { params });
    return res.data;
  },
  async getPDI(arg) {
    const params = buildParams(arg);
    const res = await apiClient.get('/dashboard/pdi', { params });
    return res.data.items;
  },
  async getActivity(arg) {
    const params = buildParams(arg);
    const res = await apiClient.get('/dashboard/activity', { params });
    return res.data.items;
  },
  async getTeamPerformance(arg) {
    const params = buildParams(arg);
    const res = await apiClient.get('/dashboard/team-performance', { params });
    return res.data.items;
  }
};

export default dashboardService;