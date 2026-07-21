import api from "./api";

const settingsService = {

  getSettings: () =>
    api.get("/settings").then((response) => response.data),

  updateSettings: (settings) =>
    api.put("/settings", settings).then((response) => response.data),

  changePassword: (payload) =>
    api.post("/settings/change-password", payload)
      .then((response) => response.data),

};

export default settingsService;