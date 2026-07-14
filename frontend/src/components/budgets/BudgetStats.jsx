import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

import {
  FaWallet,
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaLayerGroup,
} from "react-icons/fa6";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetStats() {

  const {
    expenses,
    categoryBudgets,
    selectedMonth,
  } = useBudget();

  const stats = useMemo(() => {

    const budgets =
      categoryBudgets[selectedMonth] || {};

    const totalBudget = Object.values(budgets).reduce(
      (sum, value) => sum + Number(value),
      0
    );

    const monthExpenses = expenses.filter((expense) =>
      expense.date.startsWith(selectedMonth)
    );

    const totalSpent = monthExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const remaining =
      totalBudget - totalSpent;

    const exceededCategories = Object.keys(budgets).filter(
      (category) => {

        const spent = monthExpenses
          .filter(
            (expense) =>
              expense.category === category
          )
          .reduce(
            (sum, expense) =>
              sum + Number(expense.amount),
            0
          );

        return spent > budgets[category];

      }
    ).length;

    return {
      totalBudget,
      totalSpent,
      remaining,
      exceededCategories,
    };

  }, [
    expenses,
    categoryBudgets,
    selectedMonth,
  ]);

  const cards = [

    {
      title: "Monthly Budget",
      value: `₹${stats.totalBudget.toLocaleString()}`,
      icon: <FaWallet />,
      color: "bg-blue-50 text-blue-600",
    },

    {
      title: "Spent",
      value: `₹${stats.totalSpent.toLocaleString()}`,
      icon: <FaArrowTrendDown />,
      color: "bg-red-50 text-red-600",
    },

    {
      title: "Remaining",
      value: `₹${stats.remaining.toLocaleString()}`,
      icon: <FaArrowTrendUp />,
      color:
        stats.remaining >= 0
          ? "bg-green-50 text-green-600"
          : "bg-red-50 text-red-600",
    },

    {
      title: "Over Budget",
      value: stats.exceededCategories,
      icon: <FaLayerGroup />,
      color: "bg-orange-50 text-orange-600",
    },

  ];

  return (

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-2xl shadow border p-6"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">

                {card.title}

              </p>

              <h2 className="text-3xl font-bold mt-3">

                {card.value}

              </h2>

            </div>

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${card.color}`}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}