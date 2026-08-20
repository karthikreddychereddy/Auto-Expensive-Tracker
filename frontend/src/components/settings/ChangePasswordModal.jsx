import {
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useSettings } from "../../context/SettingsContext";

export default function ChangePasswordModal({
  open,
  onClose,
}) {
  const {
    changePassword,
  } = useSettings();

  const [
    form,
    setForm,
  ] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [
    show,
    setShow,
  ] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [
    saving,
    setSaving,
  ] = useState(false);

  const strength =
    useMemo(() => {
      const password =
        form.newPassword;

      let score = 0;

      if (
        password.length >= 8
      ) {
        score++;
      }

      if (
        /[A-Z]/.test(
          password
        )
      ) {
        score++;
      }

      if (
        /[a-z]/.test(
          password
        )
      ) {
        score++;
      }

      if (
        /\d/.test(
          password
        )
      ) {
        score++;
      }

      if (
        /[^A-Za-z0-9]/.test(
          password
        )
      ) {
        score++;
      }

      return score;
    }, [
      form.newPassword,
    ]);

  const strengthText = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][strength];

  const handleChange =
    event => {
      setForm(prev => ({
        ...prev,

        [event.target.name]:
          event.target.value,
      }));
    };

  const togglePassword =
    field => {
      setShow(prev => ({
        ...prev,

        [field]:
          !prev[field],
      }));
    };

  const resetForm = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShow({
      current: false,
      new: false,
      confirm: false,
    });
  };

  const handleClose = () => {
    if (saving) {
      return;
    }

    resetForm();

    onClose();
  };

  const handleSubmit =
    async event => {
      event.preventDefault();

      if (
        !form.currentPassword ||
        !form.newPassword ||
        !form.confirmPassword
      ) {
        toast.error(
          "Please fill all fields."
        );

        return;
      }

      if (
        form.newPassword.length <
        8
      ) {
        toast.error(
          "Password must contain at least 8 characters."
        );

        return;
      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {
        toast.error(
          "Passwords do not match."
        );

        return;
      }

      if (
        form.currentPassword ===
        form.newPassword
      ) {
        toast.error(
          "New password must be different from the current password."
        );

        return;
      }

      setSaving(true);

      try {
        const response =
          await changePassword({
            currentPassword:
              form.currentPassword,

            newPassword:
              form.newPassword,
          });

        if (
          response?.success
        ) {
          toast.success(
            response.message ||
              "Password changed successfully."
          );

          resetForm();

          onClose();

          return;
        }

        toast.error(
          response?.message ||
            "Unable to change password."
        );

      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Unable to change password. Please try again."
        );
      } finally {
        setSaving(false);
      }
    };

  if (!open) {
    return null;
  }

  return (
    <AnimatePresence>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >

        <motion.div
          initial={{
            scale: 0.9,
            y: 30,
          }}
          animate={{
            scale: 1,
            y: 0,
          }}
          exit={{
            scale: 0.9,
            y: 30,
          }}
          transition={{
            duration: 0.25,
          }}
          className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >

          <div className="flex items-center justify-between bg-gradient-to-r from-[#0B6B57] to-[#12A67D] p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <FaLock className="text-xl text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Change Password
                </h2>

                <p className="text-sm text-white/80">
                  Update your account password
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={
                handleClose
              }
              disabled={
                saving
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white disabled:opacity-50"
            >
              <FaTimes />
            </button>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5 p-6"
          >

            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={
                form.currentPassword
              }
              visible={
                show.current
              }
              onToggle={() =>
                togglePassword(
                  "current"
                )
              }
              onChange={
                handleChange
              }
              disabled={
                saving
              }
            />

            <PasswordInput
              label="New Password"
              name="newPassword"
              value={
                form.newPassword
              }
              visible={
                show.new
              }
              onToggle={() =>
                togglePassword(
                  "new"
                )
              }
              onChange={
                handleChange
              }
              disabled={
                saving
              }
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={
                form.confirmPassword
              }
              visible={
                show.confirm
              }
              onToggle={() =>
                togglePassword(
                  "confirm"
                )
              }
              onChange={
                handleChange
              }
              disabled={
                saving
              }
            />

            <div>

              <div className="mb-2 flex justify-between text-sm">

                <span>
                  Password Strength
                </span>

                <span className="font-semibold">
                  {strengthText}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                <motion.div
                  animate={{
                    width:
                      `${strength * 20}%`,
                  }}
                  className="h-full bg-[#0B6B57]"
                />

              </div>

            </div>

            <div className="flex justify-end gap-3 pt-3">

              <button
                type="button"
                onClick={
                  handleClose
                }
                disabled={
                  saving
                }
                className="rounded-xl border px-6 py-3 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  saving
                }
                className="flex items-center gap-2 rounded-xl bg-[#0B6B57] px-6 py-3 text-white hover:bg-[#095544] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSave />

                {saving
                  ? "Saving..."
                  : "Save Password"}
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
  disabled,
  ...props
}) {
  return (
    <div>

      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <div className="flex items-center rounded-xl border px-4 py-3">

        <input
          {...props}
          disabled={
            disabled
          }
          type={
            visible
              ? "text"
              : "password"
          }
          className="flex-1 bg-transparent outline-none disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={
            onToggle
          }
          disabled={
            disabled
          }
          className="text-gray-500 disabled:opacity-50"
        >
          {visible
            ? <FaEyeSlash />
            : <FaEye />}
        </button>

      </div>

    </div>
  );
}