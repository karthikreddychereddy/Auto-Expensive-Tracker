import { FaBullseye, FaCheckCircle, FaChartLine, FaCoins } from "react-icons/fa";
import { useGoal } from "../../context/GoalContext";
import { formatCurrency } from "../../utils/format";

export default function GoalsOverview() {

  const {
    totalGoals,
    activeGoals,
    completedGoals,
    overallProgress,
    goals,
  } = useGoal();

  const targetAmount = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const cards = [
    {
      title: "Total Goals",
      value: totalGoals,
      icon: <FaBullseye />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Goals",
      value: activeGoals,
      icon: <FaChartLine />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Completed",
      value: completedGoals,
      icon: <FaCheckCircle />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Target Amount",
      value: formatCurrency(targetAmount),
      icon: <FaCoins />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Goals Overview
        </h2>

        <span className="text-[#0B6B57] font-semibold">
          {overallProgress.toFixed(1)}% Completed
        </span>

      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-[#0B6B57] transition-all duration-700"
          style={{
            width: `${overallProgress}%`,
          }}
        />

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition"
          >

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${card.color}`}>

              {card.icon}

            </div>

            <p className="text-gray-500 mt-5">

              {card.title}

            </p>

            <h2 className="text-2xl font-bold mt-2">

              {card.value}

            </h2>

          </div>

        ))}

      </div>

    </div>
  );

}