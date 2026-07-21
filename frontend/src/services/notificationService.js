import api from "./api";

export const notificationService = {

  // Notifications

  getNotifications: () =>
    api
      .get("/notifications")
      .then((response) => response.data),

  getUnreadCount: () =>
    api
      .get("/notifications/unread-count")
      .then((response) => response.data.count),

  markAsRead: (id) =>
    api
      .put(`/notifications/${id}/read`)
      .then((response) => response.data),

  markAllAsRead: () =>
    api
      .put("/notifications/read-all")
      .then((response) => response.data),

  deleteNotification: (id) =>
    api
      .delete(`/notifications/${id}`)
      .then((response) => response.data),

  // Reminder Settings

  getSettings: () =>
    api
      .get("/notifications/settings")
      .then((response) => response.data),

  updateSettings: (payload) =>
    api
      .put("/notifications/settings", payload)
      .then((response) => response.data),

};