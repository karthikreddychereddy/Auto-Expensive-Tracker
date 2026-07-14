import { useExpenses } from "../../context/ExpenseContext";
import {
  FaWallet,
  FaArrowTrendDown,
  FaCalendarDay,
  FaReceipt,
} from "react-icons/fa6";

export default function ExpenseSummary() {
  const { expenses } = useExpenses();

  // Total Expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  // Today's Expenses
  const today = new Date().toISOString().slice(0, 10);

  const todayExpenses = expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  // Current Month Expenses
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthExpenses = expenses
    .filter((expense) => {
      if (!expense.date) return false;

      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const cards = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString()}`,
      icon: <FaWallet />,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "This Month",
      value: `₹${monthExpenses.toLocaleString()}`,
      icon: <FaArrowTrendDown />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Today",
      value: `₹${todayExpenses.toLocaleString()}`,
      icon: <FaCalendarDay />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Transactions",
      value: expenses.length,
      icon: <FaReceipt />,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}