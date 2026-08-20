import { motion } from "framer-motion";

import {
  FaExclamationTriangle,
  FaFire,
  FaWallet,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

export default function BudgetPreferences() {
  const {
    settings,
    updateBudget,
  } = useSettings();

  const warning =
    Number(settings.budget?.warning ?? 70);

  const critical =
    Number(settings.budget?.critical ?? 90);

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

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <FaWallet className="text-xl text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Budget Preferences
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Configure budget warning and critical alert levels.
            </p>
          </div>

        </div>

      </div>

      <div className="space-y-7 p-5 sm:p-6">

        <PreferenceRange
          title="Warning Alert"
          value={warning}
          min={50}
          max={90}
          onChange={value =>
            updateBudget(
              "warning",
              value
            )
          }
          accentClass="accent-[#0B6B57]"
          progressClass="bg-[#0B6B57]"
          valueClass="text-[#0B6B57]"
          icon={
            <FaExclamationTriangle />
          }
          boxClass="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950/20"
          headingClass="text-yellow-700 dark:text-yellow-300"
          textClass="text-yellow-600 dark:text-yellow-400"
          message={`You'll receive a warning when spending reaches ${warning}% of your monthly budget.`}
        />

        <PreferenceRange
          title="Critical Alert"
          value={critical}
          min={80}
          max={100}
          onChange={value =>
            updateBudget(
              "critical",
              value
            )
          }
          accentClass="accent-red-500"
          progressClass="bg-red-500"
          valueClass="text-red-600"
          icon={<FaFire />}
          boxClass="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
          headingClass="text-red-700 dark:text-red-300"
          textClass="text-red-600 dark:text-red-400"
          message={`High-priority alerts are generated when spending reaches ${critical}% of the budget.`}
        />

        <div className="rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-4">

          <h3 className="font-semibold text-[#0B6B57]">
            Recommended setup
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            A warning around 70% and a critical alert around 90% usually gives enough time to adjust spending before exceeding a budget.
          </p>

        </div>

      </div>

    </motion.div>
  );
}

function PreferenceRange({
  title,
  value,
  min,
  max,
  onChange,
  accentClass,
  progressClass,
  valueClass,
  icon,
  boxClass,
  headingClass,
  textClass,
  message,
}) {
  return (
    <div>

      <div className="mb-3 flex items-center justify-between gap-4">

        <label className="font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </label>

        <span className={`font-bold ${valueClass}`}>
          {value}%
        </span>

      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={event =>
          onChange(
            Number(event.target.value)
          )
        }
        className={`w-full ${accentClass}`}
      />

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

        <motion.div
          animate={{
            width: `${value}%`,
          }}
          className={`h-full ${progressClass}`}
        />

      </div>

      <div
        className={`mt-4 flex items-start gap-3 rounded-2xl border p-4 ${boxClass}`}
      >
        <div className={`mt-1 shrink-0 ${headingClass}`}>
          {icon}
        </div>

        <div>
          <h3 className={`font-semibold ${headingClass}`}>
            {title}
          </h3>

          <p className={`mt-1 text-sm leading-6 ${textClass}`}>
            {message}
          </p>
        </div>

      </div>

    </div>
  );
}