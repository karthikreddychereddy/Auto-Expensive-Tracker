import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import toast from "react-hot-toast";

import { expenseService } from "../services/expenseService";
import { initialExpenses } from "../data/expenses";
import { filterExpenses } from "../utils/expenseFilters";
import { dashboardService } from "../services/dashboardService";

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {

  // ==============================
  // Expenses
  // ==============================

  const [expenses, setExpenses] = useState([]);

  // ==============================
  // Search & Filters
  // ==============================

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  // ==============================
  // API States
  // ==============================

  const [loading, setLoading] =
    useState(false);

  const [stats, setStats] =
    useState(null);

  // ==============================
  // Fetch Expenses
  // ==============================

  const fetchExpenses = useCallback(async (params) => {

    setLoading(true);

    try {

      const data =
        await expenseService.list(params);

      const mappedExpenses =
        (Array.isArray(data) ? data : data.items || [])
        .map(expense => ({
            id: expense.id,
            title: expense.description,
            amount: expense.amount,
            category: expense.category,
            paymentMethod: expense.paymentMode,
            merchant: expense.merchant,
            date: expense.expenseDate,
            type: "Essential",
        }));

      setExpenses(mappedExpenses);

    }

    finally {

      setLoading(false);

    }

  }, []);
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // ==============================
  // Fetch Stats
  // ==============================

  const fetchStats = useCallback(async () => {

    try {

      const data = await dashboardService.summary();

      setStats(data);

    } catch (error) {

      console.error("Failed to fetch dashboard summary:", error);

    }

  }, []);

  // ==============================
  // Add Expense
  // ==============================

  const addExpense = async (payload) => {

    try {

      const expense =
        await expenseService.create(payload);

      setExpenses(prev => [
        expense,
        ...prev,
      ]);

      window.dispatchEvent(
        new Event("dashboard-update")
      );

      toast.success("Expense added");

      return expense;

    } catch(error) {

      console.error(error);
      toast.error("Failed to add expense");

    }

  };
    // ==============================
  // Update Expense
  // ==============================

  const updateExpense = async (id, payload) => {

    try {

      const updated =
        await expenseService.update(id, payload);


      setExpenses(prev =>
        prev.map(expense =>
          expense.id === id
            ? updated
            : expense
        )
      );

      toast.success("Expense updated");


    } catch(error) {

      console.error(error);
      toast.error("Failed to update expense");

    }

  };

  // ==============================
  // Delete Expense
  // ==============================

  const deleteExpense = async (id) => {

    try {

      await expenseService.remove(id);


      setExpenses(prev =>
        prev.filter(expense =>
          expense.id !== id
        )
      );


      toast.success("Expense deleted");


    } catch(error) {

      console.error(error);
      toast.error("Failed to delete expense");

    }

  };

  // ==============================
  // Filtered Expenses
  // ==============================

  const filteredExpenses = useMemo(() =>

    filterExpenses(

      expenses,

      search,

      categoryFilter,

      paymentFilter

    ),

    [

      expenses,

      search,

      categoryFilter,

      paymentFilter,

    ]

  );

  // ==============================
  // Provider
  // ==============================

  return (

    <ExpenseContext.Provider

      value={{

        // Expenses

        expenses,

        filteredExpenses,

        // API

        fetchExpenses,

        fetchStats,

        addExpense,

        updateExpense,

        deleteExpense,

        // Search

        search,

        setSearch,

        // Filters

        categoryFilter,

        setCategoryFilter,

        paymentFilter,

        setPaymentFilter,

        // Loading

        loading,

        stats,

      }}

    >

      {children}

    </ExpenseContext.Provider>

  );

}

// ==============================
// Hook
// ==============================

export const useExpenses = () =>

  useContext(ExpenseContext);