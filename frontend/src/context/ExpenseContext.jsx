import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useAuth,
} from "./AuthContext";

import {
  useMonth,
} from "./MonthContext";

import {
  expenseService,
} from "../services/expenseService";

import {
  dashboardService,
} from "../services/dashboardService";

const ExpenseContext =
  createContext(null);

export function ExpenseProvider({
  children,
}) {
  const {
    user,
  } = useAuth();

  const {
    selectedMonth,
  } = useMonth();

  const [
    expenses,
    setExpenses,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState("All");

  const [
    paymentFilter,
    setPaymentFilter,
  ] = useState("All");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    stats,
    setStats,
  ] = useState(null);

  // ==========================================
  // MAP BACKEND EXPENSE
  // ==========================================

  const mapExpense = useCallback(
    expense => ({
      id: expense.id,

      title:
        expense.description ||
        expense.merchant ||
        "Expense",

      description:
        expense.description ||
        "",

      amount:
        Number(
          expense.amount || 0
        ),

      category:
        expense.category ||
        "Other",

      paymentMethod:
        expense.paymentMode ||
        "",

      merchant:
        expense.merchant ||
        "",

      date:
        expense.expenseDate,

      transactionType:
        expense.transactionType,

      source:
        expense.source,

      receiptImage:
        expense.receiptImage,

      type: "Essential",
    }),
    []
  );

  // ==========================================
  // FETCH EXPENSES
  // ==========================================

  const fetchExpenses =
    useCallback(async () => {
      if (!user) {
        setExpenses([]);

        return;
      }

      setLoading(true);

      try {
        const data =
          await expenseService.list({
            month:
              selectedMonth,
          });

        const list =
          Array.isArray(data)
            ? data
            : data?.items || [];

        setExpenses(
          list.map(
            mapExpense
          )
        );

      } catch (error) {
        console.error(
          "Failed to fetch expenses:",
          error
        );

      } finally {
        setLoading(false);
      }
    }, [
      user,
      selectedMonth,
      mapExpense,
    ]);

  // ==========================================
  // LOAD / MONTH CHANGE
  // ==========================================

  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else {
      setExpenses([]);
    }
  }, [
    user,
    fetchExpenses,
  ]);

  // ==========================================
  // DASHBOARD STATS
  // ==========================================

  const fetchStats =
    useCallback(async () => {
      if (!user) {
        setStats(null);

        return;
      }

      try {
        const data =
          await dashboardService
            .summary(
              selectedMonth
            );

        setStats(data);

      } catch (error) {
        console.error(
          "Failed to fetch dashboard summary:",
          error
        );
      }
    }, [
      user,
      selectedMonth,
    ]);

  // ==========================================
  // ADD
  // ==========================================

  const addExpense =
    async payload => {
      try {
        const response =
          await expenseService
            .create(payload);

        await fetchExpenses();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

        toast.success(
          "Expense added"
        );

        return mapExpense(
          response
        );

      } catch (error) {
        console.error(
          "Add expense error:",
          error
        );

        toast.error(
          "Failed to add expense"
        );

        throw error;
      }
    };

  // ==========================================
  // UPDATE
  // ==========================================

  const updateExpense =
    async (
      id,
      payload
    ) => {
      try {
        const updated =
          await expenseService
            .update(
              id,
              payload
            );

        await fetchExpenses();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

        toast.success(
          "Expense updated"
        );

        return mapExpense(
          updated
        );

      } catch (error) {
        console.error(
          "Update expense error:",
          error
        );

        toast.error(
          "Failed to update expense"
        );

        throw error;
      }
    };

  // ==========================================
  // DELETE
  // ==========================================

  const deleteExpense =
    async id => {
      try {
        await expenseService
          .remove(id);

        await fetchExpenses();

        window.dispatchEvent(
          new Event(
            "dashboard-update"
          )
        );

        toast.success(
          "Expense deleted"
        );

      } catch (error) {
        console.error(
          "Delete expense error:",
          error
        );

        toast.error(
          "Failed to delete expense"
        );

        throw error;
      }
    };

  // ==========================================
  // FILTER + SEARCH
  // ==========================================

  const filteredExpenses =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return expenses.filter(
        expense => {
          const matchesSearch =
            !normalizedSearch ||
            [
              expense.title,
              expense.description,
              expense.merchant,
              expense.category,
              expense.paymentMethod,
            ].some(value =>
              String(
                value || ""
              )
                .toLowerCase()
                .includes(
                  normalizedSearch
                )
            );

          const matchesCategory =
            categoryFilter ===
              "All" ||
            expense.category ===
              categoryFilter;

          const matchesPayment =
            paymentFilter ===
              "All" ||
            expense.paymentMethod ===
              paymentFilter;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesPayment
          );
        }
      );
    }, [
      expenses,
      search,
      categoryFilter,
      paymentFilter,
    ]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");

    setCategoryFilter(
      "All"
    );

    setPaymentFilter(
      "All"
    );
  };

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

        clearFilters,

        loading,

        stats,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context =
    useContext(
      ExpenseContext
    );

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
}