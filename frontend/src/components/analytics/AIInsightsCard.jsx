import { useMemo } from "react";
import { useBudget } from "../../context/BudgetContext";

export default function AIInsightsCard() {

  const {
    selectedMonthExpenses,
    currentCategoryBudgets,
  } = useBudget();

  const insights = useMemo(() => {

    const messages = [];

    let totalSpent = 0;

    Object.entries(currentCategoryBudgets).forEach(([category, budget]) => {

      if (!budget) return;

      const spent = selectedMonthExpenses

        .filter((e) => e.category === category)

        .reduce(
          (sum, e) => sum + Number(e.amount),
          0
        );

      totalSpent += spent;

      const percent = (spent / budget) * 100;

      if (percent > 100) {

        messages.push(
          `🚨 You exceeded your ${category} budget by ₹${(
            spent - budget
          ).toFixed(0)}`
        );

      }

      else if (percent > 80) {

        messages.push(
          `⚠ ${category} budget is almost exhausted (${percent.toFixed(0)}%)`
        );

      }

    });

    if (totalSpent < 1000) {

      messages.push(
        "✅ Great! Your spending is well under control."
      );

    }

    if (messages.length === 0) {

      messages.push(
        "🎉 Excellent budgeting this month!"
      );

    }

    return messages;

  }, [selectedMonthExpenses, currentCategoryBudgets]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        AI Financial Insights

      </h2>

      <div className="space-y-4">

        {insights.map((msg, index) => (

          <div

            key={index}

            className="bg-slate-100 rounded-lg p-4"

          >

            {msg}

          </div>

        ))}

      </div>

    </div>

  );

}