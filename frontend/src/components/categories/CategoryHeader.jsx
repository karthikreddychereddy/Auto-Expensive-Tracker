import { FaPlus } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

export default function CategoryHeader() {

    const { openModal } = useModal();

    return (

        <div className="flex justify-between items-center">

            <div>

                <h1 className="text-5xl font-bold">

                    Categories

                </h1>

                <p className="text-gray-500 mt-2">

                    Manage your income and expense categories.

                </p>

            </div>

            <button

                onClick={() => openModal("category")}

                className="bg-[#0B6B57] hover:bg-[#095746] text-white px-6 py-4 rounded-2xl flex items-center gap-3 transition"

            >

                <FaPlus />

                Add Category

            </button>

        </div>

    );

}