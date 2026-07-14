import { useSettings } from "../../context/SettingsContext";

export default function BudgetPreferences() {

  const { settings, updateBudget } = useSettings();

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">

        Budget Preferences

      </h2>

      <div className="space-y-8">

        <div>

          <label className="block font-semibold mb-2">

            Warning Alert (%)

          </label>

          <input
            type="range"
            min="50"
            max="90"
            value={settings.budget.warning}
            onChange={(e)=>
              updateBudget("warning",e.target.value)
            }
            className="w-full"
          />

          <p className="mt-2 text-[#0B6B57] font-bold">

            {settings.budget.warning}%

          </p>

        </div>

        <div>

          <label className="block font-semibold mb-2">

            Critical Alert (%)

          </label>

          <input
            type="range"
            min="80"
            max="100"
            value={settings.budget.critical}
            onChange={(e)=>
              updateBudget("critical",e.target.value)
            }
            className="w-full"
          />

          <p className="mt-2 text-red-600 font-bold">

            {settings.budget.critical}%

          </p>

        </div>

      </div>

    </div>

  );

}