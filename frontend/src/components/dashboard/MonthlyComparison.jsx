import { useDashboard } from "../../context/DashboardContext";
import { formatCurrency } from "../../utils/format";

export default function MonthlyComparison() {
  const { monthlySummary } = useDashboard();
  const currentMonth = monthlySummary?.[monthlySummary.length - 1];

  const income = Number(currentMonth?.totalIncome || 0);
  const expense = Number(currentMonth?.totalExpense || 0);
  const balance = income - expense;
  const maxValue = Math.max(income, expense, Math.abs(balance), 1);

  const rows = [
    { label: "Income", value: income, color: "bg-green-500" },
    { label: "Expense", value: expense, color: "bg-red-500" },
    { label: "Balance", value: balance, color: "bg-blue-500" },
  ];

  return (
    <section className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
          Monthly Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Current Month Overview
        </p>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {rows.map((row) => {
          const width = Math.min((Math.abs(row.value) / maxValue) * 100, 100);

          return (
            <div key={row.label}>
              <div className="mb-2 flex flex-col gap-1 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-200">{row.label}</span>
                <span className="break-words font-semibold text-slate-800 dark:text-white">
                  {formatCurrency(row.value)}
                </span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                <div
                  className={`${row.color} h-full rounded-full transition-all duration-700`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
