import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaChartLine,
} from "react-icons/fa";

import { useMemo } from "react";
import { useBudget } from "../../../context/BudgetContext";

export default function SummaryCards() {
  const { budgets, budgetStatus } = useBudget();

  const {
    totalBudget,
    totalSpent,
    remaining,
    savings,
  } = useMemo(() => {
    const budget = budgets.reduce(
      (sum, item) => sum + Number(item.budgetAmount),
      0
    );

    const spent = budgetStatus.reduce(
      (sum, item) => sum + Number(item.spentAmount),
      0
    );

    const remainingAmount = budget - spent;

    const savingsPercentage =
      budget === 0 ? 0 : (remainingAmount / budget) * 100;

    return {
      totalBudget: budget,
      totalSpent: spent,
      remaining: remainingAmount,
      savings: savingsPercentage,
    };
  }, [budgets, budgetStatus]);

  const cards = [
    {
      title: "Total Budget",
      value: totalBudget,
      icon: FaWallet,
      color: "from-blue-500 to-blue-700",
      text: "Budget allocated",
    },
    {
      title: "Spent",
      value: totalSpent,
      icon: FaMoneyBillWave,
      color: "from-red-500 to-red-700",
      text: "Money spent",
    },
    {
      title: "Remaining",
      value: remaining,
      icon: FaPiggyBank,
      color:
        remaining >= 0
          ? "from-green-500 to-green-700"
          : "from-red-600 to-red-800",
      text: "Available balance",
    },
    {
      title: "Savings",
      value: `${savings.toFixed(1)}%`,
      icon: FaChartLine,
      color: "from-purple-500 to-purple-700",
      text: "Saving efficiency",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border"
          >
            <div
              className={`bg-gradient-to-r ${card.color} p-5 flex justify-between items-center`}
            >
              <div>
                <p className="text-white/90 text-sm">
                  {card.title}
                </p>

                <h2 className="text-white text-3xl font-bold mt-2">
                  {typeof card.value === "number"
                    ? `₹${card.value.toLocaleString()}`
                    : card.value}
                </h2>
              </div>

              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Icon
                  className="text-white"
                  size={28}
                />
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="text-gray-500">
                {card.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}