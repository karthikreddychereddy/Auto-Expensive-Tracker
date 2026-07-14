export default function SavingsFooter({

  onClose,

  onSave,

  buttonText,

}) {

  return (

    <div className="border-t p-6 flex justify-end gap-4">

      <button

        onClick={onClose}

        className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"

      >

        Cancel

      </button>

      <button

        onClick={onSave}

        className="px-6 py-3 rounded-xl bg-[#0B6B57] text-white hover:bg-[#095746] transition"

      >

        {buttonText}

      </button>

    </div>

  );

}