import { FaPiggyBank } from "react-icons/fa";
import { useSavings } from "../../context/SavingsContext";
import { formatCurrency } from "../../utils/format";

export default function SavingsProgressCard() {
    const { totalSavings, totalTarget, overallProgress } = useSavings();
    const safeProgress = Math.min(Math.max(Number(overallProgress) || 0, 0), 100);

    return (
        <section className="h-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Savings Progress</p>
            <h2 className="mt-2 break-words text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
                {formatCurrency(totalSavings)}
            </h2>
            <p className="mt-2 break-words text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                of {formatCurrency(totalTarget)}
            </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950/40 sm:h-16 sm:w-16 sm:rounded-2xl">
            <FaPiggyBank className="text-xl text-green-600 dark:text-green-400 sm:text-3xl" />
            </div>
        </div>

        <div className="mt-6 sm:mt-8">
            <div className="mb-2 flex justify-between gap-4 text-sm text-slate-700 dark:text-slate-200">
            <span>Progress</span>
            <span>{safeProgress.toFixed(1)}%</span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700 sm:h-4">
            <div
                className="h-full rounded-full bg-[#0B6B57] transition-all duration-700 dark:bg-emerald-500"
                style={{ width: `${safeProgress}%` }}
            />
            </div>
        </div>
        </section>
    );
}
