import { FaWallet, FaMoneyBillWave, FaPiggyBank, FaChartPie } from "react-icons/fa";
import { useExpenses } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetOverview() {

  const {
    selectedMonthExpenses,
    currentCategoryBudgets,
  } = useBudget();

  const totalBudget = Object.values(currentCategoryBudgets)
    .reduce((sum, value) => sum + value, 0);

  const totalSpent = selectedMonthExpenses
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const remaining = totalBudget - totalSpent;

  const savings =
    totalBudget === 0
      ? 0
      : ((remaining / totalBudget) * 100).toFixed(1);

  const cards = [

    {
      title: "Total Budget",
      value: totalBudget,
      icon: <FaWallet />,
      color: "bg-blue-500",
    },

    {
      title: "Spent",
      value: totalSpent,
      icon: <FaMoneyBillWave />,
      color: "bg-red-500",
    },

    {
      title: "Remaining",
      value: remaining,
      icon: <FaPiggyBank />,
      color: "bg-green-500",
    },

    {
      title: "Savings",
      value: `${savings}%`,
      icon: <FaChartPie />,
      color: "bg-purple-500",
    },

  ];

  return (

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow border p-6 flex justify-between items-center"
        >

          <div>

            <p className="text-gray-500 text-sm">

              {card.title}

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {typeof card.value === "number"
                ? `₹${card.value.toLocaleString()}`
                : card.value}

            </h2>

          </div>

          <div className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-white text-xl`}>

            {card.icon}

          </div>

        </div>

      ))}

    </div>

  );

}