import api from "./api";


export const goalService = {


    getAll: () =>

        api.get("/goals")
            .then(res => res.data),



    getById: (id) =>

        api.get(`/goals/${id}`)
            .then(res => res.data),



    create: (payload) =>

        api.post("/goals", payload)
            .then(res => res.data),



    update: (id, payload) =>

        api.put(`/goals/${id}`, payload)
            .then(res => res.data),



    delete: (id) =>

        api.delete(`/goals/${id}`)
            .then(res => res.data),



    getProgress: () =>

        api.get("/goals/progress")
            .then(res => res.data),

};