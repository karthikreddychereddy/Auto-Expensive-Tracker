import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { useMemo } from "react";
import { useBudget } from "../../../context/BudgetContext";

export default function MonthlyProgress() {
  const { budgets, budgetStatus } = useBudget();

  const {
    totalBudget,
    totalSpent,
    remainingBudget,
    overallPercentage,
  } = useMemo(() => {
    const budget = budgets.reduce(
      (sum, item) => sum + Number(item.budgetAmount),
      0
    );

    const spent = budgetStatus.reduce(
      (sum, item) => sum + Number(item.spentAmount),
      0
    );

    const remaining = budget - spent;

    const percentage =
      budget === 0 ? 0 : (spent / budget) * 100;

    return {
      totalBudget: budget,
      totalSpent: spent,
      remainingBudget: remaining,
      overallPercentage: Math.min(percentage, 100),
    };
  }, [budgets, budgetStatus]);

  return (
    <div className="bg-white rounded-3xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-8">
        Monthly Budget Progress
      </h2>

      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="w-64 h-64 mx-auto">
          <CircularProgressbar
            value={overallPercentage}
            text={`${overallPercentage.toFixed(0)}%`}
            styles={buildStyles({
              pathColor:
                overallPercentage >= 100
                  ? "#DC2626"
                  : overallPercentage >= 80
                  ? "#F59E0B"
                  : "#0B6B57",
              trailColor: "#E5E7EB",
              textColor: "#111827",
              textSize: "16px",
            })}
          />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">
              Total Budget
            </span>

            <span className="font-bold">
              ₹{totalBudget.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">
              Total Spent
            </span>

            <span className="font-bold text-red-600">
              ₹{totalSpent.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-gray-500">
              Remaining
            </span>

            <span
              className={`font-bold ${
                remainingBudget >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{remainingBudget.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Budget Used
            </span>

            <span className="font-bold">
              {overallPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}