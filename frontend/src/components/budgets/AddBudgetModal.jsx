import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { useBudget } from "../../context/BudgetContext";
import { EXPENSE_CATEGORIES } from "../../constants/expenseConstants";

export default function AddBudgetModal({
  open,
  onClose,
}) {

  const { addBudget } = useBudget();

  const today = new Date();

  const firstDay =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-01`;

  const lastDay =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-31`;

  const [form, setForm] = useState({
    category: "",
    budgetAmount: "",
    startDate: firstDay,
    endDate: lastDay,
  });

  if (!open) return null;

  const handleChange = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  const handleSubmit = async () => {

    if (
      !form.category ||
      !form.budgetAmount
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      await addBudget({
        category: form.category,
        budgetAmount: Number(form.budgetAmount),
        startDate: form.startDate,
        endDate: form.endDate,
      });

      setForm({
        category: "",
        budgetAmount: "",
        startDate: firstDay,
        endDate: lastDay,
      });

      onClose();

    } catch (err) {

      console.error(err);
      alert("Unable to create budget.");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[500px] shadow-xl overflow-hidden">

        <div className="flex justify-between items-center px-6 py-5 border-b">

          <h2 className="text-2xl font-bold">

            Add Budget

          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="block font-semibold mb-2">

              Category

            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >

              <option value="">

                Select Category

              </option>

              {EXPENSE_CATEGORIES.map((category) => (

                <option
                  key={category.id}
                  value={category.name}
                >
                  {category.name}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block font-semibold mb-2">

              Budget Amount

            </label>

            <input
              type="number"
              name="budgetAmount"
              value={form.budgetAmount}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block font-semibold mb-2">

                Start Date

              </label>

              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block font-semibold mb-2">

                End Date

              </label>

              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#0B6B57] hover:bg-[#085443] text-white px-6 py-2 rounded-xl"
          >
            Save Budget
          </button>

        </div>

      </div>

    </div>

  );

}