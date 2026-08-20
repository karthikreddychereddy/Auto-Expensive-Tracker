import {
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import {
  useIncome,
} from "../../context/IncomeContext";

export default function IncomeToolbar() {
  const {
    search,
    setSearch,

    sourceFilter,
    setSourceFilter,

    incomeSources,

    dateFilter,
    setDateFilter,

    sortBy,
    setSortBy,

    clearFilters,
  } = useIncome();

  const hasFilters =
    search.trim() !== "" ||
    sourceFilter !==
      "All" ||
    dateFilter !== "All" ||
    sortBy !== "newest";

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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

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
            placeholder="Search income..."
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

        {/* SOURCE */}

        <select
          value={
            sourceFilter
          }
          onChange={event =>
            setSourceFilter(
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
            All Sources
          </option>

          {incomeSources.map(
            source => (
              <option
                key={source}
                value={source}
              >
                {source}
              </option>
            )
          )}

        </select>

        {/* DATE */}

        <select
          value={dateFilter}
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
            All Dates
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

          <option value="Last Month">
            Previous Month
          </option>

        </select>

        {/* SORT */}

        <select
          value={sortBy}
          onChange={event =>
            setSortBy(
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
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
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