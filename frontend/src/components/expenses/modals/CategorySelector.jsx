import { EXPENSE_CATEGORIES } from "../../../constants/expenseConstants";

export default function CategorySelector({
    selectedCategory,
    onSelect,
    error,
}) {
    return (
        <div>
            <label className="font-semibold text-gray-700">
                Choose Category
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">

                {EXPENSE_CATEGORIES.map((category) => (

                    <button
                        key={category.id}
                        type="button"
                        onClick={() => onSelect(category.name)}
                        className={`border rounded-xl p-4 transition-all duration-200

                        ${
                            selectedCategory === category.name
                                ? "bg-[#0B6B57] text-white border-[#0B6B57]"
                                : "hover:bg-green-50"
                        }`}
                    >

                        <div className="text-3xl">

                            {category.icon}

                        </div>

                        <p className="mt-2 font-medium">

                            {category.name}

                        </p>

                    </button>

                ))}

            </div>

            {error && (
                <p className="text-red-500 text-sm mt-2">

                    {error}

                </p>
            )}

        </div>
    );
}