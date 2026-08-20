import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaBell,
  FaWallet,
  FaCalendarAlt,
  FaBullseye,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useSettings } from "../../context/SettingsContext";

import ReminderSettingsModal from "../common/ReminderSettingsModal";

import SettingsToggle from "./SettingsToggle";

const notifications = [
  {
    key: "budgetAlerts",
    title: "Budget Alerts",
    description:
      "Notify when your spending reaches your warning or critical budget level.",
    icon: FaWallet,
    color:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  {
    key: "dailyReminder",
    title: "Daily Expense Reminders",
    description:
      "Receive scheduled reminders to keep daily expense records updated.",
    icon: FaCalendarAlt,
    color:
      "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
  },
  {
    key: "goalReminder",
    title: "Goal Reminders",
    description:
      "Receive reminders when an active savings goal is approaching its deadline.",
    icon: FaBullseye,
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300",
  },
  {
    key: "monthlyReport",
    title: "Monthly Report",
    description:
      "Receive a summary notification for the previous month.",
    icon: FaChartLine,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300",
  },
  {
    key: "aiSuggestions",
    title: "Smart Financial Suggestions",
    description:
      "Receive personalized suggestions based on your monthly financial activity.",
    icon: FaRobot,
    color:
      "bg-pink-100 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300",
  },
];

function NotificationCard({
  item,
  enabled,
  onToggle,
  delay,
  disabled,
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
      }}
      className="
        grid
        min-w-0
        grid-cols-[minmax(0,1fr)_auto]
        items-start
        gap-3
        sm:gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        transition
        hover:border-[#0B6B57]/40
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
        >
          <Icon size={18} />
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

      <div className="shrink-0 pt-1">

        <SettingsToggle
          checked={enabled}
          onChange={onToggle}
          disabled={disabled}
          label={item.title}
        />

      </div>

    </motion.div>
  );
}

export default function NotificationSettings() {
  const {
    settings,
    loading,
    updateNotifications,
    saveSettings,
    resetNotificationSettings,
  } = useSettings();

  const [saving, setSaving] =
    useState(false);

  const [resetting, setResetting] =
    useState(false);

  const [
    showReminderSettings,
    setShowReminderSettings,
  ] = useState(false);

  const handleSave = async () => {
    if (
      saving ||
      resetting
    ) {
      return;
    }

    setSaving(true);

    try {
      const success =
        await saveSettings();

      if (success) {
        toast.success(
          "Notification preferences saved."
        );
      } else {
        toast.error(
          "Unable to save notification preferences."
        );
      }
    } catch (error) {
      console.error(
        "Failed to save notification preferences",
        error
      );

      toast.error(
        error?.message ||
          "Unable to save notification preferences."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      saving ||
      resetting
    ) {
      return;
    }

    setResetting(true);

    try {
      const success =
        await resetNotificationSettings();

      if (success) {
        toast.success(
          "Notification preferences restored to defaults."
        );
      } else {
        toast.error(
          "Unable to reset settings."
        );
      }
    } catch (error) {
      console.error(
        "Failed to reset settings",
        error
      );

      toast.error(
        "Unable to reset settings."
      );
    } finally {
      setResetting(false);
    }
  };

  const disabled =
    loading ||
    saving ||
    resetting;

  return (
    <>
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

        <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-4 sm:p-6">

          <div className="flex min-w-0 items-start gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <FaBell className="text-xl text-white" />
            </div>

            <div className="min-w-0">

              <h2 className="break-words text-xl font-bold text-white sm:text-2xl">
                Notifications
              </h2>

              <p className="mt-1 max-w-2xl break-words text-sm leading-6 text-white/80">
                Control which alerts PaisaTrack generates for your account.
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-4 p-5 sm:p-6">

          {notifications.map(
            (item, index) => (
              <NotificationCard
                key={item.key}
                item={item}
                enabled={
                  settings.notifications?.[
                    item.key
                  ] ?? false
                }
                onToggle={() =>
                  updateNotifications(
                    item.key,
                    !settings.notifications?.[
                      item.key
                    ]
                  )
                }
                delay={
                  index * 0.05
                }
                disabled={
                  disabled
                }
              />
            )
          )}

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">

            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
              Daily reminder schedule
            </h3>

            <p className="mt-1 text-sm leading-6 text-emerald-600 dark:text-emerald-400">
              Configure Morning, Afternoon, Evening, and Night reminder times separately.
            </p>

          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 pt-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">

            <button
              type="button"
              disabled={disabled}
              onClick={() =>
                setShowReminderSettings(
                  true
                )
              }
              className="
                min-h-11
                w-full
                rounded-xl
                border
                border-[#0B6B57]/30
                px-5
                py-2.5
                font-medium
                text-[#0B6B57]
                transition
                hover:bg-[#0B6B57]/5
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              Manage Daily Reminder Times
            </button>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:flex lg:justify-end">

              <button
                type="button"
                disabled={disabled}
                onClick={handleReset}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-300
                  px-5
                  py-2.5
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-slate-700
                  dark:text-slate-300
                  dark:hover:bg-slate-800
                  sm:flex-none
                "
              >
                {resetting
                  ? "Resetting..."
                  : "Reset"}
              </button>

              <button
                type="button"
                disabled={disabled}
                onClick={handleSave}
                className="
                  flex-1
                  rounded-xl
                  bg-[#0B6B57]
                  px-6
                  py-2.5
                  font-medium
                  text-white
                  transition
                  hover:bg-[#095544]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:flex-none
                "
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      </motion.div>

      <ReminderSettingsModal
        open={showReminderSettings}
        onClose={() =>
          setShowReminderSettings(
            false
          )
        }
      />
    </>
  );
}