import {
    FaLayerGroup,
    FaArrowDown,
    FaArrowUp,
} from "react-icons/fa";

import { useCategory } from "../../context/CategoryContext";

export default function CategorySummaryCards() {

    const {

        totalCategories,

        incomeCategories,

        expenseCategories,

    } = useCategory();

    const cards = [

        {
            title: "Total Categories",
            value: totalCategories,
            icon: <FaLayerGroup />,
            color: "bg-blue-500",
            bg: "bg-blue-50",
        },

        {
            title: "Expense Categories",
            value: expenseCategories,
            icon: <FaArrowDown />,
            color: "bg-red-500",
            bg: "bg-red-50",
        },

        {
            title: "Income Categories",
            value: incomeCategories,
            icon: <FaArrowUp />,
            color: "bg-green-500",
            bg: "bg-green-50",
        },

    ];

    return (

        <div className="grid md:grid-cols-3 gap-6">

            {cards.map(card=>(

                <div

                    key={card.title}

                    className={`${card.bg} rounded-3xl p-6 border`}

                >

                    <div className="flex justify-between">

                        <div>

                            <p className="text-gray-500">

                                {card.title}

                            </p>

                            <h2 className="text-4xl font-bold mt-3">

                                {card.value}

                            </h2>

                        </div>

                        <div className={`${card.color} w-14 h-14 rounded-2xl text-white flex items-center justify-center`}>

                            {card.icon}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}