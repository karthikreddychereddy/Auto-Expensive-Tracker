export default function IncomeFooter({

  onClose,

  onSave,

  buttonText = "Save Income",

}) {

  return (

    <div className="border-t bg-gray-50 p-5 flex justify-end gap-4">

      <button

        onClick={onClose}

        className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"

      >

        Cancel

      </button>

      <button

        onClick={onSave}

        className="px-8 py-3 rounded-xl bg-[#0B6B57] hover:bg-[#095544] text-white font-semibold transition"

      >

        {buttonText}

      </button>

    </div>

  );

}