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

export default function ExpenseBarChart() {

  const { weeklyExpense, loading } = useInsights();

  if (loading) {

    return (
      <div className="bg-white rounded-2xl shadow border p-6 h-[400px] animate-pulse" />
    );

  }

  const data = weeklyExpense.map(item => ({

    week: item.week,
    amount: Number(item.totalExpense),

  }));

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">
        Weekly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="week" />

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