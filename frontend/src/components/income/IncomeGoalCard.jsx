import { FaBullseye } from "react-icons/fa";
import { useMemo, useState } from "react";
import { useIncome } from "../../context/IncomeContext";
import { formatCurrency } from "../../utils/format";

export default function IncomeGoalCard() {

  const { income } = useIncome();


  const [target, setTarget] = useState(() => {

    const saved = localStorage.getItem(
      "income_goal"
    );

    return saved ? Number(saved) : 0;

  });



  const [inputTarget, setInputTarget] = useState(
    target
  );



  const saveTarget = () => {

    const value = Number(inputTarget);

    setTarget(value);

    localStorage.setItem(
      "income_goal",
      value
    );

  };



  const achieved = useMemo(() => {


    const now = new Date();


    return income

      .filter(item => {


        const date =
          new Date(item.incomeDate);



        return (

          date.getMonth() === now.getMonth()

          &&

          date.getFullYear() === now.getFullYear()

        );


      })


      .reduce(

        (sum,item)=>

          sum + Number(item.amount || 0),

        0

      );


  },[income]);





  const percentage =

    target === 0

      ? 0

      :

      Math.min(

        (achieved / target) * 100,

        100

      );





  const remaining =

    Math.max(

      target - achieved,

      0

    );




  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">


      <div className="flex items-center gap-3 mb-6">


        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">


          <FaBullseye className="text-blue-600"/>


        </div>



        <div>


          <h2 className="text-2xl font-bold">

            Monthly Income Goal

          </h2>


          <p className="text-gray-500">

            Stay on track with your target.

          </p>


        </div>


      </div>





      <div className="flex gap-3 mb-6">


        <input

          type="number"

          value={inputTarget}

          onChange={(e)=>
            setInputTarget(e.target.value)
          }

          placeholder="Set monthly target"

          className="border rounded-xl px-4 py-2 w-full"

        />



        <button

          onClick={saveTarget}

          className="bg-[#0B6B57] text-white px-5 rounded-xl"

        >

          Save

        </button>


      </div>





      <div className="space-y-4">


        <div className="flex justify-between">

          <span className="text-gray-500">

            Target

          </span>


          <span className="font-semibold">

            {formatCurrency(target)}

          </span>


        </div>



        <div className="flex justify-between">

          <span className="text-gray-500">

            Achieved

          </span>


          <span className="font-semibold text-green-600">

            {formatCurrency(achieved)}

          </span>


        </div>




        <div className="w-full bg-gray-200 rounded-full h-4">


          <div

            className="bg-[#0B6B57] h-4 rounded-full transition-all"

            style={{

              width:`${percentage}%`

            }}

          />


        </div>




        <div className="flex justify-between text-sm">


          <span>

            {percentage.toFixed(0)}% Completed

          </span>


          <span className="text-red-500">

            Remaining {formatCurrency(remaining)}

          </span>


        </div>


      </div>


    </div>

  );

}