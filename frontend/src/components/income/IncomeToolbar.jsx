import { FaSearch } from "react-icons/fa";

export default function IncomeToolbar({

  search,
  setSearch,

  sourceFilter,
  setSourceFilter,

  dateFilter,
  setDateFilter,

  sortBy,
  setSortBy,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">

      <div className="grid lg:grid-cols-4 gap-5">

        {/* Search */}

        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

          <input

            type="text"

            placeholder="Search income..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#0B6B57]"

          />

        </div>

        {/* Source */}

        <select

          value={sourceFilter}

          onChange={(e)=>setSourceFilter(e.target.value)}

          className="border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"

        >

          <option>All</option>

          <option>Salary</option>

          <option>Freelancing</option>

          <option>Business</option>

          <option>Rental</option>

          <option>Interest</option>

          <option>Bonus</option>

          <option>Other</option>

        </select>

        {/* Date */}

        <select

          value={dateFilter}

          onChange={(e)=>setDateFilter(e.target.value)}

          className="border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"

        >

          <option>All</option>

          <option>Today</option>

          <option>This Week</option>

          <option>This Month</option>

          <option>Last Month</option>

        </select>

        {/* Sort */}

        <select

          value={sortBy}

          onChange={(e)=>setSortBy(e.target.value)}

          className="border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"

        >

          <option value="newest">Newest</option>

          <option value="oldest">Oldest</option>

          <option value="highest">Highest Amount</option>

          <option value="lowest">Lowest Amount</option>

        </select>

      </div>

    </div>

  );

}