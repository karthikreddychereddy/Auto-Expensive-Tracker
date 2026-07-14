import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

export default function AppearanceSettings() {

  const { settings, updateTheme } = useSettings();

  const themes = [
    {
      key: "light",
      title: "Light",
      icon: <FaSun size={22} />,
    },
    {
      key: "dark",
      title: "Dark",
      icon: <FaMoon size={22} />,
    },
    {
      key: "system",
      title: "System",
      icon: <FaDesktop size={22} />,
    },
  ];

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border p-8 transition">

      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">

        Appearance

      </h2>

      <div className="grid grid-cols-3 gap-5">

        {themes.map((theme) => (

          <button
            key={theme.key}
            onClick={() => updateTheme(theme.key)}
            className={`rounded-2xl border p-6 transition-all duration-300
            ${
              settings.theme === theme.key
                ? "bg-[#0B6B57] text-white border-[#0B6B57] scale-105"
                : "bg-gray-50 dark:bg-slate-700 hover:border-[#0B6B57]"
            }`}
          >

            <div className="flex flex-col items-center gap-4">

              {theme.icon}

              <span className="font-semibold">

                {theme.title}

              </span>

            </div>

          </button>

        ))}

      </div>

      <p className="mt-8 text-gray-500 dark:text-gray-300">

        Choose how PaisaTrack looks.

      </p>

    </div>

  );

}