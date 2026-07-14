import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";

import ExpenseBarChart from "../components/reports/ExpenseBarChart";
import ExpensePieChart from "../components/reports/ExpensePieChart";
import DailyComparison from "../components/reports/DailyComparison";
import RecentTransactions from "../components/reports/RecentTransactions";
import ExpenseTrend from "../components/dashboard/ExpenseTrend";

export default function Insights() {

  return (

    <div className="space-y-10">

      {/* Header */}

      {/* <div>

        <h1 className="text-4xl font-bold text-gray-800">

          Financial Insights

        </h1>

        <p className="text-gray-500 mt-2">

          Analyze your spending, budgets, trends and AI recommendations in one place.

        </p>

      </div> */}

      {/* ================= Analytics Section ================= */}

      <AnalyticsDashboard />

      {/* ================= Reports Section ================= */}

      <div>

        <h2 className="text-2xl font-bold mb-6">

          Spending Reports

        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <ExpenseBarChart />
          <ExpenseTrend />

          {/* <ExpensePieChart /> */}

        </div>

      </div>

      <DailyComparison />

      <RecentTransactions />

      {/* ================= Additional Charts ================= */}

      {/* <div className="grid lg:grid-cols-2 gap-6">

        <PaymentMethodChart />

      </div> */}

      {/* ================= Budget Alerts ================= */}

      {/* <BudgetAlerts /> */}

    </div>

  );

}