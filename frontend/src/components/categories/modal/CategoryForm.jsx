import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoryForm({

    initial,

    onSubmit,

    registerSubmit,

}) {


    const [form, setForm] = useState({

        name: "",

        description: "",

        icon: "📦",

        color: "#E5E7EB",

    });



    useEffect(() => {

        if (initial) {

            setForm({

                name: initial.name || "",

                description: initial.description || "",

                icon: initial.icon || "📦",

                color: initial.color || "#E5E7EB",

            });

        }

    }, [initial]);



    const handleChange = (e) => {

        setForm((prev) => ({

            ...prev,

            [e.target.name]: e.target.value,

        }));

    };



    const handleSubmit = () => {


        if (form.name.trim() === "") {

            toast.error("Please enter a category name");

            return false;

        }


        onSubmit(form);


        return true;

    };



    useEffect(() => {

        if (registerSubmit) {

            registerSubmit(() => handleSubmit);

        }

    }, [form, registerSubmit]);



    return (

        <div className="p-8 space-y-6">


            <div>

                <label className="block font-medium mb-2">

                    Category Name

                </label>


                <input

                    name="name"

                    value={form.name}

                    onChange={handleChange}

                    placeholder="Food"

                    className="w-full border rounded-xl px-4 py-3"

                />

            </div>




            <div>

                <label className="block font-medium mb-2">

                    Description

                </label>


                <textarea

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                    placeholder="Category description"

                    rows={3}

                    className="w-full border rounded-xl px-4 py-3"

                />

            </div>




            <div>

                <label className="block font-medium mb-2">

                    Icon

                </label>


                <input

                    name="icon"

                    value={form.icon}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                />

            </div>




            <div>

                <label className="block font-medium mb-2">

                    Color

                </label>


                <input

                    type="color"

                    name="color"

                    value={form.color}

                    onChange={handleChange}

                    className="w-24 h-12"

                />

            </div>



        </div>

    );

}