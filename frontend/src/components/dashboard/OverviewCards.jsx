import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaPiggyBank,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";

import { formatCurrency } from "../../utils/format";

export default function OverviewCards({ stats }) {

  const totals = stats?.totals || {
    income: 0,
    expense: 0,
    savings: 0,
    balance: 0,
    budget: 0,
    monthlyExpense: 0,
  };

  const cards = [
    {
      title: "Total Balance",
      value: totals.balance || (totals.income - totals.expense),
      icon: <FaWallet />,
      bg: "bg-green-100",
      iconBg: "bg-green-600",
      text: "text-green-700",
      change: "+8.2%",
    },
    {
      title: "Income",
      value: totals.income,
      icon: <FaArrowUp />,
      bg: "bg-blue-100",
      iconBg: "bg-blue-600",
      text: "text-blue-700",
      change: "+12.4%",
    },
    {
      title: "Expenses",
      value: totals.expense,
      icon: <FaArrowDown />,
      bg: "bg-red-100",
      iconBg: "bg-red-600",
      text: "text-red-700",
      change: "-5.8%",
    },
    {
      title: "Savings",
      value: totals.savings,
      icon: <FaPiggyBank />,
      bg: "bg-yellow-100",
      iconBg: "bg-yellow-600",
      text: "text-yellow-700",
      change: "+18%",
    },
    {
      title: "Budget",
      value: totals.budget || 50000,
      icon: <FaBullseye />,
      bg: "bg-purple-100",
      iconBg: "bg-purple-600",
      text: "text-purple-700",
      change: "72%",
    },
    {
      title: "This Month",
      value: totals.monthlyExpense || totals.expense,
      icon: <FaChartLine />,
      bg: "bg-cyan-100",
      iconBg: "bg-cyan-600",
      text: "text-cyan-700",
      change: "+4%",
    },
  ];

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">

                {card.title}

              </p>

              <h2 className={`text-3xl font-bold mt-2 ${card.text}`}>

                {formatCurrency(card.value)}

              </h2>

            </div>

            <div
              className={`${card.iconBg} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>

          </div>

          <div className="mt-6 flex justify-between items-center">

            <span
              className={`text-sm font-semibold ${card.text}`}
            >

              {card.change}

            </span>

            <span className="text-xs text-gray-400">

              vs last month

            </span>

          </div>

        </div>

      ))}

    </div>
  );
}