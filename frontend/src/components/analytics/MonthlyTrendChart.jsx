import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useBudget } from "../../context/BudgetContext";

export default function MonthlyTrendChart() {

  const { selectedMonthExpenses } = useBudget();

  const chartData = useMemo(() => {

    const totals = {};

    selectedMonthExpenses.forEach((expense) => {

      const day = new Date(expense.date)
        .toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        });

      totals[day] =
        (totals[day] || 0) +
        Number(expense.amount);

    });

    return Object.entries(totals).map(([day, amount]) => ({
      day,
      amount,
    }));

  }, [selectedMonthExpenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6 h-[400px]">

      <h2 className="text-2xl font-bold mb-6">

        Monthly Spending Trend

      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Spent"]}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0B6B57"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}