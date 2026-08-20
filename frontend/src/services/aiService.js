import api from "./api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api";

const aiService = {
  /*
   * Existing normal / attachment chat.
   */
  chat(
    message,
    conversationId = null,
    file = null
  ) {
    if (file) {
      const formData =
        new FormData();

      formData.append(
        "message",
        message || ""
      );

      if (conversationId != null) {
        formData.append(
          "conversationId",
          String(conversationId)
        );
      }

      formData.append(
        "file",
        file
      );

      return api
        .post(
          "/ai/chat-with-file",
          formData
        )
        .then(
          response => response.data
        );
    }

    return api
      .post("/ai/chat", {
        message,
        conversationId,
      })
      .then(
        response => response.data
      );
  },

  /*
   * ==========================================
   * TRUE STREAMING CHAT
   * ==========================================
   */
  async streamChat(
    message,
    conversationId,
    onChunk,
    signal
  ) {
    const token =
      localStorage.getItem(
        "pt_token"
      );

    const response =
      await fetch(
        `${API_BASE_URL}/ai/chat/stream`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : {}),
          },

          body: JSON.stringify({
            message,
            conversationId,
          }),

          signal,
        }
      );

    /*
     * Authentication failure.
     */
    if (
      response.status === 401 ||
      response.status === 403
    ) {
      throw new Error(
        "Authentication expired or access was denied."
      );
    }

    /*
     * Backend error.
     */
    if (!response.ok) {
      let errorText = "";

      try {
        errorText =
          await response.text();
      } catch {
        errorText = "";
      }

      throw new Error(
        errorText ||
          `AI request failed with status ${response.status}`
      );
    }

    if (!response.body) {
      throw new Error(
        "Streaming response is unavailable."
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder(
        "utf-8"
      );

    let buffer = "";

    try {
      while (true) {
        const {
          value,
          done,
        } =
          await reader.read();

        if (done) {
          break;
        }

        buffer +=
          decoder.decode(
            value,
            {
              stream: true,
            }
          );

        /*
         * Each SSE event is separated
         * by a blank line.
         */
        const events =
          buffer.split(
            /\r?\n\r?\n/
          );

        /*
         * Keep incomplete SSE event
         * for the next network packet.
         */
        buffer =
          events.pop() || "";

        for (
          const event of events
        ) {
          processSSEEvent(
            event,
            onChunk
          );
        }
      }

      /*
       * Flush remaining decoder bytes.
       */
      buffer +=
        decoder.decode();

      if (buffer) {
        processSSEEvent(
          buffer,
          onChunk
        );
      }

    } finally {
      try {
        reader.releaseLock();
      } catch {
        // Ignore release errors.
      }
    }
  },

  getConversations() {
    return api
      .get(
        "/ai/conversations"
      )
      .then(
        response =>
          response.data
      );
  },

  getConversation(id) {
    return api
      .get(
        `/ai/conversations/${id}`
      )
      .then(
        response =>
          response.data
      );
  },

  createConversation() {
    return api
      .post(
        "/ai/conversations"
      )
      .then(
        response =>
          response.data
      );
  },

  renameConversation(
    id,
    title
  ) {
    return api
      .patch(
        `/ai/conversations/${id}`,
        {
          title,
        }
      )
      .then(
        response =>
          response.data
      );
  },

  pinConversation(
    id,
    pinned
  ) {
    return api
      .patch(
        `/ai/conversations/${id}`,
        {
          pinned,
        }
      )
      .then(
        response =>
          response.data
      );
  },

  deleteConversation(id) {
    return api.delete(
      `/ai/conversations/${id}`
    );
  },

  searchConversations(
    keyword
  ) {
    return api
      .get(
        "/ai/conversations/search",
        {
          params: {
            keyword,
          },
        }
      )
      .then(
        response =>
          response.data
      );
  },
};

/*
 * ==========================================
 * SSE PARSER
 * ==========================================
 *
 * IMPORTANT:
 *
 * Do NOT trim the streamed content.
 * Do NOT remove leading spaces.
 *
 * Groq often sends chunks such as:
 *
 * " your"
 * " income"
 * " is"
 *
 * Those spaces are part of the generated
 * answer and must be preserved.
 */
function processSSEEvent(
  event,
  onChunk
) {
  if (!event) {
    return;
  }

  const lines =
    event.split(
      /\r?\n/
    );

  const dataParts = [];

  for (
    const line of lines
  ) {
    if (
      !line.startsWith(
        "data:"
      )
    ) {
      continue;
    }

    /*
     * IMPORTANT:
     *
     * substring(5) removes ONLY:
     *
     * data:
     *
     * We intentionally DO NOT call:
     *
     * trim()
     * trimStart()
     * substring(1)
     *
     * because the first space may belong
     * to the actual Groq response.
     */
    const data =
      line.substring(5);

    if (
      data === "[DONE]" ||
      data.trim() === "[DONE]"
    ) {
      continue;
    }

    dataParts.push(
      data
    );
  }

  if (
    dataParts.length === 0
  ) {
    return;
  }

  /*
   * SSE supports multi-line data.
   *
   * Reconstruct lines using newline
   * instead of joining everything
   * without spacing.
   */
  const chunk =
    dataParts.join("\n");

  if (chunk) {
    onChunk?.(
      chunk
    );
  }
}

export default aiService;