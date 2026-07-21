import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

export default function SearchResults({ results }) {

  const navigate = useNavigate();
  const { setSearchText } = useSearch();

  const handleClick = (item) => {

    setSearchText("");

    switch (item.type) {

      case "expense":
        navigate("/expenses");
        break;

      case "income":
        navigate("/income");
        break;

      case "budget":
        navigate("/budgets");
        break;

      case "saving":
        navigate("/savings");
        break;

      case "goal":
        navigate("/goals");
        break;

      case "category":
        navigate("/categories");
        break;

      default:
        navigate("/dashboard");
    }
  };

  return (

    <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 z-50">

      {results.map((item) => (

        <button
          key={`${item.type}-${item.id}`}
          onClick={() => handleClick(item)}
          className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
        >

          <div className="font-medium">
            {item.title}
          </div>

          <div className="text-xs text-gray-500 capitalize">
            {item.type}
          </div>

        </button>

      ))}

    </div>

  );
}