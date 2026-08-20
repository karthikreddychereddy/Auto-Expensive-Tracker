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

  const todayExpense = useMemo(
    () =>
      expenses
        .filter((item) => item.date === today)
        .reduce((sum, item) => sum + Number(item.amount), 0),
    [expenses, today]
  );

  const cards = [
    {
      title: "Today's Spending",
      value: todayExpense,
      subtitle: "Today",
      icon: <FaMoneyBillWave />,
      iconBg: "bg-red-500",
      lightBg: "bg-red-50 dark:bg-red-950/20",
      currency: true,
    },
    {
      title: "Total Income",
      value: summary?.totalIncome ?? 0,
      subtitle: `${summary?.incomeCount ?? 0} Income Records`,
      icon: <FaArrowTrendUp />,
      iconBg: "bg-green-500",
      lightBg: "bg-green-50 dark:bg-green-950/20",
      currency: true,
    },
    {
      title: "Total Expense",
      value: summary?.totalExpense ?? 0,
      subtitle: `${summary?.expenseCount ?? 0} Expense Records`,
      icon: <FaArrowTrendDown />,
      iconBg: "bg-orange-500",
      lightBg: "bg-orange-50 dark:bg-orange-950/20",
      currency: true,
    },
    {
      title: "Savings",
      value: totalSavings,
      subtitle: "Saved",
      icon: <FaPiggyBank />,
      iconBg: "bg-purple-500",
      lightBg: "bg-purple-50 dark:bg-purple-950/20",
      currency: true,
    },
    {
      title: "Goals",
      value: totalGoals,
      subtitle: `${totalGoals} Active Goals`,
      icon: <FaBullseye />,
      iconBg: "bg-blue-500",
      lightBg: "bg-blue-50 dark:bg-blue-950/20",
      currency: false,
    },
    {
      title: "Balance",
      value: summary?.currentBalance ?? 0,
      subtitle: "Available",
      icon: <FaWallet />,
      iconBg: "bg-emerald-500",
      lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
      currency: true,
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
      {cards.map((card) => (
        <article
          key={card.title}
          className={`${card.lightBg} min-w-0 rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 sm:rounded-3xl sm:p-5 lg:p-6`}
        >
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.title}
              </p>
              <h2 className="mt-2 break-words text-2xl font-bold leading-tight text-slate-800 dark:text-white sm:mt-3 sm:text-3xl">
                {card.currency ? formatCurrency(card.value) : card.value}
              </h2>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:mt-3 sm:text-sm">
                {card.subtitle}
              </p>
            </div>

            <div
              className={`${card.iconBg} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-white sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl`}
            >
              {card.icon}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
