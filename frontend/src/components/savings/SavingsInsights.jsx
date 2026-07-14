import {
  FaLightbulb,
  FaArrowTrendUp,
} from "react-icons/fa6";

import { useSavings } from "../../context/SavingsContext";

export default function SavingsInsights() {

  const {
    savings,
    totalSavings,
  } = useSavings();


  const highestSaving = savings.length
    ? Math.max(
        ...savings.map(
          (item) => Number(item.amount)
        )
      )
    : 0;


  const sourceCount = savings.reduce(
    (acc, item) => {

      const source = item.source || "Other";

      acc[source] =
        (acc[source] || 0) + 1;

      return acc;

    },
    {}
  );


  const topSource = Object.keys(sourceCount).length
    ? Object.keys(sourceCount).reduce(
        (a, b) =>
          sourceCount[a] > sourceCount[b]
            ? a
            : b
      )
    : "No data";


  return (

    <div className="bg-gradient-to-r from-[#0B6B57] to-[#0D8A6A] rounded-3xl shadow-lg p-6 text-white">


      <div className="flex items-center gap-3">

        <FaLightbulb size={28}/>

        <h2 className="text-2xl font-bold">

          Savings Insights

        </h2>

      </div>


      <div className="mt-6 space-y-5">


        <div className="flex gap-3">

          <FaArrowTrendUp className="mt-1"/>

          <p>

            Total savings recorded:

            <b>
              {" "}₹{totalSavings.toLocaleString()}
            </b>

          </p>

        </div>


        <div className="flex gap-3">

          <FaArrowTrendUp className="mt-1"/>

          <p>

            You have made

            <b>
              {" "}{savings.length}
            </b>

            savings transactions.

          </p>

        </div>


        <div className="flex gap-3">

          <FaArrowTrendUp className="mt-1"/>

          <p>

            Highest single saving:

            <b>
              {" "}₹{highestSaving.toLocaleString()}
            </b>

          </p>

        </div>


        <div className="flex gap-3">

          <FaArrowTrendUp className="mt-1"/>

          <p>

            Most frequent saving source:

            <b>
              {" "}{topSource}
            </b>

          </p>

        </div>


      </div>


    </div>

  );

}