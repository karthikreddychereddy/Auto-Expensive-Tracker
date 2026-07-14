import { useState } from "react";

import { FaTimes } from "react-icons/fa";

import CategoryForm from "./CategoryForm";
import CategoryFooter from "./CategoryFooter";

import { useCategory } from "../../../context/CategoryContext";

export default function AddCategoryModal({

    open,

    onClose,

    initialCategory,

}) {

    const {

        addCategory,

        updateCategory,

    } = useCategory();

    const [submitForm, setSubmitForm] = useState(null);

    if (!open) return null;

    const handleSave = async (data) => {

        if (initialCategory) {

            await updateCategory(
                initialCategory.id,
                data
            );

        } else {

            await addCategory(data);

        }

        onClose();

    };

    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">

                <div className="border-b p-6 flex justify-between">

                    <div>

                        <h2 className="text-3xl font-bold">

                            {initialCategory ? "Edit Category" : "Add Category"}

                        </h2>

                    </div>

                    <button onClick={onClose}>

                        <FaTimes />

                    </button>

                </div>

                <CategoryForm

                    initial={initialCategory}

                    onSubmit={handleSave}

                    registerSubmit={setSubmitForm}

                />

                <CategoryFooter

                    onClose={onClose}

                    onSave={() => {

                        if (submitForm) {

                            const success = submitForm();

                            if (success === false) return;

                        }

                    }}

                    buttonText={

                        initialCategory

                            ? "Update"

                            : "Save"

                    }

                />

            </div>

        </div>

    );

}