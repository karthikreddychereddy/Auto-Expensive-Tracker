import { useBudget } from "../../context/BudgetContext";
import { useExpenses } from "../../context/ExpenseContext";
import { FaRobot } from "react-icons/fa";

export default function BudgetPrediction() {

  const { expenses } = useBudget();

  const MONTHLY_BUDGET = 30000;

  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthExpenses = expenses.filter((expense) => {

    const date = new Date(expense.date);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );

  });

  const spent = monthExpenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const today = now.getDate();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const averagePerDay =
    today > 0 ? spent / today : 0;

  const predicted =
    averagePerDay * daysInMonth;

  const exceed =
    predicted - MONTHLY_BUDGET;

  const savePerDay =
    exceed > 0
      ? exceed / (daysInMonth - today || 1)
      : 0;

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex items-center gap-3">

        <FaRobot
          className="text-[#0B6B57]"
          size={28}
        />

        <h2 className="text-2xl font-bold">

          AI Budget Prediction

        </h2>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div>

          <p className="text-gray-500">

            Current Spending

          </p>

          <h3 className="text-3xl font-bold mt-2">

            ₹{spent.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Predicted Month End

          </p>

          <h3 className="text-3xl font-bold mt-2">

            ₹{Math.round(predicted).toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Monthly Budget

          </p>

          <h3 className="text-3xl font-bold mt-2">

            ₹{MONTHLY_BUDGET.toLocaleString()}

          </h3>

        </div>

      </div>

      <div className="mt-8">

        {predicted > MONTHLY_BUDGET ? (

          <div className="bg-red-50 border border-red-200 rounded-xl p-5">

            <h3 className="text-red-600 font-bold">

              ⚠️ Budget Alert

            </h3>

            <p className="mt-2 text-gray-700">

              You are likely to exceed your monthly budget by

              <span className="font-bold text-red-600">

                {" "}
                ₹{Math.round(exceed).toLocaleString()}

              </span>

            </p>

            <p className="mt-2">

              Save approximately

              <span className="font-bold text-[#0B6B57]">

                {" "}
                ₹{Math.round(savePerDay)}

              </span>

              {" "}per day for the rest of the month.

            </p>

          </div>

        ) : (

          <div className="bg-green-50 border border-green-200 rounded-xl p-5">

            <h3 className="text-green-700 font-bold">

              ✅ Excellent

            </h3>

            <p className="mt-2">

              At your current spending rate you are likely to stay within your monthly budget.

            </p>

          </div>

        )}

      </div>

    </div>

  );

}