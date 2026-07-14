import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function TopNavbar() {

  const { user } = useAuth();

  return (

    <header className="sticky top-0 z-30 h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-8 transition-colors duration-300">

      <div className="relative w-full max-w-md">

        <FaSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />

        <input
          type="text"
          placeholder="Search expenses, categories..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-[#0B6B57] transition-colors duration-300"
        />

      </div>

      <div className="flex items-center gap-6 ml-8">

        <button className="relative">

          <FaBell
            className="text-2xl text-gray-600 dark:text-gray-300 hover:text-[#0B6B57] transition-colors duration-300"
          />

          <span
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center"
          >

            3

          </span>

        </button>

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/150"
            className="w-11 h-11 rounded-full border-2 border-[#0B6B57]"
            alt="User"
          />

          <div>

            <h3 className="font-semibold text-slate-800 dark:text-white">

              {user
                ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
                : "Karthik"}

            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">

              {user?.email}

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}