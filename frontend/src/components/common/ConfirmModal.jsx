import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({

  open,

  title,

  message,

  confirmText = "Delete",

  cancelText = "Cancel",

  onConfirm,

  onCancel,

}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="flex flex-col items-center">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

            <FaExclamationTriangle className="text-red-600 text-3xl" />

          </div>

          <h2 className="text-2xl font-bold mt-5">

            {title}

          </h2>

          <p className="text-gray-500 mt-3 text-center">

            {message}

          </p>

          <div className="flex gap-4 mt-8 w-full">

            <button

              onClick={onCancel}

              className="flex-1 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition"

            >

              {cancelText}

            </button>

            <button

              onClick={onConfirm}

              className="flex-1 bg-red-600 text-white rounded-xl py-3 hover:bg-red-700 transition"

            >

              {confirmText}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}