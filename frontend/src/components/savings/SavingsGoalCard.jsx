import {
  FaChartLine,
} from "react-icons/fa";

import { useSavings } from "../../context/SavingsContext";
import { formatCurrency } from "../../utils/format";

export default function SavingsGoalCard() {

  const {
    savings,
    totalSavings,
  } = useSavings();


  const averageSaving =
    savings.length > 0
      ? totalSavings / savings.length
      : 0;


  const highestSaving =
    savings.length > 0
      ? Math.max(
          ...savings.map(
            (item) => Number(item.amount)
          )
        )
      : 0;


  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">


      <div className="flex items-center gap-3 mb-6">


        <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

          <FaChartLine className="text-green-600"/>

        </div>


        <div>

          <h2 className="text-2xl font-bold">

            Savings Summary

          </h2>


          <p className="text-gray-500">

            Overview of your savings activity.

          </p>

        </div>


      </div>


      <div className="space-y-5">


        <div className="flex justify-between">

          <span className="text-gray-500">

            Total Saved

          </span>


          <span className="font-semibold text-green-600">

            {formatCurrency(totalSavings)}

          </span>

        </div>



        <div className="flex justify-between">

          <span className="text-gray-500">

            Transactions

          </span>


          <span className="font-semibold">

            {savings.length}

          </span>

        </div>



        <div className="flex justify-between">

          <span className="text-gray-500">

            Average Saving

          </span>


          <span className="font-semibold">

            {formatCurrency(averageSaving)}

          </span>

        </div>



        <div className="flex justify-between">

          <span className="text-gray-500">

            Highest Saving

          </span>


          <span className="font-semibold">

            {formatCurrency(highestSaving)}

          </span>

        </div>


      </div>


    </div>

  );

}