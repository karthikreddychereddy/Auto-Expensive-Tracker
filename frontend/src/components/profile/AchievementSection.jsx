import { motion } from "framer-motion";

import {
  FaTrophy,
  FaPiggyBank,
  FaBullseye,
  FaWallet,
  FaLock,
} from "react-icons/fa";

import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";
import { useGoal } from "../../context/GoalContext";

export default function AchievementSection() {
  const {
    expenses = [],
  } = useExpenses();

  const {
    totalSavings = 0,
  } = useSavings();

  const {
    completedGoals = 0,
  } = useGoal();

  const achievements = [
    {
      title: "First Expense",
      description:
        "Recorded your first expense.",
      icon: <FaWallet />,
      unlocked:
        expenses.length >= 1,
    },
    {
      title: "Savings Starter",
      description:
        "Saved at least ₹1,000.",
      icon: <FaPiggyBank />,
      unlocked:
        Number(
          totalSavings
        ) >= 1000,
    },
    {
      title: "Goal Crusher",
      description:
        "Completed your first goal.",
      icon: <FaBullseye />,
      unlocked:
        completedGoals >= 1,
    },
    {
      title:
        "Finance Champion",
      description:
        "50 expenses tracked and ₹50,000 saved.",
      icon: <FaTrophy />,
      unlocked:
        expenses.length >= 50 &&
        Number(
          totalSavings
        ) >= 50000,
    },
  ];

  const unlockedCount =
    achievements.filter(
      item => item.unlocked
    ).length;

  return (
    <section className="min-w-0 space-y-4 sm:space-y-6">

      <div className="flex flex-wrap items-end justify-between gap-3">

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Achievements
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Milestones from your PaisaTrack journey.
          </p>
        </div>

        <span className="rounded-full bg-[#0B6B57]/10 px-4 py-2 text-sm font-semibold text-[#0B6B57]">
          {unlockedCount}/
          {achievements.length} unlocked
        </span>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {achievements.map(
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
                y: -4,
              }}
              className={`
                rounded-3xl
                border
                p-6
                shadow-sm
                ${
                  item.unlocked
                    ? "border-emerald-200 bg-gradient-to-br from-emerald-500 to-green-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }
              `}
            >

              <div className="flex items-start justify-between">

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    text-xl
                    ${
                      item.unlocked
                        ? "bg-white/20"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                    }
                  `}
                >
                  {item.icon}
                </div>

                {!item.unlocked && (
                  <FaLock className="text-slate-400" />
                )}

              </div>

              <h3 className="mt-5 text-lg font-bold">
                {item.title}
              </h3>

              <p
                className={`mt-2 text-sm leading-6 ${
                  item.unlocked
                    ? "text-white/80"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.description}
              </p>

              <p className="mt-4 text-sm font-semibold">
                {item.unlocked
                  ? "Unlocked 🎉"
                  : "Locked"}
              </p>

            </motion.div>
          )
        )}

      </div>

    </section>
  );
}