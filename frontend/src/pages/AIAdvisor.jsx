import { useState } from "react";
import { useAI } from "../context/AIContext";
import AIHeader from "../components/ai/layout/AIHeader";
import AISidebar from "../components/ai/layout/AISidebar";

import ChatWindow from "../components/ai/chat/ChatWindow";
import ChatComposer from "../components/ai/composer/ChatComposer";

export default function AIAdvisor() {

  const {
    messages,
    loading,
    sendMessage,
  } = useAI();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    if (!input.trim()) return;

    await sendMessage(input);

    setInput("");

  }

  return (

    <div className="relative flex h-full overflow-hidden bg-slate-50">

      <AISidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">

        <AIHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">

          <ChatWindow
            messages={messages}
            loading={loading}
            sendMessage={sendMessage}
          />

          <ChatComposer
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>

      </div>

    </div>

  );

}