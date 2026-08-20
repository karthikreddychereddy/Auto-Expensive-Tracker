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

    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">

      <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">

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