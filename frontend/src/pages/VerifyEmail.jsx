import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  useAuth,
} from "../context/AuthContext";

export default function VerifyEmail() {
  const {
    verifyEmail,
    resendOtp,
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const email =
    location.state?.email ||
    sessionStorage.getItem(
      "verification_email"
    ) ||
    "";

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

  const [
    resendBusy,
    setResendBusy,
  ] = useState(false);

  const [seconds, setSeconds] =
    useState(60);

  const refs =
    useRef([]);

  useEffect(() => {
    if (email) {
      sessionStorage.setItem(
        "verification_email",
        email
      );
    }
  }, [email]);

  useEffect(() => {
    if (seconds <= 0) {
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
  }, [seconds]);

  function handleChange(
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

  function handleKeyDown(
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

  async function submit(
    event
  ) {
    event.preventDefault();

    if (!email) {
      toast.error(
        "Verification email is missing. Please register again."
      );

      return;
    }

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
        await verifyEmail(
          email,
          value
        );

      sessionStorage.removeItem(
        "verification_email"
      );

      toast.success(
        response?.message ||
          "Email verified successfully."
      );

      /*
       * JWT + user have already been
       * stored by AuthContext.verifyEmail().
       *
       * Go directly to dashboard.
       */
      navigate(
        "/dashboard",
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
        error?.message ||
        "Invalid or expired OTP."
      );

    } finally {
      setBusy(false);
    }
  }

  async function handleResend() {
    if (
      !email ||
      seconds > 0 ||
      resendBusy
    ) {
      return;
    }

    setResendBusy(true);

    try {
      const response =
        await resendOtp(
          email
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

      setSeconds(60);

      refs.current[
        0
      ]?.focus();

    } catch (error) {
      toast.error(
        error?.response?.data
          ?.message ||
        error?.response?.data
          ?.error ||
        "Unable to resend OTP."
      );

    } finally {
      setResendBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF7EB] p-6">

      <div className="w-full max-w-lg rounded-3xl bg-white p-9 shadow-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B6B57]/10 text-2xl text-[#0B6B57]">
          <FaShieldAlt />
        </div>

        <h1 className="mt-5 text-center text-3xl font-bold text-slate-900">
          Verify your email
        </h1>

        <p className="mt-3 text-center leading-6 text-gray-500">
          We sent a 6-digit verification code to
        </p>

        <div className="mt-2 flex items-center justify-center gap-2 font-semibold text-[#0B6B57]">
          <FaEnvelope />

          <span className="break-all">
            {email ||
              "your email"}
          </span>
        </div>

        <form
          onSubmit={submit}
          className="mt-8"
        >
          <div className="flex justify-center gap-2 sm:gap-3">

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
                      handleChange(
                        index,
                        event.target.value
                      )
                  }
                  onKeyDown={
                    event =>
                      handleKeyDown(
                        index,
                        event
                      )
                  }
                  className="h-14 w-12 rounded-xl border-2 border-gray-200 text-center text-xl font-bold outline-none transition focus:border-[#0B6B57]"
                />
              )
            )}

          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-8 w-full rounded-xl bg-[#0B6B57] py-3.5 font-semibold text-white transition hover:bg-[#095544] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy
              ? "Verifying..."
              : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">

          <p className="text-sm text-gray-500">
            Didn't receive the code?
          </p>

          <button
            type="button"
            disabled={
              seconds > 0 ||
              resendBusy
            }
            onClick={
              handleResend
            }
            className="mt-2 font-semibold text-[#0B6B57] disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {resendBusy
              ? "Sending..."
              : seconds > 0
              ? `Resend OTP in ${seconds}s`
              : "Resend OTP"}
          </button>

        </div>

        <div className="mt-6 border-t pt-5 text-center">

          <Link
            to="/login"
            className="font-semibold text-[#0B6B57]"
          >
            Back to Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}