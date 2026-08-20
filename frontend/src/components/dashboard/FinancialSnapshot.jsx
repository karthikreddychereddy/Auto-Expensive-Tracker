import { FaArrowUp, FaArrowDown, FaWallet, FaBullseye } from "react-icons/fa";
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
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Expenses",
      value: formatCurrency(Number(summary?.totalExpense || 0)),
      icon: <FaArrowDown />,
      color: "text-red-500 dark:text-red-400",
    },
    {
      title: "Savings",
      value: formatCurrency(totalSavings),
      icon: <FaWallet />,
      color: "text-[#0B6B57] dark:text-emerald-400",
    },
    {
      title: "Goals",
      value: `${completedGoals}/${totalGoals}`,
      icon: <FaBullseye />,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">
        Financial Snapshot
      </h2>

      <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 md:grid-cols-4 sm:gap-4 lg:gap-5">
        {items.map((item) => (
          <article
            key={item.title}
            className="min-w-0 rounded-2xl bg-gray-50 p-4 dark:bg-slate-900/60 sm:p-5"
          >
            <div className={`${item.color} text-xl sm:text-2xl`}>{item.icon}</div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-4">
              {item.title}
            </p>
            <h3 className="mt-1 break-words text-xl font-bold text-slate-800 dark:text-white sm:mt-2 sm:text-2xl">
              {item.value}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
