import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { EXPENSE_CATEGORIES } from "../../constants/expenseConstants";
import { useBudget } from "../../context/BudgetContext";

const COLORS = [
  "#0B6B57",
  "#2563EB",
  "#F59E0B",
  "#DC2626",
  "#8B5CF6",
  "#14B8A6",
  "#EC4899",
  "#6366F1",
];

export default function BudgetAnalytics() {

  const {
    currentCategoryBudgets,
    selectedMonthExpenses,
  } = useBudget();

  const chartData = EXPENSE_CATEGORIES.map((category) => {

    const spent = selectedMonthExpenses
      .filter(e => e.category === category.name)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    return {

      category: category.name,
      Budget: currentCategoryBudgets[category.name] || 0,
      Spent: spent,

    };

  });

  return (

    <div className="grid lg:grid-cols-2 gap-8">

      {/* Pie Chart */}

      <div className="bg-white rounded-3xl shadow border p-6">

        <h2 className="text-xl font-bold mb-6">
          Spending Distribution
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="Spent"
              nameKey="category"
              outerRadius={110}
              label
            >

              {chartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-3xl shadow border p-6">

        <h2 className="text-xl font-bold mb-6">

          Budget vs Spending

        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Budget"
              fill="#0B6B57"
            />

            <Bar
              dataKey="Spent"
              fill="#DC2626"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}