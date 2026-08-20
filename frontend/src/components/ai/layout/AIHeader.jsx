import {
  FaBars,
  FaRobot,
} from "react-icons/fa";

export default function AIHeader({
  onMenuClick,
}) {
  return (
    <header
      className="
        flex
        h-16
        shrink-0
        items-center
        px-5
        sm:px-7
      "
    >
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open AI conversation history"
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-slate-600
          transition
          hover:bg-slate-200/70
          dark:text-slate-300
          dark:hover:bg-slate-800
        "
      >
        <FaBars size={17} />
      </button>

      <div className="ml-3 flex min-w-0 items-center gap-3">

        <div
          className="
            hidden
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#0B6B57]/10
            text-[#0B6B57]
            sm:flex
          "
        >
          <FaRobot />
        </div>

        <div className="min-w-0">

          <h1 className="truncate text-base font-semibold text-slate-800 dark:text-white sm:text-lg">
            PaisaTrack AI
          </h1>

          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Your personal financial advisor
          </p>

        </div>

      </div>
    </header>
  );
}