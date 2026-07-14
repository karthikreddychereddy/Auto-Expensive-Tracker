import {
  FaPlus,
  FaArrowDown,
  FaBullseye,
  FaPiggyBank,
} from "react-icons/fa";

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

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-5">

        Quick Actions

      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {actions.map((item) => (

          <button
            key={item.title}
            onClick={item.action}
            className={`${item.color} ${item.hover}
            text-white rounded-xl p-5 transition-all duration-300
            hover:scale-105 hover:shadow-lg
            flex flex-col items-center gap-3`}
          >

            <div className="text-2xl">

              {item.icon}

            </div>

            <span className="font-medium">

              {item.title}

            </span>

          </button>

        ))}

      </div>

    </div>

  );

}