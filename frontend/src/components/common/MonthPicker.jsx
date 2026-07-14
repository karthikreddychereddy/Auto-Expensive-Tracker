import { useState } from "react";

import YearSelector from "./YearSelector";
import MonthGrid from "./MonthGrid";

export default function MonthPicker({

  selectedMonth,

  setSelectedMonth,

  close,

}) {

  const [year, setYear] = useState(

    Number(selectedMonth.split("-")[0])

  );

  const [month, setMonth] = useState(

    selectedMonth.split("-")[1]

  );

  return (

    <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl border p-6 w-80 z-50">

      <YearSelector

        year={year}

        setYear={setYear}

      />

      <MonthGrid

        selected={{ year, month }}

        onSelect={setMonth}

      />

      <div className="flex justify-end gap-3 mt-6">

        <button

          onClick={close}

          className="px-4 py-2 rounded-lg border"

        >

          Cancel

        </button>

        <button

          onClick={() => {

            setSelectedMonth(

              `${year}-${month}`

            );

            close();

          }}

          className="bg-[#0B6B57] text-white px-5 py-2 rounded-lg"

        >

          Apply

        </button>

      </div>

    </div>

  );

}