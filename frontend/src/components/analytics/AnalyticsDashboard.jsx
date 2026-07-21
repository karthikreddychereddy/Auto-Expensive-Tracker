import CategoryBarChart from "./CategoryBarChart";
import ExpensePieChart from "./ExpensePieChart";
import MonthlyTrendChart from "./MonthlyTrendChart";
import TopExpensesTable from "./TopExpensesTable";
import AIInsightsCard from "./AIInsightsCard";
import AnalyticsSummaryCards from "./AnalyticsSummaryCards";
import PaymentMethodChart from "./PaymentMethodChart";

import ExportReport from "./ExportReport";

export default function AnalyticsDashboard() {

  return (

    <div className="space-y-8">

      {/* ================= Header ================= */}

      <div className="bg-white rounded-2xl shadow border p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}

          <div className="flex-1">

            <h1 className="text-4xl font-bold text-slate-800">

              Financial Insights

            </h1>

            <p className="text-gray-500 mt-2 max-w-2xl">

              Monitor spending patterns, discover AI-powered insights and download
              monthly financial reports.

            </p>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4 shrink-0">

            <ExportReport />

          </div>

        </div>

      </div>

      {/* ================= Export Content ================= */}

      <div
        id="analytics-dashboard"
        className="space-y-8"
      >

        {/* Summary */}

        <AnalyticsSummaryCards />

        {/* AI Insights */}

        <AIInsightsCard />

        {/* Charts */}

        <div className="grid xl:grid-cols-2 gap-8">

          <CategoryBarChart />

          <ExpensePieChart />

        </div>

        <div className="grid xl:grid-cols-2 gap-8">

          <MonthlyTrendChart />

          <PaymentMethodChart />

        </div>

        {/* Table */}

        <TopExpensesTable />

      </div>

    </div>

  );

}