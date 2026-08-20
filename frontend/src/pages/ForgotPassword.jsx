import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaWallet,
  FaEnvelope,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";

import {
  useAuth,
} from "../context/AuthContext";

export default function ForgotPassword() {
  const navigate =
    useNavigate();

  const {
    forgotPassword,
    verifyResetOtp,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [step, setStep] =
    useState("email");

  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

  const [busy, setBusy] =
    useState(false);

  const [seconds, setSeconds] =
    useState(60);

  const refs =
    useRef([]);

  useEffect(() => {
    if (
      step !== "otp" ||
      seconds <= 0
    ) {
      return undefined;
    }

    const timer =
      setInterval(() => {
        setSeconds(value =>
          Math.max(
            value - 1,
            0
          )
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    step,
    seconds,
  ]);

  const sendOtp =
    async event => {
      event.preventDefault();

      if (!email.trim()) {
        toast.error(
          "Enter your registered email."
        );

        return;
      }

      setBusy(true);

      try {
        const response =
          await forgotPassword(
            email.trim()
          );

        sessionStorage.setItem(
          "reset_email",
          email.trim()
        );

        toast.success(
          response?.message ||
            "Password reset OTP sent."
        );

        setStep(
          "otp"
        );

        setSeconds(
          60
        );

      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
          error?.response?.data
            ?.error ||
          "Unable to send reset OTP."
        );

      } finally {
        setBusy(false);
      }
    };

  function handleOtpChange(
    index,
    value
  ) {
    const clean =
      value.replace(
        /\D/g,
        ""
      );

    if (
      clean.length > 1
    ) {
      return;
    }

    const next = [
      ...otp,
    ];

    next[index] =
      clean;

    setOtp(next);

    if (
      clean &&
      index < 5
    ) {
      refs.current[
        index + 1
      ]?.focus();
    }
  }

  function handleOtpKeyDown(
    index,
    event
  ) {
    if (
      event.key ===
        "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      refs.current[
        index - 1
      ]?.focus();
    }
  }

  const verifyOtp =
    async event => {
      event.preventDefault();

      const value =
        otp.join("");

      if (
        value.length !== 6
      ) {
        toast.error(
          "Enter the complete 6-digit OTP."
        );

        return;
      }

      setBusy(true);

      try {
        const response =
          await verifyResetOtp(
            email.trim(),
            value
          );

        toast.success(
          response?.message ||
            "OTP verified successfully."
        );

        sessionStorage.setItem(
          "reset_email",
          email.trim()
        );

        navigate(
          "/reset-password"
        );

      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
          error?.response?.data
            ?.error ||
          "Invalid or expired OTP."
        );

      } finally {
        setBusy(false);
      }
    };

  const resendOtp =
    async () => {
      if (
        busy ||
        seconds > 0
      ) {
        return;
      }

      setBusy(true);

      try {
        const response =
          await forgotPassword(
            email.trim()
          );

        toast.success(
          response?.message ||
            "A new OTP has been sent."
        );

        setOtp([
          "",
          "",
          "",
          "",
          "",
          "",
        ]);

        setSeconds(
          60
        );

      } catch (error) {
        toast.error(
          "Unable to resend OTP."
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
            Forgot your password?
          </h2>

          <h2 className="text-6xl font-bold mb-8">
            We've got you.
          </h2>

          <p className="text-xl text-green-100">
            Verify your registered email securely and create a new password.
          </p>
        </div>

        <div className="text-green-200">
          🔒 Secure Password Recovery
        </div>

      </div>

      <div className="bg-[#FBF7EB] flex justify-center items-center p-8">

        <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10">

          <Link
            to="/login"
            className="flex items-center gap-2 text-[#0B6B57] mb-6 font-semibold"
          >
            <FaArrowLeft />
            Back to Login
          </Link>

          {step === "email" ? (
            <form onSubmit={sendOtp}>

              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                Forgot Password
              </h1>

              <p className="text-gray-500 mt-2 mb-8">
                Enter your registered email and we'll send a verification OTP.
              </p>

              <label className="font-semibold">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  className="w-full p-3 outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={
                    event =>
                      setEmail(
                        event.target.value
                      )
                  }
                  required
                />

              </div>

              <button
                disabled={busy}
                className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white py-4 rounded-xl mt-8 text-lg font-semibold disabled:opacity-60"
              >
                {busy
                  ? "Sending..."
                  : "Send Reset OTP"}
              </button>

            </form>
          ) : (
            <form onSubmit={verifyOtp}>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B6B57]/10 text-[#0B6B57] text-xl">
                <FaShieldAlt />
              </div>

              <h1 className="text-3xl font-bold text-center mt-5">
                Verify Reset OTP
              </h1>

              <p className="text-gray-500 text-center mt-2">
                Enter the 6-digit code sent to
              </p>

              <p className="text-[#0B6B57] font-semibold text-center mt-1 break-all">
                {email}
              </p>

              <div className="flex justify-center gap-2 mt-8">

                {otp.map(
                  (
                    value,
                    index
                  ) => (
                    <input
                      key={index}
                      ref={
                        element =>
                          refs.current[
                            index
                          ] =
                            element
                      }
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      onChange={
                        event =>
                          handleOtpChange(
                            index,
                            event.target.value
                          )
                      }
                      onKeyDown={
                        event =>
                          handleOtpKeyDown(
                            index,
                            event
                          )
                      }
                      className="h-14 w-12 rounded-xl border-2 border-gray-200 text-center text-xl font-bold outline-none focus:border-[#0B6B57]"
                    />
                  )
                )}

              </div>

              <button
                disabled={busy}
                className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white py-4 rounded-xl mt-8 text-lg font-semibold disabled:opacity-60"
              >
                {busy
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              <button
                type="button"
                disabled={
                  busy ||
                  seconds > 0
                }
                onClick={
                  resendOtp
                }
                className="w-full mt-4 text-[#0B6B57] font-semibold disabled:text-gray-400"
              >
                {seconds > 0
                  ? `Resend OTP in ${seconds}s`
                  : "Resend OTP"}
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}