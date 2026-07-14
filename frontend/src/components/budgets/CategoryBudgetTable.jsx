import { useState } from "react";
import { FaEdit } from "react-icons/fa";

import { useBudget } from "../../context/BudgetContext";
import BudgetEditModal from "./BudgetEditModal";

export default function CategoryBudgetTable() {
  const { budgets, budgetStatus, updateBudget } = useBudget();

  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleSave = async (budgetAmount) => {
    if (!selectedBudget) return;

    await updateBudget(selectedBudget.id, {
      category: selectedBudget.category,
      budgetAmount: Number(budgetAmount),
      startDate: selectedBudget.startDate,
      endDate: selectedBudget.endDate,
    });

    setSelectedBudget(null);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b">
          <h2 className="text-2xl font-bold">
            Category Budgets
          </h2>

          <p className="text-gray-500 mt-1">
            Manage budget for every category.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">

            <thead className="bg-slate-100">
              <tr>
                <th className="w-[22%] px-6 py-4 text-left font-semibold">
                  Category
                </th>

                <th className="w-[14%] py-4 text-center font-semibold">
                  Budget
                </th>

                <th className="w-[14%] py-4 text-center font-semibold">
                  Spent
                </th>

                <th className="w-[16%] py-4 text-center font-semibold">
                  Remaining
                </th>

                <th className="w-[28%] py-4 text-center font-semibold">
                  Progress
                </th>

                <th className="w-[6%] py-4 text-center font-semibold">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {budgets.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500"
                  >
                    No budgets found.
                  </td>
                </tr>
              ) : (
                budgets.map((budget) => {
                  const status = budgetStatus.find(
                    (item) => item.category === budget.category
                  );

                  const spent = Number(status?.spentAmount ?? 0);

                  const remaining = Number(
                    status?.remainingAmount ??
                      budget.budgetAmount
                  );

                  const percentage = Number(
                    status?.percentageUsed ?? 0
                  );

                  return (
                    <tr
                      key={budget.id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      {/* Category */}
                      <td className="px-6 py-5 text-left font-semibold">
                        {budget.category}
                      </td>

                      {/* Budget */}
                      <td className="text-center font-semibold">
                        ₹
                        {Number(
                          budget.budgetAmount
                        ).toLocaleString()}
                      </td>

                      {/* Spent */}
                      <td className="text-center font-semibold text-red-600">
                        ₹{spent.toLocaleString()}
                      </td>

                      {/* Remaining */}
                      <td
                        className={`text-center font-semibold ${
                          remaining >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ₹{remaining.toLocaleString()}
                      </td>

                      {/* Progress */}
                      <td className="px-5">

                        <div className="flex items-center gap-3">

                          <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">

                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                percentage >= 100
                                  ? "bg-red-500"
                                  : percentage >= 80
                                  ? "bg-yellow-500"
                                  : "bg-[#0B6B57]"
                              }`}
                              style={{
                                width: `${Math.min(
                                  percentage,
                                  100
                                )}%`,
                              }}
                            />

                          </div>

                          <span className="w-12 text-right text-sm font-semibold">
                            {percentage.toFixed(0)}%
                          </span>

                        </div>

                      </td>

                      {/* Edit */}
                      <td className="text-center">
                        <button
                          onClick={() =>
                            setSelectedBudget(budget)
                          }
                          className="text-[#0B6B57] hover:text-[#085443] transition"
                        >
                          <FaEdit size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      <BudgetEditModal
        open={selectedBudget !== null}
        category={selectedBudget?.category}
        currentBudget={
          selectedBudget?.budgetAmount ?? 0
        }
        onSave={handleSave}
        onClose={() => setSelectedBudget(null)}
      />
    </>
  );
}