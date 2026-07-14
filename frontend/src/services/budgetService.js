import api from "./api";

export const budgetService = {
  // Get all budgets
  list: () => api.get("/budgets").then((response) => response.data),

  // Get budget by ID
  getById: (id) =>
    api.get(`/budgets/${id}`).then((response) => response.data),

  // Create new budget
  create: (payload) =>
    api
      .post("/budgets", {
        category: payload.category,
        budgetAmount: payload.budgetAmount,
        startDate: payload.startDate,
        endDate: payload.endDate,
      })
      .then((response) => response.data),

  // Update budget
  update: (id, payload) =>
    api
      .put(`/budgets/${id}`, {
        category: payload.category,
        budgetAmount: payload.budgetAmount,
        startDate: payload.startDate,
        endDate: payload.endDate,
      })
      .then((response) => response.data),

  // Delete budget
  delete: (id) =>
    api.delete(`/budgets/${id}`).then((response) => response.data),

  // Get budget status
  getStatus: () =>
    api.get("/budgets/status").then((response) => response.data),
};

export default budgetService;