import { motion } from "framer-motion";
import {
  FaTrophy,
  FaPiggyBank,
  FaBullseye,
  FaWallet,
} from "react-icons/fa";

import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";
import { useGoal } from "../../context/GoalContext";

export default function AchievementSection() {

  const { expenses } = useExpenses();
  const { totalSavings } = useSavings();
  const { completedGoals } = useGoal();

  const achievements = [

    {
      title: "First Expense",
      icon: <FaWallet />,
      unlocked: expenses.length >= 1,
    },

    {
      title: "Savings Starter",
      icon: <FaPiggyBank />,
      unlocked: totalSavings >= 1000,
    },

    {
      title: "Goal Crusher",
      icon: <FaBullseye />,
      unlocked: completedGoals >= 1,
    },

    {
      title: "Finance Champion",
      icon: <FaTrophy />,
      unlocked:
        expenses.length >= 50 &&
        totalSavings >= 50000,
    },

  ];

  return (

    <section className="space-y-6">

      <h2 className="text-3xl font-bold">

        Achievements

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {achievements.map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity:0,y:25 }}
            animate={{ opacity:1,y:0 }}
            transition={{ delay:index*.1 }}
            whileHover={{
              scale:1.04,
              rotate:1,
            }}
            className={`rounded-3xl p-7 shadow-lg border
            ${
              item.unlocked
              ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
              : "bg-gray-100"
            }`}
          >

            <div className="text-4xl">

              {item.icon}

            </div>

            <h3 className="font-bold text-xl mt-6">

              {item.title}

            </h3>

            <p className="mt-3">

              {item.unlocked ? "Unlocked 🎉" : "Locked"}

            </p>

          </motion.div>

        ))}

      </div>

    </section>

  );

}