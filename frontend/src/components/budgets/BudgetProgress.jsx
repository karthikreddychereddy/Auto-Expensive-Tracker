import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useExpenses } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetProgress() {

  const {
    selectedMonthExpenses,
    currentCategoryBudgets,
  } = useBudget();

  const totalBudget = Object.values(currentCategoryBudgets)
    .reduce((sum, value) => sum + value, 0);

  const totalSpent = selectedMonthExpenses
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const remaining = totalBudget - totalSpent;

  const percentage = totalBudget
    ? Math.min((totalSpent / totalBudget) * 100, 100)
    : 0;

  return (

    <div className="bg-white rounded-2xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8">

        Monthly Budget Progress

      </h2>

      <div className="grid lg:grid-cols-2 gap-10 items-center">

        <div className="w-64 h-64 mx-auto">

          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
            styles={buildStyles({

              textSize: "14px",

              pathColor:
                percentage > 90
                  ? "#DC2626"
                  : percentage > 75
                  ? "#F59E0B"
                  : "#0B6B57",

              trailColor: "#E5E7EB",

            })}
          />

        </div>

        <div className="space-y-5">

          <div>

            <p className="text-gray-500">

              Budget

            </p>

            <h2 className="text-3xl font-bold">

              ₹{totalBudget.toLocaleString()}

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

    </div>

  );

}