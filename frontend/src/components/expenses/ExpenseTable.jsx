import {
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaBolt,
  FaWallet,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  useExpenses,
} from "../../context/ExpenseContext";

import {
  formatCurrency,
} from "../../utils/format";

function getCategoryIcon(
  category
) {
  const value =
    category
      ?.toLowerCase() ||
    "";

  if (
    value.includes("food")
  ) {
    return <FaUtensils />;
  }

  if (
    value.includes(
      "transport"
    ) ||
    value.includes(
      "travel"
    )
  ) {
    return <FaCar />;
  }

  if (
    value.includes(
      "shopping"
    )
  ) {
    return <FaShoppingBag />;
  }

  if (
    value.includes("bill") ||
    value.includes(
      "utility"
    )
  ) {
    return <FaBolt />;
  }

  return <FaWallet />;
}

function formatDate(date) {
  if (!date) {
    return "-";
  }

  const value =
    new Date(
      `${date}T00:00:00`
    );

  if (
    Number.isNaN(
      value.getTime()
    )
  ) {
    return date;
  }

  return value.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function ExpenseTable({
  onEdit,
}) {
  const {
    filteredExpenses,
    deleteExpense,
    loading,
  } = useExpenses();

  const handleDelete =
    async id => {
      const confirmed =
        window.confirm(
          "Delete this expense?"
        );

      if (!confirmed) {
        return;
      }

      await deleteExpense(id);
    };

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-700">

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Expenses
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {filteredExpenses.length}{" "}
            {filteredExpenses.length ===
            1
              ? "expense"
              : "expenses"}{" "}
            found
          </p>
        </div>

      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-500">
          Loading expenses...
        </div>
      ) : filteredExpenses.length ===
        0 ? (
        <div className="p-12 text-center">

          <FaWallet className="mx-auto text-4xl text-slate-300" />

          <h3 className="mt-4 font-semibold text-slate-700 dark:text-white">
            No expenses found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead className="bg-slate-50 dark:bg-slate-800">

              <tr className="text-sm text-slate-500 dark:text-slate-400">

                <th className="p-5 text-left font-semibold">
                  Expense
                </th>

                <th className="text-left font-semibold">
                  Category
                </th>

                <th className="text-left font-semibold">
                  Payment
                </th>

                <th className="text-left font-semibold">
                  Date
                </th>

                <th className="text-right font-semibold">
                  Amount
                </th>

                <th className="text-center font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredExpenses.map(
                expense => (
                  <tr
                    key={expense.id}
                    className="
                      border-t
                      border-slate-100
                      transition
                      hover:bg-slate-50
                      dark:border-slate-800
                      dark:hover:bg-slate-800/60
                    "
                  >

                    <td className="p-5">

                      <div className="flex min-w-0 items-center gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-lg text-[#0B6B57]">
                          {getCategoryIcon(
                            expense.category
                          )}
                        </div>

                        <div className="min-w-0">

                          <p className="max-w-[250px] truncate font-semibold text-slate-800 dark:text-white">
                            {expense.title ||
                              "Expense"}
                          </p>

                          {expense.merchant && (
                            <p className="mt-1 max-w-[250px] truncate text-xs text-slate-500">
                              {expense.merchant}
                            </p>
                          )}

                        </div>

                      </div>

                    </td>

                    <td className="text-slate-700 dark:text-slate-300">
                      {expense.category ||
                        "-"}
                    </td>

                    <td>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                        {expense.paymentMethod ||
                          "-"}
                      </span>
                    </td>

                    <td className="text-slate-600 dark:text-slate-400">
                      {formatDate(
                        expense.date
                      )}
                    </td>

                    <td className="text-right font-bold text-red-500">
                      {formatCurrency(
                        expense.amount
                      )}
                    </td>

                    <td>
                      <div className="flex justify-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            onEdit?.(
                              expense
                            )
                          }
                          aria-label="Edit expense"
                          title="Edit"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-500 transition hover:bg-blue-50 dark:hover:bg-blue-950/30"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              expense.id
                            )
                          }
                          aria-label="Delete expense"
                          title="Delete"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}