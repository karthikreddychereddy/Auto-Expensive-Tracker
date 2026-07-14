export default function YearSelector({
  year,
  setYear,
}) {
  return (
    <div className="flex items-center justify-between mb-6">

      <button
        onClick={() => setYear(year - 1)}
        className="px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        ◀
      </button>

      <h2 className="text-xl font-bold">
        {year}
      </h2>

      <button
        onClick={() => setYear(year + 1)}
        className="px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        ▶
      </button>

    </div>
  );
}