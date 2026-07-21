import { motion } from "framer-motion";
import {
  FaCode,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaHeart,
  FaInfoCircle,
  FaSyncAlt,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";

export default function AboutSettings() {
  const info = [
    {
      icon: <FaCode />,
      title: "Developer",
      value: "Karthik Reddy",
    },
    {
      icon: <FaGlobe />,
      title: "Website",
      value: "Coming Soon",
    },
    {
      icon: <FaEnvelope />,
      title: "Support",
      value: "support@paisatrack.com",
    },
    {
      icon: <FaGithub />,
      title: "Repository",
      value: "Private",
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
        <div className="w-16 h-16 rounded-2xl bg-[#0B6B57] flex items-center justify-center text-white text-3xl font-bold">
          ₹
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            PaisaTrack
          </h2>

          <p className="text-gray-500">
            Version 1.0.0
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {info.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between rounded-2xl border border-gray-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B6B57]/10 flex items-center justify-center text-[#0B6B57]">
                {item.icon}
              </div>

              <span className="font-semibold text-slate-700">
                {item.title}
              </span>
            </div>

            <span className="text-gray-500">
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-[#0B6B57] py-4 text-white font-semibold flex items-center justify-center gap-2"
        >
          <FaSyncAlt />
          Check Updates
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl border border-gray-300 py-4 font-semibold flex items-center justify-center gap-2"
        >
          <FaInfoCircle />
          Changelog
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl bg-slate-50 py-4 flex items-center justify-center gap-2"
        >
          <FaShieldAlt />
          Privacy Policy
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl bg-slate-50 py-4 flex items-center justify-center gap-2"
        >
          <FaFileContract />
          Terms
        </motion.button>
      </div>

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#0B6B57]/10 to-[#12A67D]/10 border border-[#0B6B57]/20 p-6 text-center">
        <FaHeart className="mx-auto text-3xl text-red-500" />

        <h3 className="mt-4 text-xl font-bold text-slate-800">
          Thank You!
        </h3>

        <p className="mt-2 text-gray-600 leading-6">
          Thank you for choosing PaisaTrack to manage your personal finances.
          We're continuously working to make budgeting, saving, and expense
          tracking simpler and smarter.
        </p>
      </div>
    </motion.div>
  );
}