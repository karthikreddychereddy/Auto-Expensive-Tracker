import { useMemo, useState } from "react";

import { useAI } from "../../../context/AIContext";

import ConversationItem from "./ConversationItem";
import ConversationSearch from "./ConversationSearch";
import ConversationSection from "./ConversationSection";

import { getConversationGroup } from "../../../utils/conversationUtils";

export default function ConversationList({

  onClose,

}) {

  const {
    conversations,
    activeConversationId,
    switchConversation,
    deleteConversation,
    renameConversation,
    togglePin,
    searchConversation,
    searchLoading,
  } = useAI();

  const [search, setSearch] = useState("");

  function handleSearch(value) {

    setSearch(value);

    searchConversation(value);

  }

  const grouped = useMemo(() => {

    const sorted = [...conversations].sort((a, b) => {

      if (a.pinned !== b.pinned) {

        return Number(b.pinned) - Number(a.pinned);

      }

      return (
        new Date(b.updatedAt) -
        new Date(a.updatedAt)
      );

    });

    const result = {};

    const pinned = sorted.filter(c => c.pinned);

    if (pinned.length > 0) {
      result["Pinned"] = pinned;
    }

    sorted
      .filter(c => !c.pinned)
      .forEach(conversation => {

        const group = getConversationGroup(
          conversation.updatedAt
        );

        if (!result[group]) {
          result[group] = [];
        }

        result[group].push(conversation);

      });

    return result;

  }, [conversations]);

  return (

    <>

      <ConversationSearch
          value={search}
          onChange={handleSearch}
      />
      {searchLoading && (
        <div className="px-4 py-3 text-sm text-slate-500">
          Searching conversations...
        </div>
      )}

      {!searchLoading && conversations.length === 0 && (

        <div className="px-4 py-6 text-center text-sm text-slate-500">

          No conversations found.

        </div>

      )}

      {Object.entries(grouped).map(([title, items]) => (

        <ConversationSection

          key={title}

          title={title}

        >

          {items.map((conversation) => (

            <ConversationItem

              key={conversation.id}

              conversation={conversation}

              active={

                conversation.id === activeConversationId

              }

              onSelect={() => {

                switchConversation(conversation.id);

                onClose();

              }}

              onDelete={() =>

                deleteConversation(conversation.id)

              }

              onRename={(newTitle) =>

                renameConversation(

                  conversation.id,

                  newTitle

                )

              }

              onPin={() =>

                togglePin(conversation.id)

              }

            />

          ))}

        </ConversationSection>

      ))}

    </>

  );

}