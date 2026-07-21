import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../context/DashboardContext";
import { useMonth } from "../context/MonthContext";

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

export default function Dashboard() {

  const { selectedMonth } = useMonth();

  const { user } = useAuth();

  const { fetchDashboard } = useDashboard();

  useEffect(() => {

    fetchDashboard(selectedMonth);

  }, [fetchDashboard, selectedMonth]);

  return (

    <PageTransition>

      <div className="space-y-8">

        <DashboardHeader user={user} />

        <FadeCard delay={0.05}>
          <OverviewCards />
        </FadeCard>

        <FadeCard delay={0.10}>
          <FinancialSnapshot />
        </FadeCard>

        <div className="grid xl:grid-cols-2 gap-8 mt-8">

          <FadeCard delay={0.15}>
            <BudgetHealthCard />
          </FadeCard>

          <FadeCard delay={0.20}>
            <SavingsProgressCard />
          </FadeCard>

        </div>

        <FadeCard delay={0.25}>
          <QuickActions />
        </FadeCard>

        <div className="grid xl:grid-cols-2 gap-6">

          <FadeCard delay={0.30}>
            <MonthlyComparison />
          </FadeCard>

          <FadeCard delay={0.35}>
            <TodaySummaryCard />
          </FadeCard>

        </div>

        <div className="grid xl:grid-cols-2 gap-6">

          <FadeCard delay={0.40}>
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