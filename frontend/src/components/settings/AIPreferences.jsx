import { useSettings } from "../../context/SettingsContext";
import { FaRobot } from "react-icons/fa";

export default function AIPreferences() {

  const { settings, updateAI } = useSettings();

  const options = [

    {
      key: "smartSuggestions",
      title: "Smart Suggestions",
      description:
        "Receive AI-powered spending and saving recommendations.",
    },

    {
      key: "weeklySummary",
      title: "Weekly Summary",
      description:
        "Generate a weekly AI financial summary automatically.",
    },

    {
      key: "aiInsights",
      title: "AI Insights",
      description:
        "Allow AI to analyze your financial habits and spending patterns.",
    },

  ];

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-[#0B6B57]/10 flex items-center justify-center">

          <FaRobot className="text-[#0B6B57] text-xl"/>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">

            AI Preferences

          </h2>

          <p className="text-gray-500 dark:text-gray-300 text-sm">

            Customize your AI assistant experience

          </p>

        </div>

      </div>

      <div className="space-y-6">

        {options.map((item) => (

          <div
            key={item.key}
            className="flex justify-between items-center border-b border-gray-200 dark:border-slate-700 pb-5 last:border-none"
          >

            <div>

              <h3 className="font-semibold text-slate-800 dark:text-white">

                {item.title}

              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">

                {item.description}

              </p>

            </div>

            <label className="relative inline-flex cursor-pointer items-center">

              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.ai[item.key]}
                onChange={(e)=>
                  updateAI(item.key,e.target.checked)
                }
              />

              <div className="w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-[#0B6B57] transition"></div>

              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition peer-checked:translate-x-6"></div>

            </label>

          </div>

        ))}

      </div>

    </div>

  );

}