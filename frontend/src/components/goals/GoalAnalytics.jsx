import {
    FaBullseye,
    FaCheckCircle,
    FaClock,
    FaChartLine,
} from "react-icons/fa";

import { useGoal } from "../../context/GoalContext";

export default function GoalAnalytics() {

    const {

        totalGoals,

        activeGoals,

        completedGoals,

        overallProgress,

    } = useGoal();

    const analytics = [

        {

            title: "Total Goals",

            value: totalGoals,

            icon: <FaBullseye />,

            color: "bg-blue-100 text-blue-600",

        },

        {

            title: "Active Goals",

            value: activeGoals,

            icon: <FaClock />,

            color: "bg-yellow-100 text-yellow-600",

        },

        {

            title: "Completed",

            value: completedGoals,

            icon: <FaCheckCircle />,

            color: "bg-green-100 text-green-600",

        },

        {

            title: "Average Progress",

            value: `${Number(overallProgress || 0).toFixed(1)}%`,

            icon: <FaChartLine />,

            color: "bg-purple-100 text-purple-600",

        },

    ];

    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Goal Analytics

            </h2>

            <div className="grid md:grid-cols-4 gap-5">

                {analytics.map(item=>(

                    <div

                        key={item.title}

                        className="border rounded-2xl p-5"

                    >

                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>

                            {item.icon}

                        </div>

                        <h3 className="text-3xl font-bold mt-5">

                            {item.value}

                        </h3>

                        <p className="text-gray-500 mt-2">

                            {item.title}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}