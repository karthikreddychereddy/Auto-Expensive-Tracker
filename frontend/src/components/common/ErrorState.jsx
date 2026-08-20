import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
  compact = false,
}) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className={`
        flex w-full min-w-0 flex-col items-center justify-center rounded-2xl
        border border-red-100 bg-white px-4 text-center shadow-sm
        dark:border-red-900/40 dark:bg-slate-900 sm:rounded-3xl sm:px-6
        ${compact ? "min-h-[200px] py-7 sm:min-h-[220px] sm:py-8" : "min-h-[260px] py-9 sm:min-h-[320px] sm:py-12"}
      `}
    >
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-500 dark:bg-red-950/30 sm:h-16 sm:w-16 sm:text-2xl"
      >
        <FaExclamationTriangle />
      </div>

      <h3 className="mt-4 break-words text-lg font-bold text-slate-800 dark:text-white sm:mt-5 sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 max-w-md break-words text-sm leading-6 text-slate-500 dark:text-slate-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57] focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900 sm:mt-6 sm:w-auto"
        >
          <FaRedo size={13} aria-hidden="true" />
          Try Again
        </button>
      )}
    </section>
  );
}
