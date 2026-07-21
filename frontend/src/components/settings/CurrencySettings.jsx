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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <FaGlobe className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Currency & Language
            </h2>

            <p className="text-white/80 mt-1">
              Configure your regional preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-7">

        <div>
          <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
            <FaMoneyBillWave className="text-[#0B6B57]" />
            Default Currency
          </label>

          <div className="grid grid-cols-2 gap-3">
            {currencies.map((currency) => (
              <motion.button
                key={currency}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => updateCurrency(currency)}
                className={`rounded-2xl border p-4 transition-all ${
                  settings.currency === currency
                    ? "bg-[#0B6B57] text-white border-[#0B6B57]"
                    : "bg-white hover:border-[#0B6B57]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {currency}
                  </span>

                  {settings.currency === currency && (
                    <FaCheckCircle />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold text-slate-700 mb-3">
            <FaLanguage className="text-[#0B6B57]" />
            Application Language
          </label>

          <select
            value={settings.language}
            onChange={(e) =>
              updateLanguage(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              p-4
              outline-none
              focus:border-[#0B6B57]
            "
          >
            {languages.map((language) => (
              <option
                key={language}
                value={language}
              >
                {language}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
          <h3 className="font-semibold text-green-700">
            Preview
          </h3>

          <div className="mt-4 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Currency
              </span>

              <span className="font-semibold">
                {settings.currency}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Language
              </span>

              <span className="font-semibold">
                {settings.language}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Sample Amount
              </span>

              <span className="font-bold text-[#0B6B57]">
                {settings.currency} 12,500.00
              </span>
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-5">
          <h3 className="font-semibold text-[#0B6B57]">
            Recommendation
          </h3>

          <p className="mt-2 text-gray-600 leading-6">
            Choose the currency you use most frequently. All dashboards,
            reports, budgets, savings, and analytics will use this format.
            Language support will be expanded in future updates.
          </p>
        </div>

      </div>
    </motion.div>
  );
}