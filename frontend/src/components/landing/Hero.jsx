import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-[#F9F5E8] min-h-[90vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#F8D89B] text-[#6B4A00] px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
          ✨ Built for Indian payment messages
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-[#062E28]">
          Auto-track every rupee.
          <br />
          <span className="text-[#0B7A5B]">
            Without the spreadsheet.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-[#4B5C59]">
          Automatically detect every payment message from your mobile,
          categorize expenses using AI, scan receipts with OCR,
          generate smart reports, and help you stay within budget—
          all in one place.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <Link
            to="/register"
            className="bg-[#0B7A5B] hover:bg-[#09684d] text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition duration-300"
          >
            Start Tracking Free
          </Link>

          {/* <Link
            to="/login"
            className="border-2 border-[#0B7A5B] text-[#0B7A5B] hover:bg-[#0B7A5B] hover:text-white font-semibold px-10 py-4 rounded-xl transition duration-300"
          >
            Sign In
          </Link> */}

        </div>

      </div>
    </section>
  );
}