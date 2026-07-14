import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// =======================
// CSV Export
// =======================

export const exportCSV = (expenses) => {

  if (!expenses.length) return;

  const headers = [
    "Title",
    "Merchant",
    "Category",
    "Payment",
    "Amount",
    "Date",
    "Notes",
  ];

  const rows = expenses.map((expense) => [

    expense.title,

    expense.merchant,

    expense.category,

    expense.paymentMethod,

    expense.amount,

    expense.date,

    expense.notes,

  ]);

  const csvContent = [

    headers,

    ...rows,

  ]
    .map((row) => row.join(","))

    .join("\n");

  const blob = new Blob(

    [csvContent],

    {
      type: "text/csv;charset=utf-8;",
    }

  );

  saveAs(
    blob,
    `Expenses_${new Date().toISOString().slice(0,10)}.csv`
  );

};

// =======================
// Excel Export
// =======================

export const exportExcel = (expenses) => {

  if (!expenses.length) return;

  const worksheet = XLSX.utils.json_to_sheet(expenses);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Expenses"
  );

  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  const blob = new Blob(

    [excelBuffer],

    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }

  );

  saveAs(
    blob,
    `Expenses_${new Date().toISOString().slice(0,10)}.xlsx`
  );

};

// =======================
// PDF Export
// =======================

export const exportPDF = (expenses) => {

  if (!expenses.length) return;

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Expense Report",
    14,
    20
  );

  autoTable(doc, {

    startY: 30,

    head: [[

      "Title",

      "Category",

      "Payment",

      "Amount",

      "Date",

    ]],

    body: expenses.map((expense) => [

      expense.title,

      expense.category,

      expense.paymentMethod,

      `₹${expense.amount}`,

      expense.date,

    ]),

  });

  doc.save(
    `Expenses_${new Date().toISOString().slice(0,10)}.pdf`
  );

};