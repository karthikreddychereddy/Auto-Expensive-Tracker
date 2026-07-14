import api from "./api";

export const savingsService = {
  // Get all savings
  list: () =>
    api.get("/savings").then((res) => res.data),

  // Create saving
  create: (payload) =>
    api.post("/savings", {
      amount: payload.amount,
      source: payload.source,
      description: payload.description,
      savingDate: payload.savingDate,
    }).then((res) => res.data),

  // Update saving
  update: (id, payload) =>
    api.put(`/savings/${id}`, {
      amount: payload.amount,
      source: payload.source,
      description: payload.description,
      savingDate: payload.savingDate,
    }).then((res) => res.data),

  // Delete saving
  remove: (id) =>
    api.delete(`/savings/${id}`).then((res) => res.data),
};