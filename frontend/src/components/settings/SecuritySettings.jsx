import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaShieldAlt,
  FaKey,
  FaFingerprint,
  FaChevronRight,
} from "react-icons/fa";

import ChangePasswordModal from "./ChangePasswordModal";

export default function SecuritySettings() {
  const [openModal, setOpenModal] = useState(false);

  const securityItems = [
    {
      title: "Password",
      description: "Update your account password.",
      icon: <FaKey />,
      action: () => setOpenModal(true),
      button: "Change",
    },
    {
      title: "Two-Factor Authentication",
      description: "Protect your account with an extra security layer.",
      icon: <FaShieldAlt />,
      button: "Coming Soon",
      disabled: true,
    },
    {
      title: "Biometric Login",
      description: "Fingerprint and Face ID support.",
      icon: <FaFingerprint />,
      button: "Coming Soon",
      disabled: true,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaLock className="text-white text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Security
              </h2>

              <p className="text-white/80 mt-1">
                Manage your account security settings.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">

          <div className="rounded-2xl bg-green-50 border border-green-100 p-5 mb-6">
            <h3 className="font-semibold text-green-700">
              Security Status
            </h3>

            <p className="text-green-600 mt-2">
              Your account is currently protected.
            </p>
          </div>

          <div className="space-y-4">
            {securityItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-gray-200 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B6B57]/10 text-[#0B6B57] flex items-center justify-center text-xl">
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

                {item.disabled ? (
                  <span className="px-4 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium">
                    {item.button}
                  </span>
                ) : (
                  <button
                    onClick={item.action}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0B6B57] text-white hover:bg-[#095544] transition"
                  >
                    {item.button}
                    <FaChevronRight size={12} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 p-5">
            <h3 className="font-semibold text-blue-700">
              Security Tips
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-blue-700">
              <li>• Use a strong password with at least 8 characters.</li>
              <li>• Avoid sharing your password with anyone.</li>
              <li>• Change your password regularly.</li>
              <li>• Enable Two-Factor Authentication when available.</li>
            </ul>
          </div>

        </div>
      </motion.div>

      <ChangePasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}