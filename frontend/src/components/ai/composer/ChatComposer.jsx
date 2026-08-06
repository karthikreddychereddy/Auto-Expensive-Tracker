import {
  FaPaperPlane,
  FaMicrophone,
  FaPaperclip,
} from "react-icons/fa";

import ComposerTextarea from "./ComposerTextarea";

export default function ChatComposer({

  value,
  onChange,
  onSubmit,
  loading,

}) {

  return (

    <div className="bg-white px-6 pb-5 pt-2">

      <p className="mt-2 text-center text-[11px] text-gray-400">
          PaisaTrack AI can make mistakes. Verify important financial decisions.
      </p>
      <div className="mx-auto max-w-4xl">

        <form
          onSubmit={onSubmit}
          className="
            flex
            items-end
            gap-3
            rounded-[28px]
            border
            border-gray-300
            bg-white
            px-4
            py-3
            transition
            focus-within:border-gray-400
          "
        >

          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <FaPaperclip size={16} />
          </button>

          <ComposerTextarea
            value={value}
            onChange={onChange}
            onSubmit={onSubmit}
          />

          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <FaMicrophone size={16} />
          </button>

          

          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-black
              text-white
              transition
              hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FaPaperPlane size={14} />
          </button>

        </form>

      </div>

    </div>

  );

}