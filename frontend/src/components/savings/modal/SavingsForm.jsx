import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useMonth,
} from "../../../context/MonthContext";

function getDefaultSavingDate(
  selectedMonth
) {
  const today =
    new Date();

  const currentDay =
    today.getDate();

  if (
    !selectedMonth ||
    !/^\d{4}-\d{2}$/.test(
      selectedMonth
    )
  ) {
    return today
      .toISOString()
      .slice(0, 10);
  }

  const [
    year,
    month,
  ] = selectedMonth
    .split("-")
    .map(Number);

  const lastDayOfSelectedMonth =
    new Date(
      year,
      month,
      0
    ).getDate();

  const validDay =
    Math.min(
      currentDay,
      lastDayOfSelectedMonth
    );

  return `${year}-${String(
    month
  ).padStart(
    2,
    "0"
  )}-${String(
    validDay
  ).padStart(
    2,
    "0"
  )}`;
}

export default function SavingsForm({
  initial,
  onSubmit,
  registerSubmit,
}) {
  const {
    selectedMonth,
  } = useMonth();

  const defaultSavingDate =
    useMemo(
      () =>
        getDefaultSavingDate(
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
    amount: "",
    source: "",
    description: "",
    savingDate:
      defaultSavingDate,
  });

  // ==========================================
  // LOAD INITIAL / SELECTED MONTH
  // ==========================================

  useEffect(() => {
    if (initial) {
      setForm({
        amount:
          initial.amount || "",

        source:
          initial.source || "",

        description:
          initial.description || "",

        /*
         * Edit mode must keep the
         * saving's original date.
         */
        savingDate:
          initial.savingDate ||
          defaultSavingDate,
      });

      return;
    }

    /*
     * Add mode follows the selected
     * navbar month.
     */
    setForm({
      amount: "",
      source: "",
      description: "",
      savingDate:
        defaultSavingDate,
    });

  }, [
    initial,
    defaultSavingDate,
  ]);

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
    () => {
      if (
        !form.amount ||
        Number(
          form.amount
        ) <= 0
      ) {
        toast.error(
          "Enter a valid amount"
        );

        return;
      }

      if (
        !form.source.trim()
      ) {
        toast.error(
          "Enter saving source"
        );

        return;
      }

      if (
        !form.savingDate
      ) {
        toast.error(
          "Select a saving date"
        );

        return;
      }

      onSubmit({
        ...form,

        amount:
          Number(
            form.amount
          ),
      });
    };

  // ==========================================
  // REGISTER SUBMIT
  // ==========================================

  useEffect(() => {
    if (
      !registerSubmit
    ) {
      return;
    }

    registerSubmit(
      () =>
        handleSubmit
    );

  }, [
    registerSubmit,
    form,
  ]);

  return (
    <div className="p-8">

      <div className="grid gap-6 md:grid-cols-2">

        {/* AMOUNT */}

        <div>

          <label className="mb-2 block font-medium">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={
              form.amount
            }
            onChange={
              handleChange
            }
            placeholder="Enter Amount"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
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

        {/* SOURCE */}

        <div>

          <label className="mb-2 block font-medium">
            Source
          </label>

          <input
            type="text"
            name="source"
            value={
              form.source
            }
            onChange={
              handleChange
            }
            placeholder="Salary, Cash, Bonus..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
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

        {/* DESCRIPTION */}

        <div className="md:col-span-2">

          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            placeholder="Enter description (optional)"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
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

        {/* SAVING DATE */}

        <div>

          <label className="mb-2 block font-medium">
            Saving Date
          </label>

          <input
            type="date"
            name="savingDate"
            value={
              form.savingDate
            }
            onChange={
              handleChange
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-200
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

          {!initial && (
            <p className="mt-2 text-xs text-slate-400">
              Default date follows the month selected in the top navbar.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}