const currencies = [
  "₹ INR",
  "$ USD",
  "€ EUR",
  "£ GBP",
  "AED",
];

export default function CurrencySelector({
  value,
  onChange,
}) {
  return (
    <div>

      <label className="font-semibold">

        Currency

      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full mt-2 border rounded-xl p-4"
      >
        {currencies.map((currency) => (

          <option
            key={currency}
            value={currency}
          >
            {currency}
          </option>

        ))}

      </select>

    </div>
  );
}