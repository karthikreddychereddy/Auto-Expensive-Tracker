import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  MdDashboard,
  MdPayments,
  MdAttachMoney,
  MdSavings,
  MdCategory,
  MdAnalytics,
} from "react-icons/md";
import { FaBell } from "react-icons/fa";

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
    name: "Insights",
    path: "/insights",
    icon: <MdAnalytics size={22} />,
  },
  {
    name: "AI Advisor",
    path: "/ai-advisor",
    icon: <FaRobot size={20} />,
  },
];

export default function Sidebar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/login");

  };

  return (

    <aside className="fixed left-0 top-0 w-72 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col z-40 transition-colors duration-300">

      <div className="h-20 flex items-center px-8 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">

        <h1 className="text-3xl font-bold text-[#0B6B57]">

          PaisaTrack

        </h1>

      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-[#0B6B57] text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0B6B57]"
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

      <div className="border-t border-gray-200 dark:border-slate-700 p-4 space-y-2 flex-shrink-0">

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300
            ${
              isActive
                ? "bg-[#0B6B57] text-white shadow-lg"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0B6B57]"
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
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#0B6B57]"
            }`
          }
        >

          <FaCog size={20} />

          <span className="font-medium">

            Settings

          </span>

        </NavLink>

      </div>

    </aside>

  );

}