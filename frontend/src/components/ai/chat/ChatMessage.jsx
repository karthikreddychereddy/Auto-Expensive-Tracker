import Avatar from "../common/Avatar";
import MarkdownRenderer from "../common/MarkdownRenderer";
import MessageActions from "./MessageActions";
import { useAI } from "../../../context/AIContext";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  const { regenerateLastResponse } = useAI();

  return (
    <div
      className={`flex w-full items-end gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Avatar role="assistant" />}

      <div
        className={`group w-fit max-w-[850px] ${
          isUser ? "ml-auto" : "mr-auto"
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            isUser
              ? "rounded-[28px] rounded-br-lg bg-blue-600 px-6 py-4 text-white shadow-sm"
              : "rounded-[28px] rounded-bl-lg border border-slate-200 bg-white px-7 py-5 shadow-sm"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words text-[15px] leading-7">
              {message.content}
            </p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {!isUser && <MessageActions
                      message={message}
                      onRegenerate={regenerateLastResponse}
                    />}
      </div>

      {isUser && <Avatar role="user" />}
    </div>
  );
}