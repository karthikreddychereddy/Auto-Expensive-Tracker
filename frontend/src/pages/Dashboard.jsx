import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import OverviewCards from "../components/dashboard/OverviewCards";
import BudgetHealthCard from "../components/dashboard/BudgetHealthCard";
import MonthlyComparison from "../components/dashboard/MonthlyComparison";
import QuickActions from "../components/dashboard/QuickActions";
import TodaySummaryCard from "../components/dashboard/TodaySummaryCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import AIQuickSummary from "../components/dashboard/AIQuickSummary";
import SavingsProgressCard from "../components/dashboard/SavingsProgressCard";
import FinancialSnapshot from "../components/dashboard/FinancialSnapshot";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";
import PageLoader from "../components/common/PageLoader";
import ErrorState from "../components/common/ErrorState";

export default function Dashboard() {
  const { user } = useAuth();
  const { summary, loading, error, fetchDashboard } = useDashboard();

  if (loading && !summary) {
    return <PageLoader message="Loading your dashboard..." />;
  }

  if (error && !summary) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        message={error}
        onRetry={fetchDashboard}
      />
    );
  }

  return (
    <PageTransition>
      <div className="w-full min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">
        <DashboardHeader user={user} />

        <FadeCard delay={0.05}>
          <OverviewCards />
        </FadeCard>

        <FadeCard delay={0.1}>
          <FinancialSnapshot />
        </FadeCard>

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2 xl:gap-8">
          <FadeCard delay={0.15}>
            <BudgetHealthCard />
          </FadeCard>
          <FadeCard delay={0.2}>
            <SavingsProgressCard />
          </FadeCard>
        </div>

        <FadeCard delay={0.25}>
          <QuickActions />
        </FadeCard>

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2">
          <FadeCard delay={0.3}>
            <MonthlyComparison />
          </FadeCard>
          <FadeCard delay={0.35}>
            <TodaySummaryCard />
          </FadeCard>
        </div>

        <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-2">
          <FadeCard delay={0.4}>
            <RecentActivity />
          </FadeCard>
          <FadeCard delay={0.45}>
            <AIQuickSummary />
          </FadeCard>
        </div>
      </div>
    </PageTransition>
  );
}
