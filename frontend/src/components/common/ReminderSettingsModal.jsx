import { useEffect, useState } from "react";
import {
  FaBell,
  FaSun,
  FaCloudSun,
  FaCloudMoon,
  FaMoon,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import { useNotifications } from "../../context/NotificationContext";

export default function ReminderSettingsModal({ open, onClose }) {
  const {
    settings,
    fetchSettings,
    saveSettings,
    savingSettings,
  } = useNotifications();

  const [form, setForm] = useState({
    enabled: true,
    morningReminderTime: "09:00",
    afternoonReminderTime: "13:00",
    eveningReminderTime: "18:00",
    nightReminderTime: "22:00",
  });

  useEffect(() => {
    if (!open) return;
    fetchSettings();
  }, [open]);

  useEffect(() => {
    if (!settings) return;

    setForm({
      enabled: settings.enabled,
      morningReminderTime: settings.morningReminderTime ?? "09:00",
      afternoonReminderTime: settings.afternoonReminderTime ?? "13:00",
      eveningReminderTime: settings.eveningReminderTime ?? "18:00",
      nightReminderTime: settings.nightReminderTime ?? "22:00",
    });
  }, [settings]);

  const change = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = async () => {
    const success = await saveSettings(form);

    if (success) onClose();
  };

  if (!open) return null;

  return (
    <div
        className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            animate-fadeIn
        "
    >

      <div
        className="
            w-[500px]
            bg-white
            dark:bg-slate-800
            rounded-2xl
            shadow-2xl
            overflow-hidden
            animate-[popup_0.28s_ease]
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-700">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-[#0B6B57]/10 flex items-center justify-center">

              <FaBell className="text-[#0B6B57] text-xl" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                Reminder Settings
              </h2>

              <p className="text-sm text-gray-500">
                Configure your daily reminder schedule
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-700">

            <div>

              <h3 className="font-semibold text-slate-800 dark:text-white">
                Enable Notifications
              </h3>

              <p className="text-sm text-gray-500">
                Receive reminder notifications automatically.
              </p>

            </div>

            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => change("enabled", e.target.checked)}
              className="w-5 h-5 accent-[#0B6B57]"
            />

          </div>

          {[
            ["Morning", "morningReminderTime", <FaSun className="text-yellow-500" />],
            ["Afternoon", "afternoonReminderTime", <FaCloudSun className="text-orange-500" />],
            ["Evening", "eveningReminderTime", <FaCloudMoon className="text-purple-500" />],
            ["Night", "nightReminderTime", <FaMoon className="text-blue-500" />],
          ].map(([label, field, icon]) => (

            <div
              key={field}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700"
            >

              <div className="flex items-center gap-3">

                <div className="text-xl">{icon}</div>

                <div>

                  <h4 className="font-medium text-slate-800 dark:text-white">
                    {label}
                  </h4>

                  <p className="text-xs text-gray-500">
                    Reminder time
                  </p>

                </div>

              </div>

              <input
                type="time"
                value={form[field]}
                onChange={(e) => change(field, e.target.value)}
                className="border rounded-lg px-3 py-2 dark:bg-slate-700 dark:border-slate-600"
              />

            </div>

          ))}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200 dark:border-slate-700">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={savingSettings}
            className="px-6 py-2 rounded-lg bg-[#0B6B57] text-white hover:bg-[#095847] transition flex items-center gap-2"
          >
            <FaSave />
            {savingSettings ? "Saving..." : "Save Settings"}
          </button>

        </div>

      </div>

    </div>
  );
}