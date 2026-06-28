import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaLock
} from "react-icons/fa";

export default function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [busy, setBusy] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    if (form.password !== form.confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    setBusy(true);

    try {

      await register({
        name: form.name,
        email: form.email,
        password: form.password
      });

      toast.success("Account Created Successfully");

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err?.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setBusy(false);

    }

  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex flex-col justify-between bg-[#0B6B57] text-white p-14">

        <div>

          <div className="flex items-center gap-3">

            <FaWallet className="text-3xl"/>

            <h1 className="text-4xl font-bold">

              PaisaTrack

            </h1>

          </div>

        </div>

        <div>

          <h2 className="text-6xl font-bold leading-tight">

            Start tracking

          </h2>

          <h2 className="text-6xl font-bold mb-8">

            every rupee today.

          </h2>

          <p className="text-xl text-green-100">

            AI powered expense tracking,
            OCR receipt scanning,
            smart budgeting,
            payment message detection
            and detailed analytics.

          </p>

        </div>

        <div className="text-green-200">

          🇮🇳 Made for Indian Users

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="bg-[#FBF7EB] flex justify-center items-center p-8">

        <form
          onSubmit={submit}
          className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-10"
        >

          <h1 className="text-5xl font-bold">

            Create Account

          </h1>

          <p className="text-gray-500 mt-2 mb-8">

            Join PaisaTrack and manage your money smarter.

          </p>

          {/* NAME */}

          <label className="font-semibold">

            Full Name

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2 mb-5">

            <FaUser className="text-gray-400"/>

            <input
              className="w-full p-3 outline-none"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e)=>
                setForm({
                  ...form,
                  name:e.target.value
                })
              }
              required
            />

          </div>

          {/* EMAIL */}

          <label className="font-semibold">

            Email

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2 mb-5">

            <FaEnvelope className="text-gray-400"/>

            <input
              type="email"
              className="w-full p-3 outline-none"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e)=>
                setForm({
                  ...form,
                  email:e.target.value
                })
              }
              required
            />

          </div>

          {/* PASSWORD */}

          <label className="font-semibold">

            Password

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2 mb-5">

            <FaLock className="text-gray-400"/>

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="********"
              value={form.password}
              onChange={(e)=>
                setForm({
                  ...form,
                  password:e.target.value
                })
              }
              required
            />

          </div>

          {/* CONFIRM PASSWORD */}

          <label className="font-semibold">

            Confirm Password

          </label>

          <div className="flex items-center border rounded-xl px-4 mt-2">

            <FaLock className="text-gray-400"/>

            <input
              type="password"
              className="w-full p-3 outline-none"
              placeholder="********"
              value={form.confirmPassword}
              onChange={(e)=>
                setForm({
                  ...form,
                  confirmPassword:e.target.value
                })
              }
              required
            />

          </div>

          <button
            disabled={busy}
            className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white rounded-xl py-4 mt-8 text-lg font-semibold transition"
          >

            {

              busy ?

              "Creating Account..."

              :

              "Create Account"

            }

          </button>

          <p className="text-center mt-8">

            Already have an account?

            <Link
              to="/login"
              className="text-[#0B6B57] font-bold ml-2"
            >

              Sign In

            </Link>

          </p>

          {/* Divider */}

          <div className="flex items-center gap-3 my-8">

            <hr className="flex-1"/>

            <span className="text-gray-400">

              OR

            </span>

            <hr className="flex-1"/>

          </div>

          {/* GOOGLE */}

          <button
            type="button"
            className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >

            <FcGoogle size={28}/>

            Continue with Google

          </button>

          {/* GITHUB */}

          <button
            type="button"
            className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 mt-4 hover:bg-gray-50 transition"
          >

            <FaGithub size={24}/>

            Continue with GitHub

          </button>

          {/* MICROSOFT */}

          <button
            type="button"
            className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 mt-4 hover:bg-gray-50 transition"
          >

            <FaMicrosoft size={24}/>

            Continue with Microsoft

          </button>

          {/* APPLE */}

          <button
            type="button"
            className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 mt-4 hover:bg-gray-50 transition"
          >

            <FaApple size={24}/>

            Continue with Apple

          </button>

        </form>

      </div>

    </div>

  );

}