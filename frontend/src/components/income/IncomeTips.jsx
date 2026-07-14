import {
  FaLightbulb,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaWallet,
} from "react-icons/fa6";

import { useIncome } from "../../context/IncomeContext";
import { useMemo } from "react";

export default function IncomeTips() {

  const { income } = useIncome();

  const insights = useMemo(() => {

    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const previousMonth =
      currentMonth === 0 ? 11 : currentMonth - 1;

    const previousYear =
      currentMonth === 0
        ? currentYear - 1
        : currentYear;

    const currentIncome = income
      .filter((item) => {

        const d = new Date(item.incomeDate);

        return (
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );

      })
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const previousIncome = income
      .filter((item) => {

        const d = new Date(item.incomeDate);

        return (
          d.getMonth() === previousMonth &&
          d.getFullYear() === previousYear
        );

      })
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const growth =
      previousIncome === 0
        ? 0
        : (
            ((currentIncome - previousIncome) /
              previousIncome) *
            100
          ).toFixed(1);

    // Highest income source

    const sourceTotals = {};

    income.forEach((item) => {

      sourceTotals[item.source] =
        (sourceTotals[item.source] || 0) +
        Number(item.amount);

    });

    let highestSource = "-";
    let highestAmount = 0;

    Object.entries(sourceTotals).forEach(([source, amount]) => {

      if (amount > highestAmount) {

        highestAmount = amount;
        highestSource = source;

      }

    });

    return {

      currentIncome,
      growth,
      highestSource,
      highestAmount,

    };

  }, [income]);

  return (

    <div className="bg-gradient-to-r from-[#0B6B57] to-[#0D8A6A] rounded-3xl shadow-lg p-6 text-white">

      <div className="flex items-center gap-3">

        <FaLightbulb size={28} />

        <h2 className="text-2xl font-bold">

          AI Income Insights

        </h2>

      </div>

      <div className="mt-6 space-y-5">

        {/* Growth */}

        <div className="flex gap-3">

          {Number(insights.growth) >= 0 ? (

            <FaArrowTrendUp className="mt-1 text-green-200" />

          ) : (

            <FaArrowTrendDown className="mt-1 text-red-200" />

          )}

          <p>

            Monthly income changed by

            <b> {insights.growth}%</b>

            compared to last month.

          </p>

        </div>

        {/* Current Month */}

        <div className="flex gap-3">

          <FaWallet className="mt-1 text-yellow-200" />

          <p>

            This month's income:

            <b>

              {" "}
              ₹{insights.currentIncome.toLocaleString()}

            </b>

          </p>

        </div>

        {/* Highest Source */}

        <div className="flex gap-3">

          <FaArrowTrendUp className="mt-1 text-blue-200" />

          <p>

            Your highest earning source is

            <b> {insights.highestSource} </b>

            contributing

            <b>

              {" "}
              ₹{insights.highestAmount.toLocaleString()}

            </b>

            overall.

          </p>

        </div>

        {/* Recommendation */}

        <div className="flex gap-3">

          <FaLightbulb className="mt-1 text-yellow-200" />

          <p>

            Consider investing or saving at least

            <b> 20%</b>

            of every income you receive to improve long-term financial health.

          </p>

        </div>

      </div>

    </div>

  );

}