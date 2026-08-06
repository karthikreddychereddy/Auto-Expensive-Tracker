const suggestions = [
  {
    title: "Analyze Expenses",
    subtitle: "Find spending patterns",
    prompt: "Analyze my monthly expenses",
    icon: "📊",
  },
  {
    title: "Budget Review",
    subtitle: "Optimize my budget",
    prompt: "Review my monthly budget",
    icon: "💰",
  },
  {
    title: "Savings Plan",
    subtitle: "Increase my savings",
    prompt: "Help me increase my savings",
    icon: "🎯",
  },
  {
    title: "Financial Advice",
    subtitle: "Personalized suggestions",
    prompt: "Give me smart financial tips",
    icon: "💡",
  },
];

export default function SuggestionPills({
  visible,
  sendMessage,
}) {
  if (!visible) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {suggestions.map((item) => (
        <button
          key={item.title}
          onClick={() => sendMessage(item.prompt)}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            text-left
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-400
            hover:shadow-lg
          "
        >
          <div className="mb-3 text-3xl">
            {item.icon}
          </div>

          <h3 className="font-semibold text-slate-800">
            {item.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {item.subtitle}
          </p>
        </button>
      ))}
    </div>
  );
}