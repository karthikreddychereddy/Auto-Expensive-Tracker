import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import TopNavbar from "../components/navigation/TopNavbar";

export default function DashboardLayout() {

  const location = useLocation();

  const isAIPage = location.pathname === "/ai-advisor";

  return (

    <div className="h-screen overflow-hidden bg-slate-100 transition-colors duration-300 dark:bg-slate-900">

      <Sidebar />

      <div className="ml-72 flex h-screen flex-col">

        <TopNavbar />

        <main
          className={`flex-1 overflow-hidden text-slate-800 transition-colors duration-300 dark:text-white ${
            isAIPage ? "" : "overflow-y-auto p-8"
          }`}
        >
          <Outlet />
        </main>

      </div>

    </div>

  );

}