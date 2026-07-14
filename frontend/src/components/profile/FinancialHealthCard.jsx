export default function FinancialHealthCard() {

    const score = 82;

    return (

        <div className="bg-white rounded-3xl shadow border p-8">

            <h2 className="text-2xl font-bold mb-8">

                Financial Health

            </h2>

            <div className="flex justify-center">

                <div className="relative w-48 h-48">

                    <svg
                        className="w-full h-full rotate-[-90deg]"
                    >

                        <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="#E5E7EB"
                            strokeWidth="12"
                            fill="none"
                        />

                        <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="#0B6B57"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray="502"
                            strokeDashoffset={502 - (502 * score) / 100}
                            strokeLinecap="round"
                        />

                    </svg>

                    <div className="absolute inset-0 flex flex-col justify-center items-center">

                        <h1 className="text-4xl font-bold">

                            {score}

                        </h1>

                        <p className="text-gray-500">

                            /100

                        </p>

                    </div>

                </div>

            </div>

            <p className="text-center mt-6 text-green-600 font-semibold">

                Excellent Financial Health

            </p>

        </div>

    );

}