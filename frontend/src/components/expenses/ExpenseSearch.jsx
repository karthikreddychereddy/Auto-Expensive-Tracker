import { FaSearch } from "react-icons/fa";
import { useExpenses } from "../../context/ExpenseContext";

export default function ExpenseSearch() {
  const { searchTerm, setSearchTerm } = useExpenses();

  return (
    <div className="relative w-full">

      <FaSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B57]"
      />

    </div>
  );
}