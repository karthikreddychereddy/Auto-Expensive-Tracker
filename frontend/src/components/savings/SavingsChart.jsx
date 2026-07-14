import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { useSavings } from "../../context/SavingsContext";

export default function SavingsChart() {

  const { filteredSavings } = useSavings();


  const sourceMap = filteredSavings.reduce((acc, item) => {

    const source = item.source || "Other";

    acc[source] =
      (acc[source] || 0) +
      Number(item.amount);

    return acc;

  }, {});


  const chartData = Object.entries(sourceMap).map(
    ([source, amount]) => ({
      source,
      Amount: amount,
    })
  );


  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">

          Savings Overview

        </h2>

        <p className="text-gray-500 mt-1">

          Analyze savings based on sources.

        </p>

      </div>


      <div className="h-[380px]">

        {chartData.length === 0 ? (

          <div className="h-full flex items-center justify-center text-gray-500">

            No savings data available.

          </div>

        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="source" />

              <YAxis />

              <Tooltip />

              <Legend />


              <Bar

                dataKey="Amount"

                fill="#0B6B57"

                radius={[8, 8, 0, 0]}

              />

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>

  );

}