import { FaShieldAlt, FaCalendarDay } from "react-icons/fa";

export default function DashboardHeader({ user }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            <FaCalendarDay className="shrink-0" />
            <span className="truncate sm:whitespace-normal">{today}</span>
          </p>

          <h1 className="mt-2 break-words text-2xl font-bold leading-tight text-slate-800 dark:text-white sm:text-3xl lg:text-4xl">
            Welcome back,{" "}
            <span className="text-[#0B6B57] dark:text-emerald-400">
              {user?.name || "User"}
            </span>{" "}
            👋
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:mt-3 sm:text-base lg:text-lg">
            Here's your financial overview.
          </p>
        </div>

        <div className="w-full lg:w-auto">
          <div className="flex w-full items-center gap-3 rounded-2xl bg-green-50 px-4 py-3 text-green-700 transition-colors duration-300 dark:bg-green-900/20 dark:text-green-300 sm:px-5 lg:w-auto">
            <FaShieldAlt className="shrink-0 text-lg sm:text-xl" />
            <div className="min-w-0">
              <p className="font-semibold">Financial Health</p>
              <p className="text-xs sm:text-sm">Good • Keep Saving 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
