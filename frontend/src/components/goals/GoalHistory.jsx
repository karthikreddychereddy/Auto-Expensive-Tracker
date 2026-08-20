import { useGoal } from "../../context/GoalContext";

export default function GoalHistory() {
  const { goals } = useGoal();

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Goal History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="py-3 text-left">
                Goal
              </th>

              <th className="text-center">
                Saved
              </th>

              <th className="text-center">
                Target
              </th>

              <th className="text-center">
                Deadline
              </th>

              <th className="text-center">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {goals.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No goals found.
                </td>
              </tr>
            ) : (
              goals.map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition hover:bg-gray-50"
                >

                  <td className="py-4 font-medium">
                    {item.title}
                  </td>

                  <td className="text-center">
                    ₹
                    {Number(
                      item.savedAmount || 0
                    ).toLocaleString()}
                  </td>

                  <td className="text-center">
                    ₹
                    {Number(
                      item.targetAmount || 0
                    ).toLocaleString()}
                  </td>

                  <td className="text-center">
                    {item.deadline || "-"}
                  </td>

                  <td className="text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}