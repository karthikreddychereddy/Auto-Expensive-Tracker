import { useExpenses } from "../../context/ExpenseContext";

export default function ExpenseFilters() {

  const {
    categoryFilter,
    setCategoryFilter,
    paymentFilter,
    setPaymentFilter,
  } = useExpenses();

  return (

    <div className="flex flex-wrap gap-4">

      <select
        value={categoryFilter}
        onChange={(e) =>
          setCategoryFilter(e.target.value)
        }
        className="px-5 py-3 rounded-xl border bg-white"
      >

        <option value="All">
          All Categories
        </option>

        <option value="Food">
          Food
        </option>

        <option value="Travel">
          Travel
        </option>

        <option value="Shopping">
          Shopping
        </option>

        <option value="Bills">
          Bills
        </option>

      </select>

      <select
        value={paymentFilter}
        onChange={(e) =>
          setPaymentFilter(e.target.value)
        }
        className="px-5 py-3 rounded-xl border bg-white"
      >

        <option value="All">
          All Payment Methods
        </option>

        <option value="UPI">
          UPI
        </option>

        <option value="Cash">
          Cash
        </option>

        <option value="Card">
          Card
        </option>

      </select>

      <select className="px-5 py-3 rounded-xl border bg-white">

        <option>This Month</option>

        <option>Today</option>

        <option>This Week</option>

        <option>This Year</option>

      </select>

    </div>

  );
}