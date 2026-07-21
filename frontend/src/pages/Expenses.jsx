import { useState } from "react";

import ExpenseSummary from "../components/expenses/ExpenseSummary";
import ExpenseSearch from "../components/expenses/ExpenseSearch";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseInsights from "../components/expenses/ExpenseInsights";
import AddExpenseModal from "../components/expenses/modals/AddExpenseModal";
import ExpenseTable from "../components/expenses/table/ExpenseTable";
import ExportButtons from "../components/expenses/ExportButtons";
import { useExpenses } from "../context/ExpenseContext";
import { useMonth } from "../context/MonthContext";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

import {
  exportCSV,
  exportExcel,
  exportPDF,
} from "../utils/exportUtils";

import { FaPlus } from "react-icons/fa";

export default function Expenses() {

  const { selectedMonth } = useMonth();

  const [open, setOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { filteredExpenses } = useExpenses();

  const openAddModal = () => {
    setEditingExpense(null);
    setOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setOpen(true);
  };

  return (
    <PageTransition>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Expenses
            </h1>

            <p className="text-gray-500 mt-2">
              Track and manage every expense in one place.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <ExportButtons
              onCSV={() => exportCSV(filteredExpenses)}
              onExcel={() => exportExcel(filteredExpenses)}
              onPDF={() => exportPDF(filteredExpenses)}
            />

            <button
              onClick={openAddModal}
              className="bg-[#0B6B57] hover:bg-[#085443] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 transition"
            >
              <FaPlus />
              Add Expense
            </button>

          </div>

        </div>

        <FadeCard delay={0.10}>
          <ExpenseSummary />
        </FadeCard>

        <FadeCard delay={0.15}>
          <ExpenseSearch />
        </FadeCard>

        <FadeCard delay={0.20}>
          <ExpenseFilters />
        </FadeCard>

        <FadeCard delay={0.25}>
          <ExpenseInsights />
        </FadeCard>

        <FadeCard delay={0.30}>
          <ExpenseTable onEdit={openEditModal} />
        </FadeCard>

        <AddExpenseModal
          open={open}
          initialExpense={editingExpense}
          onClose={() => {
            setOpen(false);
            setEditingExpense(null);
          }}
        />

      </div>

    </PageTransition>
  );

}