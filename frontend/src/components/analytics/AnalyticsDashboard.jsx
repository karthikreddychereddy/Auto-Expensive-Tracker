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
    <div className="w-full min-w-0 space-y-5 sm:space-y-6 lg:space-y-8">
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6 lg:p-8">
        <div className="flex min-w-0 flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="break-words text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl lg:text-4xl">
              Financial Insights
            </h1>
            <p className="mt-2 max-w-2xl break-words text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Monitor spending patterns, discover AI-powered insights and download
              monthly financial reports.
            </p>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <ExportReport />
          </div>
        </div>
      </section>

      <div id="analytics-dashboard" className="w-full min-w-0 space-y-5 sm:space-y-6 lg:space-y-8">
        <AnalyticsSummaryCards />
        <AIInsightsCard />

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
          <div className="min-w-0"><CategoryBarChart /></div>
          <div className="min-w-0"><ExpensePieChart /></div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
          <div className="min-w-0"><MonthlyTrendChart /></div>
          <div className="min-w-0"><PaymentMethodChart /></div>
        </div>

        <TopExpensesTable />
      </div>
    </div>
  );
}
