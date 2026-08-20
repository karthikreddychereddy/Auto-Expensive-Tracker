import {
  useEffect,
  useState,
} from "react";

import {
  FaCheck,
  FaCopy,
  FaRedo,
  FaThumbsDown,
  FaThumbsUp,
  FaVolumeUp,
  FaStop,
} from "react-icons/fa";

import toast from "react-hot-toast";

export default function MessageActions({
  message,
  onRegenerate,
}) {
  const [copied, setCopied] =
    useState(false);

  const [feedback, setFeedback] =
    useState(null);

  const [speaking, setSpeaking] =
    useState(false);

  useEffect(() => {
    return () => {
      if (
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ==========================================
  // COPY MESSAGE
  // ==========================================

  async function copyMessage() {
    if (!message?.content) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        message.content
      );

      setCopied(true);

      toast.success(
        "Copied to clipboard"
      );

      setTimeout(() => {
        setCopied(false);
      }, 1800);

    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );

      toast.error(
        "Copy failed"
      );
    }
  }

  // ==========================================
  // CLEAN MARKDOWN FOR SPEECH
  // ==========================================

  function cleanTextForSpeech(text) {
    if (!text) {
      return "";
    }

    return text
      .replace(
        /```[\s\S]*?```/g,
        " "
      )
      .replace(
        /`([^`]+)`/g,
        "$1"
      )
      .replace(
        /\[([^\]]+)\]\([^)]+\)/g,
        "$1"
      )
      .replace(
        /^#{1,6}\s+/gm,
        ""
      )
      .replace(
        /[*_~]/g,
        ""
      )
      .replace(
        /\|/g,
        ", "
      )
      .replace(
        /-{3,}/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();
  }

  // ==========================================
  // READ ALOUD
  // ==========================================

  function handleSpeak() {
    if (
      !(
        "speechSynthesis" in window
      )
    ) {
      toast.error(
        "Read aloud is not supported in this browser."
      );

      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();

      setSpeaking(false);

      return;
    }

    const cleanText =
      cleanTextForSpeech(
        message?.content
      );

    if (!cleanText) {
      toast.error(
        "Nothing to read aloud."
      );

      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        cleanText
      );

    utterance.lang =
      "en-IN";

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart =
      () => {
        setSpeaking(true);
      };

    utterance.onend =
      () => {
        setSpeaking(false);
      };

    utterance.onerror =
      event => {
        if (
          event.error !==
            "canceled" &&
          event.error !==
            "interrupted"
        ) {
          console.error(
            "Speech synthesis error:",
            event.error
          );
        }

        setSpeaking(false);
      };

    window.speechSynthesis.speak(
      utterance
    );
  }

  // ==========================================
  // FEEDBACK
  // ==========================================

  function handleLike() {
    setFeedback(previous =>
      previous === "like"
        ? null
        : "like"
    );
  }

  function handleDislike() {
    setFeedback(previous =>
      previous === "dislike"
        ? null
        : "dislike"
    );
  }

  // ==========================================
  // DON'T SHOW ACTIONS FOR EMPTY STREAM
  // ==========================================

  if (
    !message?.content?.trim()
  ) {
    return null;
  }

  return (
    <div
      className="
        mt-2
        flex
        flex-wrap
        items-center
        gap-1
        text-slate-400
      "
    >
      {/* COPY */}

      <ActionButton
        onClick={copyMessage}
        title={
          copied
            ? "Copied"
            : "Copy"
        }
        active={copied}
        activeClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300"
      >
        {copied ? (
          <FaCheck size={13} />
        ) : (
          <FaCopy size={13} />
        )}
      </ActionButton>

      {/* LIKE */}

      <ActionButton
        onClick={handleLike}
        title="Good response"
        active={
          feedback === "like"
        }
        activeClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300"
      >
        <FaThumbsUp size={13} />
      </ActionButton>

      {/* DISLIKE */}

      <ActionButton
        onClick={handleDislike}
        title="Bad response"
        active={
          feedback ===
          "dislike"
        }
        activeClass="bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300"
      >
        <FaThumbsDown size={13} />
      </ActionButton>

      {/* READ ALOUD */}

      <ActionButton
        onClick={handleSpeak}
        title={
          speaking
            ? "Stop reading"
            : "Read aloud"
        }
        active={speaking}
        activeClass="bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300"
      >
        {speaking ? (
          <FaStop size={12} />
        ) : (
          <FaVolumeUp size={14} />
        )}
      </ActionButton>

      {/* REGENERATE */}

      <ActionButton
        onClick={
          onRegenerate
        }
        title="Regenerate response"
      >
        <FaRedo size={13} />
      </ActionButton>

    </div>
  );
}

function ActionButton({
  children,
  onClick,
  title,
  active = false,
  activeClass = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        transition
        duration-150
        ${
          active
            ? activeClass
            : `
              text-slate-400
              hover:bg-slate-200/60
              hover:text-slate-700
              dark:text-slate-500
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            `
        }
      `}
    >
      {children}
    </button>
  );
}