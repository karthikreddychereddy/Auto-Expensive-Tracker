import { motion } from "framer-motion";

import {
  FaRobot,
  FaLightbulb,
  FaChartLine,
  FaBrain,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

import SettingsToggle from "./SettingsToggle";

export default function AIPreferences() {
  const {
    settings,
    updateAI,
  } = useSettings();

  const options = [
    {
      key: "smartSuggestions",
      title: "Smart Suggestions",
      description:
        "Receive personalized spending recommendations.",
      icon: <FaLightbulb />,
    },
    {
      key: "weeklySummary",
      title: "Weekly Summary",
      description:
        "Generate AI-powered financial summaries every week.",
      icon: <FaChartLine />,
    },
    {
      key: "aiInsights",
      title: "AI Insights",
      description:
        "Analyze your spending habits automatically.",
      icon: <FaBrain />,
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
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-lg
        dark:border-slate-700
        dark:bg-slate-900
      "
    >

      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl text-white">
            <FaRobot />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              AI Preferences
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Customize your AI assistant experience.
            </p>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-6">

        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
              AI Assistant Status
            </h3>

            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
              AI services are active and ready to analyze your finances.
            </p>

          </div>

          <span className="self-start rounded-full bg-emerald-600 px-4 py-1 text-sm font-medium text-white sm:self-auto">
            Active
          </span>

        </div>

        <div className="space-y-4">

          {options.map(item => (

            <div
              key={item.key}
              className="
                flex
                items-start
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-200
                p-4
                dark:border-slate-700
              "
            >

              <div className="flex min-w-0 items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-lg text-[#0B6B57]">
                  {item.icon}
                </div>

                <div className="min-w-0">

                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>

              <div className="pt-1">

                <SettingsToggle
                  checked={
                    settings.ai?.[
                      item.key
                    ] ?? false
                  }
                  onChange={() =>
                    updateAI(
                      item.key,
                      !settings.ai?.[
                        item.key
                      ]
                    )
                  }
                  label={item.title}
                />

              </div>

            </div>

          ))}

        </div>

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20">

          <h3 className="font-semibold text-blue-700 dark:text-blue-300">
            AI Information
          </h3>

          <p className="mt-2 text-sm leading-6 text-blue-600 dark:text-blue-400">
            AI analyzes your expenses, budgets, savings, and income to provide personalized guidance.
          </p>

        </div>

      </div>

    </motion.div>
  );
}