import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaWallet,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";

import {
  useAuth,
} from "../context/AuthContext";

export default function ResetPassword() {
  const navigate =
    useNavigate();

  const {
    resetPassword,
  } = useAuth();

  const email =
    sessionStorage.getItem(
      "reset_email"
    ) || "";

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [busy, setBusy] =
    useState(false);

  useEffect(() => {
    if (!email) {
      navigate(
        "/forgot-password",
        {
          replace: true,
        }
      );
    }
  }, [
    email,
    navigate,
  ]);

  const submit =
    async event => {
      event.preventDefault();

      if (
        password.length < 8
      ) {
        toast.error(
          "Password must contain at least 8 characters."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        toast.error(
          "Passwords do not match."
        );

        return;
      }

      setBusy(true);

      try {
        const response =
          await resetPassword(
            email,
            password
          );

        sessionStorage.removeItem(
          "reset_email"
        );

        toast.success(
          response?.message ||
            "Password reset successfully."
        );

        navigate(
          "/login",
          {
            replace: true,
          }
        );

      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
          error?.response?.data
            ?.error ||
          "Unable to reset password."
        );

      } finally {
        setBusy(false);
      }
    };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      <div className="hidden lg:flex flex-col justify-between bg-[#0B6B57] text-white p-14">

        <div className="flex items-center gap-3">
          <FaWallet className="text-3xl" />

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
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
            Choose a secure new password for your PaisaTrack account.
          </p>
        </div>

        <div className="text-green-200">
          🔒 Secure Password Reset
        </div>

      </div>

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

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Create a new password for
          </p>

          <p className="font-semibold text-[#0B6B57] mt-1 mb-8 break-all">
            {email}
          </p>

          <label className="font-semibold">
            New Password
          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2 mb-5">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={
                event =>
                  setPassword(
                    event.target.value
                  )
              }
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
              placeholder="Re-enter new password"
              value={
                confirmPassword
              }
              onChange={
                event =>
                  setConfirmPassword(
                    event.target.value
                  )
              }
              required
            />

          </div>

          <button
            disabled={busy}
            className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white rounded-xl py-4 mt-8 text-lg font-semibold transition disabled:opacity-60"
          >
            {busy
              ? "Updating Password..."
              : "Update Password"}
          </button>

        </form>

      </div>

    </div>
  );
}