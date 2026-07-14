import { FaTrophy, FaPiggyBank, FaBullseye, FaWallet } from "react-icons/fa";

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
      unlocked: expenses.length >= 1,
      icon: <FaWallet />,
    },

    {
      title: "Savings Starter",
      unlocked: totalSavings >= 1000,
      icon: <FaPiggyBank />,
    },

    {
      title: "Goal Crusher",
      unlocked: completedGoals >= 1,
      icon: <FaBullseye />,
    },

    {
      title: "Finance Champion",
      unlocked:
        expenses.length >= 50 &&
        totalSavings >= 50000 &&
        completedGoals >= 3,
      icon: <FaTrophy />,
    },

  ];

  return (

    <div className="bg-white rounded-3xl shadow border border-gray-100 p-8">

      <h2 className="text-2xl font-bold mb-8">
        Achievements
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {achievements.map((achievement) => (

          <div
            key={achievement.title}
            className={`rounded-3xl border p-6 transition
            ${
              achievement.unlocked
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200 opacity-60"
            }`}
          >

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
              ${
                achievement.unlocked
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-white"
              }`}
            >
              {achievement.icon}
            </div>

            <h3 className="font-bold text-lg mt-5">
              {achievement.title}
            </h3>

            <p className="text-sm mt-2">
              {achievement.unlocked
                ? "Unlocked"
                : "Locked"}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}