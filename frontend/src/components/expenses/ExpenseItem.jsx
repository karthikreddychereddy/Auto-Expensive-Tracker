export default function ExpenseItem({ expense }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border">

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold text-lg">
            {expense.title}
          </h3>

          <p className="text-gray-500 mt-1">
            {expense.category}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            {expense.date}
          </p>

        </div>

        <div className="text-right">

          <h2 className="text-2xl font-bold text-red-500">
            ₹{expense.amount}
          </h2>

          <p className="text-sm text-gray-500">
            {expense.payment}
          </p>

        </div>

      </div>

    </div>
  );
}