import {

    FaLightbulb,

    FaBullseye,

    FaCalendarAlt,

    FaCheckCircle,

} from "react-icons/fa";

import { useGoal } from "../../context/GoalContext";

export default function GoalInsights() {

    const { goals } = useGoal();

    const active = goals.filter(

        item => item.status === "Active"

    );

    const completed = goals.filter(

        item => item.status === "Completed"

    );

    const nearestGoal = [...active]
        .filter(item => item.deadline)
        .sort(
            (a,b)=>
                new Date(a.deadline) -
                new Date(b.deadline)
        )[0];

    return (

        <div className="bg-gradient-to-r from-[#0B6B57] to-[#0D8A6A] rounded-3xl shadow-lg p-6 text-white">

            <div className="flex gap-3 items-center">

                <FaLightbulb size={26}/>

                <h2 className="text-2xl font-bold">

                    Goal Insights

                </h2>

            </div>

            <div className="mt-6 space-y-5">

                <div className="flex gap-3">

                    <FaBullseye className="mt-1"/>

                    <p>

                        Active Goals :

                        <b>

                            {" "}

                            {active.length}

                        </b>

                    </p>

                </div>

                <div className="flex gap-3">

                    <FaCheckCircle className="mt-1"/>

                    <p>

                        Completed Goals :

                        <b>

                            {" "}

                            {completed.length}

                        </b>

                    </p>

                </div>

                {nearestGoal && (

                    <div className="flex gap-3">

                        <FaCalendarAlt className="mt-1"/>

                        <p>

                            Nearest Deadline :

                            <b>

                                {" "}

                                {nearestGoal.title}

                            </b>

                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}