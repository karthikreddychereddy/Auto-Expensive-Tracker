import {
  FaPlus,
  FaTimes,
  FaCog,
  FaRobot,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAI,
} from "../../../context/AIContext";

import {
  useProfile,
} from "../../../context/ProfileContext";

import ConversationList from "../history/ConversationList";

export default function AISidebar({
  open,
  onClose,
}) {
  const {
    newChat,
  } = useAI();

  const {
    profile,
  } = useProfile();

  const navigate =
    useNavigate();

  async function handleNewChat() {
    await newChat();

    onClose?.();
  }

  const initials =
    `${profile?.firstName?.[0] || ""}${
      profile?.lastName?.[0] || ""
    }`
      .toUpperCase() ||
    "PT";

  const displayName =
    profile?.name ||
    `${profile?.firstName || ""} ${
      profile?.lastName || ""
    }`.trim() ||
    "PaisaTrack User";

  const photo =
    profile?.photo ||
    profile?.profileImage ||
    null;

  function openSettings() {
    onClose?.();

    navigate(
      "/settings"
    );
  }

  return (
    <>
      <div
        onClick={
          onClose
        }
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
          transition-opacity
          duration-300
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-full
          w-[min(320px,88vw)]
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          dark:border-slate-700
          dark:bg-slate-900
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-700">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-[#0B6B57]">
              <FaRobot />
            </div>

            <h2 className="font-semibold text-slate-800 dark:text-white">
              PaisaTrack AI
            </h2>

          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            aria-label="Close AI sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaTimes />
          </button>

        </div>

        {/* New Chat */}

        <div className="px-4 py-4">

          <button
            type="button"
            onClick={
              handleNewChat
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0B6B57]
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#095544]
            "
          >
            <FaPlus />

            New Chat
          </button>

        </div>

        {/* Conversations */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ConversationList
            onClose={
              onClose
            }
          />
        </div>

        {/* Profile */}

        <div className="shrink-0 border-t border-slate-200 p-4 dark:border-slate-700">

          <button
            type="button"
            onClick={
              openSettings
            }
            className="flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {photo ? (
              <img
                src={photo}
                alt={displayName}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B6B57]/10 font-semibold text-[#0B6B57]">
                {initials}
              </div>
            )}

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                {displayName}
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                Personal Workspace
              </p>

            </div>

            <FaCog className="shrink-0 text-slate-400" />

          </button>

        </div>

      </aside>
    </>
  );
}