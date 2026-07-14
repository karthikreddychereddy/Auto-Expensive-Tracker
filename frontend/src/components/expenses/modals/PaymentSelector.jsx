import { PAYMENT_METHODS } from "../../../constants/expenseConstants";

export default function PaymentSelector({

    selectedMethod,

    onSelect,

    error,

}) {

    return (

        <div>

            <label className="font-semibold text-gray-700">

                Payment Method

            </label>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">

                {PAYMENT_METHODS.map((method) => (

                    <button
                        key={method.id}
                        type="button"
                        onClick={() => onSelect(method.name)}
                        className={`border rounded-xl py-4 transition

                        ${
                            selectedMethod === method.name
                                ? "bg-[#0B6B57] text-white border-[#0B6B57]"
                                : "hover:bg-gray-50"
                        }`}
                    >

                        <div className="text-3xl">

                            {method.icon}

                        </div>

                        <p className="mt-2">

                            {method.name}

                        </p>

                    </button>

                ))}

            </div>

            {error && (

                <p className="text-red-500 text-sm mt-2">

                    {error}

                </p>

            )}

        </div>

    );
}