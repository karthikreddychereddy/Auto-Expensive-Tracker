import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function exportExcel(expenses, selectedMonth) {

  if (!expenses || expenses.length === 0) {
    alert("No data available for this month.");
    return;
  }

  const data = expenses.map((expense) => ({
    Date: expense.date,
    Category: expense.category,
    Merchant: expense.merchant || "-",
    Payment: expense.paymentMethod || "-",
    Amount: Number(expense.amount),
    Notes: expense.notes || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Expenses"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(
    file,
    `PaisaTrack-${selectedMonth}.xlsx`
  );
}