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

  const { totalIncome } = useIncome();
  const { expenses } = useExpenses();
  const { totalSavings } = useSavings();

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const balance = totalIncome - totalExpense;

  const stats = [
    {
      title: "Income",
      value: formatCurrency(totalIncome),
      icon: <FaArrowTrendUp />,
      color: "bg-green-500",
    },
    {
      title: "Expense",
      value: formatCurrency(totalExpense),
      icon: <FaArrowTrendDown />,
      color: "bg-red-500",
    },
    {
      title: "Savings",
      value: formatCurrency(totalSavings),
      icon: <FaPiggyBank />,
      color: "bg-blue-500",
    },
    {
      title: "Balance",
      value: formatCurrency(balance),
      icon: <FaWallet />,
      color: "bg-purple-500",
    },
  ];

  return (

    <section className="space-y-6">

      <h2 className="text-3xl font-bold">

        Monthly Statistics

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * .1 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl shadow-lg border p-6"
          >

            <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center text-2xl`}>

              {item.icon}

            </div>

            <p className="text-gray-500 mt-5">

              {item.title}

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {item.value}

            </h2>

          </motion.div>

        ))}

      </div>

    </section>

  );

}