import { FaSyncAlt } from "react-icons/fa";
import { formatCurrency } from "../../utils/format";
import { useIncome } from "../../context/IncomeContext";
import { useMemo } from "react";

export default function RecurringIncome() {

  const { income } = useIncome();

  const recurring = useMemo(() => {

    const grouped = {};

    income.forEach((item) => {

      const key = item.source || "Other";

      if (!grouped[key]) {

        grouped[key] = {
          source: key,
          amount: Number(item.amount),
          count: 1,
        };

      } else {

        grouped[key].count++;
        grouped[key].amount += Number(item.amount);

      }

    });

    return Object.values(grouped)
      .filter(item => item.count > 1);

  }, [income]);


  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

      <div className="flex items-center gap-3 mb-6">

        <FaSyncAlt className="text-[#0B6B57]" />

        <h2 className="text-2xl font-bold">
          Recurring Income
        </h2>

      </div>


      <div className="space-y-4">

        {
          recurring.length === 0 ?

          (
            <p className="text-gray-500">
              No recurring income detected yet.
            </p>
          )

          :

          recurring.map(item => (

            <div
              key={item.source}
              className="flex justify-between items-center bg-gray-50 rounded-2xl p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {item.source}
                </h3>

                <p className="text-gray-500 text-sm">
                  Received {item.count} times
                </p>

              </div>


              <h3 className="text-green-600 font-bold text-lg">
                {formatCurrency(item.amount)}
              </h3>


            </div>

          ))

        }

      </div>

    </div>
  );
}