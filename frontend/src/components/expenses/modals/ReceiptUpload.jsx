import { FaReceipt } from "react-icons/fa";

export default function ReceiptUpload() {
  return (
    <div className="p-10">

      <div className="border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center">

        <FaReceipt
          size={70}
          className="mx-auto text-[#0B6B57]"
        />

        <h2 className="text-2xl font-bold mt-6">
          Upload Receipt
        </h2>

        <p className="text-gray-500 mt-3">

          AI will automatically detect

          <br />

          Merchant

          • Amount

          • Category

          • Date

        </p>

        <button
          className="mt-8 bg-[#0B6B57] hover:bg-[#095846] text-white px-8 py-3 rounded-xl"
        >
          Choose Receipt
        </button>

      </div>

    </div>
  );
}