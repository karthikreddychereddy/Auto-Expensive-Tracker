import { useSettings } from "../../context/SettingsContext";

export default function NotificationSettings() {

  const { settings, updateNotifications } = useSettings();

  const options = [
    {
      key: "budgetAlerts",
      title: "Budget Alerts",
      subtitle: "Warn when you're close to your monthly budget.",
    },
    {
      key: "dailyReminder",
      title: "Daily Reminder",
      subtitle: "Receive reminders to record today's expenses.",
    },
    {
      key: "goalReminder",
      title: "Goal Reminder",
      subtitle: "Stay updated on your savings goals.",
    },
    {
      key: "monthlyReport",
      title: "Monthly Report",
      subtitle: "Receive your monthly financial summary.",
    },
  ];

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">

        Notifications

      </h2>

      <div className="space-y-6">

        {options.map((item) => (

          <div
            key={item.key}
            className="flex justify-between items-center border-b pb-5 last:border-none"
          >

            <div>

              <h3 className="font-semibold text-slate-800 dark:text-white">

                {item.title}

              </h3>

              <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">

                {item.subtitle}

              </p>

            </div>

            <label className="relative inline-flex items-center cursor-pointer">

              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications[item.key]}
                onChange={(e) =>
                  updateNotifications(item.key, e.target.checked)
                }
              />

              <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#0B6B57] transition-all"></div>

              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-6"></div>

            </label>

          </div>

        ))}

      </div>

    </div>

  );

}