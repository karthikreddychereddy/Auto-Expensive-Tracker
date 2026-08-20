import {
  useState,
} from "react";

import {
  useAI,
} from "../context/AIContext";

import AIHeader from "../components/ai/layout/AIHeader";
import AISidebar from "../components/ai/layout/AISidebar";

import ChatWindow from "../components/ai/chat/ChatWindow";
import ChatComposer from "../components/ai/composer/ChatComposer";

import PageLoader from "../components/common/PageLoader";

export default function AIAdvisor() {
  const {
    messages,
    loading,
    initialized,
    sendMessage,
    stopGenerating,
  } = useAI();

  const [
    input,
    setInput,
  ] = useState("");

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  async function handleSubmit(
    event
  ) {
    event?.preventDefault?.();

    if (
      !input.trim() &&
      !selectedFile
    ) {
      return;
    }

    try {
      await sendMessage(
        input,
        selectedFile
      );

      setInput("");
      setSelectedFile(
        null
      );
    } catch (error) {
      console.error(
        "Failed to send AI message",
        error
      );
    }
  }

  if (!initialized) {
    return (
      <PageLoader message="Loading PaisaTrack AI..." />
    );
  }

  return (
    <div
      className="
        relative
        flex
        h-full
        min-h-0
        overflow-hidden
        bg-[#f7f8fa]
        dark:bg-slate-950
      "
    >
      <AISidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div
        className="
          flex
          h-full
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >
        <AIHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <div
          className="
            relative
            flex
            min-h-0
            flex-1
            flex-col
            overflow-hidden
          "
        >
          <ChatWindow
            messages={messages}
            loading={loading}
            sendMessage={
              sendMessage
            }
          />

          <ChatComposer
            value={input}
            onChange={setInput}
            onSubmit={
              handleSubmit
            }
            loading={loading}
            selectedFile={
              selectedFile
            }
            onFileChange={
              setSelectedFile
            }
            onRemoveFile={() =>
              setSelectedFile(
                null
              )
            }
            onStop={
              stopGenerating
            }
          />
        </div>
      </div>
    </div>
  );
}