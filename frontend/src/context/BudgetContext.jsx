import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import budgetService from "../services/budgetService";

import {
  useAuth,
} from "./AuthContext";

import {
  useMonth,
} from "./MonthContext";

const BudgetContext =
  createContext(null);

export function BudgetProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const {
    selectedMonth,
  } = useMonth();

  const [
    budgets,
    setBudgets,
  ] = useState([]);

  const [
    budgetStatus,
    setBudgetStatus,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  // ==========================================
  // FETCH BUDGETS FOR SELECTED MONTH
  // ==========================================

  const fetchBudgets =
    useCallback(async () => {
      if (!user) {
        setBudgets([]);
        setLoading(false);
        setError(null);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await budgetService.list(
            selectedMonth
          );

        setBudgets(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {
        console.error(
          "Failed to load budgets:",
          err
        );

        setBudgets([]);

        setError(
          err?.response?.data?.message ||
            "Failed to load budgets."
        );

      } finally {
        setLoading(false);
      }
    }, [
      user,
      selectedMonth,
    ]);

  // ==========================================
  // FETCH STATUS FOR SELECTED MONTH
  // ==========================================

  const fetchBudgetStatus =
    useCallback(async () => {
      if (!user) {
        setBudgetStatus([]);

        return;
      }

      try {
        const data =
          await budgetService
            .getStatus(
              selectedMonth
            );

        setBudgetStatus(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {
        console.error(
          "Failed to load budget status:",
          err
        );

        setBudgetStatus([]);
      }
    }, [
      user,
      selectedMonth,
    ]);

  // ==========================================
  // RELOAD EVERYTHING
  // ==========================================

  const reloadBudgets =
    useCallback(async () => {
      await Promise.all([
        fetchBudgets(),
        fetchBudgetStatus(),
      ]);
    }, [
      fetchBudgets,
      fetchBudgetStatus,
    ]);

  // ==========================================
  // CREATE
  // ==========================================

  const addBudget =
    async payload => {
      try {
        await budgetService.create(
          payload
        );

        await reloadBudgets();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (error) {
        console.error(
          "Failed to create budget:",
          error
        );

        throw error;
      }
    };

  // ==========================================
  // UPDATE
  // ==========================================

  const updateBudget =
    async (
      id,
      payload
    ) => {
      try {
        await budgetService.update(
          id,
          payload
        );

        await reloadBudgets();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (error) {
        console.error(
          "Failed to update budget:",
          error
        );

        throw error;
      }
    };

  // ==========================================
  // DELETE
  // ==========================================

  const deleteBudget =
    async id => {
      try {
        await budgetService.delete(
          id
        );

        await reloadBudgets();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

      } catch (error) {
        console.error(
          "Failed to delete budget:",
          error
        );

        throw error;
      }
    };

  // ==========================================
  // USER / MONTH CHANGE
  // ==========================================

  useEffect(() => {
    if (user) {
      reloadBudgets();

    } else {
      setBudgets([]);
      setBudgetStatus([]);
      setLoading(false);
      setError(null);
    }
  }, [
    user,
    selectedMonth,
    reloadBudgets,
  ]);

  const value =
    useMemo(
      () => ({
        budgets,

        budgetStatus,

        loading,

        error,

        selectedMonth,

        fetchBudgets,

        fetchBudgetStatus,

        reloadBudgets,

        addBudget,

        updateBudget,

        deleteBudget,
      }),
      [
        budgets,
        budgetStatus,
        loading,
        error,
        selectedMonth,
        fetchBudgets,
        fetchBudgetStatus,
        reloadBudgets,
      ]
    );

  return (
    <BudgetContext.Provider
      value={value}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudget = () => {
  const context =
    useContext(
      BudgetContext
    );

  if (!context) {
    throw new Error(
      "useBudget must be used inside BudgetProvider"
    );
  }

  return context;
};