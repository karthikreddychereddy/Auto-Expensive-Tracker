import { useSettings } from "../../context/SettingsContext";

export default function CurrencySettings() {

  const {

    settings,

    updateCurrency,

    updateLanguage,

  } = useSettings();

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">

        Currency & Language

      </h2>

      <div className="space-y-6">

        <div>

          <label className="block mb-2 font-semibold">

            Currency

          </label>

          <select
            value={settings.currency}
            onChange={(e)=>
              updateCurrency(e.target.value)
            }
            className="w-full border rounded-xl p-3 dark:bg-slate-700"
          >

            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>

          </select>

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            Language

          </label>

          <select
            value={settings.language}
            onChange={(e)=>
              updateLanguage(e.target.value)
            }
            className="w-full border rounded-xl p-3 dark:bg-slate-700"
          >

            <option>English</option>
            <option>Telugu</option>
            <option>Hindi</option>

          </select>

        </div>

      </div>

    </div>

  );

}