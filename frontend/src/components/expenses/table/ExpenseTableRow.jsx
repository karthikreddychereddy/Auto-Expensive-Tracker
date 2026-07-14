import {
  FaEdit,
  FaTrash,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";

import ExpenseStatusBadge from "./ExpenseStatusBadge";

export default function ExpenseTableRow({
  expense,
  onEdit,
  onDelete,
}) {

  return (

    <tr className="border-b hover:bg-gray-50 transition">

      <td className="px-4 py-4">
        <input type="checkbox" />
      </td>

      <td className="px-4 py-4 font-semibold">
        {expense.title}
      </td>

      <td className="px-4 py-4">
        {expense.merchant}
      </td>

      <td className="px-4 py-4">
        {expense.category}
      </td>

      <td className="px-4 py-4">

        <div className="flex items-center gap-2">

          {expense.paymentMethod === "Cash" ? (

            <FaMoneyBillWave className="text-green-600" />

          ) : (

            <FaCreditCard className="text-blue-600" />

          )}

          {expense.paymentMethod}

        </div>

      </td>

      <td className="px-4 py-4">
        {expense.date}
      </td>

      <td className="px-4 py-4 font-bold text-red-600">
        ₹{expense.amount}
      </td>

      <td className="px-4 py-4">

        <ExpenseStatusBadge
          type={expense.type}
        />

      </td>

      <td className="px-4 py-4">

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(expense)}
            className="text-blue-600 hover:scale-110 transition"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(expense)}
            className="text-red-600 hover:scale-110 transition"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}