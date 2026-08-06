import { FaBars } from "react-icons/fa";

export default function AIHeader({

  onMenuClick,

}) {

  return (

    <header className="sticky top-0 z-40 flex h-16 items-center bg-white px-6">

      <button

        onClick={onMenuClick}

        className="rounded-xl p-2 transition hover:bg-slate-100"

      >

        <FaBars size={18} />

      </button>

      <div className="ml-4">

        <h1 className="text-lg font-semibold text-slate-800">

          PaisaTrack AI

        </h1>

      </div>

    </header>

  );

}