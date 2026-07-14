import { FaPlusCircle } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";
import MonthSelector from "../common/MonthSelector";

export default function IncomeHeader() {

  const { openModal } = useModal();

  return (

    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">

        {/* Left */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">

            Income

          </h1>

          <p className="text-gray-500 mt-2 text-lg">

            Track your earnings and monitor your income growth.

          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <MonthSelector />

          <button
            onClick={() => openModal("income")}
            className="flex items-center gap-3 bg-[#0B6B57] hover:bg-[#095544]
            text-white px-6 py-3 rounded-xl shadow-lg transition"
          >

            <FaPlusCircle />

            Add Income

          </button>

        </div>

      </div>

    </div>

  );

}