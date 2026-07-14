import { FaMobileAlt } from "react-icons/fa";

export default function SmsImport() {
  return (
    <div className="p-10 text-center">

      <FaMobileAlt
        size={70}
        className="mx-auto text-[#0B6B57]"
      />

      <h2 className="text-2xl font-bold mt-6">
        Import Transactions
      </h2>

      <p className="mt-4 text-gray-500">

        In the backend this feature will automatically read

        <br />

        • UPI SMS

        <br />

        • Credit Card SMS

        <br />

        • Debit Card SMS

        <br />

        • Wallet Transactions

      </p>

      <button
        className="mt-8 bg-[#0B6B57] text-white px-8 py-3 rounded-xl"
      >
        Import SMS
      </button>

    </div>
  );
}