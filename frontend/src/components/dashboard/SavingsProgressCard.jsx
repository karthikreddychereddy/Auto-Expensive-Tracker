import { FaPiggyBank } from "react-icons/fa";
import { useSavings } from "../../context/SavingsContext";
import { formatCurrency } from "../../utils/format";

export default function SavingsProgressCard() {

    const {

        totalSavings,

        totalTarget,

        overallProgress,

    } = useSavings();

    return (

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        Savings Progress

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {formatCurrency(totalSavings)}

                    </h2>

                    <p className="text-gray-500 mt-2">

                        of {formatCurrency(totalTarget)}

                    </p>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                    <FaPiggyBank

                        size={28}

                        className="text-green-600"

                    />

                </div>

            </div>

            <div className="mt-8">

                <div className="flex justify-between text-sm mb-2">

                    <span>Progress</span>

                    <span>

                        {overallProgress.toFixed(1)}%

                    </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200">

                    <div

                        className="h-full rounded-full bg-[#0B6B57]"

                        style={{

                            width: `${overallProgress}%`

                        }}

                    />

                </div>

            </div>

        </div>

    );

}