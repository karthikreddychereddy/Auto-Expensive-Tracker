import { motion } from "framer-motion";
import {
  FaRobot,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaPiggyBank,
  FaBullseye,
} from "react-icons/fa6";

import { useIncome } from "../../context/IncomeContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";
import { useGoal } from "../../context/GoalContext";

import { formatCurrency } from "../../utils/format";

export default function AIFinancialInsights() {

  const { totalIncome } = useIncome();
  const { expenses } = useExpenses();
  const { totalSavings } = useSavings();
  const { overallProgress } = useGoal();

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const balance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? ((totalSavings / totalIncome) * 100).toFixed(1)
      : 0;

  const expenseRate =
    totalIncome > 0
      ? ((totalExpense / totalIncome) * 100).toFixed(1)
      : 0;

  const insights = [

    {
      icon: <FaPiggyBank />,
      color: "green",
      title: "Excellent Saving Habit",
      description:
        savingsRate >= 20
          ? `You are saving ${savingsRate}% of your income. Keep it up!`
          : `Increase your monthly savings to improve long-term wealth.`,
    },

    {
      icon: <FaArrowTrendDown />,
      color: "red",
      title: "Expense Analysis",
      description:
        expenseRate > 70
          ? "Your expenses are consuming most of your income."
          : "Your spending pattern is under good control.",
    },

    {
      icon: <FaBullseye />,
      color: "blue",
      title: "Goal Progress",
      description: `You have completed ${overallProgress.toFixed(
        1
      )}% of your financial goals.`,
    },

    {
      icon: <FaArrowTrendUp />,
      color: "orange",
      title: "Available Balance",
      description: `You currently have ${formatCurrency(
        balance
      )} available for investing or saving.`,
    },

  ];

  const colors = {
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };

  return (

    <section className="min-w-0 space-y-4 sm:space-y-6">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0B6B57] to-[#12A67D] flex items-center justify-center text-white text-2xl">

          <FaRobot />

        </div>

        <div>

          <h2 className="text-3xl font-bold">

            AI Financial Insights

          </h2>

          <p className="text-gray-500">

            Personalized recommendations generated from your financial activity

          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {insights.map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`rounded-3xl border p-6 shadow-sm hover:shadow-xl transition ${colors[item.color]}`}
          >

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow">

                {item.icon}

              </div>

              <div>

                <h3 className="text-xl font-bold">

                  {item.title}

                </h3>

                <p className="mt-3 leading-7">

                  {item.description}

                </p>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="rounded-3xl bg-gradient-to-r from-[#0B6B57] to-[#12A67D] text-white p-8 shadow-xl"
      >

        <h3 className="text-2xl font-bold">

          🤖 AI Coach Recommendation

        </h3>

        <p className="mt-5 leading-8 text-lg">

          Your financial health is improving steadily. Based on your current
          income and expenses, increasing your monthly savings by
          <strong> ₹3,000</strong> could help you achieve your primary savings
          goal significantly earlier. Maintaining your expense ratio below
          <strong> 40%</strong> will further strengthen your financial position.

        </p>

      </motion.div>

    </section>

  );

}