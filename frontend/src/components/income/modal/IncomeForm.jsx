import { useState, useEffect, useCallback } from "react";

const inputClasses =
  "w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:[color-scheme:dark]";

export default function IncomeForm({
  initial,
  onSubmit,
  registerSubmit,
}) {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    source: "Bank Transfer",
    date: new Date().toISOString().slice(0, 10),
    notes: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        category: initial.category || "",
        amount: initial.amount || "",
        source: initial.source || "Bank Transfer",
        date: initial.incomeDate || new Date().toISOString().slice(0, 10),
        notes: initial.description || "",
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(() => {
    if (form.category.trim() === "") {
      alert("Enter Income Category");
      return;
    }

    if (form.amount === "" || Number(form.amount) <= 0) {
      alert("Enter Valid Amount");
      return;
    }

    onSubmit({
      amount: Number(form.amount),
      category: form.category,
      source: form.source,
      description: form.notes,
      incomeDate: form.date,
    });
  }, [form, onSubmit]);

  useEffect(() => {
    if (registerSubmit) {
      registerSubmit(() => handleSubmit);
    }
  }, [handleSubmit, registerSubmit]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <div className="min-w-0">
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Income Category
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Salary"
            className={inputClasses}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Amount
          </label>
          <input
            type="number"
            inputMode="decimal"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="50000"
            className={inputClasses}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div className="min-w-0">
          <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
            Source
          </label>
          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className={inputClasses}
          >
            <option>Bank Transfer</option>
            <option>UPI</option>
            <option>Cash</option>
            <option>Cheque</option>
          </select>
        </div>
      </div>

      <div className="mt-5 min-w-0 sm:mt-6">
        <label className="mb-2 block font-medium text-slate-700 dark:text-slate-200">
          Description
        </label>
        <textarea
          rows={4}
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Optional..."
          className={inputClasses}
        />
      </div>
    </div>
  );
}
