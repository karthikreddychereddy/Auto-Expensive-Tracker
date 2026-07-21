import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

import { useInsights } from "../../context/InsightContext";

export default function ExpenseTrend() {

  const { weeklyExpense, loading } = useInsights();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow border p-6 h-[420px] animate-pulse" />
    );
  }

  const data = weeklyExpense.map(item => ({
    week: item.week,
    amount: Number(item.totalExpense),
  }));

  const weeklyTotal = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const highestWeek = Math.max(
    ...data.map(item => item.amount),
    0
  );

  const average =
    data.length > 0
      ? weeklyTotal / data.length
      : 0;

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold">

            Weekly Expense Trend

          </h2>

        </div>

        <div className="text-right">

          <h3 className="font-bold text-2xl">

            ₹{weeklyTotal.toLocaleString()}

          </h3>

          <p className="text-sm text-gray-500">

            Total

          </p>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="week" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0B6B57"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div>

          <p className="text-gray-500 text-sm">

            Highest Week

          </p>

          <h3 className="font-bold">

            ₹{highestWeek.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">

            Weekly Average

          </p>

          <h3 className="font-bold">

            ₹{average.toFixed(0)}

          </h3>

        </div>

      </div>

    </div>

  );

}