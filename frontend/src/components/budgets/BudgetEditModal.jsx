import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function BudgetEditModal({
  open,
  category,
  currentBudget,
  onSave,
  onClose,
}) {
  const [budget, setBudget] = useState(currentBudget || "");

  useEffect(() => {
    setBudget(currentBudget ?? "");
  }, [currentBudget]);

  if (!open) return null;

  const handleSave = () => {
    const amount = Number(budget);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }

    onSave(amount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[420px] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <div>
            <h2 className="text-2xl font-bold">
              Edit Budget
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {category}
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block font-semibold mb-2">
              Budget Amount
            </label>

            <input
              type="number"
              min="1"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-[#0B6B57] hover:bg-[#085443] text-white px-6 py-2 rounded-xl"
          >
            Save Budget
          </button>
        </div>
      </div>
    </div>
  );
}