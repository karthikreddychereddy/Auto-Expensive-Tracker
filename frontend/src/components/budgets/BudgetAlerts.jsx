import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaLightbulb,
} from "react-icons/fa";

import { useMemo } from "react";
import { useBudget } from "../../context/BudgetContext";

export default function BudgetAlerts() {

  const { budgetStatus } = useBudget();

  const alerts = useMemo(() => {

    return budgetStatus.map((budget) => {

      const percentage = Number(budget.percentageUsed);

      if (percentage >= 100) {

        return {
          icon: <FaTimesCircle />,
          color: "bg-red-100 text-red-700",
          title: "Budget Exceeded",
          message: `${budget.category} exceeded the budget by ₹${Math.abs(
            Number(budget.remainingAmount)
          ).toLocaleString()}.`,
        };

      }

      if (percentage >= 80) {

        return {
          icon: <FaExclamationTriangle />,
          color: "bg-yellow-100 text-yellow-700",
          title: "Budget Warning",
          message: `${budget.category} has already used ${percentage.toFixed(
            0
          )}% of its budget.`,
        };

      }

      return {
        icon: <FaCheckCircle />,
        color: "bg-green-100 text-green-700",
        title: "Healthy Budget",
        message: `${budget.category} has ₹${Number(
          budget.remainingAmount
        ).toLocaleString()} remaining.`,
      };

    });

  }, [budgetStatus]);

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex items-center gap-3 mb-6">

        <FaLightbulb className="text-yellow-500 text-2xl" />

        <h2 className="text-2xl font-bold">
          Smart Budget Alerts
        </h2>

      </div>

      <div className="space-y-4">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className={`flex gap-4 items-start rounded-xl p-4 ${alert.color}`}
          >

            <div className="text-xl mt-1">
              {alert.icon}
            </div>

            <div>

              <h3 className="font-bold">
                {alert.title}
              </h3>

              <p className="text-sm">
                {alert.message}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );

}