import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { dashboardService } from "../services/dashboardService";
import { useAuth } from "./AuthContext";
import { useMonth } from "./MonthContext";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {

  const { user } = useAuth();
  const { selectedMonth } = useMonth();

  const [summary, setSummary] = useState(null);

  const [recentTransactions, setRecentTransactions] = useState([]);

  const [categorySummary, setCategorySummary] = useState([]);

  const [monthlySummary, setMonthlySummary] = useState([]);

  const [weeklySummary, setWeeklySummary] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Clear Dashboard
  // ==========================================

  const clearDashboard = () => {

    setSummary(null);
    setRecentTransactions([]);
    setCategorySummary([]);
    setMonthlySummary([]);
    setWeeklySummary([]);

  };

  // ==========================================
  // Fetch Dashboard
  // ==========================================

  const fetchDashboard = useCallback(async (month = selectedMonth) => {

    if (!user) {

      clearDashboard();
      return;

    }

    try {

      setLoading(true);

      const [

        summaryData,
        recent,
        category,
        monthly,
        weekly,

      ] = await Promise.all([

        dashboardService.summary(month),

        dashboardService.recentTransactions(month),

        dashboardService.categorySummary(month),

        dashboardService.monthlySummary(month),

        dashboardService.weeklySummary(month),

      ]);

      setSummary(summaryData);

      setRecentTransactions(recent);

      setCategorySummary(category);

      setMonthlySummary(monthly);

      setWeeklySummary(weekly);

    }

    catch (err) {

      console.error("Dashboard Error:", err);

    }

    finally {

      setLoading(false);

    }

  }, [user, selectedMonth]);

  // ==========================================
  // Reload when Month Changes
  // ==========================================

  useEffect(() => {

    if (user) {

      fetchDashboard(selectedMonth);

    }

    else {

      clearDashboard();

    }

  }, [
    user,
    selectedMonth,
    fetchDashboard,
  ]);

  // ==========================================
  // Refresh After CRUD
  // ==========================================

  useEffect(() => {

    const handleDashboardUpdate = () => {

      fetchDashboard(selectedMonth);

    };

    window.addEventListener(
      "dashboard-update",
      handleDashboardUpdate
    );

    return () => {

      window.removeEventListener(
        "dashboard-update",
        handleDashboardUpdate
      );

    };

  }, [
    fetchDashboard,
    selectedMonth,
  ]);

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

export const useDashboard = () =>
  useContext(DashboardContext);