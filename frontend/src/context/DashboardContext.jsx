import { createContext, useContext, useState, useCallback } from "react";

import { dashboardService } from "../services/dashboardService";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {

  const [summary, setSummary] = useState(null);

  const [recentTransactions, setRecentTransactions] = useState([]);

  const [categorySummary, setCategorySummary] = useState([]);

  const [monthlySummary, setMonthlySummary] = useState([]);

  const [weeklySummary, setWeeklySummary] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {

    try {

        setLoading(true);

        const [
        summary,
        recent,
        category,
        monthly,
        weekly,
        ] = await Promise.all([

        dashboardService.summary(),
        dashboardService.recentTransactions(),
        dashboardService.categorySummary(),
        dashboardService.monthlySummary(),
        dashboardService.weeklySummary(),

        ]);

        console.log("Dashboard Summary:", summary);

        setSummary(summary);
        setRecentTransactions(recent);
        setCategorySummary(category);
        setMonthlySummary(monthly);
        setWeeklySummary(weekly);

    } catch (err) {

        console.error("Dashboard Error:", err);

    } finally {

        setLoading(false);

    }

    }, []);

  return (

    <DashboardContext.Provider

      value={{

        summary,

        recentTransactions,

        categorySummary,

        monthlySummary,

        weeklySummary,

        loading,

        fetchDashboard,

      }}

    >

      {children}

    </DashboardContext.Provider>

  );

}

export const useDashboard = () => useContext(DashboardContext);