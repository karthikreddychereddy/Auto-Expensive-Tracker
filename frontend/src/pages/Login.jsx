import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";

import {
  FaGithub,
  FaMicrosoft,
  FaApple,
  FaWallet,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [busy, setBusy] =
    useState(false);

  const submit = async event => {
    event.preventDefault();

    if (busy) {
      return;
    }

    setBusy(true);

    try {
      await login(
        form.email.trim(),
        form.password
      );

      toast.success(
        "Welcome back!"
      );

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Login failed."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendBaseUrl =
      import.meta.env.VITE_BACKEND_BASE_URL ||
      "http://localhost:8080";

    window.location.href =
      `${backendBaseUrl}/oauth2/authorization/google`;
  };

  return (
    <div className="grid h-screen overflow-hidden bg-[#FBF7EB] lg:grid-cols-2">

      {/* LEFT */}

      <div className="hidden h-screen flex-col justify-between bg-[#0B6B57] p-10 text-white lg:flex xl:p-12">

        <div className="flex items-center gap-3">

          <FaWallet className="text-3xl" />

          <h1 className="text-3xl font-bold">
            PaisaTrack
          </h1>

        </div>

        <div>

          <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
            Auto-track every rupee.
          </h2>

          <h2 className="mt-2 text-4xl font-bold leading-tight xl:text-5xl">
            Without the spreadsheet.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-green-100 xl:text-lg">
            Track expenses, scan receipts,
            manage budgets and understand
            your finances with intelligent
            guidance.
          </p>

        </div>

        <div className="text-sm text-green-200">
          🇮🇳 Built for Indian Users
        </div>

      </div>

      {/* RIGHT */}

      <div className="flex h-screen items-center justify-center bg-[#FBF7EB] px-4 py-4 sm:px-6">

        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-7"
        >

          <div className="mb-5 flex items-center gap-3 lg:hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B57] text-white">
              <FaWallet />
            </div>

            <h2 className="text-xl font-bold text-[#0B6B57]">
              PaisaTrack
            </h2>

          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mb-5 mt-1 text-sm text-gray-500">
            Sign in to continue tracking
            your finances.
          </p>

          <label className="text-sm font-semibold text-slate-800">
            Email
          </label>

          <div className="mb-4 mt-1.5 flex items-center rounded-xl border border-slate-200 px-3 transition focus-within:border-[#0B6B57]">

            <FaEnvelope className="shrink-0 text-sm text-gray-400" />

            <input
              type="email"
              autoComplete="email"
              className="w-full bg-transparent px-3 py-2.5 text-slate-800 outline-none focus:outline-none focus-visible:outline-none dark:text-white"
              placeholder="you@example.com"
              value={form.email}
              onChange={event =>
                setForm(prev => ({
                  ...prev,
                  email:
                    event.target.value,
                }))
              }
              required
            />

          </div>

          <label className="text-sm font-semibold text-slate-800">
            Password
          </label>

          <div className="mt-1.5 flex items-center rounded-xl border border-slate-200 px-3 transition focus-within:border-[#0B6B57]">

            <FaLock className="shrink-0 text-sm text-gray-400" />

            <input
              type="password"
              autoComplete="current-password"
              className="w-full bg-transparent px-3 py-2.5 text-slate-800 outline-none focus:outline-none focus-visible:outline-none dark:text-white"
              placeholder="********"
              value={form.password}
              onChange={event =>
                setForm(prev => ({
                  ...prev,
                  password:
                    event.target.value,
                }))
              }
              required
            />

          </div>

          <div className="mt-2 flex justify-end">

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-[#0B6B57] hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-5 w-full rounded-xl bg-[#0B6B57] py-3 font-semibold text-white transition hover:bg-[#095544] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy
              ? "Signing In..."
              : "Sign In"}
          </button>

          <p className="mt-4 text-center text-sm text-slate-600">
            New here?

            <Link
              to="/register"
              className="ml-2 font-bold text-[#0B6B57] hover:underline"
            >
              Create Account
            </Link>
          </p>

          <div className="my-4 flex items-center gap-3">

            <hr className="flex-1 border-slate-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <hr className="flex-1 border-slate-200" />

          </div>

          {/* SOCIAL ICONS */}

          <div className="flex items-center justify-center gap-4">

            <SocialIconButton
              title="Continue with Google"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={26} />
            </SocialIconButton>

            <SocialIconButton
              title="GitHub sign-in coming soon"
              disabled
            >
              <FaGithub size={23} />
            </SocialIconButton>

            <SocialIconButton
              title="Microsoft sign-in coming soon"
              disabled
            >
              <FaMicrosoft size={23} />
            </SocialIconButton>

            <SocialIconButton
              title="Apple sign-in coming soon"
              disabled
            >
              <FaApple size={25} />
            </SocialIconButton>

          </div>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            Google sign-in is available.
            Other providers are coming soon.
          </p>

        </form>

      </div>

    </div>
  );
}

function SocialIconButton({
  children,
  title,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-xl
        border
        transition
        ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 opacity-60"
            : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-[#0B6B57]/40 hover:shadow-md"
        }
      `}
    >
      {children}
    </button>
  );
}