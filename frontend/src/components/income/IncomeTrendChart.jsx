import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { useMemo } from "react";
import { useIncome } from "../../context/IncomeContext";

export default function IncomeTrendChart() {

  const { income } = useIncome();


  const chartData = useMemo(() => {

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];


    const monthlyIncome = Array(12).fill(0);



    income.forEach((item) => {


      if (!item.incomeDate) return;


      const date = new Date(item.incomeDate);


      if (isNaN(date.getTime())) return;


      const month = date.getMonth();


      monthlyIncome[month] += Number(item.amount) || 0;


    });



    return months.map((month, index) => ({

      month,

      income: monthlyIncome[index],

    }));


  }, [income]);



  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">


      <div className="mb-6">


        <h2 className="text-2xl font-bold text-slate-800">

          Monthly Income Trend

        </h2>


        <p className="text-gray-500 mt-1">

          Income earned throughout the year.

        </p>


      </div>



      <div className="h-[350px]">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <LineChart data={chartData}>


            <CartesianGrid strokeDasharray="4 4" />


            <XAxis 
              dataKey="month"
            />


            <YAxis />


            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString()}`
              }
            />


            <Line

              type="monotone"

              dataKey="income"

              stroke="#0B6B57"

              strokeWidth={4}

              dot={{
                r: 6
              }}

              activeDot={{
                r: 8
              }}

            />


          </LineChart>


        </ResponsiveContainer>


      </div>


    </div>

  );

}