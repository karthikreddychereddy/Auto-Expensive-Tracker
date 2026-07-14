import { FaBell } from "react-icons/fa";
import { useExpenses } from "../../context/ExpenseContext";
import { useMemo } from "react";

export default function NotificationCenter() {

  const { expenses } = useExpenses();

  const notifications = useMemo(() => {

    const list = [];

    const today = new Date().toISOString().slice(0,10);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);

    const yesterdayDate =
      yesterday.toISOString().slice(0,10);

    const todayAmount = expenses
      .filter(e=>e.date===today)
      .reduce((s,e)=>s+Number(e.amount),0);

    const yesterdayAmount = expenses
      .filter(e=>e.date===yesterdayDate)
      .reduce((s,e)=>s+Number(e.amount),0);

    if(
      yesterdayAmount>0 &&
      todayAmount>yesterdayAmount
    ){

      const percent = (
        ((todayAmount-yesterdayAmount)/yesterdayAmount)
        *100
      ).toFixed(1);

      list.push(
        `⚠️ Today's spending is ${percent}% higher than yesterday.`
      );

    }

    const food = expenses
      .filter(e=>e.category==="Food")
      .reduce((s,e)=>s+Number(e.amount),0);

    if(food>5000){

      list.push(
        "🍔 Food spending crossed ₹5,000."
      );

    }

    const shopping = expenses
      .filter(e=>e.category==="Shopping")
      .reduce((s,e)=>s+Number(e.amount),0);

    if(shopping>3000){

      list.push(
        "🛍️ Shopping expenses are increasing."
      );

    }

    const todayTransactions =
      expenses.filter(
        e=>e.date===today
      ).length;

    if(todayTransactions>=5){

      list.push(
        "📈 You made many transactions today."
      );

    }

    if(list.length===0){

      list.push(
        "🎉 Everything looks great today."
      );

    }

    return list;

  },[expenses]);

  return (

    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex items-center gap-3 mb-5">

        <FaBell
          className="text-yellow-500"
          size={24}
        />

        <h2 className="text-2xl font-bold">

          Smart Notifications

        </h2>

      </div>

      <div className="space-y-4">

        {notifications.map((item,index)=>(

          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4 border"
          >

            {item}

          </div>

        ))}

      </div>

    </div>

  );

}