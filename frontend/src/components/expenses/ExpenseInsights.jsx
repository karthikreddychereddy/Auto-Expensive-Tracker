import { useExpenses } from "../../context/ExpenseContext";
import {
  FaBrain,
  FaArrowTrendUp,
  FaFire,
} from "react-icons/fa6";

export default function ExpenseInsights() {

  const { expenses } = useExpenses();

  // Today's Date
  const today = new Date().toISOString().slice(0, 10);

  // Yesterday's Date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayDate = yesterday
    .toISOString()
    .slice(0, 10);

  // Today's Spending
  const todaySpending = expenses
    .filter((expense) => expense.date === today)
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  // Yesterday's Spending
  const yesterdaySpending = expenses
    .filter(
      (expense) =>
        expense.date === yesterdayDate
    )
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  // Highest Spending Category
  const categoryTotals = {};

  expenses.forEach((expense) => {

    const category =
      expense.category || "Others";

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(expense.amount);

  });

  let highestCategory = "No Data";
  let highestAmount = 0;

  Object.entries(categoryTotals).forEach(
    ([category, amount]) => {

      if (amount > highestAmount) {

        highestAmount = amount;
        highestCategory = category;

      }

    }
  );

  // Total Expenses
  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  // Average Daily Expense
  const uniqueDates = [
    ...new Set(
      expenses.map(
        (expense) => expense.date
      )
    ),
  ];

  const averageDailyExpense =
    uniqueDates.length > 0
      ? totalExpense / uniqueDates.length
      : 0;

  // Today's Transaction Count
  const todayTransactions =
    expenses.filter(
      (expense) =>
        expense.date === today
    ).length;

  // Smart AI Suggestion

  let suggestion =
    "✅ Great job! Your expenses are under control.";

  if (
    yesterdaySpending > 0 &&
    todaySpending >
      yesterdaySpending * 1.5
  ) {

    suggestion =
      "📈 You spent much more today than yesterday. Try reducing unnecessary expenses.";

  }

  else if (
    yesterdaySpending > 0 &&
    todaySpending <
      yesterdaySpending
  ) {

    suggestion =
      "🎉 Excellent! You spent less today compared to yesterday.";

  }

  else if (
    todaySpending >
    averageDailyExpense * 2
  ) {

    suggestion =
      "⚠️ Today's spending is much higher than your average daily spending.";

  }

  else if (
    highestCategory === "Food"
  ) {

    suggestion =
      "🍔 Food is your biggest expense. Cooking at home a few more times each week could save money.";

  }

  else if (
    highestCategory === "Shopping"
  ) {

    suggestion =
      "🛍️ Shopping expenses are increasing. Consider creating a wishlist before buying.";

  }

  else if (
    highestCategory === "Travel"
  ) {

    suggestion =
      "🚕 Travel costs are high. Public transport or ride-sharing may reduce expenses.";

  }

  else if (
    todayTransactions >= 5
  ) {

    suggestion =
      "📋 You made several transactions today. Review them to avoid impulse spending.";

  }

  else if (
    totalExpense > 50000
  ) {

    suggestion =
      "💰 Your overall expenses are high. Setting a monthly budget could help.";

  }

  return (

    <div className="grid lg:grid-cols-3 gap-5">

      {/* Today's Spending */}

      <div className="bg-gradient-to-r from-[#0B6B57] to-[#15803d] rounded-2xl p-5 text-white shadow">

        <FaArrowTrendUp size={26} />

        <p className="mt-4 text-green-100">
          Today's Spending
        </p>

        <h2 className="text-3xl font-bold mt-2">
          ₹{todaySpending.toLocaleString()}
        </h2>

        <p className="mt-3 text-green-100 text-sm">

          Yesterday :
          {" "}
          ₹{yesterdaySpending.toLocaleString()}

        </p>

      </div>

      {/* Highest Category */}

      <div className="bg-white rounded-2xl shadow border p-5">

        <FaFire
          className="text-orange-500"
          size={26}
        />

        <p className="text-gray-500 mt-4">

          Highest Spending

        </p>

        <h2 className="text-2xl font-bold mt-2">

          {highestCategory}

        </h2>

        <p className="text-gray-500 mt-3">

          ₹{highestAmount.toLocaleString()}

        </p>

      </div>

      {/* AI Suggestion */}

      <div className="bg-[#FFF8EC] border border-yellow-200 rounded-2xl p-5 shadow">

        <FaBrain
          className="text-yellow-600"
          size={26}
        />

        <p className="font-semibold mt-4">

          Smart Insight

        </p>

        <p className="text-gray-600 mt-3 leading-7">

          {suggestion}

        </p>

      </div>

    </div>

  );

}