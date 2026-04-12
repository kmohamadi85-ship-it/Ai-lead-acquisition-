"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useStore((s) => s.sidebarOpen);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar />
      <Header />
      <main
        className={cn(
          "pt-16 transition-all duration-300 min-h-screen",
          sidebarOpen ? "pl-[260px]" : "pl-[72px]"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
