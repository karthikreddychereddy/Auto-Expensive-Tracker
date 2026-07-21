import { motion } from "framer-motion";
import {
  FaMoon,
  FaSun,
  FaDesktop,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";


export default function AppearanceSettings() {

  const {
    settings,
    updateTheme,
  } = useSettings();


  const themes = [
    {
      key: "light",
      title: "Light",
      icon: <FaSun />,
    },
    {
      key: "dark",
      title: "Dark",
      icon: <FaMoon />,
    },
    {
      key: "system",
      title: "System",
      icon: <FaDesktop />,
    },
  ];


  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        bg-white
        dark:bg-slate-800
        rounded-3xl
        shadow-xl
        border
        border-gray-100
        overflow-hidden
      "
    >

      <div className="
        bg-gradient-to-r
        from-[#0B6B57]
        to-[#12A67D]
        p-6
      ">

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">
          Appearance
        </h2>

        <p className="
          text-white/80
          mt-2
        ">
          Customize how PaisaTrack looks.
        </p>

      </div>


      <div className="p-6">

        <div className="
          grid
          grid-cols-3
          gap-4
        ">

          {themes.map((theme) => (

            <motion.button
              key={theme.key}
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() => updateTheme(theme.key)}
              className={`
                rounded-2xl
                p-5
                border
                flex
                flex-col
                items-center
                gap-3
                transition-all

                ${
                  settings.theme === theme.key
                    ? "bg-[#0B6B57] text-white border-[#0B6B57] shadow-lg"
                    : "bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-white hover:border-[#0B6B57]"
                }
              `}
            >

              <div className="text-2xl">
                {theme.icon}
              </div>

              <span className="font-semibold">
                {theme.title}
              </span>

            </motion.button>

          ))}

        </div>


        <p className="
          mt-6
          text-gray-500
          dark:text-gray-300
          text-sm
        ">
          Choose your preferred appearance mode.
        </p>

      </div>

    </motion.div>

  );

}