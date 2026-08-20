export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        🤖
      </div>

      <div className="flex min-h-10 items-center">
        <span className="h-5 w-[2px] bg-slate-700 animate-pulse" />
      </div>

    </div>
  );
}