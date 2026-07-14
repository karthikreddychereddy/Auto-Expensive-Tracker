import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useExpenses } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetCard() {

  const {
    expenses,
    categoryBudgets,
    selectedMonth,
  } = useBudget();

  // Get budget for selected month
  const currentBudget = categoryBudgets[selectedMonth] || {};

  // Total Monthly Budget
  const monthlyBudget = Object.values(currentBudget).reduce(
    (sum, amount) => sum + Number(amount),
    0
  );

  // Expenses for selected month only
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(selectedMonth)
  );

  // Total spent
  const totalSpent = monthlyExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Remaining
  const remaining = monthlyBudget - totalSpent;

  // Percentage
  const percentage =
    monthlyBudget === 0
      ? 0
      : Math.min((totalSpent / monthlyBudget) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-8">

        Monthly Budget Overview

      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div className="w-56 h-56 mx-auto">

          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
            styles={buildStyles({

              textSize: "16px",

              pathColor:
                percentage > 90
                  ? "#dc2626"
                  : percentage > 75
                  ? "#f59e0b"
                  : "#0B6B57",

              textColor: "#111827",

              trailColor: "#E5E7EB",

            })}
          />

        </div>

        <div className="space-y-6">

          <div>

            <p className="text-gray-500">

              Budget

            </p>

            <h2 className="text-3xl font-bold">

              ₹{monthlyBudget.toLocaleString()}

            </h2>

          </div>

          <div>

            <p className="text-gray-500">

              Spent

            </p>

            <h2 className="text-3xl font-bold text-red-600">

              ₹{totalSpent.toLocaleString()}

            </h2>

          </div>

          <div>

            <p className="text-gray-500">

              Remaining

            </p>

            <h2
              className={`text-3xl font-bold ${
                remaining >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >

              ₹{remaining.toLocaleString()}

            </h2>

          </div>

        </div>

      </div>

      <div className="mt-8">

        {remaining >= 0 ? (

          <p className="text-green-600 font-semibold">

            ✅ You are within your budget.

          </p>

        ) : (

          <p className="text-red-600 font-semibold">

            ⚠ Budget exceeded by ₹
            {Math.abs(remaining).toLocaleString()}

          </p>

        )}

      </div>

    </div>
  );
}