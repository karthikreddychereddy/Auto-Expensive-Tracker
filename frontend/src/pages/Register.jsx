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
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
} from "react-icons/fa";

export default function Register() {
  const { register } = useAuth();

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });

  const [busy, setBusy] =
    useState(false);

  const submit = async event => {
    event.preventDefault();

    if (busy) {
      return;
    }

    const fullName =
      form.name.trim();

    if (!fullName) {
      toast.error(
        "Please enter your name."
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );

      return;
    }

    if (
      form.password.length < 8
    ) {
      toast.error(
        "Password must contain at least 8 characters."
      );

      return;
    }

    setBusy(true);

    try {
      const names =
        fullName.split(/\s+/);

      const firstName =
        names[0];

      const lastName =
        names
          .slice(1)
          .join(" ");

      const response =
        await register({
          firstName,
          lastName,

          email:
            form.email
              .trim()
              .toLowerCase(),

          phoneNumber:
            form.phoneNumber.trim(),

          password:
            form.password,
        });

      toast.success(
        response?.message ||
          "Account created. Verify your email."
      );

      navigate(
        "/verify-email",
        {
          state: {
            email:
              form.email
                .trim()
                .toLowerCase(),
          },
        }
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Registration failed."
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
            Start tracking
          </h2>

          <h2 className="mt-2 text-4xl font-bold leading-tight xl:text-5xl">
            every rupee today.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-green-100 xl:text-lg">
            Track expenses, scan receipts,
            manage budgets, build savings
            goals and understand your money
            with intelligent guidance.
          </p>

        </div>

        <div className="text-sm text-green-200">
          🇮🇳 Made for Indian Users
        </div>

      </div>

      {/* RIGHT */}

      <div className="flex h-screen items-center justify-center bg-[#FBF7EB] px-4 py-3 sm:px-6">

        <form
          onSubmit={submit}
          className="w-full max-w-lg rounded-3xl bg-white p-5 shadow-xl sm:p-6"
        >

          <div className="mb-4 flex items-center gap-3 lg:hidden">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6B57] text-white">
              <FaWallet />
            </div>

            <h2 className="text-xl font-bold text-[#0B6B57]">
              PaisaTrack
            </h2>

          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Create Account
          </h1>

          <p className="mb-4 mt-1 text-sm text-gray-500">
            Join PaisaTrack and manage
            your money smarter.
          </p>

          <div className="grid gap-x-4 md:grid-cols-2">

            <Input
              icon={<FaUser />}
              label="Full Name"
              placeholder="Full name"
              autoComplete="name"
              value={form.name}
              onChange={event =>
                setForm(prev => ({
                  ...prev,
                  name:
                    event.target.value,
                }))
              }
            />

            <Input
              icon={<FaPhone />}
              label="Mobile Number"
              type="tel"
              placeholder="9876543210"
              autoComplete="tel"
              value={form.phoneNumber}
              onChange={event =>
                setForm(prev => ({
                  ...prev,
                  phoneNumber:
                    event.target.value,
                }))
              }
            />

          </div>

          <Input
            icon={<FaEnvelope />}
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={event =>
              setForm(prev => ({
                ...prev,
                email:
                  event.target.value,
              }))
            }
          />

          <div className="grid gap-x-4 md:grid-cols-2">

            <Input
              icon={<FaLock />}
              label="Password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              value={form.password}
              onChange={event =>
                setForm(prev => ({
                  ...prev,
                  password:
                    event.target.value,
                }))
              }
            />

            <Input
              icon={<FaLock />}
              label="Confirm Password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              value={
                form.confirmPassword
              }
              onChange={event =>
                setForm(prev => ({
                  ...prev,
                  confirmPassword:
                    event.target.value,
                }))
              }
            />

          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-1 w-full rounded-xl bg-[#0B6B57] py-3 font-semibold text-white transition hover:bg-[#095544] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="mt-3 text-center text-sm text-slate-600">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-bold text-[#0B6B57] hover:underline"
            >
              Sign In
            </Link>
          </p>

          <div className="my-3 flex items-center gap-3">

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
              title="GitHub sign-up coming soon"
              disabled
            >
              <FaGithub size={23} />
            </SocialIconButton>

            <SocialIconButton
              title="Microsoft sign-up coming soon"
              disabled
            >
              <FaMicrosoft size={23} />
            </SocialIconButton>

            <SocialIconButton
              title="Apple sign-up coming soon"
              disabled
            >
              <FaApple size={25} />
            </SocialIconButton>

          </div>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            Google sign-up is available.
            Other providers are coming soon.
          </p>

        </form>

      </div>

    </div>
  );
}

function Input({
  icon,
  label,
  ...props
}) {
  return (
    <div className="mb-3">

      <label className="text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="mt-1 flex items-center rounded-xl border border-slate-200 px-3 transition focus-within:border-[#0B6B57]">

        <span className="shrink-0 text-sm text-gray-400">
          {icon}
        </span>

        <input
          {...props}
          required
          className="w-full bg-transparent px-3 py-2.5 text-slate-800 outline-none focus:outline-none focus-visible:outline-none dark:text-white"
        />

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