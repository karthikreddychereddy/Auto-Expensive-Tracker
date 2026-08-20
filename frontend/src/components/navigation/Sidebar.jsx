import {
  NavLink,
} from "react-router-dom";

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
  FaTimes,
} from "react-icons/fa";

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

function NavigationItem({
  item,
  onNavigate,
}) {
  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        `
          flex
          items-center
          gap-4
          rounded-xl
          px-4
          py-3 sm:px-5
          min-h-11
          transition-all
          duration-200
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#0B6B57]/50
          ${
            isActive
              ? "bg-[#0B6B57] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-[#0B6B57] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          }
        `
      }
    >
      {item.icon}

      <span className="font-medium">
        {item.name}
      </span>
    </NavLink>
  );
}

export default function Sidebar({
  open = false,
  onClose,
}) {
  const closeSidebar = () => {
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}

      <div
        role="button"
        tabIndex={-1}
        aria-label="Close navigation"
        onClick={closeSidebar}
        className={`
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
          transition-opacity
          duration-300
          lg:hidden
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      <aside
        id="primary-sidebar"
        aria-label="Primary navigation"
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[min(18rem,88vw)]
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-xl
          transition-all
          duration-300
          dark:border-slate-700
          dark:bg-slate-900
          lg:z-40
          lg:translate-x-0
          lg:shadow-none
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-700">

          <h1 className="text-3xl font-bold text-[#0B6B57]">
            PaisaTrack
          </h1>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B57] dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            <FaTimes size={18} />
          </button>

        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">

          {menuItems.map(item => (
            <NavigationItem
              key={item.name}
              item={item}
              onNavigate={closeSidebar}
            />
          ))}

        </nav>

        <div className="shrink-0 space-y-2 border-t border-slate-200 p-4 dark:border-slate-700">

          <NavigationItem
            item={{
              name: "Profile",
              path: "/profile",
              icon: <FaUserCircle size={20} />,
            }}
            onNavigate={closeSidebar}
          />

          <NavigationItem
            item={{
              name: "Settings",
              path: "/settings",
              icon: <FaCog size={20} />,
            }}
            onNavigate={closeSidebar}
          />

        </div>

      </aside>
    </>
  );
}