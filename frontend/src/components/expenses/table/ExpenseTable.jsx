import { useState } from "react";

import { useExpenses } from "../../../context/ExpenseContext";
import ExpenseTableRow from "./ExpenseTableRow";
import DeleteExpenseModal from "../modals/DeleteExpenseModal";

export default function ExpenseTable({ onEdit }) {

  const { filteredExpenses, deleteExpense } = useExpenses();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openDeleteModal = (expense) => {
    setSelectedExpense(expense);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    if (selectedExpense) {
      deleteExpense(selectedExpense.id);
    }

    setDeleteOpen(false);
    setSelectedExpense(null);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-4"></th>

              <th className="px-4 py-4 text-left">
                Title
              </th>

              <th className="px-4 py-4 text-left">
                Merchant
              </th>

              <th className="px-4 py-4 text-left">
                Category
              </th>

              <th className="px-4 py-4 text-left">
                Payment
              </th>

              <th className="px-4 py-4 text-left">
                Date
              </th>

              <th className="px-4 py-4 text-left">
                Amount
              </th>

              <th className="px-4 py-4 text-left">
                Status
              </th>

              <th className="px-4 py-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredExpenses.map((expense) => (

              <ExpenseTableRow
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={openDeleteModal}
              />

            ))}

          </tbody>

        </table>

      </div>

      <DeleteExpenseModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}