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
      <div className="bg-white rounded-2xl shadow border p-6 h-[400px] animate-pulse" />
    );

  }

  const data = categoryBreakdown.map(item => ({

    name: item.category,
    value: Number(item.amount),

  }));

  return (

    <div className="bg-white rounded-2xl shadow border p-6 h-[400px]">

      <h2 className="text-2xl font-bold mb-6">

        Expense Distribution

      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
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

  );

}