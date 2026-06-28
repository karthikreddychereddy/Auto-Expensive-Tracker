import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import {
  FcGoogle
} from "react-icons/fc";

import {
  FaGithub,
  FaMicrosoft,
  FaApple,
  FaWallet,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [busy, setBusy] = useState(false);

  const submit = async (e) => {

    e.preventDefault();

    setBusy(true);

    try {

      await login(form.email, form.password);

      toast.success("Welcome Back!");

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err?.response?.data?.message || "Login Failed"
      );

    } finally {

      setBusy(false);

    }

  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT */}

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

            Auto-track every rupee.

          </h2>

          <h2 className="text-6xl font-bold mb-8">

            Without the spreadsheet.

          </h2>

          <p className="text-xl text-green-100">

            Automatically detect payment
            messages, AI categorization,
            OCR receipt scanning and
            budgeting in one place.

          </p>

        </div>

        <div className="text-green-200">

            🇮🇳 Built for Indian Users

        </div>

      </div>

      {/* RIGHT */}

      <div className="bg-[#FBF7EB] flex justify-center items-center p-8">

        <form
          onSubmit={submit}
          className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10"
        >

          <h1 className="text-5xl font-bold">

            Welcome Back

          </h1>

          <p className="text-gray-500 mt-2 mb-8">

            Sign in to continue tracking your expenses.

          </p>

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

          <div className="flex items-center border rounded-xl px-4 mt-2">

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

          <div className="flex justify-end mt-3">

            <Link
              to="/forgot-password"
              className="text-[#0B6B57] font-semibold"
            >

              Forgot Password?

            </Link>

          </div>

          {/* LOGIN */}

          <button
            disabled={busy}
            className="w-full bg-[#0B6B57] text-white py-4 rounded-xl text-lg font-semibold mt-8 hover:bg-[#095544] transition"
          >

            {

              busy ?

              "Signing In..."

              :

              "Sign In"

            }
          

          </button>
          

          <p className="text-center mt-8">

            New here?

            <Link
              to="/register"
              className="text-[#0B6B57] font-bold ml-2"
            >

              Create Account

            </Link>

          </p>

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