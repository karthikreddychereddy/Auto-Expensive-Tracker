import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaHistory,
  FaDatabase,
  FaShieldAlt,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

export default function BackupSettings() {
  const { settings, updateBackup } = useSettings();

  const cards = [
    {
      title: "Last Backup",
      value: "Today, 09:30 AM",
      icon: <FaHistory />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Backup Size",
      value: "14.2 MB",
      icon: <FaDatabase />,
      color: "bg-green-50 text-green-600",
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
          <FaShieldAlt className="text-2xl text-[#0B6B57]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Backup & Restore
          </h2>

          <p className="text-gray-500 mt-1">
            Keep your financial data secure and recoverable.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-800">
              Automatic Backup
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Automatically create backups based on your schedule.
            </p>
          </div>

          <button
            onClick={() =>
              updateBackup(
                "autoBackup",
                !settings.backup.autoBackup
              )
            }
            className={`w-14 h-8 rounded-full transition ${
              settings.backup.autoBackup
                ? "bg-[#0B6B57]"
                : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full mt-1 transition ${
                settings.backup.autoBackup
                  ? "translate-x-7"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-2">
            Backup Frequency
          </label>

          <select
            value={settings.backup.frequency}
            onChange={(e) =>
              updateBackup("frequency", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#0B6B57]"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -3 }}
            className={`rounded-2xl p-5 ${card.color}`}
          >
            <div className="text-2xl">
              {card.icon}
            </div>

            <p className="text-sm mt-4 opacity-80">
              {card.title}
            </p>

            <h3 className="text-lg font-bold mt-1">
              {card.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-3 rounded-2xl bg-[#0B6B57] py-4 text-white font-semibold"
        >
          <FaCloudUploadAlt />
          Backup Now
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-3 rounded-2xl border border-gray-300 py-4 font-semibold"
        >
          <FaCloudDownloadAlt />
          Restore Backup
        </motion.button>
      </div>

      <div className="mt-8 rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-5">
        <h3 className="font-semibold text-[#0B6B57]">
          Recommendation
        </h3>

        <p className="mt-2 text-gray-600 leading-6">
          Enable automatic daily backups to ensure your financial records are
          always protected. You'll be able to restore your data easily if you
          switch devices or reinstall the application.
        </p>
      </div>
    </motion.div>
  );
}