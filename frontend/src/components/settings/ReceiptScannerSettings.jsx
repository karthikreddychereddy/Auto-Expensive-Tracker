import { motion } from "framer-motion";

import {
  FaCamera,
  FaCropAlt,
  FaImage,
  FaMagic,
  FaTags,
  FaCheckCircle,
} from "react-icons/fa";

import { useSettings } from "../../context/SettingsContext";

import SettingsToggle from "./SettingsToggle";

export default function ReceiptScannerSettings() {
  const {
    settings,
    updateReceipt,
  } = useSettings();

  const options = [
    {
      key: "enabled",
      title: "Enable Receipt Scanner",
      description:
        "Allow OCR scanning for receipts.",
      icon: <FaCamera />,
    },
    {
      key: "autoCrop",
      title: "Auto Crop",
      description:
        "Automatically crop receipt edges.",
      icon: <FaCropAlt />,
    },
    {
      key: "autoCategorize",
      title: "AI Categorization",
      description:
        "Categorize expenses automatically.",
      icon: <FaTags />,
    },
    {
      key: "highQuality",
      title: "High Quality Scan",
      description:
        "Improve OCR accuracy.",
      icon: <FaMagic />,
    },
    {
      key: "saveImages",
      title: "Save Receipt Images",
      description:
        "Keep original receipt photos.",
      icon: <FaImage />,
    },
  ];

  return (
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

      <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl text-white">
            <FaCamera />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Receipt Scanner
            </h2>

            <p className="mt-1 text-sm text-white/80">
              Configure OCR receipt scanning preferences.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-4 p-5 sm:p-6">

        {options.map(item => (

          <div
            key={item.key}
            className="
              flex
              items-start
              justify-between
              gap-4
              rounded-2xl
              border
              border-slate-200
              p-4
              dark:border-slate-700
            "
          >

            <div className="flex min-w-0 items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-[#0B6B57]">
                {item.icon}
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

            <div className="pt-1">

              <SettingsToggle
                checked={
                  settings.receipt?.[
                    item.key
                  ] ?? false
                }
                onChange={() =>
                  updateReceipt(
                    item.key,
                    !settings.receipt?.[
                      item.key
                    ]
                  )
                }
                label={item.title}
              />

            </div>

          </div>

        ))}

        <div className="grid gap-3 sm:grid-cols-3">

          <InfoCard
            icon={
              <FaCheckCircle />
            }
            label="Status"
            value="Ready"
          />

          <InfoCard
            icon={<FaCamera />}
            label="OCR Engine"
            value="Active"
          />

          <InfoCard
            icon={<FaImage />}
            label="Format"
            value="JPEG"
          />

        </div>

        <div className="rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-4">

          <h3 className="font-semibold text-[#0B6B57]">
            Recommendation
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Enable Auto Crop and AI Categorization for the best scanning experience.
          </p>

        </div>

      </div>

    </motion.div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">

      <div className="text-xl text-[#0B6B57]">
        {icon}
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <h3 className="mt-1 font-bold text-slate-800 dark:text-white">
        {value}
      </h3>

    </div>
  );
}