import api from "./api";

const aiService = {
  chat(message, conversationId = null) {
    return api
      .post("/ai/chat", {
        message,
        conversationId,
      })
      .then((res) => res.data);
  },

  getConversations() {
    return api.get("/ai/conversations").then((res) => res.data);
  },

  getConversation(id) {
    return api.get(`/ai/conversations/${id}`).then((res) => res.data);
  },

  createConversation() {
    return api.post("/ai/conversations").then((res) => res.data);
  },

  renameConversation(id, title) {
    return api
      .patch(`/ai/conversations/${id}`, {
        title,
      })
      .then((res) => res.data);
  },

  pinConversation(id, pinned) {
    return api
      .patch(`/ai/conversations/${id}`, {
        pinned,
      })
      .then((res) => res.data);
  },

  deleteConversation(id) {
    return api.delete(`/ai/conversations/${id}`);
  },
  searchConversations(keyword) {
    return api
      .get("/ai/conversations/search", {
        params: {
          keyword,
        },
      })
      .then((res) => res.data);
  },
};

export default aiService;