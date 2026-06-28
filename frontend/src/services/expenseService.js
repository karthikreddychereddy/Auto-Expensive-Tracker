import api from './api.js';

export const expenseService = {
  list: (params = {}) => api.get('/expenses', { params }).then(r => r.data),
  create: (payload) => api.post('/expenses', payload).then(r => r.data),
  update: (id, payload) => api.put(`/expenses/${id}`, payload).then(r => r.data),
  remove: (id) => api.delete(`/expenses/${id}`).then(r => r.data),
  stats: () => api.get('/expenses/stats').then(r => r.data),
};

export const incomeService = {
  list: () => api.get('/income').then(r => r.data),
  create: (payload) => api.post('/income', payload).then(r => r.data),
  remove: (id) => api.delete(`/income/${id}`).then(r => r.data),
};

export const budgetService = {
  list: () => api.get('/budgets').then(r => r.data),
  upsert: (payload) => api.post('/budgets', payload).then(r => r.data),
};

export const savingsService = {
  list: () => api.get('/savings').then(r => r.data),
  create: (payload) => api.post('/savings', payload).then(r => r.data),
};

export const categoryService = {
  list: () => api.get('/categories').then(r => r.data),
  create: (payload) => api.post('/categories', payload).then(r => r.data),
};

export const adminService = {
  users: () => api.get('/admin/users').then(r => r.data),
  stats: () => api.get('/admin/stats').then(r => r.data),
};
