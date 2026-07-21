import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";
import { useSearch } from "./SearchContext";

import { expenseService } from "../services/expenseService";
import { dashboardService } from "../services/dashboardService";
import { filterExpenses } from "../utils/expenseFilters";
import { useMonth } from "./MonthContext";

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {

  const { user } = useAuth();
  const { searchText } = useSearch();

  // ==========================
  // State
  // ==========================

  const [expenses, setExpenses] = useState([]);

  const [search, setSearch] = useState("");

  const { selectedMonth } = useMonth();

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(false);

  const [stats, setStats] =
    useState(null);

  // ==========================
  // Fetch Expenses
  // ==========================

  const fetchExpenses = useCallback(async () => {

    setLoading(true);

    try {

      const data =
        await expenseService.list({
                  month: selectedMonth,
              });

      const mappedExpenses =
        (Array.isArray(data)
          ? data
          : data.items || []
        ).map(expense => ({

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

    catch (error) {

      console.error(
        "Failed to fetch expenses:",
        error
      );

    }

    finally {

      setLoading(false);

    }

  }, [selectedMonth]);

  // ==========================
  // Load Expenses
  // ==========================

  useEffect(() => {

      if (user) {

          fetchExpenses();

      } else {

          setExpenses([]);

      }

  }, [user, selectedMonth, fetchExpenses]);

  // ==========================
  // Dashboard Stats
  // ==========================

  const fetchStats = useCallback(async () => {

    try {

      const data =
          await dashboardService.summary(selectedMonth);

      setStats(data);

    }

    catch (error) {

      console.error(
        "Failed to fetch dashboard summary:",
        error
      );

    }

  }, [selectedMonth]);

  // ==========================
  // Add Expense
  // ==========================

  const addExpense = async (payload) => {

    try {

      const response =
        await expenseService.create(payload);

      const expense = {

        id: response.id,
        title: response.description,
        amount: response.amount,
        category: response.category,
        paymentMethod: response.paymentMode,
        merchant: response.merchant,
        date: response.expenseDate,
        type: "Essential",

      };

      await fetchExpenses();

      window.dispatchEvent(
        new Event("dashboard-update")
      );
      window.dispatchEvent(
        new Event("dashboard-update")
      );

      toast.success("Expense added");

      return expense;

    }

    catch (error) {

      console.error(error);

      toast.error("Failed to add expense");

    }

  };

  // ==========================
  // Update Expense
  // ==========================

  const updateExpense = async (id, payload) => {

    try {

      const updated =
        await expenseService.update(id, payload);

      const mappedExpense = {

        id: updated.id,
        title: updated.description,
        amount: updated.amount,
        category: updated.category,
        paymentMethod: updated.paymentMode,
        merchant: updated.merchant,
        date: updated.expenseDate,
        type: "Essential",

      };

      await fetchExpenses();

      toast.success("Expense updated");

    }

    catch (error) {

      console.error(error);

      toast.error("Failed to update expense");

    }

  };

  // ==========================
  // Delete Expense
  // ==========================

  const deleteExpense = async (id) => {

    try {

      await expenseService.remove(id);

      await fetchExpenses();

      toast.success("Expense deleted");

    }

    catch (error) {

      console.error(error);

      toast.error("Failed to delete expense");

    }

  };

  // ==========================
  // Filtered Expenses
  // ==========================

  const filteredExpenses = useMemo(() => {

    return filterExpenses(

      expenses,

      searchText,

      categoryFilter,

      paymentFilter

    );

  }, [

    expenses,

    searchText,

    categoryFilter,

    paymentFilter,

  ]);

  // ==========================
  // Provider
  // ==========================

  return (

    <ExpenseContext.Provider

      value={{

        expenses,

        filteredExpenses,

        fetchExpenses,

        fetchStats,

        addExpense,

        updateExpense,

        deleteExpense,

        search,

        setSearch,

        categoryFilter,

        setCategoryFilter,

        paymentFilter,

        setPaymentFilter,

        loading,

        stats,

      }}

    >

      {children}

    </ExpenseContext.Provider>

  );

}

export function useExpenses() {

  return useContext(ExpenseContext);

}