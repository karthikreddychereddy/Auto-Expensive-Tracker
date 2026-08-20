import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import TopNavbar from "../components/navigation/TopNavbar";

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAIPage = location.pathname === "/ai-advisor";

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="h-dvh min-h-screen overflow-hidden bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex h-dvh min-h-screen min-w-0 flex-col lg:ml-72">
        <TopNavbar
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main
          id="main-content"
          className={`
            min-h-0 min-w-0 flex-1 text-slate-800 transition-colors duration-300 dark:text-white
            ${
              isAIPage
                ? "overflow-hidden"
                : "overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:p-8"
            }
          `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
