import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import toast from "react-hot-toast";

import aiService from "../services/aiService";

const AIContext = createContext(null);

function generateTitle(text) {
  const cleaned = text.trim();

  if (cleaned.length <= 35) {
    return cleaned;
  }

  return cleaned.substring(0, 35) + "...";
}

export function AIProvider({ children }) {
  const [conversations, setConversations] =
    useState([]);

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [initialized, setInitialized] =
    useState(false);

  const [
    searchLoading,
    setSearchLoading,
  ] = useState(false);

  const abortControllerRef =
    useRef(null);

  const searchTimerRef =
    useRef(null);

  useEffect(() => {
    loadConversations();

    return () => {
      abortControllerRef.current?.abort();

      if (searchTimerRef.current) {
        clearTimeout(
          searchTimerRef.current
        );
      }
    };
  }, []);

  async function loadConversations() {
    try {
      const data =
        await aiService.getConversations();

      setConversations(
        Array.isArray(data)
          ? data
          : []
      );

      if (
        Array.isArray(data) &&
        data.length > 0
      ) {
        setActiveConversationId(
          data[0].id
        );
      }
    } catch (error) {
      console.error(
        "Failed to load AI conversations:",
        error
      );
    } finally {
      setInitialized(true);
    }
  }

  async function searchConversations(
    keyword
  ) {
    if (!keyword.trim()) {
      await loadConversations();
      return;
    }

    setSearchLoading(true);

    try {
      const data =
        await aiService.searchConversations(
          keyword
        );

      setConversations(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to search conversations:",
        error
      );
    } finally {
      setSearchLoading(false);
    }
  }

  function searchConversation(
    keyword
  ) {
    if (searchTimerRef.current) {
      clearTimeout(
        searchTimerRef.current
      );
    }

    searchTimerRef.current =
      setTimeout(() => {
        searchConversations(
          keyword
        );
      }, 300);
  }

  const activeConversation =
    useMemo(() => {
      return (
        conversations.find(
          conversation =>
            conversation.id ===
            activeConversationId
        ) ?? null
      );
    }, [
      conversations,
      activeConversationId,
    ]);

  const messages =
    activeConversation?.messages ??
    [];

  function createStreamingAssistantMessage(
    conversationId
  ) {
    const assistantId =
      "stream-" +
      Date.now() +
      "-" +
      Math.random();

    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [
            ...conversation.messages,

            {
              id: assistantId,
              role: "assistant",
              content: "",
              createdAt:
                new Date().toISOString(),
            },
          ],
        };
      })
    );

    return assistantId;
  }

  function appendStreamingChunk(
    conversationId,
    assistantId,
    chunk
  ) {
    if (!chunk) {
      return;
    }

    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages:
            conversation.messages.map(
              message => {
                if (
                  message.id !==
                  assistantId
                ) {
                  return message;
                }

                return {
                  ...message,

                  content:
                    (message.content ||
                      "") +
                    chunk,
                };
              }
            ),
        };
      })
    );
  }

  function addAssistantMessage(
    conversationId,
    content
  ) {
    if (!content) {
      return;
    }

    const assistantMessage = {
      id:
        "assistant-" +
        Date.now() +
        "-" +
        Math.random(),

      role: "assistant",

      content,

      createdAt:
        new Date().toISOString(),
    };

    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [
            ...conversation.messages,
            assistantMessage,
          ],

          updatedAt:
            new Date().toISOString(),
        };
      })
    );
  }

  function stopGenerating() {
    if (
      abortControllerRef.current
    ) {
      abortControllerRef.current.abort();

      abortControllerRef.current =
        null;
    }

    setLoading(false);
  }

  async function sendMessage(
    text,
    file = null
  ) {
    const cleanText =
      text?.trim?.() || "";

    if (
      !cleanText &&
      !file
    ) {
      return;
    }

    if (
      abortControllerRef.current
    ) {
      abortControllerRef.current.abort();

      abortControllerRef.current =
        null;
    }

    let conversationId =
      activeConversationId;

    if (!conversationId) {
      const conversation =
        await aiService.createConversation();

      conversationId =
        conversation.id;

      setConversations(previous => [
        conversation,
        ...previous,
      ]);

      setActiveConversationId(
        conversation.id
      );
    }

    const visibleContent =
      cleanText ||
      "Please analyze this attachment.";

    const userMessage = {
      id:
        "user-" +
        Date.now() +
        "-" +
        Math.random(),

      role: "user",

      content:
        visibleContent,

      hasAttachment:
        Boolean(file),

      attachmentName:
        file?.name || null,

      attachmentType:
        file?.type || null,

      attachmentSize:
        file?.size ?? null,

      createdAt:
        new Date().toISOString(),
    };

    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          title:
            conversation.messages
              .length === 0
              ? generateTitle(
                  visibleContent
                )
              : conversation.title,

          messages: [
            ...conversation.messages,
            userMessage,
          ],

          updatedAt:
            new Date().toISOString(),
        };
      })
    );

    setLoading(true);

    // ==========================================
    // ATTACHMENT CHAT
    // ==========================================

    if (file) {
      try {
        const response =
          await aiService.chat(
            cleanText,
            conversationId,
            file
          );

        addAssistantMessage(
          conversationId,
          response.reply
        );

        setConversations(previous =>
          previous.map(conversation => {
            if (
              conversation.id !==
              conversationId
            ) {
              return conversation;
            }

            return {
              ...conversation,

              title:
                response.conversation
                  ?.title ||
                conversation.title,

              pinned:
                response.conversation
                  ?.pinned ??
                conversation.pinned,

              updatedAt:
                response.conversation
                  ?.updatedAt ||
                new Date().toISOString(),

              messages:
                conversation.messages,
            };
          })
        );
      } catch (error) {
        handleChatError(
          error,
          conversationId
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    // ==========================================
    // TRUE STREAMING TEXT CHAT
    // ==========================================

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    const assistantId =
      createStreamingAssistantMessage(
        conversationId
      );

    let receivedAnyContent =
      false;

    try {
      await aiService.streamChat(
        cleanText,
        conversationId,

        chunk => {
          receivedAnyContent = true;

          appendStreamingChunk(
            conversationId,
            assistantId,
            chunk
          );
        },

        controller.signal
      );

      setConversations(previous =>
        previous.map(conversation => {
          if (
            conversation.id !==
            conversationId
          ) {
            return conversation;
          }

          return {
            ...conversation,

            updatedAt:
              new Date().toISOString(),
          };
        })
      );

    } catch (error) {

      // ==========================================
      // User intentionally stopped generation
      // ==========================================

      if (
        error?.name ===
          "AbortError" ||
        controller.signal.aborted
      ) {
        if (
          !receivedAnyContent
        ) {
          removeMessage(
            conversationId,
            assistantId
          );
        }

        return;
      }

      // ==========================================
      // Response already arrived
      // ==========================================
      //
      // Some streaming connections can throw a
      // network-close error after valid chunks
      // have already reached the frontend.
      //
      // In that case keep the response and do
      // not create another "network error"
      // assistant message.
      // ==========================================

      if (receivedAnyContent) {
        console.warn(
          "AI stream closed after response content was received:",
          error
        );

        return;
      }

      // ==========================================
      // Real failure before any AI response
      // ==========================================

      removeMessage(
        conversationId,
        assistantId
      );

      handleChatError(
        error,
        conversationId
      );

    } finally {
      if (
        abortControllerRef.current ===
        controller
      ) {
        abortControllerRef.current =
          null;
      }

      setLoading(false);
    }
  }

  function removeMessage(
    conversationId,
    messageId
  ) {
    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages:
            conversation.messages.filter(
              message =>
                message.id !==
                messageId
            ),
        };
      })
    );
  }

  function handleChatError(
    error,
    conversationId
  ) {
    console.error(
      "========== AI CHAT ERROR =========="
    );

    console.error(
      "Full error:",
      error
    );

    console.error(
      "Status:",
      error?.response?.status
    );

    console.error(
      "Backend response:",
      error?.response?.data
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "==================================="
    );

    const responseData =
      error?.response?.data;

    let backendMessage =
      "Unable to contact AI.";

    if (
      typeof responseData ===
      "string"
    ) {
      backendMessage =
        responseData;
    } else if (
      responseData?.message
    ) {
      backendMessage =
        responseData.message;
    } else if (
      responseData?.error
    ) {
      backendMessage =
        responseData.error;
    } else if (
      error?.message
    ) {
      backendMessage =
        error.message;
    }

    const errorMessage = {
      id:
        "error-" +
        Date.now() +
        "-" +
        Math.random(),

      role: "assistant",

      content:
        backendMessage,

      createdAt:
        new Date().toISOString(),
    };

    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [
            ...conversation.messages,
            errorMessage,
          ],
        };
      })
    );
  }

  async function regenerateLastResponse() {
    if (!activeConversation) {
      return;
    }

    const conversationMessages =
      activeConversation.messages;

    if (
      conversationMessages.length < 2
    ) {
      return;
    }

    const assistant =
      conversationMessages[
        conversationMessages.length -
          1
      ];

    const user =
      conversationMessages[
        conversationMessages.length -
          2
      ];

    if (
      assistant.role !==
        "assistant" ||
      user.role !== "user"
    ) {
      return;
    }

    if (
      user.hasAttachment
    ) {
      toast.error(
        "Attachment responses cannot be regenerated yet."
      );

      return;
    }

    setConversations(previous =>
      previous.map(conversation => {
        if (
          conversation.id !==
          activeConversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages:
            conversation.messages.slice(
              0,
              conversation.messages
                .length - 1
            ),
        };
      })
    );

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    const assistantId =
      createStreamingAssistantMessage(
        activeConversationId
      );

    let receivedAnyContent =
      false;

    setLoading(true);

    try {
      await aiService.streamChat(
        user.content,
        activeConversationId,

        chunk => {
          receivedAnyContent = true;

          appendStreamingChunk(
            activeConversationId,
            assistantId,
            chunk
          );
        },

        controller.signal
      );

    } catch (error) {

      if (
        error?.name ===
          "AbortError" ||
        controller.signal.aborted
      ) {
        if (
          !receivedAnyContent
        ) {
          removeMessage(
            activeConversationId,
            assistantId
          );
        }

        return;
      }

      // If valid content already arrived,
      // keep it and ignore a late stream-close
      // network error.

      if (receivedAnyContent) {
        console.warn(
          "Regeneration stream closed after content was received:",
          error
        );

        return;
      }

      removeMessage(
        activeConversationId,
        assistantId
      );

      console.error(
        "Failed to regenerate response:",
        error
      );

      toast.error(
        "Failed to regenerate"
      );

    } finally {
      if (
        abortControllerRef.current ===
        controller
      ) {
        abortControllerRef.current =
          null;
      }

      setLoading(false);
    }
  }

  async function newChat() {
    try {
      abortControllerRef.current?.abort();

      abortControllerRef.current =
        null;

      setLoading(false);

      const conversation =
        await aiService.createConversation();

      setConversations(previous => [
        conversation,
        ...previous,
      ]);

      setActiveConversationId(
        conversation.id
      );
    } catch (error) {
      console.error(
        "Failed to create new chat:",
        error
      );
    }
  }

  function switchConversation(id) {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setLoading(false);

    setActiveConversationId(id);
  }

  async function deleteConversation(
    id
  ) {
    try {
      if (
        activeConversationId === id
      ) {
        abortControllerRef.current
          ?.abort();

        abortControllerRef.current =
          null;

        setLoading(false);
      }

      await aiService.deleteConversation(
        id
      );

      const updated =
        conversations.filter(
          conversation =>
            conversation.id !== id
        );

      setConversations(
        updated
      );

      if (
        activeConversationId ===
          id &&
        updated.length > 0
      ) {
        setActiveConversationId(
          updated[0].id
        );
      }

      if (
        updated.length === 0
      ) {
        setActiveConversationId(
          null
        );
      }
    } catch (error) {
      console.error(
        "Failed to delete conversation:",
        error
      );
    }
  }

  async function renameConversation(
    id,
    title
  ) {
    try {
      const updatedConversation =
        await aiService.renameConversation(
          id,
          title
        );

      setConversations(previous =>
        previous.map(conversation =>
          conversation.id === id
            ? updatedConversation
            : conversation
        )
      );
    } catch (error) {
      console.error(
        "Failed to rename conversation:",
        error
      );
    }
  }

  async function togglePin(id) {
    try {
      const conversation =
        conversations.find(
          item =>
            item.id === id
        );

      if (!conversation) {
        return;
      }

      const updatedConversation =
        await aiService.pinConversation(
          id,
          !conversation.pinned
        );

      setConversations(previous =>
        previous.map(item =>
          item.id === id
            ? updatedConversation
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to update pin:",
        error
      );
    }
  }

  function clearAllChats() {
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    setLoading(false);

    loadConversations();
  }

  return (
    <AIContext.Provider
      value={{
        conversations,

        activeConversation,
        activeConversationId,

        messages,

        loading,
        searchLoading,

        initialized,

        sendMessage,

        stopGenerating,

        regenerateLastResponse,

        newChat,

        switchConversation,

        deleteConversation,

        renameConversation,

        togglePin,

        searchConversation,

        clearAllChats,

        reloadConversations:
          loadConversations,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  return useContext(
    AIContext
  );
}