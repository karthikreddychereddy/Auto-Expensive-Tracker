import {
    FaBullseye,
    FaCheckCircle,
    FaChartLine,
    FaTasks,
} from "react-icons/fa";

import { useGoal } from "../../context/GoalContext";

export default function GoalSummaryCards() {

    const {

        totalGoals,

        activeGoals,

        completedGoals,

        overallProgress,

    } = useGoal();

    const cards = [

        {
            title: "Total Goals",
            value: totalGoals,
            color: "bg-blue-500",
            bg: "bg-blue-50",
            icon: <FaTasks />,
        },

        {
            title: "Active",
            value: activeGoals,
            color: "bg-green-500",
            bg: "bg-green-50",
            icon: <FaBullseye />,
        },

        {
            title: "Completed",
            value: completedGoals,
            color: "bg-purple-500",
            bg: "bg-purple-50",
            icon: <FaCheckCircle />,
        },

        {
            title: "Progress",
            value: `${overallProgress.toFixed(0)}%`,
            color: "bg-orange-500",
            bg: "bg-orange-50",
            icon: <FaChartLine />,
        },

    ];

    return (

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

            {cards.map(card => (

                <div
                    key={card.title}
                    className={`${card.bg} rounded-3xl border border-gray-100 p-6`}
                >

                    <div className="flex justify-between">

                        <div>

                            <p className="text-gray-500">

                                {card.title}

                            </p>

                            <h2 className="text-3xl font-bold mt-3">

                                {card.value}

                            </h2>

                        </div>

                        <div
                            className={`${card.color} w-14 h-14 rounded-2xl flex justify-center items-center text-white`}
                        >

                            {card.icon}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}