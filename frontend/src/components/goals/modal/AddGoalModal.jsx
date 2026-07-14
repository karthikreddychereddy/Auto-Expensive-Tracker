import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import GoalForm from "./GoalForm";
import GoalFooter from "./GoalFooter";

import { useGoal } from "../../../context/GoalContext";

export default function AddGoalModal({

    open,

    onClose,

    initialGoal,

}) {

    const {
        addGoal,
        updateGoal,
    } = useGoal();

    const [submitForm, setSubmitForm] = useState(null);

    if (!open) return null;


    const handleSave = async (goalData) => {

        if (initialGoal) {

            await updateGoal(
                initialGoal.id,
                goalData
            );

        } else {

            await addGoal(goalData);

        }

        onClose();

    };


    return (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">


                <div className="flex justify-between items-center border-b p-6">

                    <div>

                        <h2 className="text-3xl font-bold">

                            {initialGoal 
                                ? "Edit Goal" 
                                : "Add Goal"
                            }

                        </h2>

                        <p className="text-gray-500 mt-1">

                            Track your financial goals.

                        </p>

                    </div>


                    <button

                        onClick={onClose}

                        className="hover:bg-gray-100 rounded-full p-2"

                    >

                        <FaTimes size={22}/>

                    </button>


                </div>


                <GoalForm

                    initial={initialGoal}

                    onSubmit={handleSave}

                    registerSubmit={setSubmitForm}

                />


                <GoalFooter

                    onClose={onClose}

                    onSave={() => {

                        if (submitForm) {

                            submitForm();

                        }

                    }}

                    buttonText={

                        initialGoal

                        ? "Update Goal"

                        : "Save Goal"

                    }

                />


            </div>

        </div>

    );

}