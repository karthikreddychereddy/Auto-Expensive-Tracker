import { FaArrowTrendUp, FaArrowTrendDown, FaPiggyBank, FaWallet } from "react-icons/fa6";

import { useIncome } from "../../context/IncomeContext";
import { useExpenses } from "../../context/ExpenseContext";
import { useSavings } from "../../context/SavingsContext";

import { formatCurrency } from "../../utils/format";

export default function ProfileSummary() {

  const { totalIncome } = useIncome();

  const { expenses } = useExpenses();

  const { totalSavings } = useSavings();

  const totalExpense = expenses
    .filter(item => item.transactionType !== "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;

  const cards = [

    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      icon: <FaArrowTrendUp />,
      color: "bg-green-100 text-green-600",
    },

    {
      title: "Total Expense",
      value: formatCurrency(totalExpense),
      icon: <FaArrowTrendDown />,
      color: "bg-red-100 text-red-600",
    },

    {
      title: "Savings",
      value: formatCurrency(totalSavings),
      icon: <FaPiggyBank />,
      color: "bg-yellow-100 text-yellow-600",
    },

    {
      title: "Current Balance",
      value: formatCurrency(balance),
      icon: <FaWallet />,
      color: "bg-blue-100 text-blue-600",
    },

  ];

  return (

    <div>

      <h2 className="text-2xl font-bold mb-6">

        Monthly Statistics

      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map(card => (

          <div
            key={card.title}
            className="bg-white rounded-3xl shadow border border-gray-100 p-6 hover:shadow-lg transition"
          >

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${card.color}`}>

              {card.icon}

            </div>

            <p className="text-gray-500 mt-5">

              {card.title}

            </p>

            <h2 className="text-2xl font-bold mt-2">

              {card.value}

            </h2>

          </div>

        ))}

      </div>

    </div>

  );

}