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
      <div className="bg-white rounded-2xl shadow border p-6 h-[400px] animate-pulse" />
    );

  }

  const data = categoryBreakdown.map(item => ({

    category: item.category,
    amount: Number(item.amount),

  }));

  return (

    <div className="bg-white rounded-2xl shadow border p-6 h-[400px]">

      <h2 className="text-2xl font-bold mb-6">
        Category Wise Spending
      </h2>

      <ResponsiveContainer width="100%" height="90%">

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

  );

}