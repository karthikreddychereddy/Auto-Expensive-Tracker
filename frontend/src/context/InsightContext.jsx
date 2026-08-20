import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import insightService from "../services/insightService";

import {
  useAuth,
} from "./AuthContext";

import {
  useMonth,
} from "./MonthContext";

const InsightContext =
  createContext(null);

export function InsightProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const {
    selectedMonth,
  } = useMonth();

  const [
    insight,
    setInsight,
  ] = useState(null);

  const [
    categoryBreakdown,
    setCategoryBreakdown,
  ] = useState([]);

  const [
    monthlyTrend,
    setMonthlyTrend,
  ] = useState([]);

  const [
    weeklyExpense,
    setWeeklyExpense,
  ] = useState([]);

  const [
    recentTransactions,
    setRecentTransactions,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    paymentMethods,
    setPaymentMethods,
  ] = useState([]);

  // ==========================================
  // CLEAR
  // ==========================================

  const clearInsights =
    useCallback(() => {
      setInsight(null);

      setCategoryBreakdown([]);

      setMonthlyTrend([]);

      setWeeklyExpense([]);

      setRecentTransactions([]);

      setPaymentMethods([]);

      setError(null);
    }, []);

  // ==========================================
  // FETCH
  // ==========================================

  const fetchInsights =
    useCallback(async () => {
      if (
        !user ||
        !selectedMonth
      ) {
        clearInsights();

        return;
      }

      try {
        setLoading(true);

        setError(null);

        /*
         * Clear old month immediately so
         * July data is never shown while
         * August is loading.
         */
        clearInsights();

        const [
          insightData,
          categoryData,
          monthlyData,
          weeklyData,
          recentData,
          paymentData,
        ] =
          await Promise.all([
            insightService.getInsights(
              selectedMonth
            ),

            insightService.getCategoryBreakdown(
              selectedMonth
            ),

            insightService.getMonthlyTrend(
              selectedMonth
            ),

            insightService.getWeeklyExpense(
              selectedMonth
            ),

            insightService.getRecentTransactions(
              selectedMonth
            ),

            insightService.getPaymentMethods(
              selectedMonth
            ),
          ]);

        setInsight(
          insightData || null
        );

        setCategoryBreakdown(
          Array.isArray(
            categoryData
          )
            ? categoryData
            : []
        );

        setMonthlyTrend(
          Array.isArray(
            monthlyData
          )
            ? monthlyData
            : []
        );

        setWeeklyExpense(
          Array.isArray(
            weeklyData
          )
            ? weeklyData
            : []
        );

        setRecentTransactions(
          Array.isArray(
            recentData
          )
            ? recentData
            : []
        );

        setPaymentMethods(
          Array.isArray(paymentData)
            ? paymentData
            : []
        );

      } catch (error) {
        console.error(
          "Failed to load insights:",
          error
        );

        clearInsights();

        setError(
          error?.response?.data
            ?.message ||
            "Failed to load insights."
        );

      } finally {
        setLoading(false);
      }
    }, [
      user,
      selectedMonth,
      clearInsights,
    ]);

  // ==========================================
  // REFRESH WHEN USER OR MONTH CHANGES
  // ==========================================

  useEffect(() => {
    fetchInsights();
  }, [
    fetchInsights,
  ]);

  // ==========================================
  // DASHBOARD UPDATE
  // ==========================================

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const refresh =
      () => {
        fetchInsights();
      };

    window.addEventListener(
      "dashboard-update",
      refresh
    );

    return () =>
      window.removeEventListener(
        "dashboard-update",
        refresh
      );
  }, [
    user,
    fetchInsights,
  ]);

  return (
    <InsightContext.Provider
      value={{
        insight,

        categoryBreakdown,

        monthlyTrend,

        weeklyExpense,

        recentTransactions,

        loading,

        error,

        selectedMonth,

        fetchInsights,

        paymentMethods,
      }}
    >
      {children}
    </InsightContext.Provider>
  );
}

export const useInsights =
  () => {
    const context =
      useContext(
        InsightContext
      );

    if (!context) {
      throw new Error(
        "useInsights must be used within InsightProvider"
      );
    }

    return context;
  };