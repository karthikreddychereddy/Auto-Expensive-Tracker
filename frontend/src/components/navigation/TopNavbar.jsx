import {
  FaBell,
  FaSearch
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function TopNavbar() {

  const { user } = useAuth();

  return (

    <header className="bg-white border-b h-20 flex items-center justify-between px-8">

      <div className="relative w-[420px]">

        <FaSearch
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search expenses, categories..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:border-[#0B6B57]"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <FaBell
            className="text-2xl text-gray-600"
          />

          <span
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
          >
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/150"
            className="w-11 h-11 rounded-full"
            alt=""
          />

          <div>

            <h3 className="font-semibold">

              {user?.name || "Karthik"}

            </h3>

            <p className="text-gray-500 text-sm">

              Premium User

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}