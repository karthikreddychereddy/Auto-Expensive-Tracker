import {
  FaFileAlt,
  FaFilePdf,
  FaFileCsv,
  FaFileExcel,
  FaFileWord,
  FaImage,
} from "react-icons/fa";
import MarkdownRenderer from "../common/MarkdownRenderer";
import MessageActions from "./MessageActions";

import {
  useAI,
} from "../../../context/AIContext";

export default function ChatMessage({
  message,
}) {
  const isUser =
    message.role === "user";

  const {
    regenerateLastResponse,
  } = useAI();

  function formatFileSize(bytes) {
    if (
      bytes === null ||
      bytes === undefined
    ) {
      return "";
    }

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

  function getExtension(filename) {
    if (!filename) {
      return "";
    }

    const parts =
      filename.split(".");

    if (parts.length < 2) {
      return "";
    }

    return parts
      .pop()
      .toLowerCase();
  }

  function getFileIcon(
    filename,
    attachmentType
  ) {
    const extension =
      getExtension(filename);

    if (
      extension === "pdf" ||
      attachmentType ===
        "application/pdf"
    ) {
      return (
        <FaFilePdf className="text-red-500" />
      );
    }

    if (extension === "csv") {
      return (
        <FaFileCsv className="text-emerald-600" />
      );
    }

    if (
      extension === "xls" ||
      extension === "xlsx"
    ) {
      return (
        <FaFileExcel className="text-emerald-600" />
      );
    }

    if (
      extension === "doc" ||
      extension === "docx"
    ) {
      return (
        <FaFileWord className="text-blue-600" />
      );
    }

    if (
      attachmentType?.startsWith(
        "image/"
      ) ||
      [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ].includes(extension)
    ) {
      return (
        <FaImage className="text-purple-500" />
      );
    }

    return (
      <FaFileAlt className="text-slate-500" />
    );
  }

  function getFileLabel(filename) {
    const extension =
      getExtension(filename);

    return extension
      ? extension.toUpperCase()
      : "FILE";
  }

  return (
    <div
      className={`
        flex
        w-full
        min-w-0
        gap-3
        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className={`
          min-w-0
          ${
            isUser
              ? "max-w-[75%]"
              : "max-w-[850px]"
          }
        `}
      >
        {isUser ? (
          <div className="flex flex-col items-end gap-2">

            {message.hasAttachment &&
              message.attachmentName && (
                <div
                  className="
                    flex
                    max-w-[420px]
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    shadow-sm
                    dark:border-slate-700
                    dark:bg-slate-900
                  "
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getFileIcon(
                      message.attachmentName,
                      message.attachmentType
                    )}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {
                        message.attachmentName
                      }
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">

                      <span>
                        {getFileLabel(
                          message.attachmentName
                        )}
                      </span>

                      {message.attachmentSize !=
                        null && (
                        <>
                          <span>•</span>

                          <span>
                            {formatFileSize(
                              message.attachmentSize
                            )}
                          </span>
                        </>
                      )}

                    </div>

                  </div>
                </div>
              )}

            {message.content && (
              <div
                className="
                  rounded-2xl
                  rounded-br-md
                  bg-[#0B6B57]
                  px-5
                  py-3
                  text-white
                "
              >
                <p className="whitespace-pre-wrap break-words text-[15px] leading-7">
                  {message.content}
                </p>
              </div>
            )}

          </div>
        ) : (
          <div>

            <div
              className="
                min-w-0
                px-1
                py-1
                text-slate-800
                dark:text-slate-100
              "
            >
              <MarkdownRenderer
                content={message.content}
              />
            </div>

            <MessageActions
              message={message}
              onRegenerate={
                regenerateLastResponse
              }
            />

          </div>
        )}
      </div>

    </div>
  );
}