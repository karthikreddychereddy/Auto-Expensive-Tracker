import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { formatCurrency } from "../../utils/format";

export default function TodaySummaryCard() {
    const { expenses } = useExpenses();
    const today = new Date().toISOString().slice(0, 10);

    const todayExpenses = useMemo(
        () =>
        expenses.filter(
            (expense) =>
            expense.date === today &&
            expense.transactionType !== "Income"
        ),
        [expenses, today]
    );

    const totalSpent = todayExpenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const largestExpense =
        todayExpenses.length === 0
        ? 0
        : Math.max(...todayExpenses.map((item) => Number(item.amount)));

    const averageExpense =
        todayExpenses.length === 0 ? 0 : totalSpent / todayExpenses.length;

    const stats = [
        ["Transactions", todayExpenses.length],
        ["Largest", formatCurrency(largestExpense)],
        ["Average", formatCurrency(averageExpense)],
    ];

    return (
        <section className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            Today's Spending
        </h2>

        <h3 className="mt-3 break-words text-3xl font-bold text-red-500 dark:text-red-400 sm:mt-4 sm:text-4xl">
            {formatCurrency(totalSpent)}
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-3 min-[430px]:grid-cols-3 sm:mt-8 sm:gap-5">
            {stats.map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-xl bg-gray-50 p-3 dark:bg-slate-900/50 min-[430px]:bg-transparent min-[430px]:p-0 dark:min-[430px]:bg-transparent">
                <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{label}</p>
                <p className="mt-1 break-words text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
                {value}
                </p>
            </div>
            ))}
        </div>
        </section>
    );
}
