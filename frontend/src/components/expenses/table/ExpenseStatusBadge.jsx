export default function ExpenseStatusBadge({ type }) {
  const styles = {
    Essential: "bg-red-100 text-red-700",
    Personal: "bg-blue-100 text-blue-700",
    Business: "bg-purple-100 text-purple-700",
    Travel: "bg-orange-100 text-orange-700",
    Entertainment: "bg-pink-100 text-pink-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      {type}
    </span>
  );
}