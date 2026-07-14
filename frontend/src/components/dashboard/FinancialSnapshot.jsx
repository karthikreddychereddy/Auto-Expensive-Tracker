import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaBullseye,
} from "react-icons/fa";

import { useDashboard } from "../../context/DashboardContext";
import { useSavings } from "../../context/SavingsContext";
import { useGoal } from "../../context/GoalContext";

import { formatCurrency } from "../../utils/format";

export default function FinancialSnapshot() {

  const { summary } = useDashboard();

  const { totalSavings } = useSavings();

  const { totalGoals, completedGoals } = useGoal();

  const items = [

    {
      title: "Income",
      value: formatCurrency(Number(summary?.totalIncome || 0)),
      icon: <FaArrowUp />,
      color: "text-green-600",
    },

    {
      title: "Expenses",
      value: formatCurrency(Number(summary?.totalExpense || 0)),
      icon: <FaArrowDown />,
      color: "text-red-500",
    },

    {
      title: "Savings",
      value: formatCurrency(totalSavings),
      icon: <FaWallet />,
      color: "text-[#0B6B57]",
    },

    {
      title: "Goals",
      value: `${completedGoals}/${totalGoals}`,
      icon: <FaBullseye />,
      color: "text-purple-600",
    },

  ];

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Financial Snapshot
      </h2>

      <div className="grid md:grid-cols-4 gap-5">

        {items.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl bg-gray-50 p-5"
          >

            <div className={`${item.color} text-2xl`}>
              {item.icon}
            </div>

            <p className="text-gray-500 mt-4">
              {item.title}
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {item.value}
            </h3>

          </div>

        ))}

      </div>

    </div>

  );

}