export function filterExpenses(
  expenses,
  search,
  categoryFilter,
  paymentFilter
) {

  return expenses.filter((expense) => {

    const searchMatch =

      (expense.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      (expense.merchant || "")
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      (expense.category || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =

      categoryFilter === "All"

      ||

      expense.category === categoryFilter;

    const paymentMatch =

      paymentFilter === "All"

      ||

      expense.paymentMethod === paymentFilter;

    return (

      searchMatch &&

      categoryMatch &&

      paymentMatch

    );

  });

}