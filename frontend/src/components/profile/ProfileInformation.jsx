import { motion } from "framer-motion";
import {
  FaPen,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMoneyBillWave,
  FaBullseye,
} from "react-icons/fa";

import { useProfile } from "../../context/ProfileContext";
import { useModal } from "../../context/ModalContext";

export default function ProfileInformation() {

  const { profile } = useProfile();
  const { openModal } = useModal();

  const fields = [
    {
      icon: <FaPhone />,
      title: "Phone",
      value: profile.phone,
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Monthly Income",
      value: `₹${Number(profile.monthlyIncome).toLocaleString()}`,
    },
    {
      icon: <FaBullseye />,
      title: "Savings Goal",
      value: `₹${Number(profile.savingsGoal).toLocaleString()}`,
    },
    {
      icon: <FaUser />,
      title: "Member Since",
      value: "July 2026",
    },
  ];

  return (

    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
    >

      <div className="flex justify-between items-center bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">

        <h2 className="text-2xl font-bold text-white">
          Personal Information
        </h2>

        <button
          onClick={() => openModal("profile")}
          className="bg-white text-[#0B6B57] px-5 py-2 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
        >
          <FaPen />
          Edit
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">

        {fields.map((field) => (

          <motion.div
            key={field.title}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-gray-200 p-5 hover:border-[#0B6B57] transition min-w-0"
          >

            <div className="flex items-center gap-3 text-[#0B6B57]">

              <div className="flex-shrink-0 text-lg">
                {field.icon}
              </div>

              <span className="text-gray-500 font-medium">
                {field.title}
              </span>

            </div>

            <h3
              className="mt-3 font-bold text-base text-gray-800 leading-6 min-w-0"
              style={{
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {field.value}
            </h3>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

}