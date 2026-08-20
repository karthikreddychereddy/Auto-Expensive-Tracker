import { motion } from "framer-motion";

import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa6";

import { useIncome } from "../../context/IncomeContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";

import { formatCurrency } from "../../utils/format";

export default function MonthlyStatistics() {
  const { totalIncome } =
    useIncome();

  const {
    expenses = [],
    selectedMonthExpenses,
  } = useExpenses();

  const { totalSavings } =
    useSavings();

  const monthlyExpenses =
    Array.isArray(
      selectedMonthExpenses
    )
      ? selectedMonthExpenses
      : expenses;

  const totalExpense =
    monthlyExpenses.reduce(
      (sum, item) =>
        sum +
        Number(item.amount || 0),
      0
    );

  const income =
    Number(totalIncome || 0);

  const balance =
    income - totalExpense;

  const stats = [
    {
      title:
        "This Month Income",
      value:
        formatCurrency(income),
      icon:
        <FaArrowTrendUp />,
      color: "bg-green-500",
    },
    {
      title:
        "This Month Expense",
      value:
        formatCurrency(
          totalExpense
        ),
      icon:
        <FaArrowTrendDown />,
      color: "bg-red-500",
    },
    {
      title:
        "Total Savings",
      value:
        formatCurrency(
          Number(
            totalSavings || 0
          )
        ),
      icon: <FaPiggyBank />,
      color: "bg-blue-500",
    },
    {
      title:
        "Available Balance",
      value:
        formatCurrency(balance),
      icon: <FaWallet />,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="h-full space-y-5">

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Financial Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          A quick view of your current financial position.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">

        {stats.map(
          (item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.08,
              }}
              whileHover={{
                y: -3,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white ${item.color}`}
              >
                {item.icon}
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {item.title}
              </p>

              <h3 className="mt-2 break-words text-2xl font-bold text-slate-800 dark:text-white">
                {item.value}
              </h3>

            </motion.div>
          )
        )}

      </div>

    </section>
  );
}