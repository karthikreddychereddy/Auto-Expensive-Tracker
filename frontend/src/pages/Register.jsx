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
  FaLock,
  FaPhone
} from "react-icons/fa";

export default function Register() {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
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
      const names = form.name.trim().split(" ");

      await register({
        firstName: names[0],
        lastName: names.slice(1).join(" ") || "",
        email: form.email,
        phoneNumber: form.phoneNumber,
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

      <div className="hidden lg:flex flex-col justify-between bg-[#0B6B57] text-white p-14">

        <div className="flex items-center gap-3">
          <FaWallet className="text-3xl" />
          <h1 className="text-4xl font-bold">
            PaisaTrack
          </h1>
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


          <Input
            icon={<FaUser />}
            label="Full Name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e)=>setForm({
              ...form,
              name:e.target.value
            })}
          />


          <Input
            icon={<FaEnvelope />}
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e)=>setForm({
              ...form,
              email:e.target.value
            })}
          />


          <Input
            icon={<FaPhone />}
            label="Mobile Number"
            type="tel"
            placeholder="9876543210"
            value={form.phoneNumber}
            onChange={(e)=>setForm({
              ...form,
              phoneNumber:e.target.value
            })}
          />


          <Input
            icon={<FaLock />}
            label="Password"
            type="password"
            placeholder="********"
            value={form.password}
            onChange={(e)=>setForm({
              ...form,
              password:e.target.value
            })}
          />


          <Input
            icon={<FaLock />}
            label="Confirm Password"
            type="password"
            placeholder="********"
            value={form.confirmPassword}
            onChange={(e)=>setForm({
              ...form,
              confirmPassword:e.target.value
            })}
          />


          <button
            disabled={busy}
            className="w-full bg-[#0B6B57] hover:bg-[#095544] text-white rounded-xl py-4 mt-8 text-lg font-semibold"
          >
            {busy ? "Creating Account..." : "Create Account"}
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


          <div className="flex items-center gap-3 my-8">
            <hr className="flex-1"/>
            <span className="text-gray-400">
              OR
            </span>
            <hr className="flex-1"/>
          </div>


          {[
            ["Google", <FcGoogle size={28}/>],
            ["GitHub", <FaGithub size={24}/>],
            ["Microsoft", <FaMicrosoft size={24}/>],
            ["Apple", <FaApple size={24}/>]
          ].map(([name, icon])=>(
            <button
              key={name}
              type="button"
              className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 mt-4 hover:bg-gray-50"
            >
              {icon}
              Continue with {name}
            </button>
          ))}

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
    <div className="mb-5">

      <label className="font-semibold">
        {label}
      </label>

      <div className="flex items-center border rounded-xl px-4 mt-2">

        <span className="text-gray-400">
          {icon}
        </span>

        <input
          {...props}
          required
          className="w-full p-3 outline-none"
        />

      </div>

    </div>
  );
}