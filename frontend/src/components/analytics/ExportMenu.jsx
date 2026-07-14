import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaFilePdf, FaFileExcel } from "react-icons/fa";

export default function ExportMenu({
  onExportPDF,
  onExportExcel,
}) {

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    }

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

    <div className="relative" ref={menuRef}>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#0B6B57] text-white px-5 py-2 rounded-xl shadow hover:bg-[#095445] transition"
      >

        Export

        <FaChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {open && (

        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">

          <button
            onClick={() => {
              onExportPDF();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >

            <FaFilePdf className="text-red-600" />

            Export as PDF

          </button>

          <button
            onClick={() => {
              onExportExcel();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
          >

            <FaFileExcel className="text-green-600" />

            Export as Excel

          </button>

        </div>

      )}

    </div>

  );

}