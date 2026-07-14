import { FaSearch } from "react-icons/fa";

import { useCategory } from "../../context/CategoryContext";


export default function CategoryToolbar() {


    const {

        search,

        setSearch,

    } = useCategory();



    return (

        <div className="bg-white rounded-3xl p-5 border">


            <div className="grid lg:grid-cols-1 gap-5">


                <div className="relative">


                    <FaSearch

                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"

                    />



                    <input


                        value={search}


                        onChange={(e) =>
                            setSearch(e.target.value)
                        }


                        placeholder="Search categories..."


                        className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#0B6B57]"


                    />


                </div>


            </div>


        </div>

    );

}