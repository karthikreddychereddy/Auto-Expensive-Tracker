import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useBudget } from "../../context/BudgetContext";

export default function CategoryBarChart() {

  const { selectedMonthExpenses } = useBudget();

  const chartData = useMemo(() => {

    const totals = {};

    selectedMonthExpenses.forEach((expense) => {

      totals[expense.category] =
        (totals[expense.category] || 0) +
        Number(expense.amount);

    });

    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
    }));

  }, [selectedMonthExpenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6 h-[400px]">

      <h2 className="text-2xl font-bold mb-6">

        Category Wise Spending

      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Spent"]}
          />

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