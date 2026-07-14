import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { formatCurrency } from "../../utils/format";

import { useIncome } from "../../context/IncomeContext";
import { useModal } from "../../context/ModalContext";

import ConfirmModal from "../common/ConfirmModal";

export default function IncomeHistory() {

  const {

    filteredIncome,
    deleteIncome,

  } = useIncome();

  const {

    openModal,

  } = useModal();

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleDeleteClick = (item) => {

    setSelectedIncome(item);

    setConfirmOpen(true);

  };

  const handleDelete = () => {

    if (selectedIncome) {

      deleteIncome(selectedIncome.id);

    }

    setConfirmOpen(false);

    setSelectedIncome(null);

  };

  return (

    <>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold">

              Income History

            </h2>

            <p className="text-gray-500 mt-1">

              Recent income transactions.

            </p>

          </div>

        </div>

        <div className="space-y-4">

          {filteredIncome.map((item) => (

            <div

              key={item.id}

              className="flex justify-between items-center border rounded-2xl p-4 hover:bg-gray-50 transition"

            >

              <div>

                <h3 className="font-semibold text-lg">

                  {item.source}

                </h3>

                <p className="text-gray-500 text-sm">

                  {item.incomeDate} • {item.category}

                </p>

              </div>

              <div className="flex items-center gap-6">

                <span className="text-xl font-bold text-green-600">

                  {formatCurrency(item.amount)}

                </span>

                <button

                  onClick={() => openModal("income", item)}

                  className="text-blue-600 hover:text-blue-800"

                >

                  <FaEdit />

                </button>

                <button

                  onClick={() => handleDeleteClick(item)}

                  className="text-red-500 hover:text-red-700"

                >

                  <FaTrash />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ConfirmModal

        open={confirmOpen}

        title="Delete Income"

        message={`Are you sure you want to delete "${selectedIncome?.source}"? This action cannot be undone.`}

        confirmText="Delete"

        cancelText="Cancel"

        onConfirm={handleDelete}

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedIncome(null);

        }}

      />

    </>

  );

}