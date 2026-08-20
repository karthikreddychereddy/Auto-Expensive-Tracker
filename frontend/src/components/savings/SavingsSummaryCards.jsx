import {
  FaWallet,
  FaList,
  FaChartLine,
  FaArrowTrendUp,
} from "react-icons/fa6";

import {
  formatCurrency,
} from "../../utils/format";

import {
  useSavings,
} from "../../context/SavingsContext";

export default function SavingsSummaryCards() {
  const {
    savings,
    totalSavings,
    averageSaving,
    largestSaving,
    selectedMonth,
  } = useSavings();

  const cards = [
    {
      title: "Monthly Savings",
      value: formatCurrency(totalSavings),
      subtitle: `Saved in ${selectedMonth}`,
      color: "bg-green-500",
      bg: "bg-green-50 dark:bg-green-950/20",
      icon: FaWallet,
    },
    {
      title: "Transactions",
      value: savings.length,
      subtitle: "Savings entries this month",
      color: "bg-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      icon: FaList,
    },
    {
      title: "Average Saving",
      value: formatCurrency(averageSaving),
      subtitle: "Average per entry",
      color: "bg-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/20",
      icon: FaChartLine,
    },
    {
      title: "Largest Saving",
      value: formatCurrency(largestSaving),
      subtitle: "Highest entry this month",
      color: "bg-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/20",
      icon: FaArrowTrendUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map(card => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              ${card.bg}
              min-w-0
              rounded-3xl
              border
              border-slate-100
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              dark:border-slate-800
            `}
          >

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

              <p className="min-w-0 text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.title}
              </p>

              <div
                className={`
                  ${card.color}
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  text-xl
                  text-white
                  shadow-sm
                `}
              >
                <Icon />
              </div>

            </div>

            {/* Value */}

            <div className="mt-5 min-w-0">

              <h2
                className="
                  break-words
                  text-2xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-slate-800
                  dark:text-white
                  2xl:text-3xl
                "
              >
                {card.value}
              </h2>

              <p className="mt-4 text-sm leading-5 text-slate-500 dark:text-slate-400">
                {card.subtitle}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
}