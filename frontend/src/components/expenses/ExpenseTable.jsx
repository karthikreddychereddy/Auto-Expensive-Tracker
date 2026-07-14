import {
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaBolt,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const expenses = [
  {
    id: 1,
    title: "Domino's Pizza",
    category: "Food",
    payment: "UPI",
    date: "Today",
    amount: "₹420",
    icon: <FaUtensils />,
  },
  {
    id: 2,
    title: "Uber Ride",
    category: "Transport",
    payment: "Card",
    date: "Today",
    amount: "₹285",
    icon: <FaCar />,
  },
  {
    id: 3,
    title: "Amazon",
    category: "Shopping",
    payment: "UPI",
    date: "Yesterday",
    amount: "₹1,250",
    icon: <FaShoppingBag />,
  },
  {
    id: 4,
    title: "Electricity Bill",
    category: "Bills",
    payment: "Net Banking",
    date: "02 Jul",
    amount: "₹1,580",
    icon: <FaBolt />,
  },
];

export default function ExpenseTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <div className="px-6 py-5 border-b">

        <h2 className="text-2xl font-bold">

          Recent Expenses

        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="text-left p-5">Expense</th>

            <th className="text-left">Category</th>

            <th className="text-left">Payment</th>

            <th className="text-left">Date</th>

            <th className="text-right">Amount</th>

            <th className="text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr
              key={expense.id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="p-5">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-green-100 text-[#0B6B57] flex items-center justify-center text-xl">

                    {expense.icon}

                  </div>

                  <span className="font-semibold">

                    {expense.title}

                  </span>

                </div>

              </td>

              <td>

                {expense.category}

              </td>

              <td>

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                  {expense.payment}

                </span>

              </td>

              <td>

                {expense.date}

              </td>

              <td className="text-right font-bold text-red-500">

                {expense.amount}

              </td>

              <td>

                <div className="flex justify-center gap-4">

                  <button>

                    <FaEye />

                  </button>

                  <button>

                    <FaEdit className="text-blue-500"/>

                  </button>

                  <button>

                    <FaTrash className="text-red-500"/>

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}