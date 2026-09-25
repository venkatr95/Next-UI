import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DocsNavbar from "./DocsNavbar";
import { useState } from "react";

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <DocsNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 px-4 py-8 md:px-8 lg:px-12 max-w-4xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
