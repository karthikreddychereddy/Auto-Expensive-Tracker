import { useInsights } from "../../context/InsightContext";
import { formatCurrency } from "../../utils/format";

export default function RecentTransactions() {

  const { recentTransactions, loading } = useInsights();

  if (loading) {

    return (
      <div className="bg-white rounded-2xl shadow border p-6 animate-pulse h-72" />
    );

  }

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Transactions

      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Date</th>

              <th className="text-left py-3">Type</th>

              <th className="text-left py-3">Category</th>

              <th className="text-left py-3">Description</th>

              <th className="text-right py-3">Amount</th>

            </tr>

          </thead>

          <tbody>

            {recentTransactions.map((item) => (

              <tr
                key={`${item.transactionType}-${item.id}`}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-3">
                  {item.date}
                </td>

                <td className="py-3">

                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.transactionType === "INCOME"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.transactionType}
                  </span>

                </td>

                <td className="py-3">
                  {item.category}
                </td>

                <td className="py-3">
                  {item.description}
                </td>

                <td className="py-3 text-right font-semibold">
                  {formatCurrency(Number(item.amount))}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}