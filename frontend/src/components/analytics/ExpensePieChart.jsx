import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useInsights } from "../../context/InsightContext";

const COLORS = [
  "#0B6B57",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
  "#EC4899",
];

export default function ExpensePieChart() {

  const { categoryBreakdown, loading } = useInsights();

  if (loading) {

    return (
      <div className="h-[320px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[380px] sm:p-6" />
    );

  }

  const data = categoryBreakdown.map(item => ({

    name: item.category,
    value: Number(item.amount),

  }));

  return (

    <div className="h-[320px] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:h-[380px] sm:p-6">

      <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">

        Expense Distribution

      </h2>

      <div className="h-[240px] min-w-0 sm:h-[290px]">
      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>
      </div>

    </div>

  );

}