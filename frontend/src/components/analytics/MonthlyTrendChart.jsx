import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { useInsights } from "../../context/InsightContext";

export default function MonthlyTrendChart() {

  const { monthlyTrend, loading } = useInsights();

  if (loading) {
    return (
      <div className="h-[320px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[380px] sm:p-6" />
    );
  }

  const data = monthlyTrend.map(item => ({
    month: item.month,
    income: Number(item.income),
    expense: Number(item.expense),
  }));

  return (
    <div className="h-[320px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[380px] sm:p-6">

      <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">
        Monthly Income vs Expense
      </h2>

      <div className="h-[240px] min-w-0 sm:h-[290px]">
      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#16A34A"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#DC2626"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>
      </div>

    </div>
  );

}