import { FaSearch } from "react-icons/fa";

export default function SavingsToolbar({

  search,
  setSearch,

  dateFilter,
  setDateFilter,

}) {

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">

      <div className="grid lg:grid-cols-2 gap-5">


        {/* Search */}

        <div className="relative">

          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input

            type="text"

            placeholder="Search by source or description..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#0B6B57]"

          />

        </div>


        {/* Date */}

        <select

          value={dateFilter}

          onChange={(e) =>
            setDateFilter(e.target.value)
          }

          className="border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"

        >

          <option value="All">

            All Dates

          </option>


          <option value="Today">

            Today

          </option>


          <option value="This Month">

            This Month

          </option>


        </select>


      </div>

    </div>

  );

}