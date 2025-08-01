import api from './api.config';

export const authService = {
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password });
  },
  
  register: async (email, password) => {
    return await api.post('/auth/register', { email, password });
  }
};