import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function ChangePasswordModal({
  open,
  onClose,
}) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const strength = useMemo(() => {
    const password = form.newPassword;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [form.newPassword]);

  const strengthText = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][strength];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleClose = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Backend API call goes here.

    toast.success("Password changed successfully.");

    handleClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >

        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden"
        >

          <div className="bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FaLock className="text-white text-xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Change Password
                </h2>

                <p className="text-white/80 text-sm">
                  Update your account password
                </p>
              </div>

            </div>

            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center"
            >
              <FaTimes />
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-5"
          >

            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={form.currentPassword}
              visible={show.current}
              onToggle={() => togglePassword("current")}
              onChange={handleChange}
            />

            <PasswordInput
              label="New Password"
              name="newPassword"
              value={form.newPassword}
              visible={show.new}
              onToggle={() => togglePassword("new")}
              onChange={handleChange}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              visible={show.confirm}
              onToggle={() => togglePassword("confirm")}
              onChange={handleChange}
            />

            <div>

              <div className="flex justify-between mb-2 text-sm">
                <span>Password Strength</span>
                <span className="font-semibold">
                  {strengthText}
                </span>
              </div>

              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  animate={{
                    width: `${strength * 20}%`,
                  }}
                  className="h-full bg-[#0B6B57]"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-3">

              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-xl border"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#0B6B57] text-white flex items-center gap-2 hover:bg-[#095544]"
              >
                <FaSave />
                Save Password
              </button>

            </div>

          </form>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}

function PasswordInput({
  label,
  visible,
  onToggle,
  ...props
}) {
  return (
    <div>

      <label className="block font-semibold mb-2">
        {label}
      </label>

      <div className="flex items-center border rounded-xl px-4 py-3">

        <input
          {...props}
          type={visible ? "text" : "password"}
          className="flex-1 outline-none"
        />

        <button
          type="button"
          onClick={onToggle}
          className="text-gray-500"
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

    </div>
  );
}