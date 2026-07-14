import {
  createContext,
  useContext,
  useMemo,
} from "react";

import { useExpenses } from "./ExpenseContext";
import { useBudget } from "./BudgetContext";

const ReportContext = createContext(null);

export function ReportProvider({ children }) {

  const { expenses } = useExpenses();

  const { selectedMonth } = useBudget();

  // ==========================================
  // Expenses of Selected Month
  // ==========================================

  const monthlyExpenses = useMemo(() => {

    return expenses.filter(expense =>

      expense.date?.slice(0, 7) === selectedMonth

    );

  }, [expenses, selectedMonth]);
  const availableMonths = useMemo(() => {

    return [...new Set(

        expenses
        .map(expense => expense.date?.slice(0,7))
        .filter(Boolean)

    )].sort().reverse();

  }, [expenses]);

  // ==========================================
  // Monthly Summary
  // ==========================================

  const monthlySummary = useMemo(() => {

    const income = monthlyExpenses
      .filter(exp => exp.transactionType === "Income")
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    const expense = monthlyExpenses
      .filter(exp => exp.type !== "Income")
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    return {

      income,

      expense,

      balance: income - expense,

      transactions: monthlyExpenses.length,

    };

  }, [monthlyExpenses]);

  // ==========================================
  // Category Report
  // ==========================================

  const categoryReport = useMemo(() => {

    const report = {};

    monthlyExpenses.forEach(expense => {

      const category = expense.category || "Other";

      report[category] =
        (report[category] || 0) +
        Number(expense.amount);

    });

    return report;

  }, [monthlyExpenses]);
    // ==========================================
  // Payment Method Report
  // ==========================================

  const paymentReport = useMemo(() => {

    const report = {};

    monthlyExpenses.forEach(expense => {

      const payment = expense.paymentMethod || "Unknown";

      report[payment] =

        (report[payment] || 0) +

        Number(expense.amount);

    });

    return report;

  }, [monthlyExpenses]);

  // ==========================================
  // Merchant Report
  // ==========================================

  const merchantReport = useMemo(() => {

    const report = {};

    monthlyExpenses.forEach(expense => {

      const merchant = expense.merchant || "Unknown";

      report[merchant] =

        (report[merchant] || 0) +

        Number(expense.amount);

    });

    return report;

  }, [monthlyExpenses]);

  // ==========================================
  // Daily Spending
  // ==========================================

  const dailyReport = useMemo(() => {

    const report = {};

    monthlyExpenses.forEach(expense => {

      const day = expense.date;

      report[day] =

        (report[day] || 0) +

        Number(expense.amount);

    });

    return report;

  }, [monthlyExpenses]);

  // ==========================================
  // Top Spending Categories
  // ==========================================

  const topCategories = useMemo(() => {

    return Object.entries(categoryReport)

      .sort((a, b) => b[1] - a[1])

      .slice(0, 5);

  }, [categoryReport]);

  // ==========================================
  // Provider Value
  // ==========================================

  const value = useMemo(() => ({

    availableMonths,

    monthlyExpenses,

    monthlySummary,

    categoryReport,

    paymentReport,

    merchantReport,

    dailyReport,

    topCategories,

  }), [

    availableMonths,

    monthlyExpenses,

    monthlySummary,

    categoryReport,

    paymentReport,

    merchantReport,

    dailyReport,

    topCategories,

  ]);

  // ==========================================
  // Provider
  // ==========================================

  return (

    <ReportContext.Provider value={value}>

      {children}

    </ReportContext.Provider>

  );

}

// ==========================================
// Hook
// ==========================================

export const useReports = () =>
  useContext(ReportContext);