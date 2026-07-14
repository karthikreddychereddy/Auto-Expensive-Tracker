import { useMemo } from "react";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetHealth() {
  const { budgetStatus } = useBudget();

  const { score, status, color } = useMemo(() => {
    let healthScore = 100;

    budgetStatus.forEach((budget) => {
      const percentage = Number(budget.percentageUsed);

      if (percentage > 100) {
        healthScore -= 12;
      } else if (percentage >= 90) {
        healthScore -= 5;
      }
    });

    healthScore = Math.max(healthScore, 0);

    return {
      score: healthScore,
      status:
        healthScore >= 80
          ? "Excellent"
          : healthScore >= 60
          ? "Average"
          : "Poor",
      color:
        healthScore >= 80
          ? "bg-green-500"
          : healthScore >= 60
          ? "bg-yellow-500"
          : "bg-red-500",
    };
  }, [budgetStatus]);

  return (
    <div className="bg-white rounded-3xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-8">
        Budget Health
      </h2>

      <div className="space-y-6">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Overall Score
          </span>

          <span className="text-4xl font-bold">
            {score}/100
          </span>
        </div>

        <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`${color} h-full transition-all duration-700`}
            style={{
              width: `${score}%`,
            }}
          />
        </div>

        <div className="text-center">
          <span
            className={`px-4 py-2 rounded-full text-white ${color}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}