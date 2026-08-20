import { FaSearch } from "react-icons/fa";
import { useGoal } from "../../context/GoalContext";

export default function GoalToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter } = useGoal();

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="relative min-w-0">
        <FaSearch
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search goals..."
          aria-label="Search goals"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
        aria-label="Filter goals by status"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:[color-scheme:dark] lg:w-48"
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>
    </div>
  );
}
