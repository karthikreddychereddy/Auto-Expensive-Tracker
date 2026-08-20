import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import ExpenseBarChart from "../components/analytics/ExpenseBarChart";
import DailyComparison from "../components/analytics/DailyComparison";
import RecentTransactions from "../components/analytics/RecentTransactions";
import ExpenseTrend from "../components/dashboard/ExpenseTrend";
import PageTransition from "../components/animations/PageTransition";

export default function Insights() {
  return (
    <PageTransition>
      <div className="w-full min-w-0 space-y-6 lg:space-y-8">
        <AnalyticsDashboard />

        <section className="min-w-0">
          <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">
            Spending Reports
          </h2>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
            <div className="min-w-0"><ExpenseBarChart /></div>
            <div className="min-w-0"><ExpenseTrend /></div>
          </div>
        </section>

        <DailyComparison />
        <RecentTransactions />
      </div>
    </PageTransition>
  );
}
