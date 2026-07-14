import {
  FaShieldAlt,
  FaCalendarDay,
} from "react-icons/fa";

export default function DashboardHeader({ user }) {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 transition-colors duration-300">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">

        {/* Left */}

        <div>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 flex items-center gap-2">

            <FaCalendarDay />

            {today}

          </p>

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white leading-tight">

            Welcome back,

            <span className="text-[#0B6B57]">

              {" "}

              {user?.name || "Karthik"}

            </span>

            👋

          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">

            Here's your financial overview for today.

          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-4">

          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-5 py-3 rounded-2xl transition-colors duration-300">

            <FaShieldAlt className="text-xl" />

            <div>

              <p className="font-semibold">

                Financial Health

              </p>

              <p className="text-sm">

                Good • Keep Saving 🚀

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}