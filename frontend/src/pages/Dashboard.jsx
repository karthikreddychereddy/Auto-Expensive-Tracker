import { useEffect } from "react";

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
import { useMonth } from "../context/MonthContext";

export default function Dashboard() {

  const { selectedMonth } = useMonth();

  const { user } = useAuth();

  const {
    summary,
    fetchDashboard,
  } = useDashboard();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (

    <div className="space-y-8">

      <DashboardHeader user={user} />

      <QuickActions />

      <OverviewCards summary={summary} />

      <FinancialSnapshot />

      <div className="grid xl:grid-cols-2 gap-8 mt-8">

        <BudgetHealthCard />

        <SavingsProgressCard />

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <TodaySummaryCard />

        <MonthlyComparison />

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <RecentActivity />

        <AIQuickSummary />

      </div>

    </div>

  );

}