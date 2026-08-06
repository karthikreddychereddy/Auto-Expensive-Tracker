import { useEffect, useRef } from "react";

export default function ComposerTextarea({

  value,
  onChange,
  onSubmit,

}) {

  const textareaRef = useRef(null);

  useEffect(() => {

    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      180
    )}px`;

  }, [value]);

  function handleKeyDown(e) {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      if (value.trim()) {

        onSubmit(e);

      }

    }

  }

  return (

    <textarea

      ref={textareaRef}

      rows={1}

      value={value}

      onChange={(e) => onChange(e.target.value)}

      onKeyDown={handleKeyDown}

      placeholder="Ask PaisaTrack AI anything..."

      className="
        flex-1
        resize-none
        overflow-y-auto
        bg-transparent
        py-1
        text-[15px]
        leading-7
        text-slate-800
        placeholder:text-slate-400
        focus:outline-none
        scrollbar-thin
      "

      style={{

        minHeight: "28px",
        maxHeight: "180px",

      }}

    />

  );

}