import { NavLink } from "react-router-dom";

import {
  MdDashboard,
  MdPayments,
  MdAttachMoney,
  MdSavings,
  MdCategory,
  MdAnalytics,
} from "react-icons/md";

import {
  FaWallet,
  FaBullseye,
  FaRobot,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={22} />,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: <MdPayments size={22} />,
  },
  {
    name: "Income",
    path: "/income",
    icon: <MdAttachMoney size={22} />,
  },
  {
    name: "Budgets",
    path: "/budgets",
    icon: <FaWallet size={20} />,
  },
  {
    name: "Savings",
    path: "/savings",
    icon: <MdSavings size={22} />,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: <MdCategory size={22} />,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: <FaBullseye size={20} />,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <MdAnalytics size={22} />,
  },
  {
    name: "AI Insights",
    path: "/ai-insights",
    icon: <FaRobot size={20} />,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}

      <div className="h-20 flex items-center px-8 border-b">

        <h1 className="text-3xl font-bold text-[#0B6B57]">
          PaisaTrack
        </h1>

      </div>

      {/* Main Navigation */}

      <div className="flex-1 py-6 px-4 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-[#0B6B57] text-white shadow-lg"
                  : "text-gray-600 hover:bg-[#F3F4F6] hover:text-[#0B6B57]"
              }`
            }
          >

            {item.icon}

            <span className="font-medium">
              {item.name}
            </span>

          </NavLink>

        ))}

      </div>

      {/* Bottom Navigation */}

      <div className="border-t p-4 space-y-2">

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
            ${
              isActive
                ? "bg-[#0B6B57] text-white shadow-lg"
                : "text-gray-600 hover:bg-[#F3F4F6] hover:text-[#0B6B57]"
            }`
          }
        >

          <FaUserCircle size={20} />

          <span className="font-medium">
            Profile
          </span>

        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
            ${
              isActive
                ? "bg-[#0B6B57] text-white shadow-lg"
                : "text-gray-600 hover:bg-[#F3F4F6] hover:text-[#0B6B57]"
            }`
          }
        >

          <FaCog size={20} />

          <span className="font-medium">
            Settings
          </span>

        </NavLink>

        <button
          className="w-full flex items-center gap-4 px-5 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300"
        >

          <FiLogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}