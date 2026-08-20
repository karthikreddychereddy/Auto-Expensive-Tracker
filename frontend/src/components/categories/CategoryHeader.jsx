import { FaPlus } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

export default function CategoryHeader() {

    const { openModal } = useModal();

    return (

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">

                    Categories

                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">

                    Manage your income and expense categories.

                </p>

            </div>

            <button

                onClick={() => openModal("category")}

                className="bg-[#0B6B57] hover:bg-[#095746] text-white w-full justify-center px-5 py-3 rounded-xl flex items-center gap-3 transition sm:w-auto sm:rounded-2xl sm:px-6 sm:py-4"

            >

                <FaPlus />

                Add Category

            </button>

        </div>

    );

}