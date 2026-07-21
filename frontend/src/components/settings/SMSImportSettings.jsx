import { motion } from "framer-motion";
import {
  FaMobileAlt,
  FaCreditCard,
  FaBell,
  FaHistory,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

export default function SMSImportSettings() {
  const { settings, updateSMS } = useSettings();

  const options = [
    {
      key: "smsTracking",
      title: "Enable SMS Tracking",
      description: "Automatically detect bank and UPI messages.",
      icon: <FaMobileAlt />,
    },
    {
      key: "autoExpense",
      title: "Auto Create Expenses",
      description: "Generate expenses from payment SMS.",
      icon: <FaCreditCard />,
    },
    {
      key: "instantNotification",
      title: "Instant Notifications",
      description: "Notify whenever a transaction is detected.",
      icon: <FaBell />,
    },
    {
      key: "syncHistory",
      title: "Import Previous Messages",
      description: "Scan older SMS messages for transactions.",
      icon: <FaHistory />,
    },
    {
      key: "bankMessagesOnly",
      title: "Only Bank & UPI Messages",
      description: "Ignore promotional and spam messages.",
      icon: <FaUniversity />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#0B6B57]/10 flex items-center justify-center">
          <FaMobileAlt className="text-2xl text-[#0B6B57]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            SMS Import
          </h2>

          <p className="text-gray-500 mt-1">
            Automatically import expenses from bank messages.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {options.map((item) => (
          <motion.div
            key={item.key}
            whileHover={{ y: -2 }}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#0B6B57]/10 flex items-center justify-center text-[#0B6B57]">
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

            <button
              onClick={() =>
                updateSMS(item.key, !settings.sms[item.key])
              }
              className={`w-14 h-8 rounded-full transition ${
                settings.sms[item.key]
                  ? "bg-[#0B6B57]"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full mt-1 transition ${
                  settings.sms[item.key]
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="rounded-2xl bg-green-50 p-4">
          <FaCheckCircle className="text-green-600 text-2xl" />
          <p className="text-sm text-gray-500 mt-3">Status</p>
          <h3 className="font-bold mt-1">Connected</h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <FaMobileAlt className="text-blue-600 text-2xl" />
          <p className="text-sm text-gray-500 mt-3">Messages Scanned</p>
          <h3 className="font-bold mt-1">1,286</h3>
        </div>

        <div className="rounded-2xl bg-purple-50 p-4">
          <FaCreditCard className="text-purple-600 text-2xl" />
          <p className="text-sm text-gray-500 mt-3">Expenses Imported</p>
          <h3 className="font-bold mt-1">482</h3>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-5">
        <h3 className="font-semibold text-[#0B6B57]">
          Recommendation
        </h3>

        <p className="mt-2 text-gray-600 leading-6">
          Enable Automatic Expense Creation and Bank Messages Only for the
          most accurate transaction detection with minimal false positives.
        </p>
      </div>
    </motion.div>
  );
}