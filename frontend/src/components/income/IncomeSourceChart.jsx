import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useMemo } from "react";
import { useIncome } from "../../context/IncomeContext";

const COLORS = [

  "#0B6B57",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
  "#F97316",

];

export default function IncomeSourceChart() {

  const { income } = useIncome();

  const chartData = useMemo(()=>{

    const grouped = {};

    income.forEach(item=>{

      grouped[item.source] =

        (grouped[item.source] || 0)

        + Number(item.amount);

    });

    return Object.entries(grouped).map(([name,value])=>({

      name,

      value,

    }));

  },[income]);

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Income Sources

        </h2>

        <p className="text-gray-500 mt-1">

          Distribution of income by source.

        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie

              data={chartData}

              dataKey="value"

              nameKey="name"

              outerRadius={120}

              label

            >

              {chartData.map((entry,index)=>(

                <Cell

                  key={index}

                  fill={COLORS[index % COLORS.length]}

                />

              ))}

            </Pie>

            <Tooltip/>

            <Legend/>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}