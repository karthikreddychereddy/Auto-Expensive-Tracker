import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

const CATEGORY_ICONS = [
  "🍔",
  "🛒",
  "🚕",
  "🏠",
  "🎬",
  "🏥",
  "📚",
  "📈",
  "🎁",
  "💡",
  "⛽",
  "💊",
  "✈️",
  "🏋️",
  "🐾",
  "💻",
  "📱",
  "☕",
  "👕",
  "🔧",
  "💰",
  "📦",
];

const CATEGORY_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#F7B731",
  "#9B59B6",
  "#2ECC71",
  "#3498DB",
  "#16A085",
  "#E84393",
  "#F97316",
  "#6366F1",
  "#0B6B57",
];

const EMPTY_FORM = {
  name: "",
  description: "",
  icon: "📦",
  color: "#0B6B57",
};

export default function CategoryForm({
  initial,
  onSubmit,
  registerSubmit,
}) {
  const [
    form,
    setForm,
  ] = useState(
    EMPTY_FORM
  );

  useEffect(() => {
    if (initial) {
      setForm({
        name:
          initial.name || "",

        description:
          initial.description ||
          "",

        icon:
          initial.icon ||
          "📦",

        color:
          initial.color ||
          "#0B6B57",
      });

      return;
    }

    setForm(
      EMPTY_FORM
    );
  }, [initial]);

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

  const handleSubmit =
    async () => {
      const name =
        form.name.trim();

      if (!name) {
        toast.error(
          "Please enter a category name"
        );

        return false;
      }

      try {
        await onSubmit({
          ...form,
          name,
          description:
            form.description.trim(),
        });

        return true;

      } catch (error) {
        console.error(
          "Category submit failed:",
          error
        );

        return false;
      }
    };

  useEffect(() => {
    if (!registerSubmit) {
      return;
    }

    registerSubmit(
      () =>
        handleSubmit
    );
  }, [
    form,
    registerSubmit,
  ]);

  return (
    <div className="space-y-6 p-8">

      {/* NAME */}

      <div>

        <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-200">
          Category Name
        </label>

        <input
          name="name"
          value={
            form.name
          }
          onChange={
            handleChange
          }
          placeholder="Example: Pet Care"
          maxLength={50}
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-[#0B6B57]
            focus:ring-2
            focus:ring-[#0B6B57]/10
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        />

      </div>

      {/* DESCRIPTION */}

      <div>

        <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-200">
          Description
        </label>

        <textarea
          name="description"
          value={
            form.description
          }
          onChange={
            handleChange
          }
          placeholder="What will this category be used for?"
          rows={3}
          maxLength={150}
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-[#0B6B57]
            focus:ring-2
            focus:ring-[#0B6B57]/10
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
          "
        />

      </div>

      {/* ICON */}

      <div>

        <label className="mb-3 block font-semibold text-slate-700 dark:text-slate-200">
          Choose Icon
        </label>

        <div className="grid grid-cols-6 gap-3 sm:grid-cols-8">

          {CATEGORY_ICONS.map(
            icon => (
              <button
                key={icon}
                type="button"
                onClick={() =>
                  setForm(
                    previous => ({
                      ...previous,
                      icon,
                    })
                  )
                }
                className={`
                  flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  text-2xl
                  transition
                  ${
                    form.icon ===
                    icon
                      ? "border-[#0B6B57] bg-[#0B6B57]/10 ring-2 ring-[#0B6B57]/20"
                      : "border-slate-200 hover:border-[#0B6B57] dark:border-slate-700"
                  }
                `}
              >
                {icon}
              </button>
            )
          )}

        </div>

        <div className="mt-4">

          <label className="mb-2 block text-sm font-medium text-slate-500">
            Custom icon
          </label>

          <input
            name="icon"
            value={
              form.icon
            }
            onChange={
              handleChange
            }
            maxLength={10}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              px-4
              py-3
              text-xl
              outline-none
              focus:border-[#0B6B57]
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
            "
          />

        </div>

      </div>

      {/* COLOR */}

      <div>

        <label className="mb-3 block font-semibold text-slate-700 dark:text-slate-200">
          Category Color
        </label>

        <div className="flex flex-wrap gap-3">

          {CATEGORY_COLORS.map(
            color => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setForm(
                    previous => ({
                      ...previous,
                      color,
                    })
                  )
                }
                className={`
                  h-10
                  w-10
                  rounded-full
                  border-4
                  transition
                  hover:scale-110
                  ${
                    form.color ===
                    color
                      ? "border-slate-700 shadow-md dark:border-white"
                      : "border-transparent"
                  }
                `}
                style={{
                  backgroundColor:
                    color,
                }}
              />
            )
          )}

          <input
            type="color"
            name="color"
            value={
              form.color
            }
            onChange={
              handleChange
            }
            title="Custom color"
            className="h-10 w-10 cursor-pointer rounded-full"
          />

        </div>

      </div>

      {/* PREVIEW */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Preview
        </p>

        <div className="mt-4 flex items-center gap-4">

          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
            style={{
              backgroundColor:
                form.color,
            }}
          >
            {form.icon ||
              "📦"}
          </div>

          <div>

            <h3 className="font-bold text-slate-800 dark:text-white">
              {form.name ||
                "Category Name"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {form.description ||
                "Category description"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}