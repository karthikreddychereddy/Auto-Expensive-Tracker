import {
  useState,
} from "react";

import {
  FaPlus,
  FaReceipt,
} from "react-icons/fa";

import ExpenseSummary from "../components/expenses/ExpenseSummary";
import ExpenseSearch from "../components/expenses/ExpenseSearch";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseInsights from "../components/expenses/ExpenseInsights";
import AddExpenseModal from "../components/expenses/modals/AddExpenseModal";
import ExpenseTable from "../components/expenses/table/ExpenseTable";
import ExportButtons from "../components/expenses/ExportButtons";

import {
  useExpenses,
} from "../context/ExpenseContext";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

import PageLoader from "../components/common/PageLoader";
import EmptyState from "../components/common/EmptyState";

import {
  exportCSV,
  exportExcel,
  exportPDF,
} from "../utils/exportUtils";

export default function Expenses() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    editingExpense,
    setEditingExpense,
  ] = useState(null);

  const {
    expenses,
    filteredExpenses,
    loading,
  } = useExpenses();

  const openAddModal = () => {
    setEditingExpense(null);
    setOpen(true);
  };

  const openEditModal =
    expense => {
      setEditingExpense(
        expense
      );

      setOpen(true);
    };

  if (
    loading &&
    expenses.length === 0
  ) {
    return (
      <PageLoader message="Loading expenses..." />
    );
  }

  return (
    <PageTransition>
      <div className="min-w-0 space-y-4 sm:space-y-6 lg:space-y-8">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">
              Expenses
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Track and manage every expense in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            {expenses.length > 0 && (
              <ExportButtons
                onCSV={() =>
                  exportCSV(
                    filteredExpenses
                  )
                }
                onExcel={() =>
                  exportExcel(
                    filteredExpenses
                  )
                }
                onPDF={() =>
                  exportPDF(
                    filteredExpenses
                  )
                }
              />
            )}

            <button
              type="button"
              onClick={
                openAddModal
              }
              className="flex items-center gap-3 rounded-xl bg-[#0B6B57] px-5 py-3 font-semibold text-white transition hover:bg-[#085443]"
            >
              <FaPlus />

              Add Expense
            </button>

          </div>

        </div>

        {expenses.length === 0 ? (
          <EmptyState
            icon={<FaReceipt />}
            title="No expenses yet"
            description="Add your first expense to start tracking where your money goes."
            actionLabel="Add Expense"
            onAction={
              openAddModal
            }
          />
        ) : (
          <>
            <FadeCard delay={0.10}>
              <ExpenseSummary />
            </FadeCard>

            <FadeCard delay={0.20}>
              <ExpenseFilters />
            </FadeCard>

            <FadeCard delay={0.25}>
              <ExpenseInsights />
            </FadeCard>

            {filteredExpenses.length === 0 ? (
              <EmptyState
                compact
                icon={<FaReceipt />}
                title="No matching expenses"
                description="No expenses match your current search or filters."
              />
            ) : (
              <FadeCard delay={0.30}>
                <ExpenseTable
                  onEdit={
                    openEditModal
                  }
                />
              </FadeCard>
            )}
          </>
        )}

        <AddExpenseModal
          open={open}
          initialExpense={
            editingExpense
          }
          onClose={() => {
            setOpen(false);

            setEditingExpense(
              null
            );
          }}
        />

      </div>
    </PageTransition>
  );
}