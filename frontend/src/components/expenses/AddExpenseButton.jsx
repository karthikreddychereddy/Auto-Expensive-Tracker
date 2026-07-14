import { FaPlus } from "react-icons/fa";

export default function ExpenseCard() {
  return (
    <button
      className="bg-[#0B6B57] hover:bg-[#085443] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 transition"
    >
      <FaPlus />

      Add Expense
    </button>
  );
}