import { motion } from "framer-motion";
import {
  FaCamera,
  FaCircleCheck,
  FaWallet,
  FaPiggyBank,
  FaArrowTrendUp,
  FaHeartPulse,
} from "react-icons/fa6";

import { useProfile } from "../../context/ProfileContext";
import { useIncome } from "../../context/IncomeContext";
import { useSavings } from "../../context/SavingsContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useModal } from "../../context/ModalContext";

import { formatCurrency } from "../../utils/format";

export default function ProfileHeader() {

  const { profile } = useProfile();

  const { totalIncome } = useIncome();

  const { totalSavings } = useSavings();

  const { expenses } = useExpenses();

  const { openModal } = useModal();

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const balance = totalIncome - totalExpense;

  const cards = [

    {
      title: "Balance",
      value: formatCurrency(balance),
      icon: <FaWallet />,
      color: "bg-emerald-500",
    },

    {
      title: "Savings",
      value: formatCurrency(totalSavings),
      icon: <FaPiggyBank />,
      color: "bg-blue-500",
    },

    {
      title: "Income",
      value: formatCurrency(totalIncome),
      icon: <FaArrowTrendUp />,
      color: "bg-purple-500",
    },

    {
      title: "Health",
      value: `${profile.financialHealth}/100`,
      icon: <FaHeartPulse />,
      color: "bg-orange-500",
    },

  ];

  return (

    <motion.div

      initial={{ opacity:0, y:25 }}

      animate={{ opacity:1, y:0 }}

      className="rounded-[32px] overflow-hidden shadow-2xl"

    >

      <div className="bg-gradient-to-r from-[#0B6B57] via-[#11856D] to-[#12A67D] p-10">

        <div className="flex flex-col xl:flex-row justify-between gap-10">

          <div className="flex gap-8">

            <div className="relative">

              <img

                src={
                  profile.photo ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.name
                  )}&background=0B6B57&color=fff&size=300`
                }

                className="w-40 h-40 rounded-full border-[5px] border-white object-cover shadow-xl"

              />

              <button

                onClick={() => openModal("profile")}

                className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-white text-[#0B6B57] flex items-center justify-center shadow-xl hover:scale-110 transition"

              >

                <FaCamera />

              </button>

            </div>

            <div className="flex flex-col justify-center flex-1">

              <div className="flex items-center justify-between flex-wrap gap-4">

                <div className="flex items-center gap-4 flex-wrap">

                  <h1 className="text-5xl font-extrabold text-white">

                    {profile.name}

                  </h1>

                  <span className="px-4 py-2 rounded-full bg-blue-500 text-white flex items-center gap-2 font-semibold">

                    <FaCircleCheck />

                    Verified

                  </span>

                </div>

                <button
                  onClick={() => openModal("profile")}
                  className="px-6 py-3 rounded-2xl bg-white text-[#0B6B57] font-bold hover:scale-105 transition"
                >
                  Edit Profile
                </button>

              </div>

              <div className="mt-6 space-y-4 text-white/90 text-lg">

                <div className="flex items-center gap-3">

                  <span className="text-xl">📧</span>

                  <span className="break-all">

                    {profile.email}

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-xl">📱</span>

                  <span>

                    {profile.phone || "+91 XXXXX XXXXX"}

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-xl">📅</span>

                  <span>

                    Joined July 2026

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          {cards.map((card,index)=>(

            <motion.div

              key={card.title}

              initial={{opacity:0,y:30}}

              animate={{opacity:1,y:0}}

              transition={{delay:index*.12}}

              whileHover={{y:-6}}

              className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 border border-white/20"

            >

              <div className={`${card.color} w-14 h-14 rounded-2xl text-white flex items-center justify-center text-2xl`}>

                {card.icon}

              </div>

              <p className="text-white/80 mt-6">

                {card.title}

              </p>

              <h2 className="text-white text-3xl font-bold mt-2">

                {card.value}

              </h2>

            </motion.div>

          ))}

        </div>

      </div>

    </motion.div>

  );

}