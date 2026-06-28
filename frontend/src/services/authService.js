import api from './api.js';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }).then(r => r.data),
  register: (payload) => api.post('/auth/register', payload).then(r => r.data),
  googleLogin: (idToken) => api.post('/auth/google', { idToken }).then(r => r.data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }).then(r => r.data),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }).then(r => r.data),
  me: () => api.get('/users/me').then(r => r.data),
  updateProfile: (payload) => api.put('/users/me', payload).then(r => r.data),
};
