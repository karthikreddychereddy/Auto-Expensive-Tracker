import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { FaCreditCard } from "react-icons/fa";
import { useInsights } from "../../context/InsightContext";

const COLORS = [
  "#0B6B57",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#14B8A6",
  "#EC4899",
  "#64748B",
];

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function PaymentMethodChart() {
  const {
    paymentMethods,
    loading,
    selectedMonth,
  } = useInsights();

  const data = (paymentMethods || []).map(item => ({
    name: item.paymentMethod || "Other",
    value: Number(item.amount || 0),
    transactions: Number(item.transactionCount || 0),
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <section className="flex min-h-[320px] w-full min-w-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:min-h-[380px] sm:p-6">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Loading payment method analysis...
        </p>
      </section>
    );
  }

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
      <div className="mb-5 min-w-0">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-[#0B6B57] dark:bg-emerald-500/10 dark:text-emerald-400">
            <FaCreditCard />
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
              Payment Method Analysis
            </h2>

            <p className="mt-1 break-words text-sm text-slate-500 dark:text-slate-400">
              Spending by payment method
              {selectedMonth ? ` • ${selectedMonth}` : ""}
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 || total === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center px-3 text-center sm:min-h-[310px]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400 dark:bg-slate-900">
            <FaCreditCard />
          </div>

          <h3 className="mt-4 font-semibold text-slate-700 dark:text-white">
            No payment data
          </h3>

          <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            No expenses were recorded for this month.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-center">
          <div className="h-[260px] min-w-0 sm:h-[300px] lg:h-[320px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="43%"
                  outerRadius="70%"
                  paddingAngle={3}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(value),
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="min-w-0 space-y-3">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Spending
              </p>
              <p className="mt-1 break-words text-xl font-bold text-slate-800 dark:text-white">
                {formatCurrency(total)}
              </p>
            </div>

            <div className="max-h-[245px] space-y-2 overflow-y-auto pr-1">
              {data.map((item, index) => {
                const percentage = total === 0 ? 0 : (item.value / total) * 100;

                return (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 px-3 py-2 dark:border-slate-700"
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.transactions} transaction{item.transactions !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
