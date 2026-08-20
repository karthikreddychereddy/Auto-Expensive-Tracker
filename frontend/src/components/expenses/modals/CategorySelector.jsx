import {
  FaLayerGroup,
} from "react-icons/fa";

import {
  useCategory,
} from "../../../context/CategoryContext";

export default function CategorySelector({
  selectedCategory,
  onSelect,
  error,
}) {
  const {
    categories,
    loading,
  } = useCategory();

  return (
    <div>

      <label className="font-semibold text-gray-700 dark:text-slate-200">
        Choose Category
      </label>

      {loading ? (
        <div className="mt-3 rounded-xl border border-slate-200 p-4 text-center text-sm text-slate-500 dark:border-slate-700">
          Loading categories...
        </div>
      ) : categories.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-5 text-center dark:border-slate-700">

          <FaLayerGroup
            className="mx-auto text-2xl text-slate-400"
          />

          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            No categories available.
          </p>

        </div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">

          {categories.map(category => {
            const selected =
              selectedCategory ===
              category.name;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  onSelect(category.name)
                }
                className={`
                  rounded-xl
                  border
                  px-2
                  py-3
                  transition-all
                  duration-200
                  ${
                    selected
                      ? "border-[#0B6B57] bg-[#0B6B57] text-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-[#0B6B57] hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-800"
                  }
                `}
              >

                <div
                  className={`
                    mx-auto
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-xl
                    ${
                      selected
                        ? "bg-white/15"
                        : ""
                    }
                  `}
                  style={
                    selected
                      ? undefined
                      : {
                          backgroundColor:
                            category.color ||
                            "#E5E7EB",
                        }
                  }
                >
                  {category.icon || "📦"}
                </div>

                <p
                  className={`
                    mt-2
                    truncate
                    text-xs
                    font-semibold
                    ${
                      selected
                        ? "text-white"
                        : "text-slate-700 dark:text-slate-200"
                    }
                  `}
                  title={category.name}
                >
                  {category.name}
                </p>

              </button>
            );
          })}

        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}