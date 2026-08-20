import { motion } from "framer-motion";

import {
  FaGlobe,
  FaMoneyBillWave,
  FaLanguage,
  FaCheckCircle,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

export default function CurrencySettings() {
  const {
    settings,
    updateCurrency,
    updateLanguage,
  } = useSettings();

  const currencies = [
    "INR",
    "USD",
    "EUR",
    "GBP",
  ];

  const languages = [
    "English",
    "Telugu",
    "Hindi",
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

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <FaGlobe className="text-xl text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Currency & Language
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Configure regional display preferences.
            </p>
          </div>

        </div>

      </div>

      <div className="space-y-7 p-5 sm:p-6">

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
            <FaMoneyBillWave className="text-[#0B6B57]" />
            Default Currency
          </label>

          <div className="grid grid-cols-2 gap-3">

            {currencies.map(currency => (
              <motion.button
                key={currency}
                type="button"
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  updateCurrency(
                    currency
                  )
                }
                className={`
                  rounded-2xl
                  border
                  p-4
                  transition
                  ${
                    settings.currency ===
                    currency
                      ? "border-[#0B6B57] bg-[#0B6B57] text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-[#0B6B57] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }
                `}
              >

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <span className="font-semibold">
                    {currency}
                  </span>

                  {settings.currency ===
                    currency && (
                    <FaCheckCircle />
                  )}

                </div>

              </motion.button>
            ))}

          </div>

        </div>

        <div>

          <label className="mb-3 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
            <FaLanguage className="text-[#0B6B57]" />
            Application Language
          </label>

          <select
            value={
              settings.language ||
              "English"
            }
            onChange={event =>
              updateLanguage(
                event.target.value
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              text-slate-800
              outline-none
              transition
              focus:border-[#0B6B57]
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          >
            {languages.map(
              language => (
                <option
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              )
            )}
          </select>

        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">

          <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
            Current preferences
          </h3>

          <div className="mt-4 space-y-3 text-sm">

            <PreviewRow
              label="Currency"
              value={
                settings.currency
              }
            />

            <PreviewRow
              label="Language"
              value={
                settings.language
              }
            />

            <PreviewRow
              label="Sample"
              value={`${settings.currency} 12,500.00`}
              highlight
            />

          </div>

        </div>

      </div>

    </motion.div>
  );
}

function PreviewRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-slate-500 dark:text-slate-400">
        {label}
      </span>

      <span
        className={
          highlight
            ? "font-bold text-[#0B6B57]"
            : "font-semibold text-slate-800 dark:text-white"
        }
      >
        {value}
      </span>

    </div>
  );
}