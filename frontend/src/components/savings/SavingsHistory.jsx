import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { formatCurrency } from "../../utils/format";

import { useSavings } from "../../context/SavingsContext";
import { useModal } from "../../context/ModalContext";

import ConfirmModal from "../common/ConfirmModal";

export default function SavingsHistory() {
  const {
    filteredSavings,
    deleteSaving,
  } = useSavings();

  const { openModal } = useModal();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSaving, setSelectedSaving] = useState(null);

  const handleDeleteClick = (item) => {
    setSelectedSaving(item);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (selectedSaving) {
      deleteSaving(selectedSaving.id);
    }

    setConfirmOpen(false);
    setSelectedSaving(null);
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Savings History
          </h2>

          <p className="text-gray-500 mt-1">
            Track all your savings transactions.
          </p>
        </div>

        <div className="space-y-5">
          {filteredSavings.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No savings found.
            </div>
          ) : (
            filteredSavings.map((item) => (
              <div
                key={item.id}
                className="border rounded-2xl p-5 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">
                      {formatCurrency(item.amount)}
                    </h3>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        Source:
                      </span>{" "}
                      {item.source}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">
                        Description:
                      </span>{" "}
                      {item.description || "-"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.savingDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() =>
                        openModal("saving", item)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteClick(item)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete Saving"
        message={`Delete this saving transaction?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedSaving(null);
        }}
      />
    </>
  );
}