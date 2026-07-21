import { useEffect } from "react";

import { useInsights } from "../context/InsightContext";

import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";
import ExpenseBarChart from "../components/analytics/ExpenseBarChart";
import DailyComparison from "../components/analytics/DailyComparison";
import RecentTransactions from "../components/analytics/RecentTransactions";
import ExpenseTrend from "../components/dashboard/ExpenseTrend";
import PageTransition from "../components/animations/PageTransition";

export default function Insights() {

  const { fetchInsights } = useInsights();

  useEffect(() => {

    fetchInsights();

  }, [fetchInsights]);

  return (

    <PageTransition>

    <div className="space-y-10">

      <AnalyticsDashboard />

      <div>

        <h2 className="text-2xl font-bold mb-6">

          Spending Reports

        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <ExpenseBarChart />

          <ExpenseTrend />

        </div>

      </div>

      <DailyComparison />

      <RecentTransactions />

    </div>

    </PageTransition>

  );

}