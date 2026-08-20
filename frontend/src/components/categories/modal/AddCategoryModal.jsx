import {
  useState,
} from "react";

import {
  FaTimes,
} from "react-icons/fa";

import CategoryForm from "./CategoryForm";
import CategoryFooter from "./CategoryFooter";

import {
  useCategory,
} from "../../../context/CategoryContext";

export default function AddCategoryModal({
  open,
  onClose,
  initialCategory,
}) {
  const {
    addCategory,
    updateCategory,
  } = useCategory();

  const [
    submitForm,
    setSubmitForm,
  ] = useState(null);

  const [
    saving,
    setSaving,
  ] = useState(false);

  if (!open) {
    return null;
  }

  const handleSave =
    async data => {
      if (saving) {
        return;
      }

      try {
        setSaving(true);

        if (initialCategory) {
          await updateCategory(
            initialCategory.id,
            data
          );
        } else {
          await addCategory(
            data
          );
        }

        onClose?.();

      } catch (error) {
        console.error(
          "Category save failed:",
          error
        );

      } finally {
        setSaving(false);
      }
    };

  return (
    <div
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
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          dark:bg-slate-900
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            bg-white
            px-6
            py-5
            dark:border-slate-700
            dark:bg-slate-900
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
                dark:text-white
                sm:text-3xl
              "
            >
              {initialCategory
                ? "Edit Category"
                : "Add Category"}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {initialCategory
                ? "Update category details, icon and color."
                : "Create a category for expenses and budgets."}
            </p>

          </div>

          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              saving
            }
            aria-label="Close category modal"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-slate-100
              disabled:opacity-50
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            <FaTimes
              size={18}
            />
          </button>

        </div>

        {/* SCROLLABLE BODY */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
          "
        >
          <CategoryForm
            initial={
              initialCategory
            }
            onSubmit={
              handleSave
            }
            registerSubmit={
              setSubmitForm
            }
          />
        </div>

        {/* FIXED FOOTER */}

        <div
          className="
            shrink-0
            border-t
            border-slate-200
            bg-white
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <CategoryFooter
            onClose={
              onClose
            }
            onSave={() => {
              if (
                saving ||
                !submitForm
              ) {
                return;
              }

              submitForm();
            }}
            buttonText={
              saving
                ? "Saving..."
                : initialCategory
                ? "Update Category"
                : "Save Category"
            }
          />
        </div>

      </div>
    </div>
  );
}