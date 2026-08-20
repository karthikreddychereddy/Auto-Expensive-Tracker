import { FaBullseye } from "react-icons/fa";
import { useMemo, useState } from "react";
import { useIncome } from "../../context/IncomeContext";
import { formatCurrency } from "../../utils/format";

export default function IncomeGoalCard() {
  const { income } = useIncome();

  const [target, setTarget] = useState(() => {
    const saved = localStorage.getItem("income_goal");
    return saved ? Number(saved) : 0;
  });

  const [inputTarget, setInputTarget] = useState(target);

  const saveTarget = () => {
    const value = Number(inputTarget);
    setTarget(value);
    localStorage.setItem("income_goal", value);
  };

  const achieved = useMemo(() => {
    const now = new Date();

    return income
      .filter((item) => {
        const date = new Date(item.incomeDate);
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [income]);

  const percentage =
    target === 0 ? 0 : Math.min((achieved / target) * 100, 100);

  const remaining = Math.max(target - achieved, 0);

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
      <div className="mb-5 flex min-w-0 items-start gap-3 sm:mb-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/40 sm:h-12 sm:w-12 sm:rounded-2xl">
          <FaBullseye className="text-blue-600 dark:text-blue-400" />
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold text-slate-800 dark:text-white sm:text-2xl">
            Monthly Income Goal
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Stay on track with your target.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 min-[430px]:grid-cols-[minmax(0,1fr)_auto]">
        <input
          type="number"
          inputMode="decimal"
          value={inputTarget}
          onChange={(e) => setInputTarget(e.target.value)}
          placeholder="Set monthly target"
          aria-label="Monthly income target"
          className="w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B6B57] focus:ring-2 focus:ring-[#0B6B57]/10 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />

        <button
          type="button"
          onClick={saveTarget}
          className="min-h-11 rounded-xl bg-[#0B6B57] px-5 font-semibold text-white transition hover:bg-[#095544]"
        >
          Save
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <span className="text-slate-500 dark:text-slate-400">Target</span>
          <span className="min-w-0 break-words text-right font-semibold text-slate-800 dark:text-white">
            {formatCurrency(target)}
          </span>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-4">
          <span className="text-slate-500 dark:text-slate-400">Achieved</span>
          <span className="min-w-0 break-words text-right font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(achieved)}
          </span>
        </div>

        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-[#0B6B57] transition-[width] duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex flex-col gap-2 text-sm min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
          <span className="text-slate-700 dark:text-slate-200">
            {percentage.toFixed(0)}% Completed
          </span>
          <span className="break-words text-red-500 dark:text-red-400">
            Remaining {formatCurrency(remaining)}
          </span>
        </div>
      </div>
    </section>
  );
}
