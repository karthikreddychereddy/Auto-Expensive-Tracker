import { useMemo } from "react";

const merchants = [
  "Amazon",
  "Amazon Fresh",
  "Amazon Pay",
  "Flipkart",
  "Swiggy",
  "Swiggy Instamart",
  "Zomato",
  "Domino's",
  "KFC",
  "McDonald's",
  "Uber",
  "Ola",
  "Reliance Fresh",
  "DMart",
  "Myntra",
  "Ajio",
];

export default function MerchantSuggestions({
  value,
  onSelect,
}) {
  const filtered = useMemo(() => {
    if (!value) return [];

    return merchants
      .filter((m) =>
        m.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 5);
  }, [value]);

  if (filtered.length === 0) return null;

  return (
    <div className="border rounded-xl bg-white shadow mt-2 overflow-hidden">

      {filtered.map((merchant) => (

        <button
          key={merchant}
          type="button"
          onClick={() => onSelect(merchant)}
          className="w-full text-left px-4 py-3 hover:bg-green-50"
        >
          {merchant}
        </button>

      ))}

    </div>
  );
}