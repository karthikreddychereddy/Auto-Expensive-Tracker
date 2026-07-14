import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

export default function MonthlyComparisonChart() {

  const { expenses } = useExpenses();

  const data = useMemo(() => {

    const map = {};

    expenses.forEach((expense) => {

      const month = expense.date.slice(0, 7);

      map[month] =
        (map[month] || 0) +
        Number(expense.amount);

    });

    return Object.entries(map)

      .sort()

      .slice(-6)

      .map(([month, total]) => ({

        month,

        total,

      }));

  }, [expenses]);

  return (

    <div className="bg-white rounded-3xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        Last 6 Months Spending

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#0B6B57"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}