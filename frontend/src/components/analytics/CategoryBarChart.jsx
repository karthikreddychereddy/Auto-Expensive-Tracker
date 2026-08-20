import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useInsights } from "../../context/InsightContext";

export default function CategoryBarChart() {

  const { categoryBreakdown, loading } = useInsights();

  if (loading) {

    return (
      <div className="h-[320px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[380px] sm:p-6" />
    );

  }

  const data = categoryBreakdown.map(item => ({

    category: item.category,
    amount: Number(item.amount),

  }));

  return (

    <div className="h-[320px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[380px] sm:p-6">

      <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">
        Category Wise Spending
      </h2>

      <div className="h-[240px] min-w-0 sm:h-[290px]">
      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#0B6B57"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>
      </div>

    </div>

  );

}