import {

    FaLightbulb,

    FaCheckCircle,

} from "react-icons/fa";

import { useCategory } from "../../context/CategoryContext";

export default function CategoryInsights() {

    const {

        totalCategories,

        incomeCategories,

        expenseCategories,

    } = useCategory();

    return (

        <div className="bg-gradient-to-r from-[#0B6B57] to-[#0D8A6A] rounded-3xl text-white shadow-lg p-6">

            <div className="flex items-center gap-3">

                <FaLightbulb size={28} />

                <h2 className="text-2xl font-bold">

                    Category Insights

                </h2>

            </div>

            <div className="mt-6 space-y-4">

                <div className="flex gap-3">

                    <FaCheckCircle />

                    <p>

                        Total Categories :

                        <b> {totalCategories}</b>

                    </p>

                </div>

                <div className="flex gap-3">

                    <FaCheckCircle />

                    <p>

                        Expense Categories :

                        <b> {expenseCategories}</b>

                    </p>

                </div>

                <div className="flex gap-3">

                    <FaCheckCircle />

                    <p>

                        Income Categories :

                        <b> {incomeCategories}</b>

                    </p>

                </div>

            </div>

        </div>

    );

}