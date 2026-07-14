import { useExpenses } from "../../context/ExpenseContext";
import { FaArrowRight } from "react-icons/fa";

export default function RecentTransactions() {
  const { expenses } = useExpenses();

  const recentExpenses = [...expenses]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">
          Recent Transactions
        </h2>

        <button className="text-[#0B6B57] flex items-center gap-2 font-medium hover:underline">
          View All
          <FaArrowRight size={12} />
        </button>

      </div>

      <div className="space-y-4">

        {recentExpenses.length === 0 ? (
          <p className="text-gray-500">
            No transactions available.
          </p>
        ) : (
          recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>

                <h3 className="font-semibold">
                  {expense.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {expense.category} • {expense.paymentMethod}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-red-600">
                  ₹{expense.amount}
                </p>

                <p className="text-xs text-gray-500">
                  {expense.date}
                </p>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}