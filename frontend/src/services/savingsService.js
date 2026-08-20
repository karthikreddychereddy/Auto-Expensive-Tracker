import api from "./api";

export const savingsService = {

  // ==========================================
  // GET SAVINGS FOR MONTH
  // ==========================================

  list: month =>
    api
      .get(
        "/savings",
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
  // CREATE
  // ==========================================

  create: payload =>
    api
      .post(
        "/savings",
        {
          amount:
            payload.amount,

          source:
            payload.source,

          description:
            payload.description,

          savingDate:
            payload.savingDate,
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
        `/savings/${id}`,
        {
          amount:
            payload.amount,

          source:
            payload.source,

          description:
            payload.description,

          savingDate:
            payload.savingDate,
        }
      )
      .then(
        response =>
          response.data
      ),

  // ==========================================
  // DELETE
  // ==========================================

  remove: id =>
    api
      .delete(
        `/savings/${id}`
      )
      .then(
        response =>
          response.data
      ),
};