import {
  FaWallet,
  FaList,
  FaCalendarDay,
  FaChartLine,
} from "react-icons/fa";

import { formatCurrency } from "../../utils/format";
import { useSavings } from "../../context/SavingsContext";

export default function SavingsSummaryCards() {

  const {
    savings,
    totalSavings,
  } = useSavings();


  const today = new Date();

  const todaySavings = savings.reduce(
    (sum, item) => {
      if (
        item.savingDate ===
        today.toISOString().slice(0, 10)
      ) {
        return sum + Number(item.amount);
      }

      return sum;
    },
    0
  );


  const monthSavings = savings.reduce(
    (sum, item) => {

      const date = new Date(item.savingDate);

      if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return sum + Number(item.amount);
      }

      return sum;

    },
    0
  );


  const cards = [

    {
      title: "Total Savings",
      value: formatCurrency(totalSavings),
      subtitle: "All time savings",
      color: "bg-green-500",
      bg: "bg-green-50",
      icon: <FaWallet />,
    },

    {
      title: "Transactions",
      value: savings.length,
      subtitle: "Total savings entries",
      color: "bg-blue-500",
      bg: "bg-blue-50",
      icon: <FaList />,
    },

    {
      title: "Today's Savings",
      value: formatCurrency(todaySavings),
      subtitle: "Saved today",
      color: "bg-purple-500",
      bg: "bg-purple-50",
      icon: <FaCalendarDay />,
    },

    {
      title: "This Month",
      value: formatCurrency(monthSavings),
      subtitle: "Monthly savings",
      color: "bg-orange-500",
      bg: "bg-orange-50",
      icon: <FaChartLine />,
    },

  ];


  return (

    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.bg} rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition`}
        >

          <div className="flex justify-between">

            <div>

              <p className="text-sm text-gray-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-3">
                {card.value}
              </h2>

              <p className="text-sm text-gray-500 mt-3">
                {card.subtitle}
              </p>

            </div>


            <div
              className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl`}
            >

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}