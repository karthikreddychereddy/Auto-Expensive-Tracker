import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";

export default function DailyComparison() {

  const { expenses } = useExpenses();

  const {
    todayAmount,
    yesterdayAmount,
    difference,
    percentage,
    higher,
  } = useMemo(() => {

    const today = new Date();

    const todayString = today.toISOString().slice(0,10);

    const yesterday = new Date();

    yesterday.setDate(today.getDate()-1);

    const yesterdayString = yesterday.toISOString().slice(0,10);

    const todayTotal = expenses

      .filter(e => e.date === todayString)

      .reduce((sum,e)=>sum+Number(e.amount),0);

    const yesterdayTotal = expenses

      .filter(e => e.date===yesterdayString)

      .reduce((sum,e)=>sum+Number(e.amount),0);

    const diff = todayTotal-yesterdayTotal;

    const percent =

      yesterdayTotal===0

      ?100

      :Math.abs((diff/yesterdayTotal)*100);

    return{

      todayAmount:todayTotal,

      yesterdayAmount:yesterdayTotal,

      difference:diff,

      percentage:percent,

      higher:diff>0,

    };

  },[expenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">

        Today's Analysis

      </h2>

      <div className="grid grid-cols-3 gap-4">

        <div>

          <p className="text-gray-500">

            Yesterday

          </p>

          <h3 className="text-2xl font-bold">

            ₹{yesterdayAmount.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Today

          </p>

          <h3 className="text-2xl font-bold">

            ₹{todayAmount.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Difference

          </p>

          <h3 className={`text-2xl font-bold ${higher?"text-red-600":"text-green-600"}`}>

            {difference>=0?"+":"-"}

            ₹{Math.abs(difference).toLocaleString()}

          </h3>

        </div>

      </div>

    </div>

  );

}