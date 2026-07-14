import { useMemo } from "react";

import { useBudget } from "../../context/BudgetContext";

export default function BudgetRecommendations() {

  const { budgets, budgetStatus } = useBudget();

  const recommendations = useMemo(() => {

    const items = [];

    budgetStatus.forEach((budget) => {

      const percentage = Number(budget.percentageUsed);

      if (percentage >= 100) {

        items.push({
          type: "danger",
          text: `${budget.category} budget has been exceeded.`,
        });

      } else if (percentage >= 80) {

        items.push({
          type: "warning",
          text: `${budget.category} has reached ${percentage.toFixed(0)}% of its budget.`,
        });

      }

    });

    const totalBudget = budgets.reduce(
      (sum, budget) => sum + Number(budget.budgetAmount),
      0
    );

    const totalSpent = budgetStatus.reduce(
      (sum, budget) => sum + Number(budget.spentAmount),
      0
    );

    const remaining = totalBudget - totalSpent;

    if (remaining > 0) {

      items.push({
        type: "success",
        text: `You can still save ₹${remaining.toLocaleString()} this month.`,
      });

    }

    if (items.length === 0) {

      items.push({
        type: "success",
        text: "Excellent! All your budgets are currently under control.",
      });

    }

    return items;

  }, [budgets, budgetStatus]);

  return (

    <div className="bg-white rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-6">

        Smart Recommendations

      </h2>

      <div className="space-y-4">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className={`rounded-xl p-4 border-l-4 ${
              item.type === "danger"
                ? "bg-red-50 border-red-500"
                : item.type === "warning"
                ? "bg-yellow-50 border-yellow-500"
                : "bg-green-50 border-green-500"
            }`}
          >
            {item.text}
          </div>

        ))}

      </div>

    </div>

  );

}