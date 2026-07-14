import { FaTrashAlt, FaTimes } from "react-icons/fa";

export default function DeleteExpenseModal({
  open,
  onClose,
  onDelete,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-[420px] p-8">

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

            <FaTrashAlt
              className="text-red-600"
              size={35}
            />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          Delete Expense
        </h2>

        <p className="text-gray-500 text-center mt-3">
          Are you sure you want to delete this expense?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border font-semibold hover:bg-gray-100"
          >
            <FaTimes className="inline mr-2" />
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            <FaTrashAlt className="inline mr-2" />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}