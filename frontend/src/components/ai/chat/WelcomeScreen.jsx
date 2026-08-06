import { useProfile } from "../../../context/ProfileContext";
import SuggestionPills from "../composer/SuggestionPills";

export default function WelcomeScreen({
  sendMessage,
}) {
  const { profile } = useProfile();

  const firstName =
    profile.firstName ||
    profile.name?.split(" ")[0] ||
    "there";

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-5xl font-semibold tracking-tight text-slate-900">
          Hi, {firstName} 👋
        </h1>

        <p className="mt-5 text-center text-xl text-slate-500">
          What would you like to know about your finances today?
        </p>

        <div className="mt-16">
          <SuggestionPills
            visible
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}