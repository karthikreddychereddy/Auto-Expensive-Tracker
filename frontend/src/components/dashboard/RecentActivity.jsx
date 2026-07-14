import { useNavigate } from "react-router-dom";

import { useDashboard } from "../../context/DashboardContext";

import { formatCurrency } from "../../utils/format";

export default function RecentActivity() {

  const navigate = useNavigate();

  const { recentTransactions } = useDashboard();

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">

          Recent Activity

        </h2>

        <button
          onClick={() => navigate("/expenses")}
          className="text-[#0B6B57] font-medium hover:underline"
        >

          View All →

        </button>

      </div>

      <div className="space-y-5">

        {

          recentTransactions.length === 0

          ?

          (

            <p className="text-gray-500">

              No recent activity.

            </p>

          )

          :

          recentTransactions.map(item => (

            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4 last:border-none"
            >

              <div>

                <h3 className="font-semibold">

                  {item.description || "Transaction"}

                </h3>

                <p className="text-sm text-gray-500">

                  {item.category}

                </p>

                <p className="text-xs text-gray-400">

                  {item.date}

                </p>

              </div>

              <div>

                <span
                  className={
                    item.transactionType === "INCOME"
                      ? "font-bold text-green-600"
                      : "font-bold text-red-500"
                  }
                >

                  {item.transactionType === "INCOME" ? "+" : "-"}

                  {" "}

                  {formatCurrency(item.amount)}

                </span>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}