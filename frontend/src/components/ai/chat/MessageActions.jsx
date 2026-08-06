import { useState } from "react";
import {
  FaCheck,
  FaCopy,
  FaRedo,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";

import toast from "react-hot-toast";

export default function MessageActions({
  message,
  onRegenerate,
}) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      toast.success("Copied to clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch {
      toast.error("Copy failed");
    }
  }

  function handleLike() {
    setFeedback(previous =>
      previous === "like" ? null : "like"
    );
  }

  function handleDislike() {
    setFeedback(previous =>
      previous === "dislike" ? null : "dislike"
    );
  }

  return (
    <div className="mt-3 flex items-center gap-2 pl-2 opacity-0 transition-all duration-200 group-hover:opacity-100">

      <button
        onClick={copyMessage}
        title="Copy"
        className={`rounded-lg p-2 transition ${
          copied
            ? "bg-green-100 text-green-600"
            : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        {copied ? (
          <FaCheck size={13} />
        ) : (
          <FaCopy size={13} />
        )}
      </button>

      <button
        onClick={onRegenerate}
        title="Regenerate"
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <FaRedo size={13} />
      </button>

      <button
        onClick={handleLike}
        title="Good response"
        className={`rounded-lg p-2 transition ${
          feedback === "like"
            ? "bg-green-100 text-green-600"
            : "text-slate-400 hover:bg-green-50 hover:text-green-600"
        }`}
      >
        <FaThumbsUp size={13} />
      </button>

      <button
        onClick={handleDislike}
        title="Bad response"
        className={`rounded-lg p-2 transition ${
          feedback === "dislike"
            ? "bg-red-100 text-red-600"
            : "text-slate-400 hover:bg-red-50 hover:text-red-600"
        }`}
      >
        <FaThumbsDown size={13} />
      </button>

    </div>
  );
}