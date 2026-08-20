import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

export default function AIQuickSummary() {
    const navigate = useNavigate();

    return (
        <section className="h-full rounded-2xl bg-gradient-to-r from-[#0B6B57] to-[#12856c] p-4 text-white shadow-lg sm:rounded-3xl sm:p-6">
        <div className="flex items-start gap-3">
            <FaRobot className="mt-1 shrink-0 text-2xl sm:text-3xl" />
            <div className="min-w-0">
            <h2 className="text-xl font-bold sm:text-2xl">AI Quick Summary</h2>
            <p className="text-sm text-green-100 sm:text-base">
                Your personal finance assistant
            </p>
            </div>
        </div>

        <div className="mt-6 space-y-3 text-sm leading-relaxed text-green-50 sm:mt-8 sm:space-y-4 sm:text-base">
            <p>
            Open AI Advisor for personalized insights based on your available
            financial data.
            </p>
            <p>
            Ask about spending, budgets, savings, goals, or ways to improve your
            monthly financial plan.
            </p>
        </div>

        <button
            type="button"
            onClick={() => navigate("/ai-advisor")}
            className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-semibold text-[#0B6B57] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/70 sm:mt-8 sm:w-auto"
        >
            Open AI Advisor →
        </button>
        </section>
    );
}
