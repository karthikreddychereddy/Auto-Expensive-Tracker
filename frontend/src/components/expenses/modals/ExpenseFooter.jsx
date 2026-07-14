export default function ExpenseFooter({
  onClose,
  onSave,
  buttonText = "Save Expense",
}) {
  return (
    <div className="flex justify-end gap-4 border-t p-6">

      <button
        onClick={onClose}
        className="px-6 py-3 rounded-xl border hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        onClick={onSave}
        className="bg-[#0B6B57] hover:bg-[#095846] text-white px-8 py-3 rounded-xl font-semibold"
      >
        {buttonText}
      </button>

    </div>
  );
}