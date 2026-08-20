import { FaSearch } from "react-icons/fa";

export default function ConversationSearch({ value, onChange }) {
  return (
    <div className="px-3 py-3 sm:px-4">
      <div className="relative min-w-0">
        <FaSearch
          aria-hidden="true"
          size={14}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search conversations..."
          aria-label="Search conversations"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 text-sm"
        />
      </div>
    </div>
  );
}
