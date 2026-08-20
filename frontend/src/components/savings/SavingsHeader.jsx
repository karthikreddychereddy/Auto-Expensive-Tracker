import { FaPlus } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

export default function SavingsHeader() {

  const { openModal } = useModal();

  return (

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl lg:text-5xl">

          Savings

        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">

          Track and grow your savings goals.

        </p>

      </div>

      <button

        onClick={() => openModal("saving")}

        className="bg-[#0B6B57] hover:bg-[#095545] text-white w-full justify-center px-5 py-3 rounded-xl flex items-center gap-2 transition sm:w-auto sm:px-6"

      >

        <FaPlus />

        Add Saving

      </button>

    </div>

  );

}