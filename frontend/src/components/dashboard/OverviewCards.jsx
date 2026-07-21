import {
  FaWallet,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaBullseye,
  FaPiggyBank,
  FaMoneyBillWave,
} from "react-icons/fa6";

import { useMemo } from "react";

import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";
import { useGoal } from "../../context/GoalContext";
import { useDashboard } from "../../context/DashboardContext";

import { formatCurrency } from "../../utils/format";

export default function OverviewCards() {

  const { summary } = useDashboard();

  const { expenses } = useExpenses();

  const { totalSavings } = useSavings();

  const { totalGoals } = useGoal();

  const today = new Date().toISOString().slice(0, 10);

  const todayExpense = useMemo(() => {

    return expenses
      .filter(
        (item) =>
          item.date === today
      )
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

  }, [expenses, today]);

  const cards = [
    {
      title: "Today's Spending",
      value: todayExpense,
      subtitle: "Today",
      icon: <FaMoneyBillWave />,
      color: "bg-red-500",
      bg: "bg-red-50",
      currency: true,
    },
    {
      title: "Total Income",
      value: summary?.totalIncome ?? 0,
      subtitle: `${summary?.incomeCount ?? 0} Income Records`,
      icon: <FaArrowTrendUp />,
      color: "bg-green-500",
      bg: "bg-green-50",
      currency: true,
    },
    {
      title: "Total Expense",
      value: summary?.totalExpense ?? 0,
      subtitle: `${summary?.expenseCount ?? 0} Expense Records`,
      icon: <FaArrowTrendDown />,
      color: "bg-orange-500",
      bg: "bg-orange-50",
      currency: true,
    },
    {
      title: "Savings",
      value: totalSavings,
      subtitle: "Saved",
      icon: <FaPiggyBank />,
      color: "bg-purple-500",
      bg: "bg-purple-50",
      currency: true,
    },
    {
      title: "Goals",
      value: totalGoals,
      subtitle: `${totalGoals} Active Goals`,
      icon: <FaBullseye />,
      color: "bg-blue-500",
      bg: "bg-blue-50",
      currency: false,
    },
    {
      title: "Balance",
      value: summary?.currentBalance ?? 0,
      subtitle: "Available",
      icon: <FaWallet />,
      color: "bg-emerald-500",
      bg: "bg-emerald-50",
      currency: true,
    },
  ];

  return (

    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.bg}
          rounded-3xl
          border
          border-gray-100
          p-6
          hover:shadow-xl
          transition-all`}
        >

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-3 text-slate-800">
                {card.currency
                  ? formatCurrency(card.value)
                  : card.value}
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                {card.subtitle}
              </p>

            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-2xl flex justify-center items-center text-white text-xl`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>

  );

}