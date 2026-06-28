export default function Features() {

    const data = [

        {
            title: "AI Categorization",
            desc: "Automatically categorize expenses."
        },

        {
            title: "SMS Tracking",
            desc: "Detect payment messages instantly."
        },

        {
            title: "Receipt OCR",
            desc: "Scan bills using camera."
        }

    ];

    return (

        <section className="bg-gray-100 py-20">

            <div className="max-w-7xl mx-auto">

                <h2 className="text-4xl font-bold text-center">

                    Powerful Features

                </h2>

                <div className="grid md:grid-cols-3 gap-8 mt-16">

                    {

                        data.map((item,index)=>(

                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8"
                            >

                                <h3 className="text-2xl font-bold">

                                    {item.title}

                                </h3>

                                <p className="mt-4 text-gray-600">

                                    {item.desc}

                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}