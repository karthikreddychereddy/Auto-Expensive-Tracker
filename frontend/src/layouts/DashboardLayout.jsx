import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import TopNavbar from "../components/navigation/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <TopNavbar />

        <main className="flex-1 p-8 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}