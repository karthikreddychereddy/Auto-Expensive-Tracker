import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import budgetService from "../services/budgetService";

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===============================
  // Load Budgets
  // ===============================

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);

      const data = await budgetService.list();

      setBudgets(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load budgets.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ===============================
  // Load Budget Status
  // ===============================

  const fetchBudgetStatus = useCallback(async () => {
    try {
      const data = await budgetService.getStatus();
      setBudgetStatus(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ===============================
  // Create Budget
  // ===============================

  const addBudget = async (payload) => {
    await budgetService.create(payload);
    await fetchBudgets();
    await fetchBudgetStatus();
  };

  // ===============================
  // Update Budget
  // ===============================

  const updateBudget = async (id, payload) => {
    await budgetService.update(id, payload);
    await fetchBudgets();
    await fetchBudgetStatus();
  };

  // ===============================
  // Delete Budget
  // ===============================

  const deleteBudget = async (id) => {
    await budgetService.delete(id);
    await fetchBudgets();
    await fetchBudgetStatus();
  };

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    fetchBudgets();
    fetchBudgetStatus();
  }, [fetchBudgets, fetchBudgetStatus]);

  // ===============================
  // Provider Value
  // ===============================

  const value = useMemo(
    () => ({
      budgets,
      budgetStatus,
      loading,
      error,

      fetchBudgets,
      fetchBudgetStatus,

      addBudget,
      updateBudget,
      deleteBudget,
    }),
    [
      budgets,
      budgetStatus,
      loading,
      error,
      fetchBudgets,
      fetchBudgetStatus,
    ]
  );

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudget = () => useContext(BudgetContext);