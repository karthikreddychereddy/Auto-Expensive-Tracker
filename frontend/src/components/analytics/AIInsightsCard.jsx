import { useInsights } from "../../context/InsightContext";

export default function AIInsightsCard() {

  const { insight } = useInsights();

  return (

    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow p-6 text-white">

      <h2 className="text-2xl font-bold mb-6">

        Financial Insights

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <p className="text-white/80">

            Highest Expense Category

          </p>

          <h3 className="text-2xl font-bold mt-2">

            {insight?.highestExpenseCategory || "N/A"}

          </h3>

        </div>

        <div>

          <p className="text-white/80">

            Financial Health

          </p>

          <h3 className="text-2xl font-bold mt-2">

            {insight?.financialHealth || "N/A"}

          </h3>

        </div>

        <div>

          <p className="text-white/80">

            Savings Rate

          </p>

          <h3 className="text-2xl font-bold mt-2">

            {insight?.savingsRate ?? 0}%

          </h3>

        </div>

        <div>

          <p className="text-white/80">

            Expense Rate

          </p>

          <h3 className="text-2xl font-bold mt-2">

            {insight?.expenseRate ?? 0}%

          </h3>

        </div>

      </div>

    </div>

  );

}