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
    { title: "Income", value: Number(insight?.totalIncome ?? 0), icon: FaArrowCircleDown, color: "from-green-500 to-green-700" },
    { title: "Expense", value: Number(insight?.totalExpense ?? 0), icon: FaArrowCircleUp, color: "from-red-500 to-red-700" },
    { title: "Balance", value: Number(insight?.balance ?? 0), icon: FaWallet, color: "from-blue-500 to-blue-700" },
    { title: "Savings", value: Number(insight?.totalSavings ?? 0), icon: FaExchangeAlt, color: "from-purple-500 to-purple-700" },
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <button
            type="button"
            key={card.title}
            onClick={() => setActiveCard(card.title)}
            className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 text-left shadow-sm transition dark:border-slate-700 sm:rounded-3xl ${
              activeCard === card.title
                ? "ring-2 ring-[#0B6B57]"
                : "hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            <div className={`flex min-w-0 items-start justify-between gap-3 bg-gradient-to-r ${card.color} p-4 sm:p-5`}>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white/80">{card.title}</p>
                <h2 className="mt-2 break-words text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {formatCurrency(card.value)}
                </h2>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-14 sm:w-14">
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
