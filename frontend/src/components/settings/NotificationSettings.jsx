import { motion } from "framer-motion";
import {
  FaBell,
  FaWallet,
  FaCalendarAlt,
  FaBullseye,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

const notifications = [
  {
    key: "budgetAlerts",
    title: "Budget Alerts",
    description: "Notify when your spending is approaching the monthly budget.",
    icon: FaWallet,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    key: "dailyReminder",
    title: "Daily Reminder",
    description: "Receive a reminder to record today's expenses.",
    icon: FaCalendarAlt,
    color: "bg-blue-100 text-blue-600",
  },
  {
    key: "goalReminder",
    title: "Goal Reminder",
    description: "Stay updated with your savings goal progress.",
    icon: FaBullseye,
    color: "bg-orange-100 text-orange-600",
  },
  {
    key: "monthlyReport",
    title: "Monthly Report",
    description: "Get your monthly finance summary automatically.",
    icon: FaChartLine,
    color: "bg-purple-100 text-purple-600",
  },
  {
    key: "aiSuggestions",
    title: "AI Suggestions",
    description: "Receive personalized financial recommendations.",
    icon: FaRobot,
    color: "bg-pink-100 text-pink-600",
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-7 w-14 rounded-full transition-all duration-300 ${
        checked ? "bg-[#0B6B57]" : "bg-gray-300"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${
          checked ? "left-8" : "left-1"
        }`}
      />
    </button>
  );
}

function NotificationCard({
  item,
  enabled,
  onToggle,
  delay,
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2 },
      }}
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:border-[#0B6B57]
        hover:shadow-lg
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            ${item.color}
          `}
        >
          <Icon size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            {item.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {item.description}
          </p>
        </div>
      </div>

      <Toggle
        checked={enabled}
        onChange={onToggle}
      />
    </motion.div>
  );
}

export default function NotificationSettings() {
  const { settings, updateNotifications } = useSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-lg
        overflow-hidden
      "
    >
      <div
        className="
          bg-gradient-to-r
          from-[#0B6B57]
          to-[#12A67D]
          p-6
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/20
            "
          >
            <FaBell className="text-xl text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Notifications
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Control how PaisaTrack keeps you updated.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
                {notifications.map((item, index) => (
          <NotificationCard
            key={item.key}
            item={item}
            enabled={settings.notifications[item.key] ?? false}
            onToggle={() =>
              updateNotifications(
                item.key,
                !settings.notifications[item.key]
              )
            }
            delay={index * 0.08}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            mt-6
            rounded-2xl
            border
            border-green-100
            bg-green-50
            p-4
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-700">
                Notification Status
              </h3>

              <p className="mt-1 text-sm text-green-600">
                Your notification preferences are saved automatically.
              </p>
            </div>

            <div
              className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-sm
                font-semibold
                text-green-700
              "
            >
              Active
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="
              rounded-xl
              border
              border-gray-300
              px-5
              py-2.5
              font-medium
              text-gray-600
              transition-all
              duration-300
              hover:bg-gray-100
            "
          >
            Reset
          </button>

          <button
            type="button"
            className="
              rounded-xl
              bg-gradient-to-r
              from-[#0B6B57]
              to-[#12A67D]
              px-6
              py-2.5
              font-medium
              text-white
              shadow-md
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-lg
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}