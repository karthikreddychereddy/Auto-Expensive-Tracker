import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

import { useMemo } from "react";
import { useIncome } from "../../context/IncomeContext";
import { formatCurrency } from "../../utils/format";


export default function IncomeSummaryCards() {


  const { income = [], totalIncome } = useIncome();


  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();



  const thisMonthIncome = useMemo(() => {


    return income

      .filter((item) => {


        const date = new Date(
          item.incomeDate
        );


        return (

          date.getMonth() === currentMonth &&

          date.getFullYear() === currentYear

        );


      })


      .reduce(

        (sum, item) =>

          sum + Number(item.amount || 0),

        0

      );


  }, [income, currentMonth, currentYear]);





  const averageMonthly = useMemo(() => {


    if (income.length === 0)

      return 0;



    const months = new Set(

      income

        .filter(item => item.incomeDate)

        .map(
          (item) =>
            item.incomeDate.slice(0, 7)
        )

    );



    return months.size > 0

      ? totalIncome / months.size

      : 0;



  }, [income, totalIncome]);






  const highestIncome = useMemo(() => {


    if (income.length === 0) {


      return {

        source: "-",

        amount: 0,

      };


    }



    return income.reduce(

      (highest, item) =>


        Number(item.amount || 0)

        >

        Number(highest.amount || 0)


          ? item

          : highest,


      income[0]

    );


  }, [income]);







  const cards = [


    {

      title: "Total Income",

      value: totalIncome || 0,

      subtitle: "Lifetime Earnings",

      color: "bg-green-500",

      bg: "bg-green-50",

      icon: <FaWallet />,

    },



    {

      title: "This Month",

      value: thisMonthIncome,

      subtitle: "Current Month",

      color: "bg-blue-500",

      bg: "bg-blue-50",

      icon: <FaCalendarAlt />,

    },



    {

      title: "Average Monthly",

      value: averageMonthly,

      subtitle: "Average Earnings",

      color: "bg-purple-500",

      bg: "bg-purple-50",

      icon: <FaChartLine />,

    },



    {

      title: "Highest Source",

      value: highestIncome.amount || 0,

      subtitle: highestIncome.source || "-",

      color: "bg-orange-500",

      bg: "bg-orange-50",

      icon: <FaMoneyBillWave />,

    },


  ];







  return (


    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">


      {cards.map((card) => (


        <div

          key={card.title}

          className={`${card.bg} rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition duration-300`}

        >



          <div className="flex justify-between">


            <div>


              <p className="text-sm text-gray-500">

                {card.title}

              </p>



              <h2 className="text-3xl font-bold text-slate-800 mt-3">

                {formatCurrency(card.value)}

              </h2>



              <p className="text-sm text-gray-500 mt-3">

                {card.subtitle}

              </p>


            </div>



            <div

              className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl`}

            >

              {card.icon}

            </div>



          </div>



        </div>



      ))}



    </div>


  );


}