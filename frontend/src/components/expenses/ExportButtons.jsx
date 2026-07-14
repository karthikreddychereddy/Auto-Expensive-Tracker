import { useEffect, useRef, useState } from "react";

import {
  FaDownload,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaChevronDown,
} from "react-icons/fa";

export default function ExportButtons({
  onCSV,
  onExcel,
  onPDF,
}) {

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  return (

    <div
      className="relative"
      ref={dropdownRef}
    >

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-white border border-gray-300 hover:border-[#0B6B57] hover:text-[#0B6B57] px-5 py-3 rounded-xl shadow-sm transition"
      >

        <FaDownload />

        <span className="font-medium">
          Download
        </span>

        <FaChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">

          <button
            onClick={() => {
              onCSV();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-green-50 transition"
          >

            <FaFileCsv className="text-green-600 text-lg" />

            <span>
              Export CSV
            </span>

          </button>

          <button
            onClick={() => {
              onExcel();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-emerald-50 transition"
          >

            <FaFileExcel className="text-emerald-600 text-lg" />

            <span>
              Export Excel
            </span>

          </button>

          <button
            onClick={() => {
              onPDF();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition"
          >

            <FaFilePdf className="text-red-600 text-lg" />

            <span>
              Export PDF
            </span>

          </button>

        </div>

      )}

    </div>

  );

}