import {
    FaLightbulb,
    FaCheckCircle,
} from "react-icons/fa";


import { useCategory } from "../../context/CategoryContext";


export default function CategoryInsights() {


    const {

        categories,

        totalCategories,

    } = useCategory();



    const withIcons = categories.filter(

        item => item.icon

    ).length;



    const withDescription = categories.filter(

        item => item.description

    ).length;



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

                        Categories with icons :

                        <b> {withIcons}</b>

                    </p>

                </div>




                <div className="flex gap-3">

                    <FaCheckCircle />

                    <p>

                        Categories with descriptions :

                        <b> {withDescription}</b>

                    </p>

                </div>



            </div>


        </div>


    );

}