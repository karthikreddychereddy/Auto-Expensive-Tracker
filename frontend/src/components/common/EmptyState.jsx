import { FaInbox } from "react-icons/fa";

export default function EmptyState({
  icon,
  title = "Nothing here yet",
  description = "There is no data to display.",
  actionLabel,
  onAction,
  compact = false,
}) {
  return (
    <section
      aria-label={title}
      className={`
        flex w-full min-w-0 flex-col items-center justify-center rounded-2xl
        border border-dashed border-slate-200 bg-white px-4 text-center shadow-sm
        dark:border-slate-700 dark:bg-slate-900 sm:rounded-3xl sm:px-6
        ${compact ? "min-h-[200px] py-7 sm:min-h-[220px] sm:py-8" : "min-h-[260px] py-9 sm:min-h-[320px] sm:py-12"}
      `}
    >
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B6B57]/10 text-xl text-[#0B6B57] sm:h-16 sm:w-16 sm:text-2xl"
      >
        {icon || <FaInbox />}
      </div>

      <h3 className="mt-4 break-words text-lg font-bold text-slate-800 dark:text-white sm:mt-5 sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 max-w-md break-words text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 min-h-11 w-full rounded-xl bg-[#0B6B57] px-5 py-2.5 font-semibold text-white transition hover:bg-[#095544] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:mt-6 sm:w-auto"
        >
          {actionLabel}
        </button>
      )}
    </section>
  );
}
