import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

export default function ExpenseTrend() {

  const { expenses } = useExpenses();

  const data = useMemo(() => {

    const last7 = [];

    for (let i = 6; i >= 0; i--) {

      const d = new Date();

      d.setDate(d.getDate() - i);

      const date = d.toISOString().slice(0, 10);

      const label = d.toLocaleDateString("en-IN", {
        weekday: "short",
      });

      const total = expenses
        .filter(
          expense =>
            expense.date === date &&
            expense.transactionType !== "Income"
        )
        .reduce(
          (sum, expense) =>
            sum + Number(expense.amount),
          0
        );

      last7.push({

        day: label,

        amount: total,

      });

    }

    return last7;

  }, [expenses]);

  const weeklyTotal = data.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const highestDay = Math.max(
    ...data.map(item => item.amount)
  );

  const average =
    weeklyTotal / 7;

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold">

            Expense Trend

          </h2>

          <p className="text-gray-500">

            Last 7 Days

          </p>

        </div>

        <div className="text-right">

          <h3 className="font-bold text-2xl">

            ₹{weeklyTotal.toLocaleString()}

          </h3>

          <p className="text-sm text-gray-500">

            Weekly Total

          </p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="day"/>

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0B6B57"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-6 mt-6">

        <div>

          <p className="text-gray-500 text-sm">

            Highest Day

          </p>

          <h3 className="font-bold">

            ₹{highestDay.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500 text-sm">

            Daily Average

          </p>

          <h3 className="font-bold">

            ₹{average.toFixed(0)}

          </h3>

        </div>

      </div>

    </div>

  );

}