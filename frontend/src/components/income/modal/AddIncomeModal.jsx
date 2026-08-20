import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import IncomeForm from "./IncomeForm";
import IncomeFooter from "./IncomeFooter";

import { useIncome } from "../../../context/IncomeContext";

export default function AddIncomeModal({
  open,
  onClose,
  initialIncome,
}) {
  const {
    addIncome,
    updateIncome,
  } = useIncome();

  const [submitForm, setSubmitForm] = useState(null);

  if (!open) return null;

  const handleSave = async (incomeData) => {
    try {
      const data = {
        amount: incomeData.amount,
        category: incomeData.category,
        source: incomeData.source,
        description: incomeData.description,
        incomeDate: incomeData.incomeDate,
      };

      if (initialIncome) {
        await updateIncome(initialIncome.id, data);
      } else {
        await addIncome(data);
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
      <div className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4 dark:border-slate-700 sm:p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
              {initialIncome ? "Edit Income" : "Add Income"}
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Record your income.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Body */}
        <IncomeForm
          initial={initialIncome}
          onSubmit={handleSave}
          registerSubmit={setSubmitForm}
        />

        {/* Footer */}
        <IncomeFooter
          onClose={onClose}
          onSave={() => submitForm?.()}
          buttonText={
            initialIncome
              ? "Update Income"
              : "Save Income"
          }
        />

      </div>
    </div>
  );
}