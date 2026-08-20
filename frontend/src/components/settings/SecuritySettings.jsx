import {
  useState,
} from "react";

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
  const [
    openModal,
    setOpenModal,
  ] = useState(false);

  const securityItems = [
    {
      title: "Password",
      description:
        "Update your account password securely.",
      icon: <FaKey />,
      action: () =>
        setOpenModal(true),
      button: "Change",
    },
    {
      title:
        "Two-Factor Authentication",
      description:
        "Additional account verification for future releases.",
      icon: <FaShieldAlt />,
      button: "Coming Soon",
      disabled: true,
    },
    {
      title: "Biometric Login",
      description:
        "Fingerprint and Face ID support for the future mobile app.",
      icon: <FaFingerprint />,
      button: "Coming Soon",
      disabled: true,
    },
  ];

  return (
    <>
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

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <FaLock className="text-xl text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Security
              </h2>

              <p className="mt-1 text-sm text-white/80">
                Manage your account protection.
              </p>
            </div>

          </div>

        </div>

        <div className="space-y-5 p-5 sm:p-6">

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">

            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">
              Security Status
            </h3>

            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
              Email verification, password protection, JWT sessions, and refresh-token logout are enabled.
            </p>

          </div>

          <div className="space-y-4">

            {securityItems.map(item => (
              <div
                key={item.title}
                className="
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  border-slate-200
                  p-4
                  dark:border-slate-700
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="flex min-w-0 items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-lg text-[#0B6B57]">
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

                {item.disabled ? (
                  <span className="self-start whitespace-nowrap rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400 sm:self-auto">
                    {item.button}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={item.action}
                    className="flex self-start items-center gap-2 rounded-xl bg-[#0B6B57] px-5 py-2 text-white transition hover:bg-[#095544] sm:self-auto"
                  >
                    {item.button}

                    <FaChevronRight size={12} />
                  </button>
                )}

              </div>
            ))}

          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/20">

            <h3 className="font-semibold text-blue-700 dark:text-blue-300">
              Security Tips
            </h3>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-700 dark:text-blue-400">
              <li>• Use a strong, unique password.</li>
              <li>• Never share OTPs or passwords.</li>
              <li>• Log out on shared devices.</li>
            </ul>

          </div>

        </div>

      </motion.div>

      <ChangePasswordModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
      />
    </>
  );
}