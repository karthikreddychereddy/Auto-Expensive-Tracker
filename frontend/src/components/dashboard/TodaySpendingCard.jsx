import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { formatCurrency } from "../../utils/format";

export default function TodaySpendingCard({ today = 0, yesterday = 0 }) {

    const difference = today - yesterday;

    const increased = difference > 0;

    const percent =
        yesterday === 0
            ? 100
            : Math.abs((difference / yesterday) * 100).toFixed(1);

    return (

        <div className="bg-white rounded-3xl shadow-sm border p-6">

            <h2 className="text-xl font-bold text-slate-800">
                Today's Spending
            </h2>

            <p className="text-4xl font-bold mt-5 text-red-600">
                {formatCurrency(today)}
            </p>

            <div className="mt-6 flex items-center gap-3">

                {increased ? (

                    <FaArrowTrendUp className="text-red-500 text-xl"/>

                ) : (

                    <FaArrowTrendDown className="text-green-500 text-xl"/>

                )}

                <span
                    className={`font-semibold ${
                        increased
                            ? "text-red-600"
                            : "text-green-600"
                    }`}
                >
                    {percent}% {increased ? "higher" : "lower"}
                </span>

                <span className="text-gray-500">
                    than yesterday
                </span>

            </div>

        </div>

    );

}