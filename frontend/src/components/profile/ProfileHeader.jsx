import { motion } from "framer-motion";

import {
  FaCamera,
  FaCircleCheck,
  FaWallet,
  FaPiggyBank,
  FaArrowTrendUp,
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

  const {
    expenses = [],
    selectedMonthExpenses,
  } = useExpenses();

  const { openModal } = useModal();

  const monthlyExpenses =
    Array.isArray(selectedMonthExpenses)
      ? selectedMonthExpenses
      : expenses;

  const totalExpense =
    monthlyExpenses.reduce(
      (sum, item) =>
        sum +
        Number(item.amount || 0),
      0
    );

  const balance =
    Number(totalIncome || 0) -
    totalExpense;

  const firstName =
    profile?.firstName || "";

  const lastName =
    profile?.lastName || "";

  const displayName =
    profile?.name ||
    `${firstName} ${lastName}`.trim() ||
    "PaisaTrack User";

  const phone =
    profile?.phone ||
    profile?.phoneNumber ||
    "Not provided";

  const profileImage =
    profile?.photo ||
    profile?.profileImage ||
    null;

  const avatarUrl =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=0B6B57&color=fff&size=300`;

  const cards = [
    {
      title: "This Month Balance",
      value: formatCurrency(balance),
      icon: <FaWallet />,
      color: "bg-emerald-500",
    },
    {
      title: "Total Savings",
      value: formatCurrency(
        Number(totalSavings || 0)
      ),
      icon: <FaPiggyBank />,
      color: "bg-blue-500",
    },
    {
      title: "This Month Income",
      value: formatCurrency(
        Number(totalIncome || 0)
      ),
      icon: <FaArrowTrendUp />,
      color: "bg-purple-500",
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="overflow-hidden rounded-[30px] shadow-xl"
    >
      <div className="bg-gradient-to-r from-[#0B6B57] via-[#11856D] to-[#12A67D] p-6 sm:p-8 lg:p-10">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex min-w-0 flex-col items-center gap-6 sm:flex-row sm:items-start">

            <div className="relative shrink-0">

              <img
                src={
                  profileImage ||
                  avatarUrl
                }
                alt={`${displayName} profile`}
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl sm:h-36 sm:w-36"
              />

              <button
                type="button"
                onClick={() =>
                  openModal("profile")
                }
                aria-label="Change profile picture"
                className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B6B57] shadow-lg transition hover:scale-105"
              >
                <FaCamera />
              </button>

            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">

              <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap">

                <h1 className="max-w-full break-words text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                  {displayName}
                </h1>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  <FaCircleCheck />

                  Verified
                </span>

              </div>

              <div className="mt-5 space-y-2 text-sm text-white/90 sm:text-base">

                <p className="break-all">
                  {profile?.email ||
                    "Email unavailable"}
                </p>

                <p>
                  {phone}
                </p>

                <p className="text-white/70">
                  PaisaTrack member
                </p>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              openModal("profile")
            }
            className="self-center rounded-2xl bg-white px-6 py-3 font-bold text-[#0B6B57] shadow transition hover:-translate-y-0.5 lg:self-start"
          >
            Edit Profile
          </button>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {cards.map(
            (card, index) => (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-lg"
              >

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white ${card.color}`}
                >
                  {card.icon}
                </div>

                <p className="mt-5 text-sm text-white/75">
                  {card.title}
                </p>

                <h2 className="mt-2 break-words text-2xl font-bold text-white lg:text-3xl">
                  {card.value}
                </h2>

              </motion.div>
            )
          )}

        </div>

      </div>
    </motion.section>
  );
}