import { motion } from "framer-motion";

import {
  FaBullseye,
  FaCircleCheck,
  FaChartLine,
  FaCoins,
} from "react-icons/fa6";

import { useGoal } from "../../context/GoalContext";
import { formatCurrency } from "../../utils/format";

import EmptyState from "../common/EmptyState";

export default function GoalsOverview() {
  const {
    goals = [],
    totalGoals = 0,
    activeGoals = 0,
    completedGoals = 0,
    overallProgress = 0,
  } = useGoal();

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        Number(
          overallProgress || 0
        )
      )
    );

  const targetAmount =
    goals.reduce(
      (sum, goal) =>
        sum +
        Number(
          goal.targetAmount || 0
        ),
      0
    );

  if (goals.length === 0) {
    return (
      <section className="space-y-5">

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Goals Overview
        </h2>

        <EmptyState
          compact
          icon={<FaBullseye />}
          title="No financial goals yet"
          description="Create a goal from the Goals page to start tracking your progress here."
        />

      </section>
    );
  }

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
      icon:
        <FaCircleCheck />,
      color: "bg-green-500",
    },
    {
      title: "Total Target",
      value:
        formatCurrency(
          targetAmount
        ),
      icon: <FaCoins />,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="min-w-0 space-y-4 sm:space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Goals Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track progress across your financial goals.
          </p>
        </div>

        <span className="font-bold text-[#0B6B57]">
          {progress.toFixed(1)}%
        </span>

      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width:
              `${progress}%`,
          }}
          transition={{
            duration: 1,
          }}
          className="h-full bg-gradient-to-r from-[#0B6B57] to-[#12A67D]"
        />

      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map(
          (card, index) => (
            <motion.div
              key={card.title}
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
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white ${card.color}`}
              >
                {card.icon}
              </div>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                {card.title}
              </p>

              <h3 className="mt-2 break-words text-2xl font-bold text-slate-800 dark:text-white">
                {card.value}
              </h3>

            </motion.div>
          )
        )}

      </div>

    </section>
  );
}