import { useState, useEffect, useCallback } from "react";

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
    <div className="p-8">
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block font-medium mb-2">
            Income Category
          </label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="50000"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Source
          </label>

          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          >
            <option>Bank Transfer</option>
            <option>UPI</option>
            <option>Cash</option>
            <option>Cheque</option>
          </select>
        </div>

      </div>

      <div className="mt-6">
        <label className="block font-medium mb-2">
          Description
        </label>

        <textarea
          rows={4}
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Optional..."
          className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
        />
      </div>
    </div>
  );
}