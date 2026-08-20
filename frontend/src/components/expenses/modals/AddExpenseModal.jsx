import { useState } from "react";
import {
  FaTimes,
  FaReceipt,
  FaKeyboard,
  FaMobileAlt,
} from "react-icons/fa";

import ExpenseForm from "./ExpenseForm";
import ReceiptUpload from "./ReceiptUpload";
import SmsImport from "./SmsImport";
import ExpenseFooter from "./ExpenseFooter";
import { useExpenses } from "../../../context/ExpenseContext";

export default function AddExpenseModal({ open, onClose, initialExpense }) {
  const [tab, setTab] = useState("manual");
  const { addExpense, updateExpense } = useExpenses();
  const [submitForm, setSubmitForm] = useState(null);
  const [receiptExpense, setReceiptExpense] = useState(null);

  if (!open) return null;

  const handleSave = async (expenseData) => {
  try {

    const data = {
      amount: expenseData.amount,

      category: expenseData.category,

      paymentMode:
        expenseData.paymentMethod || "Cash",

      description:
        expenseData.title || "Expense",

      merchant:
        expenseData.merchant || "-",

      expenseDate:
        expenseData.date,

      source:
        "MANUAL",
    };

    if (initialExpense) {

      await updateExpense(initialExpense.id, data);

    } else {

      await addExpense(data);

    }

    // Reset to manual tab
    setTab("manual");

    // Close modal
    onClose();

  } catch (err) {

    console.error(err);

  }
};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
                {initialExpense ? "Edit Expense" : "Add New Expense"}
            </h2>

            <p className="text-gray-500 mt-1">
              Keep track of every rupee you spend.
            </p>

          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* Tabs */}

        <div className="grid grid-cols-3 border-b">

          <button
            onClick={() => setTab("manual")}
            className={`py-4 font-semibold transition ${
              tab === "manual"
                ? "border-b-4 border-[#0B6B57] text-[#0B6B57]"
                : "text-gray-500 hover:text-[#0B6B57]"
            }`}
          >
            <FaKeyboard className="inline mr-2" />
            Manual
          </button>

          <button
            onClick={() => setTab("receipt")}
            className={`py-4 font-semibold transition ${
              tab === "receipt"
                ? "border-b-4 border-[#0B6B57] text-[#0B6B57]"
                : "text-gray-500 hover:text-[#0B6B57]"
            }`}
          >
            <FaReceipt className="inline mr-2" />
            Receipt
          </button>

          <button
            onClick={() => setTab("sms")}
            className={`py-4 font-semibold transition ${
              tab === "sms"
                ? "border-b-4 border-[#0B6B57] text-[#0B6B57]"
                : "text-gray-500 hover:text-[#0B6B57]"
            }`}
          >
            <FaMobileAlt className="inline mr-2" />
            SMS Import
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto">

          {tab === "manual" && (
            <ExpenseForm
              initial={receiptExpense || initialExpense}
              onSubmit={handleSave}
              onCancel={onClose}
              registerSubmit={setSubmitForm}
            />
          )}

          {tab === "receipt" && (
              <ReceiptUpload
                  onReceiptProcessed={(expense) => {

                      if (!expense) {
                          console.error("Receipt AI returned no data.");
                          return;
                      }

                      setReceiptExpense({
                          title: expense.merchant || "Receipt Expense",
                          amount: expense.amount || "",
                          merchant: expense.merchant || "",
                          category: expense.category || "Others",
                          paymentMethod: expense.paymentMode || "Cash",
                          date:
                              expense.date ||
                              new Date().toISOString().slice(0, 10),
                      });

                      setTab("manual");
                  }}
              />
          )}

          {tab === "sms" && (
            <SmsImport />
          )}

        </div>

        {/* Footer */}

        <ExpenseFooter
          onClose={onClose}
          onSave={() => submitForm?.()}
          buttonText={
              initialExpense
                ? "Update Expense"
                : "Save Expense"
          }
        />

      </div>

    </div>
  );
}