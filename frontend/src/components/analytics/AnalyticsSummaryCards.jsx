import {
  FaWallet,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaExchangeAlt,
} from "react-icons/fa";

import { useReports } from "../../context/ReportContext";
import { useState } from "react";

export default function AnalyticsSummaryCards() {

  const { monthlySummary } = useReports();
  const [activeCard, setActiveCard] = useState("");

  const cards = [

    {
      title: "Income",
      value: monthlySummary.income,
      icon: FaArrowCircleDown,
      color: "from-green-500 to-green-700",
    },

    {
      title: "Expense",
      value: monthlySummary.expense,
      icon: FaArrowCircleUp,
      color: "from-red-500 to-red-700",
    },

    {
      title: "Balance",
      value: monthlySummary.balance,
      icon: FaWallet,
      color:
        monthlySummary.balance >= 0
          ? "from-blue-500 to-blue-700"
          : "from-red-600 to-red-800",
    },

    {
      title: "Transactions",
      value: monthlySummary.transactions,
      icon: FaExchangeAlt,
      color: "from-purple-500 to-purple-700",
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            onClick={() => setActiveCard(card.title)}
            className={`rounded-3xl shadow border overflow-hidden transition cursor-pointer

            ${
                activeCard === card.title
                ? "ring-4 ring-[#0B6B57] scale-105"
                : "hover:shadow-xl hover:scale-105"
            }`}
           >

            <div
              className={`bg-gradient-to-r ${card.color} p-5 flex justify-between items-center`}
            >

              <div>

                <p className="text-white/90 text-sm">
                  {card.title}
                </p>

                <h2 className="text-white text-3xl font-bold mt-2">

                  {typeof card.value === "number"

                    ? `₹${card.value.toLocaleString()}`

                    : card.value}

                </h2>

              </div>

              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">

                <Icon
                  size={28}
                  className="text-white"
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}