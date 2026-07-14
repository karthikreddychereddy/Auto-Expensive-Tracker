import { useMemo } from "react";

import { useBudget } from "../../context/BudgetContext";
import { useExpenses } from "../../context/ExpenseContext";

export default function BudgetInsights() {

  const { budgetStatus } = useBudget();

  const { expenses } = useExpenses();

  const {
    largestExpense,
    highestCategory,
    lowestCategory,
    averageExpense,
  } = useMemo(() => {

    const categoryTotals = {};

    expenses.forEach((expense) => {

      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) +
        Number(expense.amount);

    });

    const sortedCategories = [...budgetStatus]
      .sort(
        (a, b) =>
          Number(b.spentAmount) -
          Number(a.spentAmount)
      );

    const highest = sortedCategories[0];

    const lowest =
      sortedCategories.length > 0
        ? sortedCategories[sortedCategories.length - 1]
        : null;

    const largest =
      expenses.length > 0
        ? [...expenses].sort(
            (a, b) =>
              Number(b.amount) -
              Number(a.amount)
          )[0]
        : null;

    const average =
      expenses.length === 0
        ? 0
        : expenses.reduce(
            (sum, expense) =>
              sum + Number(expense.amount),
            0
          ) / expenses.length;

    return {

      largestExpense: largest,

      highestCategory: highest,

      lowestCategory: lowest,

      averageExpense: average,

    };

  }, [expenses, budgetStatus]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-5">

        Budget Insights

      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <p className="text-gray-500">

            Largest Expense

          </p>

          <h3 className="font-bold">

            {largestExpense?.title ||
              largestExpense?.description ||
              "-"}

          </h3>

          <p>

            ₹{largestExpense?.amount || 0}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Highest Spending Category

          </p>

          <h3 className="font-bold">

            {highestCategory?.category || "-"}

          </h3>

          <p>

            ₹{highestCategory?.spentAmount || 0}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Lowest Spending Category

          </p>

          <h3 className="font-bold">

            {lowestCategory?.category || "-"}

          </h3>

          <p>

            ₹{lowestCategory?.spentAmount || 0}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Average Expense

          </p>

          <h3 className="font-bold">

            ₹{averageExpense.toFixed(0)}

          </h3>

        </div>

      </div>

    </div>

  );

}