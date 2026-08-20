import { FaPlusCircle } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";
import MonthSelector from "../common/MonthSelector";

export default function IncomeHeader() {

  const { openModal } = useModal();

  return (

    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:rounded-3xl sm:p-6 lg:p-8">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:text-4xl">

            Income

          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base lg:text-lg">

            Track your earnings and monitor your income growth.

          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

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