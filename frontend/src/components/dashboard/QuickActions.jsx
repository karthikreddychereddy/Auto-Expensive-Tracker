import { FaPlus, FaArrowDown, FaBullseye, FaPiggyBank } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Expense",
      icon: <FaPlus />,
      color: "bg-red-500",
      hover: "hover:bg-red-600",
      action: () => openModal("expense"),
    },
    {
      title: "Add Income",
      icon: <FaArrowDown />,
      color: "bg-green-600",
      hover: "hover:bg-green-700",
      action: () => openModal("income"),
    },
    {
      title: "Set Budget",
      icon: <FaBullseye />,
      color: "bg-purple-600",
      hover: "hover:bg-purple-700",
      action: () => navigate("/budgets"),
    },
    {
      title: "Add Saving",
      icon: <FaPiggyBank />,
      color: "bg-yellow-500",
      hover: "hover:bg-yellow-600",
      action: () => openModal("saving"),
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-slate-800 dark:text-white sm:mb-5 sm:text-xl">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 md:grid-cols-4 sm:gap-4 lg:gap-5">
        {actions.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={item.action}
            className={`${item.color} ${item.hover} flex min-h-20 items-center justify-center gap-3 rounded-xl p-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 sm:min-h-28 sm:flex-col sm:p-5`}
          >
            <span className="text-xl sm:text-2xl">{item.icon}</span>
            <span className="text-sm font-medium sm:text-base">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
