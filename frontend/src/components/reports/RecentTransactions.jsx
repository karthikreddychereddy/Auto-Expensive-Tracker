import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

import {
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";

export default function RecentTransactions() {

  const { expenses } = useExpenses();

  const recentExpenses = useMemo(() => {

    return [...expenses]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 5);

  }, [expenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Recent Transactions
        </h2>

        <span className="text-sm text-[#0B6B57] font-semibold cursor-pointer">
          View All
        </span>

      </div>

      <div className="space-y-4">

        {recentExpenses.map((expense) => (

          <div
            key={expense.id}
            className="flex justify-between items-center border-b pb-4 last:border-none"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

                {expense.paymentMethod === "Cash"
                  ? (
                    <FaMoneyBillWave className="text-green-700" />
                  )
                  : (
                    <FaCreditCard className="text-[#0B6B57]" />
                  )}

              </div>

              <div>

                <h3 className="font-semibold">

                  {expense.title}

                </h3>

                <p className="text-sm text-gray-500">

                  {expense.category}

                  {" • "}

                  {expense.date}

                </p>

              </div>

            </div>

            <div className="text-right">

              <h3 className="font-bold text-red-600">

                ₹{expense.amount}

              </h3>

              <p className="text-sm text-gray-500">

                {expense.paymentMethod}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}