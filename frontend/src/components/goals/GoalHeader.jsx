import { FaBullseye } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

export default function GoalHeader() {

    const { openModal } = useModal();

    return (

        <div className="flex justify-between items-center">

            <div>

                <h1 className="text-5xl font-bold">

                    Goals

                </h1>

                <p className="text-gray-500 mt-2">

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