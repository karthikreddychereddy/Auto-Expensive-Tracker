import { motion } from "framer-motion";
import {
  FaExclamationTriangle,
  FaFire,
  FaWallet,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

export default function BudgetPreferences() {
  const { settings, updateBudget } = useSettings();

  const warning = settings.budget.warning;
  const critical = settings.budget.critical;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaWallet className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Budget Preferences
            </h2>

            <p className="text-white/80 mt-1">
              Configure spending alerts and warning limits.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">

        <div>
          <div className="flex justify-between mb-2">
            <label className="font-semibold text-slate-700">
              Warning Alert
            </label>

            <span className="font-bold text-[#0B6B57]">
              {warning}%
            </span>
          </div>

          <input
            type="range"
            min="50"
            max="90"
            value={warning}
            onChange={(e) =>
              updateBudget("warning", e.target.value)
            }
            className="w-full accent-[#0B6B57]"
          />

          <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              animate={{ width: `${warning}%` }}
              className="h-full bg-[#0B6B57]"
            />
          </div>

          <div className="flex items-start gap-3 mt-4 rounded-2xl bg-yellow-50 p-4 border border-yellow-100">
            <FaExclamationTriangle className="text-yellow-600 mt-1" />

            <div>
              <h3 className="font-semibold text-yellow-700">
                Warning Level
              </h3>

              <p className="text-sm text-yellow-600 mt-1">
                You'll receive a reminder once your spending reaches {warning}% of your monthly budget.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="font-semibold text-slate-700">
              Critical Alert
            </label>

            <span className="font-bold text-red-600">
              {critical}%
            </span>
          </div>

          <input
            type="range"
            min="80"
            max="100"
            value={critical}
            onChange={(e) =>
              updateBudget("critical", e.target.value)
            }
            className="w-full accent-red-500"
          />

          <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              animate={{ width: `${critical}%` }}
              className="h-full bg-red-500"
            />
          </div>

          <div className="flex items-start gap-3 mt-4 rounded-2xl bg-red-50 p-4 border border-red-100">
            <FaFire className="text-red-600 mt-1" />

            <div>
              <h3 className="font-semibold text-red-700">
                Critical Level
              </h3>

              <p className="text-sm text-red-600 mt-1">
                When spending exceeds {critical}% of the budget, PaisaTrack will send high-priority alerts.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B6B57]/5 border border-[#0B6B57]/20 p-5">
          <h3 className="font-semibold text-[#0B6B57]">
            Budget Recommendation
          </h3>

          <p className="text-gray-600 mt-2 leading-6">
            Keeping your warning level between 65% and 75% helps you stay on track before overspending.
            A critical alert around 90% provides enough time to adjust your expenses.
          </p>
        </div>

      </div>
    </motion.div>
  );
}