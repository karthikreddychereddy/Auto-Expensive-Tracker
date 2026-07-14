import { useGoal } from "../../context/GoalContext";

export default function GoalHistory() {

    const { goals } = useGoal();

    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            <h2 className="text-2xl font-bold mb-6">

                Goal History

            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">Goal</th>

                            <th>Saved</th>

                            <th>Target</th>

                            <th>Deadline</th>

                            <th>Status</th>

                            <th>Priority</th>

                        </tr>

                    </thead>

                    <tbody>

                        {goals.map(item=>(

                            <tr

                                key={item.id}

                                className="border-b hover:bg-gray-50"

                            >

                                <td className="py-4 font-medium">

                                    {item.title}

                                </td>

                                <td className="text-center">

                                    ₹{item.savedAmount.toLocaleString()}

                                </td>

                                <td className="text-center">

                                    ₹{item.targetAmount.toLocaleString()}

                                </td>

                                <td className="text-center">

                                    {item.deadline}

                                </td>

                                <td className="text-center">

                                    {item.status}

                                </td>

                                <td className="text-center">

                                    {item.priority}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}