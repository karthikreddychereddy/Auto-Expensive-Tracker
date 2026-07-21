import { motion } from "framer-motion";
import {
  FaBullseye,
  FaCircleCheck,
  FaChartLine,
  FaCoins,
} from "react-icons/fa6";

import { useGoal } from "../../context/GoalContext";
import { formatCurrency } from "../../utils/format";

export default function GoalsOverview() {

  const {
    goals,
    totalGoals,
    activeGoals,
    completedGoals,
    overallProgress,
  } = useGoal();

  const targetAmount = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const cards = [
    {
      title: "Goals",
      value: totalGoals,
      icon: <FaBullseye />,
      color: "bg-blue-500",
    },
    {
      title: "Active",
      value: activeGoals,
      icon: <FaChartLine />,
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: completedGoals,
      icon: <FaCircleCheck />,
      color: "bg-green-500",
    },
    {
      title: "Target",
      value: formatCurrency(targetAmount),
      icon: <FaCoins />,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="space-y-8">

      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold">
          Goals Overview
        </h2>

        <span className="font-bold text-[#0B6B57]">
          {overallProgress.toFixed(1)}%
        </span>

      </div>

      <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-[#0B6B57] to-[#12A67D]"
        />

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, i) => (

          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl border shadow-lg p-6"
          >

            <div className={`w-14 h-14 ${card.color} rounded-2xl text-white flex items-center justify-center text-2xl`}>

              {card.icon}

            </div>

            <p className="text-gray-500 mt-5">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>

          </motion.div>

        ))}

      </div>

    </section>
  );

}