"use client";

import Sidebar from "../components/main_components/sidebar";
import PostAuthHeader from "../components/main_components/postauth_header";
import BottomPlayer from "../components/main_components/bottom_player";
import RightPanel from "../components/main_components/right_panel";
import { useState } from "react";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-56 shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Layout */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <PostAuthHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto px-4 md:px-8 md:mr-64">
            {children}
          </main>
          
          {/* Right Panel - Hidden on Mobile */}
          <div className="hidden lg:block w-64 shrink-0 h-full">
            <RightPanel />
          </div>
        </div>
        
        <BottomPlayer />
      </div>
    </div>
  );
}