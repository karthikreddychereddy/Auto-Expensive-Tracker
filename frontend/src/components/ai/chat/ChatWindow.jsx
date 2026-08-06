import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import WelcomeScreen from "./WelcomeScreen";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({

  messages = [],
  loading = false,
  sendMessage,

}) {

  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages, loading]);

  return (

    <div className="relative flex-1 overflow-hidden bg-transparent">

      <div
        ref={scrollRef}
        className="h-full overflow-y-auto bg-transparent"
      >

        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col bg-transparent px-8 pt-10 pb-44">

          {messages.length === 0 ? (

            <WelcomeScreen sendMessage={sendMessage} />

          ) : (

            <div className="space-y-8">

              {messages.map((message) => (

                <ChatMessage
                  key={message.id}
                  message={message}
                />

              ))}

              {loading && <TypingIndicator />}

            </div>

          )}

          <div ref={bottomRef} />

        </div>

      </div>

    </div>

  );

}