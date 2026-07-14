import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SavingsForm({
  initial,
  onSubmit,
  registerSubmit,
}) {
  const [form, setForm] = useState({
    amount: "",
    source: "",
    description: "",
    savingDate: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (initial) {
      setForm({
        amount: initial.amount || "",
        source: initial.source || "",
        description: initial.description || "",
        savingDate:
          initial.savingDate || new Date().toISOString().slice(0, 10),
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (!form.source.trim()) {
      toast.error("Enter saving source");
      return;
    }

    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
  };

  useEffect(() => {
    if (registerSubmit) {
      registerSubmit(() => handleSubmit);
    }
  }, [registerSubmit, form]);

  return (
    <div className="p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-2">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Source
          </label>

          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="Salary, Cash, Bonus..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description (optional)"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Saving Date
          </label>

          <input
            type="date"
            name="savingDate"
            value={form.savingDate}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0B6B57]"
          />
        </div>
      </div>
    </div>
  );
}