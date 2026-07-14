export function calculateBudget(
  selectedMonthExpenses,
  currentCategoryBudgets
) {

  const categoryWiseSpending = {};

  selectedMonthExpenses.forEach((expense) => {

    const category = expense.category || "Other";

    categoryWiseSpending[category] =
      (categoryWiseSpending[category] || 0) +
      Number(expense.amount);

  });

  const monthlySpent = selectedMonthExpenses.reduce(

    (sum, expense) =>

      sum + Number(expense.amount),

    0

  );

  const totalBudget = Object.values(
    currentCategoryBudgets
  ).reduce(

    (sum, amount) =>

      sum + Number(amount),

    0

  );

  const remainingBudget =
    totalBudget - monthlySpent;

  const overallPercentage =
    totalBudget === 0
      ? 0
      : Math.min(
          (monthlySpent / totalBudget) * 100,
          100
        );

  return {

    categoryWiseSpending,

    monthlySpent,

    totalBudget,

    remainingBudget,

    overallPercentage,

  };

}