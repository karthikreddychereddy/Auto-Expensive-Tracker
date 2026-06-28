import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#F9F5E8]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">

        <Link
          to="/"
          className="text-3xl font-bold text-[#0B7A5B]"
        >
          PaisaTrack
        </Link>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="px-6 py-3 border-2 border-[#0B7A5B] rounded-xl text-[#0B7A5B] font-semibold transition-all duration-300 hover:bg-[#0B7A5B] hover:text-white hover:shadow-lg"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="bg-[#0B7A5B] hover:bg-[#09684d] text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}