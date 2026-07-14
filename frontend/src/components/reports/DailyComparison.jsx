import { useExpenses } from "../../context/ExpenseContext";

export default function DailyComparison() {

  const { expenses } = useExpenses();

  const today = new Date().toISOString().slice(0,10);

  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate()-1);

  const yesterdayDate =
    yesterday.toISOString().slice(0,10);
    

  const todayAmount = expenses
    .filter((expense) => {
        return expense.date?.slice(0, 10) === today;
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const yesterdayAmount = expenses
    .filter((expense) => {
        return expense.date?.slice(0, 10) === yesterdayDate;
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
  console.log("Today:", today);

  console.log("Yesterday:", yesterdayDate);

  console.log("Today's Amount:", todayAmount);

  console.log("Yesterday Amount:", yesterdayAmount);

  console.log(expenses);

  const difference =
    todayAmount-yesterdayAmount;

  const percentage =
    yesterdayAmount===0
      ?100
      :Math.abs(
          (difference/yesterdayAmount)*100
        ).toFixed(1);

  const higher = difference>0;

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

          <h3 className="text-2xl font-bold mt-2">

            ₹{yesterdayAmount.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Today

          </p>

          <h3 className="text-2xl font-bold mt-2">

            ₹{todayAmount.toLocaleString()}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Difference

          </p>

          <h3
            className={`text-2xl font-bold mt-2 ${
              higher
                ? "text-red-600"
                : "text-green-600"
            }`}
          >

            {difference>=0?"+":"-"}

            ₹{Math.abs(difference).toLocaleString()}

          </h3>

        </div>

      </div>

      <div className="mt-8">

        <div className="w-full h-3 bg-gray-200 rounded-full">

          <div

            className={`h-3 rounded-full ${
              higher
                ? "bg-red-500"
                : "bg-green-500"
            }`}

            style={{
              width:`${Math.min(
                percentage,
                100
              )}%`
            }}

          />

        </div>

        <p className="mt-4 font-semibold">

          {higher
            ? `📈 ${percentage}% Higher than yesterday`
            : `📉 ${percentage}% Lower than yesterday`}

        </p>

      </div>

    </div>

  );

}