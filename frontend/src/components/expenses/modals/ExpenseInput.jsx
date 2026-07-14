export default function ExpenseInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon = null,
}) {
  return (
    <div>
      <label className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
        {icon}
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0B6B57]"
      />
    </div>
  );
}