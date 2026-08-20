import api from "./api";

export const budgetService = {

  // ==========================================
  // GET BUDGETS FOR MONTH
  // ==========================================

  list: month =>
    api
      .get(
        "/budgets",
        {
          params: month
            ? {
                month,
              }
            : {},
        }
      )
      .then(
        response =>
          response.data
      ),

  // ==========================================
  // GET BY ID
  // ==========================================

  getById: id =>
    api
      .get(
        `/budgets/${id}`
      )
      .then(
        response =>
          response.data
      ),

  // ==========================================
  // CREATE
  // ==========================================

  create: payload =>
    api
      .post(
        "/budgets",
        {
          category:
            payload.category,

          budgetAmount:
            payload.budgetAmount,

          startDate:
            payload.startDate,

          endDate:
            payload.endDate,
        }
      )
      .then(
        response =>
          response.data
      ),

  // ==========================================
  // UPDATE
  // ==========================================

  update: (
    id,
    payload
  ) =>
    api
      .put(
        `/budgets/${id}`,
        {
          category:
            payload.category,

          budgetAmount:
            payload.budgetAmount,

          startDate:
            payload.startDate,

          endDate:
            payload.endDate,
        }
      )
      .then(
        response =>
          response.data
      ),

  // ==========================================
  // DELETE
  // ==========================================

  delete: id =>
    api
      .delete(
        `/budgets/${id}`
      )
      .then(
        response =>
          response.data
      ),

  // ==========================================
  // STATUS FOR MONTH
  // ==========================================

  getStatus: month =>
    api
      .get(
        "/budgets/status",
        {
          params: month
            ? {
                month,
              }
            : {},
        }
      )
      .then(
        response =>
          response.data
      ),
};

export default budgetService;