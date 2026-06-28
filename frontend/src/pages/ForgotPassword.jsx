import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

import {
  FaWallet,
  FaEnvelope,
  FaArrowLeft
} from "react-icons/fa";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    setBusy(true);

    try {

      await authService.forgotPassword(email);

      toast.success(
        "Password reset link sent to your email."
      );

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        "Unable to send reset link."
      );

    } finally {

      setBusy(false);

    }

  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-between bg-[#0B6B57] text-white p-14">

        <div className="flex items-center gap-3">

          <FaWallet className="text-3xl"/>

          <h1 className="text-4xl font-bold">

            PaisaTrack

          </h1>

        </div>

        <div>

          <h2 className="text-6xl font-bold leading-tight">

            Forgot your password?

          </h2>

          <h2 className="text-6xl font-bold mb-8">

            We've got you.

          </h2>

          <p className="text-xl text-green-100">

            Enter your registered email address
            and we'll send you a secure password
            reset link.

          </p>

        </div>

        <div className="text-green-200">

          🇮🇳 Secure Password Recovery

        </div>

      </div>

      {/* RIGHT */}

      <div className="bg-[#FBF7EB] flex justify-center items-center p-8">

        <form
          onSubmit={submit}
          className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10"
        >

          <Link
            to="/login"
            className="flex items-center gap-2 text-[#0B6B57] mb-6 font-semibold"
          >

            <FaArrowLeft />

            Back to Login

          </Link>

          <h1 className="text-4xl font-bold">

            Forgot Password

          </h1>

          <p className="text-gray-500 mt-2 mb-8">

            Enter your registered email.

          </p>

          <label className="font-semibold">

            Email Address

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2">

            <FaEnvelope className="text-gray-400"/>

            <input
              type="email"
              className="w-full p-3 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <button

            disabled={busy}

            className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white py-4 rounded-xl mt-8 text-lg font-semibold"

          >

            {

              busy

              ?

              "Sending..."

              :

              "Send Reset Link"

            }

          </button>

          <p className="text-center mt-8">

            Remember your password?

            <Link
              to="/login"
              className="ml-2 text-[#0B6B57] font-bold"
            >

              Sign In

            </Link>

          </p>

        </form>

      </div>

    </div>

  );

}