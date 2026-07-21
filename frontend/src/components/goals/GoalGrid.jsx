import { FaEdit, FaTrash } from "react-icons/fa";

import { useGoal } from "../../context/GoalContext";
import { useModal } from "../../context/ModalContext";

import ConfirmModal from "../common/ConfirmModal";

import { useState } from "react";

export default function GoalGrid() {

    const {

        filteredGoals,

        deleteGoal,

    } = useGoal();

    const { openModal } = useModal();

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [selectedGoal, setSelectedGoal] = useState(null);

    const handleDeleteClick = (goal) => {

        setSelectedGoal(goal);

        setConfirmOpen(true);

    };

    const handleDelete = () => {

        deleteGoal(selectedGoal.id);

        setConfirmOpen(false);

    };

    return (

        <>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

                {filteredGoals.map(item => {

                    const percentage = Math.min(

                        item.targetAmount > 0
                            ? (Number(item.savedAmount || 0) /
                            Number(item.targetAmount)) * 100
                            : 0,

                        100

                    );

                    return (

                        <div

                            key={item.id}

                            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"

                        >

                            <div className="flex justify-between">

                                <h2 className="text-xl font-bold">

                                    {item.title}

                                </h2>

                                <div className="flex gap-3">

                                    <button

                                        onClick={() =>

                                            openModal("goal", item)

                                        }

                                    >

                                        <FaEdit />

                                    </button>

                                    <button

                                        onClick={() =>

                                            handleDeleteClick(item)

                                        }

                                        className="text-red-500"

                                    >

                                        <FaTrash />

                                    </button>

                                </div>

                            </div>

                            <p className="text-sm text-gray-500 mt-3">

                                Deadline : {item.deadline}

                            </p>

                            <div className="mt-5">

                                <div className="w-full h-4 rounded-full bg-gray-200">

                                    <div

                                        className="h-full bg-[#0B6B57] rounded-full"

                                        style={{

                                            width:`${percentage}%`

                                        }}

                                    />

                                </div>

                                <div className="flex justify-between text-sm mt-2">

                                    <span>

                                        {percentage.toFixed(0)}%

                                    </span>

                                    <span>

                                        ₹{item.savedAmount.toLocaleString()} / ₹{item.targetAmount.toLocaleString()}

                                    </span>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            <ConfirmModal

                open={confirmOpen}

                title="Delete Goal"

                message={`Delete "${selectedGoal?.title}" ?`}

                confirmText="Delete"

                cancelText="Cancel"

                onConfirm={handleDelete}

                onCancel={() => {

                    setConfirmOpen(false);

                    setSelectedGoal(null);

                }}

            />

        </>

    );

}