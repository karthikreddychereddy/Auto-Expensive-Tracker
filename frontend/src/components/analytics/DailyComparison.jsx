import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { formatCurrency } from "../../utils/format";

export default function DailyComparison() {
  const { expenses } = useExpenses();

  const {
    todayAmount,
    yesterdayAmount,
    difference,
    higher,
  } = useMemo(() => {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10);

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayString = yesterday.toISOString().slice(0, 10);

    const todayTotal = expenses
      .filter((e) => e.date === todayString)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const yesterdayTotal = expenses
      .filter((e) => e.date === yesterdayString)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const diff = todayTotal - yesterdayTotal;

    return {
      todayAmount: todayTotal,
      yesterdayAmount: yesterdayTotal,
      difference: diff,
      higher: diff > 0,
    };
  }, [expenses]);

  const items = [
    ["Yesterday", formatCurrency(yesterdayAmount), ""],
    ["Today", formatCurrency(todayAmount), ""],
    [
      "Difference",
      `${difference >= 0 ? "+" : "-"}${formatCurrency(Math.abs(difference))}`,
      higher ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400",
    ],
  ];

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white sm:mb-6 sm:text-2xl">
        Today's Analysis
      </h2>

      <div className="grid min-w-0 grid-cols-1 gap-3 min-[430px]:grid-cols-3 sm:gap-4">
        {items.map(([label, value, valueClass]) => (
          <div key={label} className="min-w-0 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60 sm:p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            <h3 className={`mt-1 break-words text-xl font-bold text-slate-800 dark:text-white sm:text-2xl ${valueClass}`}>
              {value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
