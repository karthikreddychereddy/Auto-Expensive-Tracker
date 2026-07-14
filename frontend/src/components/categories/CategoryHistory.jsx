import { useCategory } from "../../context/CategoryContext";

export default function CategoryHistory() {

    const {
        filteredCategories
    } = useCategory();


    return (

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">


            <h2 className="text-2xl font-bold mb-6">

                Category History

            </h2>



            <div className="space-y-4">


                {filteredCategories.length === 0 ? (

                    <div className="text-center py-10 text-gray-500">

                        No categories found.

                    </div>

                ) : (


                    filteredCategories.map(item => (


                        <div

                            key={item.id}

                            className="flex justify-between items-center border rounded-2xl p-4"

                        >



                            <div className="flex gap-4 items-center">


                                <div

                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"

                                    style={{

                                        background: item.color,

                                    }}

                                >

                                    {item.icon}

                                </div>




                                <div>


                                    <h3 className="font-semibold">

                                        {item.name}

                                    </h3>



                                    <p className="text-gray-500 text-sm">

                                        {item.description || "No description"}

                                    </p>


                                </div>


                            </div>




                            <div

                                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"

                            >

                                Category

                            </div>



                        </div>


                    ))

                )}


            </div>


        </div>

    );

}