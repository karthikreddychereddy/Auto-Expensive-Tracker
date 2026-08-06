import {
  FaPlus,
  FaTimes,
  FaCog,
} from "react-icons/fa";

import { useAI } from "../../../context/AIContext";
import { useProfile } from "../../../context/ProfileContext";

import ConversationList from "../history/ConversationList";

export default function AISidebar({
  open,
  onClose,
}) {
  const { newChat } = useAI();

  const { profile } = useProfile();

  function handleNewChat() {
    newChat();
    onClose();
  }

  const initials = `${profile?.firstName?.[0] || ""}${
    profile?.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-lg font-semibold text-slate-800">
            PaisaTrack AI
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* New Chat */}

        <div className="px-5 pb-4">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FaPlus />
            New Chat
          </button>
        </div>

        {/* Conversation List */}

        <div className="flex-1 overflow-y-auto">
          <ConversationList onClose={onClose} />
        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-100">
            {profile?.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                {initials || "U"}
              </div>
            )}

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-slate-800">
                {profile?.name || "User"}
              </p>

              <p className="text-xs text-slate-500">
                Personal Workspace
              </p>
            </div>

            <FaCog className="text-slate-400" />
          </button>
        </div>
      </aside>
    </>
  );
}