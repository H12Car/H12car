"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PanelSidebar from "./components/PanelSidebar";
import "./panel.css";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [pendingQuotes, setPendingQuotes] = useState(0);

  // Check if we're on login or logout page
  const isAuthPage = pathname === "/panel/login" || pathname === "/panel/logout";

  // Fetch pending quotes count for sidebar badge
  useEffect(() => {
    if (!isAuthPage) {
      fetch("/api/quotes?status=PENDING")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setPendingQuotes(data.length);
          }
        })
        .catch(() => setPendingQuotes(0));
    }
  }, [isAuthPage]);

  // Auth pages - no sidebar, no wrapper
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Regular panel pages - with sidebar
  return (
    <div className="panel-wrapper min-h-screen bg-zinc-900 flex">
      <PanelSidebar pendingQuotes={pendingQuotes} />
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
