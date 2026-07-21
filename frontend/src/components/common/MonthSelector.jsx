import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

import MonthPicker from "./MonthPicker";
import { useMonth } from "../../context/MonthContext";

export default function MonthSelector({ label = "Month" }) {

  const { selectedMonth, setSelectedMonth } = useMonth();

  const [open, setOpen] = useState(false);

  const date = new Date(`${selectedMonth}-01`);

  const monthLabel = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-white border rounded-xl shadow-sm px-5 py-3 hover:shadow-md transition"
      >

        <FaCalendarAlt className="text-[#0B6B57]" />

        <div className="text-left">

          <p className="text-xs text-gray-500">
            {label}
          </p>

          <p className="font-semibold">
            {monthLabel}
          </p>

        </div>

      </button>

      {open && (

        <MonthPicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          close={() => setOpen(false)}
        />

      )}

    </div>
  );
}