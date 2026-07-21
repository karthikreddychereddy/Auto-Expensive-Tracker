import api from "./api";

export const notificationSettingService = {

  getSettings: () =>
    api
      .get("/notification-settings")
      .then((response) => response.data),

  updateSettings: (payload) =>
    api
      .put("/notification-settings", payload)
      .then((response) => response.data),

};