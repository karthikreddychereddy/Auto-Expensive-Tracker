import {
  FaWallet,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaExchangeAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useInsights } from "../../context/InsightContext";
import { formatCurrency } from "../../utils/format";

export default function AnalyticsSummaryCards() {

  const { insight } = useInsights();

  const [activeCard, setActiveCard] = useState("");

  const cards = [

    {
      title: "Income",
      value: Number(insight?.totalIncome ?? 0),
      icon: FaArrowCircleDown,
      color: "from-green-500 to-green-700",
    },

    {
      title: "Expense",
      value: Number(insight?.totalExpense ?? 0),
      icon: FaArrowCircleUp,
      color: "from-red-500 to-red-700",
    },

    {
      title: "Balance",
      value: Number(insight?.balance ?? 0),
      icon: FaWallet,
      color: "from-blue-500 to-blue-700",
    },

    {
      title: "Savings",
      value: Number(insight?.totalSavings ?? 0),
      icon: FaExchangeAlt,
      color: "from-purple-500 to-purple-700",
    },

  ];

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            onClick={() => setActiveCard(card.title)}
            className={`rounded-3xl shadow border overflow-hidden cursor-pointer transition ${
              activeCard === card.title
                ? "ring-4 ring-[#0B6B57] scale-105"
                : "hover:shadow-xl hover:scale-105"
            }`}
          >

            <div className={`bg-gradient-to-r ${card.color} p-5 flex justify-between`}>

              <div>

                <p className="text-white/80 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {formatCurrency(card.value)}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">

                <Icon
                  className="text-white"
                  size={28}
                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}