import { FaTrashAlt } from "react-icons/fa";

export default function NotificationDeleteModal({

  open,

  onClose,

  onConfirm,

}) {

  if (!open) return null;

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-[100]
      "
    >

      <div
        className="
        w-[380px]
        rounded-2xl
        bg-white
        dark:bg-slate-800
        shadow-2xl
        p-6
        "
      >

        <div
          className="
          flex
          justify-center
          mb-4
          "
        >

          <div
            className="
            w-14
            h-14
            rounded-full
            bg-red-100
            flex
            items-center
            justify-center
            "
          >

            <FaTrashAlt
              className="
              text-red-500
              text-xl
              "
            />

          </div>

        </div>

        <h2
          className="
          text-xl
          font-semibold
          text-center
          dark:text-white
          "
        >

          Delete Notification?

        </h2>

        <p
          className="
          mt-3
          text-sm
          text-center
          text-gray-500
          "
        >

          This notification will be permanently removed.

          This action cannot be undone.

        </p>

        <div
          className="
          flex
          gap-3
          mt-8
          "
        >

          <button

            onClick={onClose}

            className="
            flex-1
            py-3
            rounded-xl
            border
            border-gray-300
            hover:bg-gray-100
            dark:hover:bg-slate-700
            transition
            "

          >

            Cancel

          </button>

          <button

            onClick={onConfirm}

            className="
            flex-1
            py-3
            rounded-xl
            bg-red-500
            text-white
            hover:bg-red-600
            transition
            "

          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

}