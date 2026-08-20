import { FaSearch } from "react-icons/fa";

import {
  useExpenses,
} from "../../context/ExpenseContext";

export default function ExpenseSearch() {
  const {
    search,
    setSearch,
  } = useExpenses();

  return (
    <div className="relative w-full">

      <FaSearch
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="search"
        placeholder="Search by description, merchant, category, or payment method..."
        value={search}
        onChange={event =>
          setSearch(
            event.target.value
          )
        }
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          py-4
          pl-14
          pr-5
          shadow-sm
          outline-none
          transition
          focus:border-[#0B6B57]
          focus:ring-2
          focus:ring-[#0B6B57]/10
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
        "
      />

    </div>
  );
}