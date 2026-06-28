import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

import {
  FaWallet,
  FaLock,
  FaArrowLeft
} from "react-icons/fa";

export default function ResetPassword() {

  const [sp] = useSearchParams();
  const token = sp.get("token") || "";

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [busy, setBusy] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    setBusy(true);

    try {

      await authService.resetPassword(token, password);

      toast.success("Password updated successfully");

      navigate("/login");

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        "Reset failed"
      );

    } finally {

      setBusy(false);

    }

  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex flex-col justify-between bg-[#0B6B57] text-white p-14">

        <div className="flex items-center gap-3">

          <FaWallet className="text-3xl" />

          <h1 className="text-4xl font-bold">

            PaisaTrack

          </h1>

        </div>

        <div>

          <h2 className="text-6xl font-bold leading-tight">

            Create Your

          </h2>

          <h2 className="text-6xl font-bold mb-8">

            New Password

          </h2>

          <p className="text-xl text-green-100 leading-8">

            Secure your account with a strong
            password and continue managing
            your expenses safely.

          </p>

        </div>

        <div className="text-green-200">

          🔒 Secure Password Reset

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="bg-[#FBF7EB] flex justify-center items-center p-8">

        <form
          onSubmit={submit}
          className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10"
        >

          <Link
            to="/login"
            className="flex items-center gap-2 text-[#0B6B57] font-semibold mb-6 hover:underline"
          >

            <FaArrowLeft />

            Back to Login

          </Link>

          <h1 className="text-4xl font-bold">

            Reset Password

          </h1>

          <p className="text-gray-500 mt-2 mb-8">

            Create a new password for your account.

          </p>

          <label className="font-semibold">

            New Password

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2 mb-5">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <label className="font-semibold">

            Confirm Password

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

          </div>

          <button
            disabled={busy}
            className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white rounded-xl py-4 mt-8 text-lg font-semibold transition"
          >

            {

              busy

                ?

                "Updating Password..."

                :

                "Update Password"

            }

          </button>

          <p className="text-center mt-8">

            Remember your password?

            <Link
              to="/login"
              className="ml-2 text-[#0B6B57] font-bold hover:underline"
            >

              Sign In

            </Link>

          </p>

        </form>

      </div>

    </div>

  );

}