import { useInsights } from "../../context/InsightContext";
import { formatCurrency } from "../../utils/format";

export default function TopExpensesTable() {

  const { recentTransactions, loading } = useInsights();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow border p-6 h-[450px] animate-pulse" />
    );
  }

  const expenses = (recentTransactions || [])
    .filter(
      (transaction) =>
        transaction.transactionType?.toUpperCase() === "EXPENSE"
    )
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, 10);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        Top Expenses

      </h2>

      {expenses.length === 0 ? (

        <div className="text-center py-10 text-gray-500">

          No expense transactions found.

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3 font-semibold">

                  Category

                </th>

                <th className="text-left py-3 font-semibold">

                  Description

                </th>

                <th className="text-left py-3 font-semibold">

                  Date

                </th>

                <th className="text-right py-3 font-semibold">

                  Amount

                </th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3">

                    {expense.category}

                  </td>

                  <td className="py-3">

                    {expense.description || "-"}

                  </td>

                  <td className="py-3">

                    {expense.date}

                  </td>

                  <td className="py-3 text-right font-semibold text-red-600">

                    {formatCurrency(Number(expense.amount))}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}