import { FaSearch } from "react-icons/fa";

export default function ConversationSearch({

  value,
  onChange,

}) {

  return (

    <div className="px-4 py-3">

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">

        <FaSearch
          className="text-slate-400"
          size={14}
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search conversations..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />

      </div>

    </div>

  );

}