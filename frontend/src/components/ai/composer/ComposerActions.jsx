import {
  FaPaperclip,
  FaMicrophone,
} from "react-icons/fa";

export default function ComposerActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        title="Attach file"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-700
        "
      >
        <FaPaperclip size={15} />
      </button>

      <button
        type="button"
        title="Voice"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          text-slate-500
          transition
          hover:bg-slate-100
          hover:text-slate-700
        "
      >
        <FaMicrophone size={15} />
      </button>
    </div>
  );
}