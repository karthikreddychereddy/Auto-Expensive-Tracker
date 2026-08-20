import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import { formatCurrency } from "../../utils/format";

export default function RecentActivity() {
  const navigate = useNavigate();
  const { recentTransactions } = useDashboard();

  return (
    <section className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
          Recent Activity
        </h2>

        <button
          type="button"
          onClick={() => navigate("/expenses")}
          className="shrink-0 text-sm font-medium text-[#0B6B57] hover:underline dark:text-emerald-400 sm:text-base"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {recentTransactions.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No recent activity.
          </p>
        ) : (
          recentTransactions.map((item) => (
            <article
              key={item.id}
              className="flex min-w-0 flex-col gap-2 border-b border-gray-100 pb-4 last:border-none last:pb-0 dark:border-slate-700 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between"
            >
              <div className="min-w-0">
                <h3 className="break-words font-semibold text-slate-800 dark:text-white">
                  {item.description || "Transaction"}
                </h3>
                <p className="break-words text-sm text-gray-500 dark:text-gray-400">
                  {item.category}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{item.date}</p>
              </div>

              <span
                className={`break-words font-bold min-[430px]:shrink-0 min-[430px]:text-right ${
                  item.transactionType === "INCOME"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {item.transactionType === "INCOME" ? "+" : "-"}{" "}
                {formatCurrency(item.amount)}
              </span>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
