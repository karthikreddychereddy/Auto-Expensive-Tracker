import { useMemo } from "react";
import { useBudget } from "../../context/BudgetContext";

export default function TopExpensesTable() {

  const { selectedMonthExpenses } = useBudget();

  const topExpenses = useMemo(() => {

    return [...selectedMonthExpenses]
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 5);

  }, [selectedMonthExpenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        Top Expenses

      </h2>

      <table className="w-full">

        <thead className="border-b">

          <tr>

            <th className="text-left py-3">Title</th>

            <th className="text-left">Category</th>

            <th className="text-right">Amount</th>

          </tr>

        </thead>

        <tbody>

          {topExpenses.map((expense) => (

            <tr
              key={expense.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="py-4">

                {expense.title}

              </td>

              <td>

                {expense.category}

              </td>

              <td className="text-right font-bold text-red-600">

                ₹{Number(expense.amount).toLocaleString()}

              </td>

            </tr>

          ))}

          {topExpenses.length === 0 && (

            <tr>

              <td
                colSpan={3}
                className="text-center py-6 text-gray-500"
              >

                No expenses found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}