import { useMemo } from "react";
import { useBudget } from "../../context/BudgetContext";

export default function SmartInsights() {

  const {
    currentCategoryBudgets,
    selectedMonthExpenses,
  } = useBudget();

  const insights = useMemo(() => {

    const result = [];

    Object.entries(currentCategoryBudgets).forEach(([category, budget]) => {

      if (!budget) return;

      const spent = selectedMonthExpenses

        .filter((expense) => expense.category === category)

        .reduce(
          (sum, expense) => sum + Number(expense.amount),
          0
        );

      const percentage = (spent / budget) * 100;

      if (percentage >= 100) {

        result.push(`🚨 ${category} budget exceeded.`);

      }

      else if (percentage >= 80) {

        result.push(`⚠️ ${category} budget is above 80%.`);

      }

      else {

        result.push(`✅ ${category} spending is under control.`);

      }

    });

    return result;

  }, [selectedMonthExpenses, currentCategoryBudgets]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        Smart Insights

      </h2>

      <div className="space-y-4">

        {insights.map((item, index) => (

          <div
            key={index}
            className="bg-slate-100 rounded-lg p-4"
          >

            {item}

          </div>

        ))}

      </div>

    </div>

  );

}