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
      <div className="bg-white rounded-2xl shadow border p-6 h-[400px] animate-pulse" />
    );
  }

  const data = monthlyTrend.map(item => ({
    month: item.month,
    income: Number(item.income),
    expense: Number(item.expense),
  }));

  return (
    <div className="bg-white rounded-2xl shadow border p-6 h-[400px]">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="90%">

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
  );

}