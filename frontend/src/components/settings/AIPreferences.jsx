import { motion } from "framer-motion";
import {
  FaRobot,
  FaLightbulb,
  FaChartLine,
  FaBrain,
  FaMagic,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

export default function AIPreferences() {
  const { settings, updateAI } = useSettings();

  const options = [
    {
      key: "smartSuggestions",
      title: "Smart Suggestions",
      description: "Receive personalized spending recommendations.",
      icon: <FaLightbulb />,
    },
    {
      key: "weeklySummary",
      title: "Weekly Summary",
      description: "Generate AI-powered financial summaries every week.",
      icon: <FaChartLine />,
    },
    {
      key: "aiInsights",
      title: "AI Insights",
      description: "Analyze your spending habits automatically.",
      icon: <FaBrain />,
    },
    {
      key: "spendingPrediction",
      title: "Spending Prediction",
      description: "Predict your upcoming monthly expenses.",
      icon: <FaMagic />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl">
            <FaRobot />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              AI Preferences
            </h2>

            <p className="text-white/80 mt-1">
              Customize your AI assistant experience
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-2xl bg-green-50 border border-green-100 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-700">
                AI Assistant Status
              </h3>

              <p className="text-sm text-green-600 mt-1">
                AI services are active and ready to analyze your finances.
              </p>
            </div>

            <span className="px-4 py-1 rounded-full bg-green-600 text-white text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {options.map((item) => (
            <motion.div
              key={item.key}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between border rounded-2xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B6B57]/10 text-[#0B6B57] flex items-center justify-center text-xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.ai[item.key] || false}
                  onChange={(e) =>
                    updateAI(item.key, e.target.checked)
                  }
                />

                <div className="w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-[#0B6B57] transition-all duration-300"></div>

                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-6"></div>
              </label>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-5">
          <h3 className="font-semibold text-blue-700">
            AI Information
          </h3>

          <p className="text-sm text-blue-600 mt-2 leading-6">
            AI analyzes your expenses, budgets, savings, and income to
            provide personalized recommendations. Your financial data is
            processed securely.
          </p>
        </div>
      </div>
    </motion.div>
  );
}