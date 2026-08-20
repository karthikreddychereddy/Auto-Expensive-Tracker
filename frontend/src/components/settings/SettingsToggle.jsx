export default function SettingsToggle({
  checked = false,
  onChange,
  disabled = false,
  label = "Toggle setting",
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`
        relative inline-flex h-7 w-[52px] min-w-[52px] shrink-0 items-center
        rounded-full border-0 p-0 transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57]
        focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
        ${checked ? "bg-[#0B6B57]" : "bg-slate-300 dark:bg-slate-600"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md
          transition-transform duration-200 ease-out
          ${checked ? "translate-x-6" : "translate-x-0"}
        `}
      />
    </button>
  );
}
