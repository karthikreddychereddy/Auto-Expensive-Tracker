import { FaBullseye } from "react-icons/fa";

import { useMemo } from "react";

import { useExpenses } from "../../context/ExpenseContext";

import { formatCurrency } from "../../utils/format";

export default function BudgetHealthCard() {

    const { expenses } = useExpenses();

    // Temporary monthly budget
    const monthlyBudget = 50000;

    const spent = useMemo(() => {

        return expenses

            .filter(item => item.transactionType !== "Income")

            .reduce(

                (sum, item) =>

                    sum + Number(item.amount),

                0

            );

    }, [expenses]);

    const remaining = Math.max(

        monthlyBudget - spent,

        0

    );

    const percentage = Math.min(

        (spent / monthlyBudget) * 100,

        100

    );

    let status = "Excellent";

    let color = "bg-green-500";

    let advice = "You're spending responsibly.";

    if (percentage >= 90) {

        status = "Critical";

        color = "bg-red-500";

        advice = "Budget almost exhausted.";

    }

    else if (percentage >= 70) {

        status = "Warning";

        color = "bg-yellow-500";

        advice = "Control your spending.";

    }

    return (

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                    <FaBullseye className="text-blue-600"/>

                </div>

                <div>

                    <h2 className="text-xl font-bold">

                        Budget Health

                    </h2>

                    <p className="text-gray-500 text-sm">

                        Live Monthly Budget

                    </p>

                </div>

            </div>

            <div className="flex justify-between mb-2">

                <span className="font-medium">

                    {percentage.toFixed(1)}%

                </span>

                <span className="text-gray-500">

                    {formatCurrency(spent)}

                    {" / "}

                    {formatCurrency(monthlyBudget)}

                </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div

                    className={`${color} h-4 rounded-full transition-all duration-700`}

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div>

                    <p className="text-sm text-gray-500">

                        Budget

                    </p>

                    <h3 className="font-bold">

                        {formatCurrency(monthlyBudget)}

                    </h3>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Spent

                    </p>

                    <h3 className="font-bold text-red-500">

                        {formatCurrency(spent)}

                    </h3>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Remaining

                    </p>

                    <h3 className="font-bold text-green-600">

                        {formatCurrency(remaining)}

                    </h3>

                </div>

            </div>

            <div className="mt-8 flex justify-between items-center">

                <span className={`${color} text-white px-4 py-2 rounded-full text-sm`}>

                    {status}

                </span>

                <p className="text-gray-500 text-sm">

                    {advice}

                </p>

            </div>

        </div>

    );

}