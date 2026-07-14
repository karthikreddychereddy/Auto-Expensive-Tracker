import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { EXPENSE_CATEGORIES } from "../../constants/expenseConstants";

export default function ExpensePieChart() {

  const { expenses } = useExpenses();

  const data = useMemo(() => {

    const categories = {};

    expenses.forEach((expense) => {

      categories[expense.category] =
        (categories[expense.category] || 0) +
        Number(expense.amount);

    });

    return Object.keys(categories).map((category) => {

      const found = EXPENSE_CATEGORIES.find(
        (c) => c.name === category
      );

      return {
        name: category,
        value: categories[category],
        color: found?.color || "#999999",
      };

    });

  }, [expenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-6">

        Category Distribution

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            innerRadius={45}
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={entry.color}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}