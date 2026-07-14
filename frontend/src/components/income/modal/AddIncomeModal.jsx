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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {initialIncome ? "Edit Income" : "Add Income"}
            </h2>

            <p className="text-gray-500 mt-1">
              Record your income.
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2"
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