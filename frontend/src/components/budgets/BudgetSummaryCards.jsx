import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaChartPie,
} from "react-icons/fa";

import { useExpenses } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetSummaryCards() {

  const {
    selectedMonthExpenses,
    currentCategoryBudgets,
  } = useBudget();

  const totalBudget = Object.values(currentCategoryBudgets)
    .reduce((sum, value) => sum + value, 0);

  const totalSpent = selectedMonthExpenses
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const remaining = totalBudget - totalSpent;

  const used = totalBudget
    ? ((totalSpent / totalBudget) * 100).toFixed(1)
    : 0;

  const cards = [
    {
      title: "Total Budget",
      value: totalBudget,
      icon: <FaWallet />,
      color: "bg-blue-500",
    },
    {
      title: "Spent",
      value: totalSpent,
      icon: <FaMoneyBillWave />,
      color: "bg-red-500",
    },
    {
      title: "Remaining",
      value: remaining,
      icon: <FaPiggyBank />,
      color: "bg-green-500",
    },
    {
      title: "Budget Used",
      value: `${used}%`,
      icon: <FaChartPie />,
      color: "bg-purple-500",
    },
  ];

  return (

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow border p-6"
        >

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">

                {card.title}

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {typeof card.value === "number"
                  ? `₹${card.value.toLocaleString()}`
                  : card.value}

              </h2>

            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl`}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}