import {
  useRef,
  useState,
} from "react";

import {
  FaPaperPlane,
  FaMicrophone,
  FaPaperclip,
  FaTimes,
  FaFileAlt,
  FaStop,
} from "react-icons/fa";

import ComposerTextarea from "./ComposerTextarea";

export default function ChatComposer({
  value,
  onChange,
  onSubmit,
  loading,
  selectedFile,
  onFileChange,
  onRemoveFile,
  onStop,
}) {
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const [fileError, setFileError] =
    useState("");

  const [listening, setListening] =
    useState(false);

  const [voiceError, setVoiceError] =
    useState("");

  const MAX_FILE_SIZE =
    10 * 1024 * 1024;

  const allowedExtensions = [
    "pdf",
    "txt",
    "csv",
    "jpg",
    "jpeg",
    "png",
    "webp",
    "docx",
    "xlsx",
    "xls",
  ];

  function handleFileSelect(event) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileError("");

    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase();

    if (
      !extension ||
      !allowedExtensions.includes(extension)
    ) {
      setFileError(
        "Unsupported file type."
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        "File size must be below 10 MB."
      );

      event.target.value = "";
      return;
    }

    onFileChange?.(file);
  }

  function removeFile() {
    setFileError("");

    onRemoveFile?.();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      loading ||
      (!value.trim() && !selectedFile)
    ) {
      return;
    }

    if (listening) {
      stopListening();
    }

    onSubmit?.(event);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  function startListening() {
    setVoiceError("");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Voice input is not supported in this browser."
      );

      return;
    }

    if (listening) {
      stopListening();
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognitionRef.current =
      recognition;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    let finalTranscript = "";

    recognition.onstart = () => {
      setListening(true);
      setVoiceError("");
    };

    recognition.onresult = event => {
      let interimTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript =
          event.results[i][0].transcript;

        if (
          event.results[i].isFinal
        ) {
          finalTranscript +=
            transcript + " ";
        } else {
          interimTranscript +=
            transcript;
        }
      }

      const recognizedText =
        (
          finalTranscript +
          interimTranscript
        ).trim();

      if (!recognizedText) {
        return;
      }

      const existingText =
        value.trim();

      const nextValue =
        existingText
          ? `${existingText} ${recognizedText}`
          : recognizedText;

      onChange?.(nextValue);
    };

    recognition.onerror = event => {
      if (
        event.error === "not-allowed"
      ) {
        setVoiceError(
          "Microphone permission was denied."
        );
      } else if (
        event.error === "no-speech"
      ) {
        setVoiceError(
          "No speech was detected."
        );
      } else if (
        event.error === "audio-capture"
      ) {
        setVoiceError(
          "No microphone was found."
        );
      } else {
        setVoiceError(
          "Unable to use voice input."
        );
      }

      setListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Unable to start speech recognition:",
        error
      );

      setVoiceError(
        "Unable to start voice input."
      );

      setListening(false);
    }
  }

  function stopListening() {
    if (
      recognitionRef.current
    ) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error(
          "Unable to stop speech recognition:",
          error
        );
      }
    }

    setListening(false);
  }

  return (
    <div className="bg-transparent px-6 pb-5 pt-2">

      <div className="mx-auto max-w-4xl">

        {selectedFile && (
          <div className="mb-2 flex">
            <div
              className="
                flex
                max-w-md
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                shadow-sm
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                "
              >
                <FaFileAlt size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-gray-800
                    dark:text-white
                  "
                >
                  {selectedFile.name}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {formatFileSize(
                    selectedFile.size
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="
                  rounded-lg
                  p-2
                  text-gray-400
                  transition
                  hover:bg-gray-200
                  hover:text-gray-700
                  dark:hover:bg-slate-700
                "
                title="Remove attachment"
              >
                <FaTimes size={13} />
              </button>
            </div>
          </div>
        )}

        {fileError && (
          <p className="mb-2 text-sm text-red-500">
            {fileError}
          </p>
        )}

        {voiceError && (
          <p className="mb-2 text-sm text-red-500">
            {voiceError}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className={`
            flex
            items-end
            gap-3
            rounded-[28px]
            border
            bg-white
            px-4
            py-3
            shadow-sm
            transition
            dark:bg-slate-900
            ${
              listening
                ? "border-red-300 ring-2 ring-red-100"
                : "border-gray-300 focus-within:border-gray-400"
            }
          `}
        >

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".pdf,.txt,.csv,.jpg,.jpeg,.png,.webp,.docx,.xlsx,.xls"
            onChange={handleFileSelect}
          />

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={loading}
            className="
              rounded-lg
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
              dark:hover:bg-slate-800
            "
            title="Attach file"
          >
            <FaPaperclip size={16} />
          </button>

          <ComposerTextarea
            value={value}
            onChange={onChange}
            onSubmit={handleSubmit}
          />

          <button
            type="button"
            onClick={startListening}
            disabled={loading}
            className={`
              relative
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              transition-all
              duration-200
              disabled:cursor-not-allowed
              disabled:opacity-40
              ${
                listening
                  ? "scale-105 bg-red-500 text-white shadow-md shadow-red-200"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
            title={
              listening
                ? "Stop voice input"
                : "Voice input"
            }
          >
            {listening && (
              <span
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-red-400
                  opacity-40
                  animate-ping
                "
              />
            )}

            <FaMicrophone
              size={16}
              className="relative z-10"
            />
          </button>

          {loading ? (
            <button
              type="button"
              onClick={onStop}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-black
                text-white
                transition
                hover:bg-gray-800
              "
              title="Stop generating"
            >
              <FaStop size={13} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={
                !value.trim() &&
                !selectedFile
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#0B6B57]
                text-white
                transition
                hover:bg-[#095544]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
              title="Send"
            >
              <FaPaperPlane size={14} />
            </button>
          )}

        </form>

        <p className="mt-2 text-center text-[11px] text-gray-400">
          PaisaTrack AI can make mistakes. Verify important financial decisions.
        </p>

      </div>

    </div>
  );
}