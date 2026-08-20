import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaTimes,
} from "react-icons/fa";

import {
  useBudget,
} from "../../context/BudgetContext";

import {
  useMonth,
} from "../../context/MonthContext";

import {
  useCategory,
} from "../../context/CategoryContext";

function getMonthRange(
  selectedMonth
) {
  if (
    !selectedMonth ||
    !/^\d{4}-\d{2}$/.test(
      selectedMonth
    )
  ) {
    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      today.getMonth() + 1;

    const lastDay =
      new Date(
        year,
        month,
        0
      ).getDate();

    return {
      firstDay:
        `${year}-${String(
          month
        ).padStart(
          2,
          "0"
        )}-01`,

      lastDay:
        `${year}-${String(
          month
        ).padStart(
          2,
          "0"
        )}-${String(
          lastDay
        ).padStart(
          2,
          "0"
        )}`,
    };
  }

  const [
    year,
    month,
  ] = selectedMonth
    .split("-")
    .map(Number);

  const lastDay =
    new Date(
      year,
      month,
      0
    ).getDate();

  return {
    firstDay:
      `${year}-${String(
        month
      ).padStart(
        2,
        "0"
      )}-01`,

    lastDay:
      `${year}-${String(
        month
      ).padStart(
        2,
        "0"
      )}-${String(
        lastDay
      ).padStart(
        2,
        "0"
      )}`,
  };
}

export default function AddBudgetModal({
  open,
  onClose,
}) {
  const {
    addBudget,
  } = useBudget();

  const {
    selectedMonth,
  } = useMonth();

  const {
    categories,
    loading:
      categoriesLoading,
  } = useCategory();

  const monthRange =
    useMemo(
      () =>
        getMonthRange(
          selectedMonth
        ),
      [
        selectedMonth,
      ]
    );

  const [
    form,
    setForm,
  ] = useState({
    category: "",
    budgetAmount: "",
    startDate:
      monthRange.firstDay,
    endDate:
      monthRange.lastDay,
  });

  const [
    saving,
    setSaving,
  ] = useState(false);

  // ==========================================
  // RESET FORM TO SELECTED MONTH
  // ==========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm({
      category: "",
      budgetAmount: "",
      startDate:
        monthRange.firstDay,
      endDate:
        monthRange.lastDay,
    });
  }, [
    open,
    monthRange.firstDay,
    monthRange.lastDay,
  ]);

  if (!open) {
    return null;
  }

  // ==========================================
  // CHANGE
  // ==========================================

  const handleChange =
    event => {
      const {
        name,
        value,
      } = event.target;

      setForm(
        previous => ({
          ...previous,
          [name]:
            value,
        })
      );
    };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit =
    async () => {
      if (saving) {
        return;
      }

      if (
        !form.category
      ) {
        alert(
          "Please select a category."
        );

        return;
      }

      if (
        !form.budgetAmount ||
        Number(
          form.budgetAmount
        ) <= 0
      ) {
        alert(
          "Please enter a valid budget amount."
        );

        return;
      }

      if (
        !form.startDate ||
        !form.endDate
      ) {
        alert(
          "Please select start and end dates."
        );

        return;
      }

      if (
        form.startDate >
        form.endDate
      ) {
        alert(
          "Start date cannot be after end date."
        );

        return;
      }

      try {
        setSaving(true);

        await addBudget({
          category:
            form.category,

          budgetAmount:
            Number(
              form.budgetAmount
            ),

          startDate:
            form.startDate,

          endDate:
            form.endDate,
        });

        onClose?.();

      } catch (error) {
        console.error(
          "Unable to create budget:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
            "Unable to create budget."
        );

      } finally {
        setSaving(false);
      }
    };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-[500px]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-xl
          dark:bg-slate-900
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-5
            dark:border-slate-700
          "
        >
          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              Add Budget
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Budget month:{" "}
              {selectedMonth}
            </p>

          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            aria-label="Close budget modal"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-slate-100
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            <FaTimes />
          </button>

        </div>

        {/* BODY */}

        <div className="space-y-5 p-6">

          {/* CATEGORY */}

          <div>

            <label
              className="
                mb-2
                block
                font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              Category
            </label>

            <select
              name="category"
              value={
                form.category
              }
              onChange={
                handleChange
              }
              disabled={
                categoriesLoading
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-[#0B6B57]
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="">
                {categoriesLoading
                  ? "Loading Categories..."
                  : "Select Category"}
              </option>

              {categories.map(
                category => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.name
                    }
                  >
                    {category.icon
                      ? `${category.icon} `
                      : ""}
                    {category.name}
                  </option>
                )
              )}

            </select>

            {!categoriesLoading &&
              categories.length ===
                0 && (
                <p className="mt-2 text-sm text-orange-500">
                  No categories found. Create a category from the Categories page first.
                </p>
              )}

          </div>

          {/* AMOUNT */}

          <div>

            <label
              className="
                mb-2
                block
                font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              Budget Amount
            </label>

            <input
              type="number"
              name="budgetAmount"
              min="0"
              step="0.01"
              value={
                form.budgetAmount
              }
              onChange={
                handleChange
              }
              placeholder="Enter amount"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                outline-none
                transition
                focus:border-[#0B6B57]
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />

          </div>

          {/* DATES */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div>

              <label
                className="
                  mb-2
                  block
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={
                  form.startDate
                }
                onChange={
                  handleChange
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-[#0B6B57]
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />

            </div>

            <div>

              <label
                className="
                  mb-2
                  block
                  font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={
                  form.endDate
                }
                onChange={
                  handleChange
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-[#0B6B57]
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-white
                "
              />

            </div>

          </div>

          <div
            className="
              rounded-xl
              border
              border-[#0B6B57]/20
              bg-[#0B6B57]/5
              px-4
              py-3
              text-sm
              text-[#0B6B57]
            "
          >
            The dates are automatically set to the month selected in the top navbar. You can still adjust them manually if needed.
          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-slate-200
            px-6
            py-5
            dark:border-slate-700
          "
        >
          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              saving
            }
            className="
              rounded-xl
              border
              border-slate-300
              px-5
              py-2.5
              font-medium
              text-slate-600
              transition
              hover:bg-slate-100
              disabled:opacity-60
              dark:border-slate-700
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={
              handleSubmit
            }
            disabled={
              saving ||
              categoriesLoading ||
              categories.length === 0
            }
            className="
              rounded-xl
              bg-[#0B6B57]
              px-6
              py-2.5
              font-semibold
              text-white
              transition
              hover:bg-[#085443]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {saving
              ? "Saving..."
              : "Save Budget"}
          </button>

        </div>

      </div>
    </div>
  );
}