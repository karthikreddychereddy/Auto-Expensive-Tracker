import { motion } from "framer-motion";
import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaPiggyBank,
} from "react-icons/fa6";

import { useExpenses } from "../../context/ExpenseContext";
import { useIncome } from "../../context/IncomeContext";
import { useSavings } from "../../context/SavingsContext";

import { formatCurrency } from "../../utils/format";

export default function RecentActivity() {

  const { expenses } = useExpenses();

  const { income } = useIncome();

  const { savings } = useSavings();

  const activities = [

    ...(expenses || []).slice(-3).map((item) => ({
      id: `expense-${item.id}`,
      title: item.category || "Expense",
      amount: formatCurrency(item.amount),
      date: item.expenseDate,
      icon: <FaArrowTrendDown />,
      color: "bg-red-500",
    })),

    ...(income || []).slice(-3).map((item) => ({
      id: `income-${item.id}`,
      title: item.source || "Income",
      amount: formatCurrency(item.amount),
      date: item.incomeDate,
      icon: <FaArrowTrendUp />,
      color: "bg-green-500",
    })),

    ...(savings || []).slice(-3).map((item) => ({
      id: `saving-${item.id}`,
      title: item.source || "Saving",
      amount: formatCurrency(item.amount),
      date: item.savingDate,
      icon: <FaPiggyBank />,
      color: "bg-blue-500",
    })),

  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  return (

    <section className="space-y-6">

      <h2 className="text-3xl font-bold">

        Recent Activity

      </h2>

      <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

        {activities.length === 0 ? (

          <div className="p-10 text-center text-gray-500">

            No recent activity found.

          </div>

        ) : (

          activities.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex justify-between items-center p-6 border-b last:border-none hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-xl ${item.color} text-white flex items-center justify-center`}
                >

                  {item.icon}

                </div>

                <div>

                  <h3 className="font-semibold">

                    {item.title}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {item.date}

                  </p>

                </div>

              </div>

              <h3 className="font-bold">

                {item.amount}

              </h3>

            </motion.div>

          ))

        )}

      </div>

    </section>

  );

}