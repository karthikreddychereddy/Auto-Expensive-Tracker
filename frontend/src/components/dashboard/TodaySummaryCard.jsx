import { useMemo } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { formatCurrency } from "../../utils/format";

export default function TodaySummaryCard() {

    const { expenses } = useExpenses();

    const today = new Date().toISOString().slice(0,10);

    const todayExpenses = useMemo(() => {

        return expenses.filter(expense =>

            expense.date === today &&
            expense.transactionType !== "Income"

        );

    },[expenses]);

    const totalSpent = todayExpenses.reduce(

        (sum,item)=>sum+Number(item.amount),

        0

    );

    const largestExpense =

        todayExpenses.length===0

        ?0

        :Math.max(...todayExpenses.map(item=>Number(item.amount)));

    const averageExpense =

        todayExpenses.length===0

        ?0

        :totalSpent/todayExpenses.length;

    return(

        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-xl font-bold">

                Today's Spending

            </h2>

            <h1 className="text-4xl font-bold text-red-500 mt-4">

                {formatCurrency(totalSpent)}

            </h1>

            <div className="grid grid-cols-3 gap-5 mt-8">

                <div>

                    <p className="text-gray-500 text-sm">

                        Transactions

                    </p>

                    <h3 className="font-bold text-xl">

                        {todayExpenses.length}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">

                        Largest

                    </p>

                    <h3 className="font-bold text-xl">

                        {formatCurrency(largestExpense)}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500 text-sm">

                        Average

                    </p>

                    <h3 className="font-bold text-xl">

                        {formatCurrency(averageExpense)}

                    </h3>

                </div>

            </div>

        </div>

    );

}