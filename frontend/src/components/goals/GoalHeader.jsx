import { FaBullseye } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

export default function GoalHeader() {

    const { openModal } = useModal();

    return (

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">

                    Goals

                </h1>

                <p className="mt-2 text-gray-500 dark:text-gray-400">

                    Track your financial goals.

                </p>

            </div>

            <button
                onClick={() => openModal("goal")}
                className="bg-[#0B6B57] text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-[#095746]"
            >

                <FaBullseye />

                Add Goal

            </button>

        </div>

    );

}