export default function PageLoader({
  message = "Loading...",
  fullPage = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`
        flex w-full items-center justify-center px-4
        ${fullPage ? "min-h-screen" : "min-h-[240px] sm:min-h-[320px]"}
      `}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative h-11 w-11 sm:h-12 sm:w-12" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#0B6B57]" />
        </div>

        <p className="max-w-sm text-sm font-medium text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}
