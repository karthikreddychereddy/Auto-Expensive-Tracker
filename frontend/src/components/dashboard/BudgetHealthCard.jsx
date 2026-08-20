import { FaBullseye } from "react-icons/fa";
import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { formatCurrency } from "../../utils/format";

export default function BudgetHealthCard() {
    const { expenses } = useExpenses();

    // Temporary monthly budget. Replace with live budget data during budget verification.
    const monthlyBudget = 50000;

    const spent = useMemo(
        () =>
        expenses
            .filter((item) => item.transactionType !== "Income")
            .reduce((sum, item) => sum + Number(item.amount), 0),
        [expenses]
    );

    const remaining = Math.max(monthlyBudget - spent, 0);
    const percentage = Math.min((spent / monthlyBudget) * 100, 100);

    let status = "Excellent";
    let color = "bg-green-500";
    let advice = "You're spending responsibly.";

    if (percentage >= 90) {
        status = "Critical";
        color = "bg-red-500";
        advice = "Budget almost exhausted.";
    } else if (percentage >= 70) {
        status = "Warning";
        color = "bg-yellow-500";
        advice = "Control your spending.";
    }

    return (
        <section className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
        <div className="mb-5 flex items-center gap-3 sm:mb-8">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/40 sm:h-12 sm:w-12 sm:rounded-2xl">
            <FaBullseye className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
                Budget Health
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                Live Monthly Budget
            </p>
            </div>
        </div>

        <div className="mb-2 flex flex-col gap-1 text-sm min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
            <span className="font-medium text-slate-700 dark:text-slate-200">
            {percentage.toFixed(1)}%
            </span>
            <span className="break-words text-gray-500 dark:text-gray-400">
            {formatCurrency(spent)} / {formatCurrency(monthlyBudget)}
            </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700 sm:h-4">
            <div
            className={`${color} h-full rounded-full transition-all duration-700`}
            style={{ width: `${percentage}%` }}
            />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 min-[430px]:grid-cols-3 sm:mt-8 sm:gap-4">
            {[
            ["Budget", formatCurrency(monthlyBudget), ""],
            ["Spent", formatCurrency(spent), "text-red-500 dark:text-red-400"],
            ["Remaining", formatCurrency(remaining), "text-green-600 dark:text-green-400"],
            ].map(([label, value, valueClass]) => (
            <div key={label} className="min-w-0 rounded-xl bg-gray-50 p-3 dark:bg-slate-900/50 sm:bg-transparent sm:p-0 dark:sm:bg-transparent">
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{label}</p>
                <h3 className={`mt-1 break-words font-bold text-slate-800 dark:text-white ${valueClass}`}>
                {value}
                </h3>
            </div>
            ))}
        </div>

        <div className="mt-5 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <span className={`${color} rounded-full px-4 py-2 text-sm font-medium text-white`}>
            {status}
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">{advice}</p>
        </div>
        </section>
    );
}
