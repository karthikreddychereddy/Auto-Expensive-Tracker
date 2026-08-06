import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaThumbtack,
} from "react-icons/fa";

import { useEffect, useState } from "react";

export default function ConversationItem({

  conversation,
  active,
  onSelect,
  onDelete,
  onRename,
  onPin,

}) {

  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(conversation.title);

  useEffect(() => {

    setTitle(conversation.title);

  }, [conversation.title]);

  function handleSave() {

    const newTitle = title.trim();

    if (!newTitle) {

      setTitle(conversation.title);

      setEditing(false);

      return;

    }

    onRename(newTitle);

    setEditing(false);

  }

  function handleCancel() {

    setTitle(conversation.title);

    setEditing(false);

  }

  return (

    <div
      className={`group mx-2 mb-1 flex items-center rounded-xl transition ${
        active
          ? "bg-blue-100"
          : "hover:bg-slate-100"
      }`}
    >

      {editing ? (

        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSave();

            }

            if (e.key === "Escape") {

              handleCancel();

            }

          }}
          className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
        />

      ) : (

        <button
          onClick={onSelect}
          className="flex-1 truncate px-3 py-3 text-left text-sm"
        >

          {conversation.title}

        </button>

      )}

      {editing ? (

        <>

          <button
            onClick={handleSave}
            className="mr-2 text-green-600 hover:text-green-700"
          >

            <FaCheck size={12} />

          </button>

          <button
            onClick={handleCancel}
            className="mr-2 text-slate-500 hover:text-red-500"
          >

            <FaTimes size={12} />

          </button>

        </>

      ) : (

        <>

          <button
            onClick={onPin}
            className={`mr-2 transition ${
              conversation.pinned
                ? "text-amber-500 opacity-100"
                : "opacity-0 group-hover:opacity-100 hover:text-amber-500"
            }`}
          >

            <FaThumbtack size={12} />

          </button>

          <button
            onClick={() => setEditing(true)}
            className="mr-2 opacity-0 transition group-hover:opacity-100 hover:text-blue-600"
          >

            <FaEdit size={12} />

          </button>

          <button
            onClick={() => {

              if (

                window.confirm(

                  "Delete this conversation?"

                )

              ) {

                onDelete();

              }

            }}
            className="mr-3 opacity-0 transition group-hover:opacity-100 hover:text-red-500"
          >

            <FaTrash size={12} />

          </button>

        </>

      )}

    </div>

  );

}