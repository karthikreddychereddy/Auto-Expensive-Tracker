import { useState } from "react";

const initialForm = {
  title: "",
  amount: "",
  category: "",
  paymentMethod: "",
  merchant: "",
  location: "",
  date: new Date().toISOString().split("T")[0],
  currency: "INR",
  notes: "",
  essential: false,
  recurring: false,
  recurringType: "None",
};

export default function useExpenseForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // Handle all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update values manually (for category/payment buttons)
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialForm);
    setErrors({});
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim())
      newErrors.title = "Expense title is required.";

    if (!formData.amount || Number(formData.amount) <= 0)
      newErrors.amount = "Enter a valid amount.";

    if (!formData.category)
      newErrors.category = "Select a category.";

    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Select a payment method.";

    if (!formData.date)
      newErrors.date = "Select a date.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    updateField,
    validate,
    resetForm,
  };
}