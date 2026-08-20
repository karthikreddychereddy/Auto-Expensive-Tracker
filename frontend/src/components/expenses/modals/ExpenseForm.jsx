import { useEffect, useState, useRef } from "react";

import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaStickyNote,
  FaStore,
  FaMapMarkerAlt,
} from "react-icons/fa";
import MerchantSuggestions from "./MerchantSuggestions";
import CurrencySelector from "./CurrencySelector";
import ExpenseTags from "./ExpenseTags";
import ExpenseInput from "./ExpenseInput";
import CategorySelector from "./CategorySelector";
import PaymentSelector from "./PaymentSelector";

const getEmptyForm = () => ({
  title: "",
  amount: "",
  merchant: "",
  location: "",
  category: "",
  paymentMethod: "",
  currency: "₹ INR",
  tags: [],
  date: new Date().toISOString().slice(0, 10),
  notes: "",
});

export default function ExpenseForm({
  initial,
  onSubmit,
  onCancel,
  registerSubmit,
}) {
  const [form, setForm] = useState(getEmptyForm());
  const [selectedTags, setSelectedTags] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
      if (!initial) return;

      setForm({
          ...getEmptyForm(),
          ...initial,
      });

      setSelectedTags(initial.tags || []);
  }, [initial]);

  const update = (field) => (e) =>
    setForm({
      ...form,
      [field]: e.target.value,
    });

  const submit = (e) => {
  e.preventDefault();

  onSubmit?.({
    ...form,
    tags: selectedTags,
    amount: Number(form.amount),
  });

  // Reset form after adding a new expense
  if (!initial) {
    setForm(getEmptyForm());
    setSelectedTags([]);
  }
};
  useEffect(() => {
    if (!registerSubmit) return;

    registerSubmit(() => () => {
      formRef.current?.requestSubmit();
    });

  }, [registerSubmit]);

  return (
    <form
      ref = {formRef}
      onSubmit={submit}
      className="space-y-6 p-8"
    >

      <ExpenseInput
        label="Expense Title"
        name="title"
        value={form.title}
        onChange={update("title")}
        placeholder="Example : Domino's Pizza"
        required
      />

      <ExpenseInput
        label="Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={update("amount")}
        placeholder="0.00"
        required
        icon={<FaMoneyBillWave />}
      />

      <ExpenseInput
        label="Merchant"
        name="merchant"
        value={form.merchant}
        onChange={update("merchant")}
        placeholder="Amazon / Swiggy / Flipkart"
        icon={<FaStore />}
      />
      <MerchantSuggestions
        value={form.merchant}
        onSelect={(merchant) =>
            setForm({
                ...form,
                merchant,
            })
        }
      />

      <ExpenseInput
        label="Location"
        name="location"
        value={form.location}
        onChange={update("location")}
        placeholder="Hyderabad"
        icon={<FaMapMarkerAlt />}
      />

      <CategorySelector
        selectedCategory={form.category}
        onSelect={(category)=>
            setForm({
              ...form,
              category,
            })
        }
      />

      <PaymentSelector
        selectedPayment={form.paymentMethod}
        onSelect={(paymentMethod)=>
          setForm({
            ...form,
            paymentMethod,
          })
        }
      />
      <CurrencySelector
        value={form.currency}
        onChange={(e) =>
          setForm({
              ...form,
              currency: e.target.value,
          })
        }
      />

      <ExpenseInput
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={update("date")}
        icon={<FaCalendarAlt />}
      />

      <ExpenseTags
        selected={selectedTags}
        setSelected={setSelectedTags}
      />

      <div>

        <label className="font-semibold flex items-center gap-2 mb-2">

          <FaStickyNote />

          Notes

        </label>

        <textarea
          rows="3"
          value={form.notes}
          onChange={update("notes")}
          placeholder="Optional notes..."
          className="w-full border rounded-xl p-4"
        />

      </div>

    </form>
  );
}