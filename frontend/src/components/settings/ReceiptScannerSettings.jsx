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

export default function ReceiptScannerSettings() {
  const { settings, updateReceipt } = useSettings();

  const options = [
    {
      key: "enabled",
      title: "Enable Receipt Scanner",
      description: "Allow OCR scanning for receipts.",
      icon: <FaCamera />,
    },
    {
      key: "autoCrop",
      title: "Auto Crop",
      description: "Automatically crop receipt edges.",
      icon: <FaCropAlt />,
    },
    {
      key: "autoCategorize",
      title: "AI Categorization",
      description: "Categorize expenses automatically.",
      icon: <FaTags />,
    },
    {
      key: "highQuality",
      title: "High Quality Scan",
      description: "Improve OCR accuracy.",
      icon: <FaMagic />,
    },
    {
      key: "saveImages",
      title: "Save Receipt Images",
      description: "Keep original receipt photos.",
      icon: <FaImage />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#0B6B57]/10 flex items-center justify-center">
          <FaCamera className="text-2xl text-[#0B6B57]" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Receipt Scanner
          </h2>

          <p className="text-gray-500 mt-1">
            Configure OCR receipt scanning preferences.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {options.map((item) => (
          <motion.div
            key={item.key}
            whileHover={{ y: -2 }}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#0B6B57]/10 flex items-center justify-center text-[#0B6B57]">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                updateReceipt(
                  item.key,
                  !settings.receipt[item.key]
                )
              }
              className={`w-14 h-8 rounded-full transition ${
                settings.receipt[item.key]
                  ? "bg-[#0B6B57]"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full mt-1 transition ${
                  settings.receipt[item.key]
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="rounded-2xl bg-green-50 p-4">
          <FaCheckCircle className="text-green-600 text-2xl" />

          <p className="text-sm text-gray-500 mt-3">
            Status
          </p>

          <h3 className="font-bold mt-1">
            Ready
          </h3>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <FaCamera className="text-blue-600 text-2xl" />

          <p className="text-sm text-gray-500 mt-3">
            OCR Engine
          </p>

          <h3 className="font-bold mt-1">
            Google ML Kit
          </h3>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4">
          <FaImage className="text-orange-600 text-2xl" />

          <p className="text-sm text-gray-500 mt-3">
            Format
          </p>

          <h3 className="font-bold mt-1">
            JPEG
          </h3>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#0B6B57]/20 bg-[#0B6B57]/5 p-5">
        <h3 className="font-semibold text-[#0B6B57]">
          Recommendation
        </h3>

        <p className="mt-2 text-gray-600 leading-6">
          Enable Auto Crop and AI Categorization for the best scanning
          experience. High Quality Scan improves OCR accuracy but may take
          slightly longer to process.
        </p>
      </div>
    </motion.div>
  );
}