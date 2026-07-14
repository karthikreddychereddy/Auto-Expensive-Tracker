import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import TopNavbar from "../components/navigation/TopNavbar";

export default function DashboardLayout() {

  return (

    <div className="h-screen bg-slate-100 dark:bg-slate-900 overflow-hidden transition-colors duration-300">

      <Sidebar />

      <div className="ml-72 h-screen flex flex-col">

        <TopNavbar />

        <main className="flex-1 overflow-y-auto p-8 text-slate-800 dark:text-white transition-colors duration-300">

          <Outlet />

        </main>

      </div>

    </div>

  );

}