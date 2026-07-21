import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useBudget } from "../../context/BudgetContext";
import { useInsights } from "../../context/InsightContext";

import exportExcel from "./ExportExcel";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExportReport() {

  const { selectedMonth } = useBudget();

  const { recentTransactions } = useInsights();

  const [openMenu, setOpenMenu] = useState(false);

  const exportPDF = async () => {

    const input = document.getElementById("analytics-dashboard");

    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const image = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const width = 210;

    const height =
      (canvas.height * width) / canvas.width;

    pdf.addImage(
      image,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save(`Analytics-${selectedMonth}.pdf`);

    setOpenMenu(false);

  };

  return (

    <div className="relative">

      <button

        onClick={() => setOpenMenu(!openMenu)}

        className="flex items-center gap-3 bg-[#0B6B57] hover:bg-[#085443] text-white px-6 py-3 rounded-xl shadow"

      >

        <FaDownload />

        Download

      </button>

      {openMenu && (

        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

          <button

            onClick={exportPDF}

            className="w-full text-left px-5 py-3 hover:bg-gray-100"

          >

            📄 Download PDF

          </button>

          <button
            onClick={() => {
                exportExcel(recentTransactions, selectedMonth);
                setOpenMenu(false);
            }}
            className="w-full text-left px-5 py-3 hover:bg-gray-100"
          >
            📊 Download Excel
          </button>

        </div>

      )}

    </div>

  );

}