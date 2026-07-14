import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";


export default function GoalForm({

    initial,

    onSubmit,

    registerSubmit,

}) {


    const [form, setForm] = useState({

        goalName: "",

        targetAmount: "",

        savedAmount: "",

        targetDate: "",

    });



    useEffect(() => {


        if (initial) {


            setForm({

                goalName: initial.goalName || "",

                targetAmount: initial.targetAmount || "",

                savedAmount: initial.savedAmount || "",

                targetDate: initial.targetDate || "",

            });


        }


    }, [initial]);




    const handleChange = (e) => {


        setForm(prev => ({

            ...prev,

            [e.target.name]: e.target.value,

        }));


    };





    const handleSubmit = useCallback(() => {



        if (!form.goalName.trim()) {


            toast.error("Please enter goal name");

            return;


        }




        if (!form.targetAmount || Number(form.targetAmount) <= 0) {


            toast.error("Enter valid target amount");

            return;


        }




        if (
            form.savedAmount !== "" &&
            Number(form.savedAmount) < 0
        ) {


            toast.error("Saved amount cannot be negative");

            return;


        }




        onSubmit({

            goalName: form.goalName,

            targetAmount: Number(form.targetAmount),

            savedAmount:

                form.savedAmount === ""

                    ? 0

                    : Number(form.savedAmount),

            targetDate: form.targetDate,

        });



    }, [form, onSubmit]);





    useEffect(() => {


        registerSubmit?.(() => handleSubmit);


    }, [handleSubmit, registerSubmit]);






    return (



        <div className="p-8 grid md:grid-cols-2 gap-6">





            <div>


                <label className="block font-medium mb-2">

                    Goal Name

                </label>



                <input

                    name="goalName"

                    placeholder="Emergency Fund"

                    value={form.goalName}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                />


            </div>





            <div>


                <label className="block font-medium mb-2">

                    Target Amount

                </label>



                <input

                    type="number"

                    name="targetAmount"

                    value={form.targetAmount}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                />


            </div>






            <div>


                <label className="block font-medium mb-2">

                    Saved Amount

                </label>



                <input

                    type="number"

                    name="savedAmount"

                    value={form.savedAmount}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                />


            </div>







            <div>


                <label className="block font-medium mb-2">

                    Target Date

                </label>



                <input

                    type="date"

                    name="targetDate"

                    value={form.targetDate}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                />


            </div>




        </div>


    );


}