import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import { cn } from "@/utils/cn";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className={cn(
        "flex flex-col min-h-screen",
        "lg:ml-64"
      )}>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet context={{ onMenuClick: () => setIsSidebarOpen(true) }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;