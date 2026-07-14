import { useState } from "react";
import toast from "react-hot-toast";

export default function SecuritySettings() {

  const [password,setPassword]=useState("");

  const handleChange=()=>{

    toast.success("Password Updated Successfully");

    setPassword("");

  };

  return (

    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">

        Security

      </h2>

      <div className="space-y-6">

        <input

          type="password"

          placeholder="New Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          className="w-full border rounded-xl p-3 dark:bg-slate-700"

        />

        <button

          onClick={handleChange}

          className="bg-[#0B6B57] text-white px-6 py-3 rounded-xl hover:bg-[#095544]"

        >

          Change Password

        </button>

      </div>

    </div>

  );

}