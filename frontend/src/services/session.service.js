import api from './api.config';

export const sessionService = {
  getAllSessions: async () => {
    return await api.get('/sessions');
  },
  getMySessions: async () => {
    return await api.get('/sessions/my-sessions');
  },
  getSessionById: async (id) => {
    return await api.get(`/sessions/my-sessions/${id}`);
  },
  saveDraft: async (sessionData) => {
    return await api.post('/sessions/my-sessions/save-draft', sessionData);
  },
  publishSession: async (sessionData) => {
    return await api.post('/sessions/my-sessions/publish', sessionData);
  },
  deleteSession: async (id) => {
    return await api.delete(`/sessions/my-sessions/${id}`);
  }
};