import api from "./api";

export const categoryService = {

  list: () =>
    api.get("/categories")
      .then(res => res.data),


  create: (payload) =>
    api.post("/categories", {
      name: payload.name,
      description: payload.description,
      color: payload.color,
      icon: payload.icon,
    })
    .then(res => res.data),


  update: (id, payload) =>
    api.put(`/categories/${id}`, {
      name: payload.name,
      description: payload.description,
      color: payload.color,
      icon: payload.icon,
    })
    .then(res => res.data),


  remove: (id) =>
    api.delete(`/categories/${id}`)
      .then(res => res.data),

};