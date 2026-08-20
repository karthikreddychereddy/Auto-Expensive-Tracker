import { motion } from "framer-motion";

import {
  FaHeartPulse,
  FaPiggyBank,
  FaArrowTrendDown,
  FaBullseye,
  FaRobot,
} from "react-icons/fa6";

import { useIncome } from "../../context/IncomeContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";
import { useGoal } from "../../context/GoalContext";

export default function FinancialHealthCard() {
  const { totalIncome } =
    useIncome();

  const {
    expenses = [],
    selectedMonthExpenses,
  } = useExpenses();

  const { totalSavings } =
    useSavings();

  const { overallProgress } =
    useGoal();

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

  const savings =
    Number(totalSavings || 0);

  const goalProgress =
    Math.min(
      100,
      Math.max(
        0,
        Number(
          overallProgress || 0
        )
      )
    );

  const expenseRatio =
    income > 0
      ? Math.min(
          100,
          Math.round(
            (totalExpense /
              income) *
              100
          )
        )
      : 0;

  const savingsIndicator =
    income > 0
      ? Math.min(
          100,
          Math.round(
            (savings / income) *
              100
          )
        )
      : savings > 0
        ? 100
        : 0;

  const spendingScore =
    Math.max(
      0,
      100 - expenseRatio
    );

  const healthScore =
    income <= 0 &&
    totalExpense <= 0 &&
    savings <= 0
      ? 0
      : Math.round(
          spendingScore * 0.45 +
            savingsIndicator *
              0.3 +
            goalProgress * 0.25
        );

  const healthStatus =
    healthScore >= 80
      ? "Excellent"
      : healthScore >= 60
        ? "Good"
        : healthScore >= 40
          ? "Fair"
          : "Needs Attention";

  const recommendation =
    income <= 0
      ? "Add your income details to get a more accurate financial health score."
      : expenseRatio > 70
        ? "Your monthly expense ratio is high. Review non-essential spending and strengthen your monthly savings."
        : savingsIndicator < 20
          ? "Your spending is under control. Try directing more of your available balance toward savings and goals."
          : "Your finances are progressing well. Continue maintaining controlled spending and consistent saving habits.";

  const stats = [
    {
      title:
        "Savings Indicator",
      value: savingsIndicator,
      color: "bg-green-500",
      icon: <FaPiggyBank />,
    },
    {
      title:
        "Expense Ratio",
      value: expenseRatio,
      color: "bg-red-500",
      icon:
        <FaArrowTrendDown />,
    },
    {
      title:
        "Goal Progress",
      value: Math.round(
        goalProgress
      ),
      color: "bg-blue-500",
      icon: <FaBullseye />,
    },
    {
      title:
        "Spending Control",
      value: spendingScore,
      color: "bg-orange-500",
      icon: <FaHeartPulse />,
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >

      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6 text-white">

        <h2 className="text-2xl font-bold">
          Financial Health
        </h2>

        <p className="mt-2 text-sm text-white/80">
          Financial wellness based on your current activity.
        </p>

      </div>

      <div className="p-5 sm:p-7">

        <div className="mb-8 flex justify-center">

          <div className="relative h-44 w-44 sm:h-48 sm:w-48">

            <svg
              className="h-full w-full -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-700"
                strokeWidth="12"
                fill="none"
              />

              <motion.circle
                cx="100"
                cy="100"
                r="85"
                stroke="#0B6B57"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="534"
                initial={{
                  strokeDashoffset:
                    534,
                }}
                animate={{
                  strokeDashoffset:
                    534 -
                    (534 *
                      healthScore) /
                      100,
                }}
                transition={{
                  duration: 1.2,
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <h3 className="text-4xl font-bold text-[#0B6B57]">
                {healthScore}
              </h3>

              <span className="text-sm text-slate-500 dark:text-slate-400">
                /100
              </span>

              <span className="mt-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                {healthStatus}
              </span>

            </div>

          </div>

        </div>

        <div className="space-y-5">

          {stats.map(item => (
            <div key={item.title}>

              <div className="mb-2 flex items-center justify-between gap-4">

                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {item.icon}

                  {item.title}
                </div>

                <span className="text-sm font-bold text-slate-800 dark:text-white">
                  {item.value}%
                </span>

              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width:
                      `${item.value}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full ${item.color}`}
                />

              </div>

            </div>
          ))}

        </div>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57] text-white">
              <FaRobot />
            </div>

            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                Financial Recommendation
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {recommendation}
              </p>
            </div>

          </div>

        </div>

      </div>

    </motion.section>
  );
}