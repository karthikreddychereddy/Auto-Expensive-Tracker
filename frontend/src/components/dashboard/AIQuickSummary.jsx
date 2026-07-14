import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

export default function AIQuickSummary() {

    const navigate = useNavigate();

    return (

        <div className="bg-gradient-to-r from-[#0B6B57] to-[#12856c] rounded-3xl shadow-lg p-6 text-white">

            <div className="flex items-center gap-3">

                <FaRobot size={30} />

                <div>

                    <h2 className="text-2xl font-bold">

                        AI Quick Summary

                    </h2>

                    <p className="text-green-100">

                        Your personal finance assistant

                    </p>

                </div>

            </div>

            <div className="mt-8 space-y-4">

                <div>

                    📌 You have spent

                    <span className="font-bold">

                        {" "}65%

                    </span>

                    {" "}of your monthly food budget.

                </div>

                <div>

                    ⚠ Spending increased

                    <span className="font-bold">

                        {" "}12%

                    </span>

                    {" "}compared to last month.

                </div>

                <div>

                    💡 Save approximately

                    <span className="font-bold">

                        {" "}₹1,500

                    </span>

                    {" "}this month by reducing dining expenses.

                </div>

            </div>

            <button

                onClick={() => navigate("/ai-advisor")}

                className="mt-8 bg-white text-[#0B6B57] font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition"

            >

                Open AI Advisor →

            </button>

        </div>

    );

}