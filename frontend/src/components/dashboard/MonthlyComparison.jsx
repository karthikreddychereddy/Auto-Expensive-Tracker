import { useDashboard } from "../../context/DashboardContext";
import { formatCurrency } from "../../utils/format";

export default function MonthlyComparison() {

  const { monthlySummary } = useDashboard();

  const currentMonth = monthlySummary[monthlySummary.length - 1];

  const income = Number(currentMonth?.totalIncome || 0);

  const expense = Number(currentMonth?.totalExpense || 0);

  const balance = income - expense;

  const maxValue = Math.max(income, expense, balance, 1);

  const rows = [

    {
      label: "Income",
      value: income,
      color: "bg-green-500",
    },

    {
      label: "Expense",
      value: expense,
      color: "bg-red-500",
    },

    {
      label: "Balance",
      value: balance,
      color: "bg-blue-500",
    },

  ];

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      <div className="mb-8">

        <h2 className="text-xl font-bold">
          Monthly Analytics
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Current Month Overview
        </p>

      </div>

      <div className="space-y-6">

        {rows.map((row) => (

          <div key={row.label}>

            <div className="flex justify-between mb-2">

              <span className="font-medium">
                {row.label}
              </span>

              <span className="font-semibold">
                {formatCurrency(row.value)}
              </span>

            </div>

            <div className="w-full h-3 rounded-full bg-gray-200">

              <div
                className={`${row.color} h-3 rounded-full transition-all duration-700`}
                style={{
                  width: `${(row.value / maxValue) * 100}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}