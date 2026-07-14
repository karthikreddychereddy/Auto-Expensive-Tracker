import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import SavingsForm from "./SavingsForm";
import SavingsFooter from "./SavingsFooter";

import { useSavings } from "../../../context/SavingsContext";

export default function AddSavingsModal({
  open,
  onClose,
  initialSaving,
}) {
  const {
    addSaving,
    updateSaving,
  } = useSavings();

  const [submitForm, setSubmitForm] = useState(null);

  if (!open) return null;

  const handleSave = (savingData) => {
    if (initialSaving) {
      updateSaving(initialSaving.id, savingData);
    } else {
      addSaving(savingData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

        <div className="flex justify-between items-center border-b p-6">
          <div>
            <h2 className="text-3xl font-bold">
              {initialSaving ? "Edit Saving" : "Add Saving"}
            </h2>

            <p className="text-gray-500 mt-1">
              Record your savings transaction.
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <SavingsForm
          initial={initialSaving}
          onSubmit={handleSave}
          registerSubmit={setSubmitForm}
        />

        <SavingsFooter
          onClose={onClose}
          onSave={() => {
            if (submitForm) {
              submitForm();
            }
          }}
          buttonText={
            initialSaving
              ? "Update Saving"
              : "Save Saving"
          }
        />
      </div>
    </div>
  );
}