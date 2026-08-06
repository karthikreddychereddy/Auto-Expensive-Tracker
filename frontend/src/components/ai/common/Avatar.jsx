import { useProfile } from "../../../context/ProfileContext";
import { FaRobot, FaUserCircle } from "react-icons/fa";

export default function Avatar({ role }) {
  const { profile } = useProfile();

  if (role === "assistant") {
    return (
      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-lg">
        <FaRobot size={18} className="text-white" />
      </div>
    );
  }

  const initials = (
    profile?.name ||
    `${profile?.firstName || ""} ${profile?.lastName || ""}`
  )
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (profile?.photo) {
    return (
      <img
        src={profile.photo}
        alt={profile?.name || "User"}
        className="ml-3 h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover shadow-sm"
      />
    );
  }

  return (
    <div className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100 font-semibold text-blue-700 shadow-sm">
      {initials || <FaUserCircle size={18} />}
    </div>
  );
}