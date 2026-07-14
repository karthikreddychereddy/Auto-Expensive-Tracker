const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthGrid({
  selected,
  onSelect,
}) {

  return (

    <div className="grid grid-cols-3 gap-3">

      {months.map((month, index) => {

        const value = `${index + 1}`
          .padStart(2, "0");

        const active =
          selected.month === value;

        return (

          <button
            key={month}
            onClick={() =>
              onSelect(value)
            }
            className={`rounded-xl py-3 transition

            ${
              active
                ? "bg-[#0B6B57] text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >

            {month.substring(0,3)}

          </button>

        );

      })}

    </div>

  );

}