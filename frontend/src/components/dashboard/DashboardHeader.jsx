import {
  FaPlusCircle,
  FaDownload
} from "react-icons/fa";

export default function DashboardHeader({ user }) {

  return (

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-4xl font-bold">

          Welcome back,

          <span className="text-[#0B6B57]">

            {" "}

            {user?.name || "Karthik"}

          </span>

          👋

        </h1>

        <p className="text-gray-500 mt-2">

          Here's your financial overview for today.

        </p>

      </div>

      <div className="flex gap-4">

        <button
          className="flex items-center gap-2 bg-white border px-5 py-3 rounded-xl hover:bg-gray-100"
        >

          <FaDownload />

          Export

        </button>

        <button
          className="flex items-center gap-2 bg-[#0B6B57] text-white px-5 py-3 rounded-xl hover:bg-[#095544]"
        >

          <FaPlusCircle />

          Add Expense

        </button>

      </div>

    </div>

  );

}