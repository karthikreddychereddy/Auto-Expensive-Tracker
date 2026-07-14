import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ExpenseBarChart() {

  const { expenses } = useExpenses();

  const data = useMemo(() => {

    const months = {};

    expenses.forEach((expense) => {

      const date = new Date(expense.date);

      const month = date.toLocaleString("default", {
        month: "short",
      });

      months[month] =
        (months[month] || 0) + Number(expense.amount);

    });

    return Object.keys(months).map((month) => ({
      month,
      amount: months[month],
    }));

  }, [expenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-6">

        Monthly Spending

      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

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