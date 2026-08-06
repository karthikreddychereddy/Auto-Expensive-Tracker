export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-pulse">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

        🤖

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

        <p className="mb-3 text-sm font-medium text-slate-500">

          Thinking...

        </p>

        <div className="flex gap-2">

          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />

          <span
            className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />

          <span
            className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "0.30s" }}
          />

        </div>

      </div>

    </div>
  );
}