import { FaSearch } from "react-icons/fa";
import { useExpenses } from "../../context/ExpenseContext";

export default function ExpenseSearch() {
  const { search, setSearch } = useExpenses();

  return (
    <div className="relative w-full min-w-0">
      <FaSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by description, merchant, category, or payment method..."
        aria-label="Search expenses"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
      />
    </div>
  );
}
