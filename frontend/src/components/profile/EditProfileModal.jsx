import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTimes,
  FaSave,
  FaTrash,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  useProfile,
} from "../../context/ProfileContext";

import {
  useModal,
} from "../../context/ModalContext";

function resizeImage(file) {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = event => {
        const img =
          new Image();

        img.onload = () => {
          const canvas =
            document.createElement(
              "canvas"
            );

          const maxSize = 300;

          let width =
            img.width;

          let height =
            img.height;

          if (
            width >
            height
          ) {
            if (
              width >
              maxSize
            ) {
              height =
                (height *
                  maxSize) /
                width;

              width =
                maxSize;
            }
          } else if (
            height >
            maxSize
          ) {
            width =
              (width *
                maxSize) /
              height;

            height =
              maxSize;
          }

          canvas.width =
            Math.round(width);

          canvas.height =
            Math.round(height);

          const context =
            canvas.getContext(
              "2d"
            );

          context.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
          );

          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.75
            )
          );
        };

        img.onerror =
          reject;

        img.src =
          event.target.result;
      };

      reader.onerror =
        reject;

      reader.readAsDataURL(
        file
      );
    }
  );
}

export default function EditProfileModal() {
  const {
    profile,
    updateProfile,
  } = useProfile();

  const {
    activeModal,
    closeModal,
  } = useModal();

  const [
    form,
    setForm,
  ] = useState({});

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    setForm(
      profile || {}
    );
  }, [profile]);

  if (
    activeModal !==
    "profile"
  ) {
    return null;
  }

  const firstName =
    form.firstName || "";

  const lastName =
    form.lastName || "";

  const displayName =
    form.name ||
    `${firstName} ${lastName}`.trim() ||
    "PaisaTrack User";

  const profileImage =
    form.photo ||
    form.profileImage ||
    null;

  const avatarUrl =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=0B6B57&color=fff&size=300`;

  const handleChange =
    event => {
      const {
        name,
        value,
      } = event.target;

      setForm(previous => ({
        ...previous,
        [name]: value,
      }));
    };

  const handleImage =
    async event => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        toast.error(
          "Please select an image file."
        );

        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        toast.error(
          "Image must be smaller than 5 MB."
        );

        return;
      }

      try {
        const image =
          await resizeImage(
            file
          );

        setForm(previous => ({
          ...previous,

          photo: image,

          profileImage:
            image,
        }));
      } catch (error) {
        console.error(
          "Profile image error:",
          error
        );

        toast.error(
          "Unable to process image."
        );
      }
    };

  const handleRemovePhoto =
    () => {
      setForm(previous => ({
        ...previous,

        photo: null,

        profileImage:
          null,
      }));

      toast.success(
        "Photo removed. Save changes to confirm."
      );
    };

  const handleSubmit =
    async event => {
      event.preventDefault();

      if (
        !firstName.trim()
      ) {
        toast.error(
          "First name is required."
        );

        return;
      }

      setSaving(true);

      try {
        await updateProfile(
          form
        );

        toast.success(
          "Profile updated successfully."
        );

        closeModal();
      } catch (error) {
        console.error(
          "Profile update failed:",
          error
        );

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to update profile."
        );
      } finally {
        setSaving(false);
      }
    };

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
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/50
          p-4
          backdrop-blur-sm
        "
      >
        <motion.div
          initial={{
            scale: 0.96,
            y: 20,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
          }}
          exit={{
            scale: 0.96,
            y: 20,
            opacity: 0,
          }}
          className="
            max-h-[90vh]
            w-full
            max-w-3xl
            overflow-y-auto
            rounded-3xl
            bg-white
            shadow-2xl
            dark:bg-slate-900
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              bg-gradient-to-r
              from-[#0B6B57]
              to-[#12A67D]
              px-6
              py-5
            "
          >
            <div>
              <h2 className="text-xl font-bold text-white">
                Edit Profile
              </h2>

              <p className="mt-1 text-sm text-white/75">
                Update your personal information.
              </p>
            </div>

            <button
              type="button"
              onClick={
                closeModal
              }
              aria-label="Close profile editor"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white/15
                text-white
                transition
                hover:bg-white/25
              "
            >
              <FaTimes />
            </button>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="p-6 sm:p-8"
          >
            <div className="flex flex-col gap-8 md:flex-row">

              <div className="flex shrink-0 flex-col items-center">

                <div className="relative">
                  <img
                    src={
                      profileImage ||
                      avatarUrl
                    }
                    alt="Profile preview"
                    className="
                      h-28
                      w-28
                      rounded-full
                      border-4
                      border-slate-100
                      object-cover
                      shadow
                      dark:border-slate-700
                    "
                  />

                  <label
                    className="
                      absolute
                      bottom-0
                      right-0
                      flex
                      h-9
                      w-9
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0B6B57]
                      text-white
                      shadow
                    "
                  >
                    <FaCamera
                      size={14}
                    />

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImage
                      }
                    />
                  </label>
                </div>

                <p className="mt-3 max-w-[160px] truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {displayName}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG • Max 5 MB
                </p>

                {profileImage && (
                  <button
                    type="button"
                    onClick={
                      handleRemovePhoto
                    }
                    disabled={
                      saving
                    }
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-red-500
                      transition
                      hover:bg-red-50
                      disabled:opacity-50
                      dark:hover:bg-red-950/30
                    "
                  >
                    <FaTrash
                      size={11}
                    />

                    Remove Photo
                  </button>
                )}

              </div>

              <div className="grid min-w-0 flex-1 gap-5 sm:grid-cols-2">

                <Input
                  icon={
                    <FaUser />
                  }
                  label="First Name"
                  name="firstName"
                  value={
                    form.firstName ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <Input
                  icon={
                    <FaUser />
                  }
                  label="Last Name"
                  name="lastName"
                  value={
                    form.lastName ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                />

                <Input
                  icon={
                    <FaEnvelope />
                  }
                  label="Email"
                  value={
                    form.email ||
                    ""
                  }
                  disabled
                />

                <Input
                  icon={
                    <FaPhone />
                  }
                  label="Phone"
                  name="phone"
                  value={
                    form.phone ||
                    form.phoneNumber ||
                    ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={
                  saving
                }
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-5
                  py-3
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  disabled:opacity-60
                  dark:border-slate-700
                  dark:text-slate-200
                  dark:hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  saving
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#0B6B57]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#085443]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <FaSave />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Input({
  icon,
  label,
  disabled = false,
  ...props
}) {
  return (
    <label className="block min-w-0">

      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {label}
      </span>

      <div
        className={`
          mt-2
          flex
          items-center
          gap-3
          rounded-xl
          border
          px-3
          py-2
          ${
            disabled
              ? "border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60"
              : "border-slate-200 bg-slate-50 focus-within:border-[#0B6B57] dark:border-slate-700 dark:bg-slate-800"
          }
        `}
      >
        <span className="shrink-0 text-[#0B6B57]">
          {icon}
        </span>

        <input
          {...props}
          disabled={
            disabled
          }
          className="
            min-w-0
            w-full
            bg-transparent
            py-1
            text-sm
            text-slate-800
            outline-none
            disabled:cursor-not-allowed
            dark:text-white
          "
        />
      </div>

    </label>
  );
}