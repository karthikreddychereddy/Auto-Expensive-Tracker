import {
  useState,
} from "react";

import {
  FaEdit,
  FaTrash,
  FaLayerGroup,
} from "react-icons/fa";

import {
  useCategory,
} from "../../context/CategoryContext";

import {
  useModal,
} from "../../context/ModalContext";

import ConfirmModal from "../common/ConfirmModal";

export default function CategoryGrid() {
  const {
    filteredCategories,
    deleteCategory,
  } = useCategory();

  const {
    openModal,
  } = useModal();

  const [
    confirmOpen,
    setConfirmOpen,
  ] = useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit =
    category => {
      openModal(
        "category",
        category
      );
    };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDeleteClick =
    category => {
      setSelectedCategory(
        category
      );

      setConfirmOpen(
        true
      );
    };

  const handleDelete =
    async () => {
      if (
        !selectedCategory ||
        deleting
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteCategory(
          selectedCategory.id
        );

        setConfirmOpen(
          false
        );

        setSelectedCategory(
          null
        );

      } catch (error) {
        console.error(
          "Failed to delete category:",
          error
        );

      } finally {
        setDeleting(false);
      }
    };

  const closeDeleteModal =
    () => {
      if (deleting) {
        return;
      }

      setConfirmOpen(
        false
      );

      setSelectedCategory(
        null
      );
    };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (
    filteredCategories.length === 0
  ) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-6
          py-12
          text-center
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-xl
            text-slate-400
            dark:bg-slate-800
          "
        >
          <FaLayerGroup />
        </div>

        <h3
          className="
            mt-4
            text-lg
            font-bold
            text-slate-700
            dark:text-white
          "
        >
          No categories found
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Create a category to organize your expenses and budgets.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {filteredCategories.map(
          category => (
            <div
              key={category.id}
              className="
                group
                relative
                min-w-0
                overflow-hidden
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#0B6B57]/30
                hover:shadow-lg
                dark:border-slate-800
                dark:bg-slate-900
              "
            >

              {/* ACTIONS */}

              <div
                className="
                  absolute
                  right-3
                  top-3
                  flex
                  gap-1.5
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(
                      category
                    )
                  }
                  title="Edit category"
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-blue-100
                    bg-blue-50
                    text-blue-600
                    transition
                    hover:bg-blue-600
                    hover:text-white
                    dark:border-blue-900/40
                    dark:bg-blue-950/30
                  "
                >
                  <FaEdit
                    size={11}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteClick(
                      category
                    )
                  }
                  title="Delete category"
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-red-100
                    bg-red-50
                    text-red-500
                    transition
                    hover:bg-red-500
                    hover:text-white
                    dark:border-red-900/40
                    dark:bg-red-950/30
                  "
                >
                  <FaTrash
                    size={10}
                  />
                </button>
              </div>

              {/* ICON */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  text-xl
                  shadow-sm
                "
                style={{
                  backgroundColor:
                    category.color ||
                    "#E5E7EB",
                }}
              >
                {category.icon ||
                  "📦"}
              </div>

              {/* CONTENT */}

              <div className="mt-3 pr-14">

                <h3
                  className="
                    truncate
                    text-base
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                  title={
                    category.name
                  }
                >
                  {category.name}
                </h3>

                <p
                  className="
                    mt-1
                    line-clamp-2
                    min-h-[32px]
                    text-xs
                    leading-4
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {category.description ||
                    "No description"}
                </p>

              </div>

              {/* FOOTER */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  gap-2
                  border-t
                  border-slate-100
                  pt-3
                  dark:border-slate-800
                "
              >
                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-[#0B6B57]/10
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    text-[#0B6B57]
                  "
                >
                  Category
                </span>

                <span
                  className="
                    min-w-0
                    truncate
                    text-[10px]
                    text-slate-400
                  "
                  title="Available in Expenses & Budgets"
                >
                  Expenses & Budgets
                </span>
              </div>

            </div>
          )
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete Category"
        message={
          selectedCategory
            ? `Delete "${selectedCategory.name}" category?`
            : "Delete this category?"
        }
        confirmText={
          deleting
            ? "Deleting..."
            : "Delete"
        }
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </>
  );
}