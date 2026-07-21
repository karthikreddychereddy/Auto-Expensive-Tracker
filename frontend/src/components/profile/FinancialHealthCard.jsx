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

  const { totalIncome } = useIncome();
  const { expenses } = useExpenses();
  const { totalSavings } = useSavings();
  const { overallProgress } = useGoal();

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const savingsRate =
    totalIncome > 0
      ? Math.round((totalSavings / totalIncome) * 100)
      : 0;

  const expenseRatio =
    totalIncome > 0
      ? Math.round((totalExpense / totalIncome) * 100)
      : 0;

  const budgetUsage = Math.min(expenseRatio, 100);

  const healthScore = Math.min(
    100,
    Math.round(
      savingsRate * 0.4 +
        (100 - expenseRatio) * 0.4 +
        overallProgress * 0.2
    )
  );

  const stats = [
    {
      title: "Savings Rate",
      value: savingsRate,
      color: "bg-green-500",
      icon: <FaPiggyBank />,
    },
    {
      title: "Expense Ratio",
      value: expenseRatio,
      color: "bg-red-500",
      icon: <FaArrowTrendDown />,
    },
    {
      title: "Goal Progress",
      value: Math.round(overallProgress),
      color: "bg-blue-500",
      icon: <FaBullseye />,
    },
    {
      title: "Budget Usage",
      value: budgetUsage,
      color: "bg-orange-500",
      icon: <FaHeartPulse />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6 text-white">
        <h2 className="text-2xl font-bold">
          Financial Health
        </h2>

        <p className="opacity-90 mt-2">
          AI powered financial wellness analysis
        </p>
      </div>

      <div className="p-8">

        <div className="flex justify-center mb-8">

          <div className="relative w-52 h-52">

            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 200 200"
            >

              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#E5E7EB"
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
                  strokeDashoffset: 534,
                }}
                animate={{
                  strokeDashoffset:
                    534 -
                    (534 * healthScore) / 100,
                }}
                transition={{
                  duration: 1.8,
                }}
              />

            </svg>

            <div className="absolute inset-0 flex flex-col justify-center items-center">

              <h1 className="text-5xl font-bold text-[#0B6B57]">

                {healthScore}

              </h1>

              <p className="text-gray-500">

                /100

              </p>

              <span className="mt-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

                Excellent

              </span>

            </div>

          </div>

        </div>

        <div className="space-y-6">

          {stats.map((item) => (

            <div key={item.title}>

              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-2">

                  {item.icon}

                  <span className="font-medium">

                    {item.title}

                  </span>

                </div>

                <span className="font-bold">

                  {item.value}%

                </span>

              </div>

              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${item.value}%`,
                  }}
                  transition={{
                    duration: 1.4,
                  }}
                  className={`h-full ${item.color}`}
                />

              </div>

            </div>

          ))}

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-5"
        >

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-xl bg-[#0B6B57] text-white flex items-center justify-center text-xl">

              <FaRobot />

            </div>

            <div>

              <h3 className="font-bold text-lg">

                AI Recommendation

              </h3>

              <p className="text-gray-600 mt-2 leading-7">

                Great financial discipline. Keep your expense ratio below
                <strong> 35%</strong> and increase monthly savings by
                <strong> ₹3,000</strong> to reach your savings goal much earlier.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </motion.div>
  );
}