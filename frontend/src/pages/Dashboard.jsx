import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import OverviewCards from "../components/dashboard/OverviewCards";

export default function Dashboard() {

  const { user } = useAuth();

  const {
    stats,
    fetchStats
  } = useExpenses();

  useEffect(() => {

    fetchStats().catch(() => {});

  }, [fetchStats]);

  return (

    <div className="space-y-8">

      <DashboardHeader user={user} />

      <OverviewCards stats={stats} />

    </div>

  );

}