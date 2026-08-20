import {
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import {
  useSavings,
} from "../../context/SavingsContext";

export default function SavingsToolbar() {
  const {
    search,
    setSearch,

    dateFilter,
    setDateFilter,

    clearFilters,

    selectedMonth,
  } = useSavings();

  const hasFilters =
    search.trim() !== "" ||
    dateFilter !== "All";

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      <div className="grid gap-5 lg:grid-cols-2">

        {/* SEARCH */}

        <div className="relative">

          <FaSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            placeholder="Search by source, description, amount..."
            value={search}
            onChange={event =>
              setSearch(
                event.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              text-slate-800
              outline-none
              transition
              focus:border-[#0B6B57]
              focus:ring-2
              focus:ring-[#0B6B57]/10
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />

        </div>

        {/* DATE FILTER */}

        <select
          value={
            dateFilter
          }
          onChange={event =>
            setDateFilter(
              event.target.value
            )
          }
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-slate-800
            outline-none
            transition
            focus:border-[#0B6B57]
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        >
          <option value="All">
            All in {selectedMonth}
          </option>

          <option value="Today">
            Today
          </option>

          <option value="This Week">
            This Week
          </option>

          <option value="This Month">
            Selected Month
          </option>

        </select>

      </div>

      {hasFilters && (
        <div className="mt-4 flex justify-end">

          <button
            type="button"
            onClick={
              clearFilters
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-800
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <FaTimes size={12} />

            Clear Filters
          </button>

        </div>
      )}

    </div>
  );
}