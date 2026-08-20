import { motion } from "framer-motion";

import {
  FaCode,
  FaGithub,
  FaGlobe,
  FaHeart,
  FaInfoCircle,
} from "react-icons/fa";

export default function AboutSettings() {
  const info = [
    {
      icon:
        <FaInfoCircle />,
      title: "Version",
      value: "1.0.0",
    },
    {
      icon: <FaCode />,
      title: "Application",
      value: "PaisaTrack Web",
    },
    {
      icon: <FaGlobe />,
      title: "Environment",
      value: "Development",
    },
    {
      icon: <FaGithub />,
      title: "Repository",
      value: "Private",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-lg
        dark:border-slate-700
        dark:bg-slate-900
        sm:p-6
      "
    >

      <div className="mb-6 flex items-center gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0B6B57] text-2xl font-bold text-white">
          ₹
        </div>

        <div className="min-w-0">

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            PaisaTrack
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Personal finance management with intelligent guidance.
          </p>

        </div>

      </div>

      <div className="grid gap-3 sm:grid-cols-2">

        {info.map(item => (
          <div
            key={item.title}
            className="flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
          >

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-[#0B6B57]">
                {item.icon}
              </div>

              <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
                {item.title}
              </span>

            </div>

            <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">
              {item.value}
            </span>

          </div>
        ))}

      </div>

      <div className="mt-6 rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-5 text-center">

        <FaHeart className="mx-auto text-2xl text-red-500" />

        <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">
          Built for better financial habits
        </h3>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Track expenses, income, budgets, savings, and goals while using PaisaTrack AI for personalized financial guidance.
        </p>

      </div>

    </motion.div>
  );
}