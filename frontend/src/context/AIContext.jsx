import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

  const [conversations, setConversations] = useState([]);

  const [activeConversationId, setActiveConversationId] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const [initialized, setInitialized] =
    useState(false);
  
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {

    loadConversations();

  }, []);

  async function loadConversations() {

    try {

      const data =
        await aiService.getConversations();

      setConversations(data);

      if (data.length > 0) {

        setActiveConversationId(data[0].id);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setInitialized(true);

    }

  }

  async function searchConversations(keyword) {

    if (!keyword.trim()) {

      loadConversations();

      return;

    }

    setSearchLoading(true);

    try {

      const data =
        await aiService.searchConversations(keyword);

      setConversations(data);

    } catch (error) {

      console.error(error);

    } finally {

      setSearchLoading(false);

    }

  }

  let searchTimer;

  function searchConversation(keyword) {  

    clearTimeout(searchTimer);

    searchTimer = setTimeout(() => {

      searchConversations(keyword);

    }, 300);

  }


  const activeConversation = useMemo(() => {

    return conversations.find(

      conversation =>
        conversation.id === activeConversationId

    ) ?? null;

  }, [

    conversations,
    activeConversationId,

  ]);

  const messages =
    activeConversation?.messages ?? [];

  async function streamResponse(
    conversationId,
    text
  ) {

    let current = "";

    const assistantId =
      "stream-" + Date.now();

    setConversations(previous =>

      previous.map(conversation => {

        if (conversation.id !== conversationId) {

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

    for (const character of text) {

      current += character;

      setConversations(previous =>

        previous.map(conversation => {

          if (
            conversation.id !== conversationId
          ) {

            return conversation;

          }

          return {

            ...conversation,

            messages:
              conversation.messages.map(message =>

                message.id === assistantId

                  ? {

                      ...message,

                      content: current,

                    }

                  : message

              ),

          };

        })

      );

      await new Promise(resolve =>
        setTimeout(resolve, 3)
      );

    }

  }

  async function sendMessage(text) {

    if (!text.trim()) {

      return;

    }

    let conversationId =
      activeConversationId;

    if (!conversationId) {

      const conversation =
        await aiService.createConversation();

      conversationId = conversation.id;

      setConversations(previous => [
        conversation,
        ...previous,
      ]);

      setActiveConversationId(
        conversation.id
      );

    }

    const userMessage = {

      id: Date.now(),

      role: "user",

      content: text,

      createdAt:
        new Date().toISOString(),

    };

    setConversations(previous =>

      previous.map(conversation => {

        if (
          conversation.id !== conversationId
        ) {

          return conversation;

        }

        return {

          ...conversation,

          title:

            conversation.messages.length === 0

              ? generateTitle(text)

              : conversation.title,

          messages: [

            ...conversation.messages,

            userMessage,

          ],

        };

      })

    );

    setLoading(true);

    try {

      const response = await aiService.chat(
        text,
        conversationId
      );

      await streamResponse(

        conversationId,

        response.reply

      );
      setConversations(previous =>
        previous.map(conversation =>
          conversation.id === conversationId
            ? response.conversation
            : conversation
        )
      );

    } catch (error) {

      console.error(error);

      const errorMessage = {

        id: Date.now(),

        role: "assistant",

        content: "Unable to contact AI.",

        createdAt: new Date().toISOString(),

      };

      setConversations(previous =>

        previous.map(conversation => {

          if (conversation.id !== conversationId) {

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

    } finally {

      setLoading(false);

    }

  }

  async function regenerateLastResponse() {

    if (!activeConversation) {
      return;
    }

    const messages = activeConversation.messages;

    if (messages.length < 2) {
      return;
    }

    const assistant =
      messages[messages.length - 1];

    const user =
      messages[messages.length - 2];

    if (
      assistant.role !== "assistant" ||
      user.role !== "user"
    ) {
      return;
    }

    setConversations(previous =>
      previous.map(conversation => {

        if (
          conversation.id !== activeConversationId
        ) {
          return conversation;
        }

        return {

          ...conversation,

          messages:
            conversation.messages.slice(
              0,
              conversation.messages.length - 1
            ),

        };

      })
    );

    setLoading(true);

    try {

      const response =
        await aiService.chat({

          message: user.content,

          conversationId:
            activeConversationId,

        });

      await streamResponse(

        activeConversationId,

        response.reply

      );

      setConversations(previous =>
        previous.map(conversation =>

          conversation.id ===
          activeConversationId

            ? {
                ...conversation,
                ...response.conversation,
              }

            : conversation

        )
      );

    } catch (error) {

      console.error(error);

      toast.error("Failed to regenerate");

    } finally {

      setLoading(false);

    }

  }

  async function newChat() {

    try {

      const conversation =
        await aiService.createConversation();

      setConversations(previous => [

        conversation,

        ...previous,

      ]);

      setActiveConversationId(conversation.id);

    } catch (error) {

      console.error(error);

    }

  }

  function switchConversation(id) {

    setActiveConversationId(id);

  }

  async function deleteConversation(id) {

    try {

      await aiService.deleteConversation(id);

      const updated = conversations.filter(

        conversation => conversation.id !== id

      );

      setConversations(updated);

      if (

        activeConversationId === id &&

        updated.length > 0

      ) {

        setActiveConversationId(updated[0].id);

      }

      if (updated.length === 0) {

        setActiveConversationId(null);

      }

    } catch (error) {

      console.error(error);

    }

  }

  async function renameConversation(id, title) {

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

      console.error(error);

    }

  }

  async function togglePin(id) {

    try {

      const conversation =

        conversations.find(c => c.id === id);

      if (!conversation) return;

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

      console.error(error);

    }

  }

  function clearAllChats() {

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
        regenerateLastResponse,

        newChat,

        switchConversation,

        deleteConversation,

        renameConversation,

        togglePin,
        
        searchConversation,

        clearAllChats,

        reloadConversations: loadConversations,

      }}

    >

      {children}

    </AIContext.Provider>

  );

}

export function useAI() {

  return useContext(AIContext);

}