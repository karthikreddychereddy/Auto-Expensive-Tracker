import { FaPlus } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";

export default function SavingsHeader() {

  const { openModal } = useModal();

  return (

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-5xl font-bold">

          Savings

        </h1>

        <p className="text-gray-500 mt-2">

          Track and grow your savings goals.

        </p>

      </div>

      <button

        onClick={() => openModal("saving")}

        className="bg-[#0B6B57] hover:bg-[#095545] text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"

      >

        <FaPlus />

        Add Saving

      </button>

    </div>

  );

}